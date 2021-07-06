<template>
    <div id="AddEditBatch">
      <div class="diff-shadow">
        <h2>
          <span v-if="batchId">Update</span>
          <span v-else>Add New</span>
          <span> Batch</span>
        </h2>
        <div v-if="batchId" class="flex-box">
          <label class="pad-label w100" for="products">
            <strong>Products:</strong>
          </label>
          <input
            type="text"
            v-model="productVariantName"
            readonly
          >
        </div>
        <div v-else class="flex-box">
          <label class="pad-label w100" for="products">
            <strong>Products:</strong>
          </label>

          <div class="full-width">
            <select name="products" class="custom-select" id="products" v-model="batch.productVariant">
              <template v-for="product in products" v-bind:key="product.id">
                <option 
                  v-for="productVariant in product.product_variant"
                  v-bind:key="productVariant.id"
                  v-bind:value="productVariant.id"
                >
                  {{product.name}}: {{productVariant.price}}
                </option>
              </template>
            </select>
            <span v-if="productVariantValidation" class="form-error">{{ productVariantValidation }}</span>
          </div>
        </div>
        <div class="flex-box">
          <label class="pad-label w100" for="quantity">
            <strong>Quantity:</strong>
          </label>
          <div class="full-width">
            <input
              name="quantity"
              type="text"
              placeholder="Enter quantity"
              v-model="batch.quantity"
            />
            <span v-if="batchQuantityValidation" class="form-error">{{ batchQuantityValidation }}</span>
          </div>
        </div>
        <div class="flex-box">
          <label class="pad-label w100" for="manufactured">
            <strong>Manufactured date:</strong>
          </label>
          <div class="full-width">
            <input type="date" id="manufactured" name="manufactured" v-model="batch.manufacturedDate">
          </div>
        </div>
        <div class="flex-box">
          <label class="pad-label w100" for="expiry">
            <strong>Expiry date:</strong>
          </label>
          <div class="full-width">
            <input type="date" id="expiry" name="expiry" v-model="batch.expiryDate">
            <div v-if="expiryDateValidation" class="form-error">{{ expiryDateValidation }}</div>  
          </div>
        </div>
        <div class="flex-box">
          <label class="pad-label w100" for="in_stock">
            <strong>In Stock:</strong>
          </label>
          <input style="margin-top: 21px" type="checkbox" id="in_stock" name="in_stock" v-model="batch.in_stock">
        </div>

        <div style="text-align: right; padding-bottom: 50px">
          <router-link
            to="/batchs"
            style="margin-right: 20px"
            class="btn btn-orange btn-mr btn-link"
          >Cancel</router-link>
          <button
            class="btn btn-orange btn-mr"
            style="width: 150px"
            :disabled="addEditBtn"
            @click="addUpdateBatch"
          >
            <span v-if="batchId">Update</span>
            <span v-else>Add</span>
            <span> Batch</span>
          </button>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

import { ActionTypes } from '@/store/modules/order/actions';
import { Batch } from '@/store/models/batch';
import { ProductVariant } from '@/store/models/product';

export default defineComponent({
  name: 'AddEditBatch',
  props: ['productId', 'productVariantId', 'batchId'],
  data () {
    return {
      batch: {
        productVariant: 0,
        quantity: '',
        manufacturedDate: '',
        expiryDate: '',
        in_stock: true
      },
      productVariantName: ''
    }
  },
  computed: {

    batchQuantityValidation: function () {
      let errorMessage = null;
      if (this.batch.quantity === undefined || this.batch.quantity === '')
      {
        errorMessage = 'Quantity is required';
      } else {
        const value = parseFloat(this.batch.quantity);
        if (isNaN(value)) {
          errorMessage = 'Only numbers are allowed';
        } else {
          if ( value <= 0) {
            errorMessage = 'Quantity should be greater than zero';
          }
        }
      }
      return errorMessage;
    },

    productVariantValidation: function () {
      let errorMessage = null;
      if (this.batch.productVariant === undefined || this.batch.productVariant === 0) {
        errorMessage = 'Product Variant is required, please select any or add product';
      }
      return errorMessage;
    },

    expiryDateValidation: function() {
      let errorMessage = null;
      if(!this.batch.manufacturedDate || !this.batch.expiryDate){
        errorMessage = 'Manufacture & Expiry Dates are required'
      }
      return errorMessage;
    },

    addEditBtn: function () {
      let disable = true;
      if ( this.batchQuantityValidation === null &&
      this.productVariantValidation === null &&
      this.expiryDateValidation === null
      ) {
        disable = false;
      }
      return disable
    },

    ...mapGetters({
      products: 'getListOfProducts'
    })
  },
  methods: {
    addUpdateBatch: async function () {
      let batchIdNumber = 0;
      if (this.batchId) {
        batchIdNumber = parseFloat(this.batchId);
        if (isNaN(batchIdNumber)) return;
      }

      const batch: Batch = {
        product_variant: this.batch.productVariant,
        quantity: this.batch.quantity,
        manufacturing_date: this.batch.manufacturedDate,
        expiry_date: this.batch.expiryDate,
        in_stock: this.batch.in_stock
      };

      if (this.productId && this.productVariantId && this.batchId) {
        batch.id = batchIdNumber;
        await this.updateBatch(batch);
      } else {
        await this.createBatch(batch);
      }
      this.$router.push({name: 'Batch'});
    },

    loadData: function (batch: Batch) {
      this.batch.quantity = batch.quantity ? batch.quantity : '';
      this.batch.manufacturedDate = batch.manufacturing_date ? batch.manufacturing_date : '';
      this.batch.expiryDate = batch.expiry_date ? batch.expiry_date : '';
      this.batch.in_stock = batch.in_stock ? batch.in_stock : true;
    },

    ...mapActions({
      getProducts: ActionTypes.GET_PRODUCTS,
      createBatch: ActionTypes.CREATE_BATCH,
      updateBatch: ActionTypes.UPDATE_BATCH
    })
  },
  async beforeMount () {
    await this.getProducts('');

    if (this.products &&
    this.products.length > 0 &&
    this.products[0].product_variant &&
    this.products[0].product_variant.length > 0 &&
    this.products[0].product_variant[0].id) {
      this.batch.productVariant = this.products[0].product_variant[0].id;
    }

    if (this.productId && this.productVariantId && this.batchId) {
      const product_id = parseInt(this.productId);
      const product = isNaN(product_id) ? undefined : this.$store.getters.getSignleProduct(product_id);
      if (product) {
        const variant = product.product_variant.find((item: ProductVariant) => item.id == this.productVariantId);
        const batch = variant.batch.find((item: Batch) => item.id == this.batchId);
        this.productVariantName = product.name + ': ' + variant.price;
        this.batch.productVariant = variant.id;
        this.loadData(batch);
      }
      else {
        // Show 404 page on screen
        this.$router.push({name: 'notFound'});
      }
    }
  }
});
</script>

<style lang="scss" scoped>
  #AddEditBatch {
    padding-left: 15%;
    padding-right: 15%;
    margin-top: 3%;
  }

  .pad-label {
    padding: 20px 20px 20px 0px;
  }

  .w100 {
    width: $w150;
  }

  label {
    text-align: left;
  }

  .full-width {
    width: 100%;
  }
</style>