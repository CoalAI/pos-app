<template>
    <div id="AddEditBatch">
      <div class="diff-shadow">
        <h2>
          <span v-if="batchId">Update</span>
          <span v-else>Add New</span>
          <span> Batch</span>
        </h2>
        <div class="first-row row">
          <div v-if="batchId" class="left">
            <label class="" for="products">
              <strong>Products:</strong>
            </label>
            <div class="ab-input-container">
              <input
                type="text"
                v-model="productVariantName"
                readonly
              >
            </div>
          </div>
          <div v-else class="left">
          <span class="required">*</span>
            <label class="" for="products">
              <strong>Products:</strong>
            </label>
            <div class="ab-select-container">
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
          <div class="right">
          <span class="required">*</span>
            <label class="" for="quantity">
              <strong>Quantity:</strong>
            </label>
            <div class="ab-input-container">
              <input
                name="quantity"
                type="text"
                placeholder="Enter quantity"
                v-model="batch.quantity"
              />
              <span v-if="batchQuantityValidation" class="form-error">{{ batchQuantityValidation }}</span>
            </div>

          </div>
        </div>

        <div class="second-row row">
          <div class="left">
            <span class="required">*</span>
            <label class="" for="manufactured">
              <strong>Manufactured Date:</strong>
            </label>
            <div class="ab-input-container">
              <input type="date" id="manufactured" name="manufactured" v-model="batch.manufacturedDate">
            </div>
          </div>
          <div class="right">
            <span class="required">*</span>
            <label class="" for="expiry">
              <strong>Expiry date:</strong>
            </label>
            <div class="ab-input-container">
              <input type="date" id="expiry" name="expiry" v-model="batch.expiryDate">
              <div v-if="expiryDateValidation" class="form-error">{{ expiryDateValidation }}</div>  
            </div>
          </div>
        </div>
        <div class="third-row">
          <label class="" for="in_stock">
            <strong>In Stock:</strong>
          </label>
          <input style="" type="checkbox" id="in_stock" name="in_stock" v-model="batch.in_stock">
        </div>

        <div class="ab_btn_container">
          <div>
            <button
              class="btn ab_orange_hover btn-orange"
              style=""
              :disabled="addEditBtn"
              @click="addUpdateBatch"
            >
              <span v-if="batchId">Update</span>
              <span v-else>Add</span>
            </button>
          </div>
          <div>
            <router-link
              to="/batchs"
              style="margin-left: 20px"
              class="btn ab_blue_hover btn-blue"
            >Cancel</router-link>
          </div>
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
      productVariantName: '',
      showErrorProduct: false,
      showErrorQuantity:false,
      showErrorExpiryDate: false
    }
  },
  computed: {

    batchQuantityValidation: function () {
      let errorMessage = null;
      if (this.batch.quantity === undefined || this.batch.quantity === '' && this.showErrorQuantity == true)
      {
        errorMessage = 'Quantity is required';
      } else {
        const value = parseFloat(this.batch.quantity);
        if (isNaN(value) && this.showErrorQuantity == true) {
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
      if (this.batch.productVariant === undefined || this.batch.productVariant === 0 && this.showErrorProduct == true) {
        errorMessage = 'Product Variant is required, please select any or add product';
      }
      return errorMessage;
    },

    expiryDateValidation: function() {
      let errorMessage = null;
      if((!this.batch.manufacturedDate || !this.batch.expiryDate)
      && this.showErrorExpiryDate == true){
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
      this.showErrorQuantity = true;
      this.showErrorProduct = true;
      this.showErrorExpiryDate = true;
    
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

      if (this.productId && this.productVariantId && this.batchId && this.batchQuantityValidation == null && this.expiryDateValidation ==null) {
        batch.id = batchIdNumber;
        await this.updateBatch(batch);
        this.$router.push({name: 'Batch'});
      } else if(this.batchQuantityValidation == null && this.expiryDateValidation ==null){
        await this.createBatch(batch);
        this.$router.push({name: 'Batch'});
      }
      
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
    // padding: 2.65% 30%;
    padding: 2.65% 25%;
    margin-top: 3%;
  }
  .diff-shadow{
    // padding: 1.65% 7.56%;
    padding: 1.65% 6.56%;
  }
  .diff-shadow > h2{
    text-align: center;
    color: $primary-color;
    margin-bottom: 50px;
  }

  // .pad-label {
  //   padding: 20px 20px 20px 0px;
  // }

  // .w100 {
  //   width: $w150;
  // }

  // label {
  //   text-align: left;
  // }

  // .full-width {
  //   width: 100%;
  // }
  .row{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin: 0;
  }
  .left{
    width: 48%;
    display: flex;
    align-items: baseline;
  }
  .right{
    width: 48%;
    display: flex;
    align-items: baseline;
  }
  .ab-select-container > select{
    padding: 8px 18px;
    border-radius: 10px;
    font-size: 12px;
  }
  .ab-input-container > input[type=text]{
    padding: 8px 18px;
    border-radius: 10px;
    font-size: 0.75em;
  }
  .ab-input-container > input[type=date]{
    padding: 8px 18px;
    border-radius: 10px;
    font-size: 0.75em;
  }
  .ab-input-container{
    width: 60%;
    flex-grow: 1
  }
  .ab-select-container{
    width: 60%;
    flex-grow: 1
  }
  .row  label{
    // margin-right: 50px;
    width: 30%;
    font-size: 0.85em;
    // font-weight: bold;
  }
  .third-row{
    margin-top: 20px;
    margin-left: 9px;
  }
  .third-row label{
    // margin-right: 50px;
    // width: 30%;
    width: 93.39px;
    font-size: 0.85em;
    // font-weight: bold;
  }
  .third-row input{
    // margin-right: 50px;
    // width: 30%;
    color: $primary-color;
    // font-weight: bold;
  }
  .form-error{
    font-size: 0.65em; 
  }

  // buttons designs 
  .ab_btn_container{
    margin-top: 50px;
    display: flex;
    justify-content: center;
  }
  .ab_btn_container > div:first-child button:first-child{
    border-radius: 20px;
    padding: 6px 48px;
    border: 1.5px solid $primary-color !important;
    width: 8rem;
  }
  .ab_orange_hover:hover{
    border: 1.5px solid $primary-color;
    color: $primary-color;
    background-color: white;
  }
  .btn-blue{
    background-color:#0f2636;
    border-radius: 20px;
    padding: 6px 45px;
    border: 1.5px solid #0f2636 !important;
    width: 8rem;
  }
  .ab_blue_hover:hover{
    color: #0f2636;
    background-color: white;
    border: 1.5px solid #0f2636;
  }
  .ab_btn_container a{
    color:white;
  }
  .required{
    content:" *";
    color: red;
    font-size: 17px;
    margin-right: 3px;
  }
  @media Screen and (max-width: 1497px){
    #AddEditBatch {
    padding: 2.65% 21%;
    margin-top: 3%;
  }
  }
  @media Screen and (max-width: 1247px){
    #AddEditBatch {
    padding: 2.65% 19%;
    margin-top: 3%;
  }
  }
</style>