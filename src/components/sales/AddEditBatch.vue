<template>
    <div id="AddEditBatch">
      <div class="diff-shadow">
        <h2><span>Add</span> New Batch</h2>
        <div class="flex-box">
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
          <input type="date" id="manufactured" name="manufactured" v-model="batch.manufacturedDate">
        </div>
        <div class="flex-box">
          <label class="pad-label w100" for="expiry">
            <strong>Expiry date:</strong>
          </label>
          <input type="date" id="expiry" name="expiry" v-model="batch.expiryDate">
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

export default defineComponent({
  name: 'AddEditBatch',
  props: ['batchId'],
  data () {
    return {
      batch: {
        productVariant: 0,
        quantity: '',
        manufacturedDate: '',
        expiryDate: '',
        in_stock: true
      }
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

    addEditBtn: function () {
      let disable = true;
      if ( this.batchQuantityValidation === null &&
      this.productVariantValidation === null) {
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

      const batch: Batch = {
        product_variant: this.batch.productVariant,
        quantity: this.batch.quantity,
        manufacturing_date: this.batch.manufacturedDate,
        expiry_date: this.batch.expiryDate,
        in_stock: this.batch.in_stock
      };
      
      await this.createBatch(batch);
      this.$router.push({name: 'Batch'});
    },

    ...mapActions({
      getProducts: ActionTypes.GET_PRODUCTS,
      createBatch: ActionTypes.CREATE_BATCH
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