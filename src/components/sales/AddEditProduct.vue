<template>
    <div id="AddEditProduct">
      <div class="diff-shadow">
        <h2>
          <span v-if="productId">Edit </span>
          <span v-else>Add New </span>
          <span>Product</span>
        </h2>
        <div class="first-row row">
          <div class="left">
            <label class="pd-lbl" for="name">
              <strong>Name:</strong>
            </label>
            <div class="ab-input-container">
              <input
                name="name"
                type="text"
                placeholder="Enter product name"
                :maxlength="maxlength.name"
                v-model="product.name"
              />
              <span v-if="productName_error" class="form-error">{{ productName_error }}</span>
              <ErrorField v-if="fieldErrors.name" :errorField="fieldErrors.name"></ErrorField>
            </div>
          </div>
          <div class="right">
            <label class="pd-lbl" for="barcode">
              <strong>Bar code:</strong>
            </label>
            <div class="ab-input-container">
              <input
                name="barcode"
                type="text"
                placeholder="Enter product bar-code"
                :maxlength="maxlength.barcode"
                v-model="product.barcode"
              />
              <span v-if="productBar_error" class="form-error">{{productBar_error}}</span>
              <ErrorField v-if="fieldErrors.bar_code" :errorField="fieldErrors.bar_code"></ErrorField>
            </div>
          </div>
        </div>
        <div class="second-row row">
          <div class="left">
            <label class="pd-lbl" for="category">
              <strong>Category:</strong>
            </label>
            <div class="ab-select-container">
              <select
                  tabindex="3"
                  name="category"
                  class="custom-select"
                  v-model="product.category"
                  ref="batches"
                >
                  <option value="0">Select Category</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.name }}
                  </option>
              </select>
            </div>
          </div>
          <div class="right">
            <label class="pd-lbl" for="unit">
              <strong>Unit:</strong>
            </label>
            <div class="ab-select-container">
              <select 
                name="unit"
                class="custom-select"
                id="unit"
                v-model="product.unit"
              >
                <option value="">Select Unit</option>
                <option v-for="unit in units" v-bind:key="unit.id" v-bind:value="unit.id">
                  {{ unit.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="third-row full-row">
          <div>
            <label class="pd-lbl" for="token">
              <strong>Token Printing:</strong>
            </label>
            <input style="" type="checkbox" id="token" name="token" v-model="product.token">
          </div>
          <div>
            <label class="pd-lbl" for="color">
              <strong class="mr-1">Color:</strong>
            </label>
            <input
              class="pr-var-mr full-row-input"
              name="colorcode"
              type="text"
              placeholder="Color"
              :maxlength="maxlength.color"
              v-model="currentProductVariant.color"
            />
          </div>
          <div>
            <label class="pd-lbl" for="size"><strong>Size:</strong></label>
            <input
              class="pr-var-mr full-row-input"
              name="size"
              type="text"
              placeholder="Size"
              :maxlength="maxlength.size"
              v-model="currentProductVariant.size"
            />
          </div>
          <div>
            <label class="pd-lbl" for="price"><strong>Price:</strong></label>
            <input
              class="pr-var-mr full-row-input"
              name="price"
              type="number"
              placeholder="Price"
              v-model="currentProductVariant.price"
            />
          </div>
          <div>
            <label class="pd-lbl" for="sale_price"><strong>Sale Price:</strong></label>
            <input
              class="pr-var-mr full-row-input"
              name="sale_price"
              type="number"
              placeholder="S.Price"
              v-model="currentProductVariant.sale_price"
            />
          </div>
        </div>
        <!-- <p><span><strong>Product Variants</strong></span></p> -->
        <div class="forth-row">
          <label class="pd-lbl" for="description"><strong>Description:</strong></label>
          <div>
            <textarea 
              name="description"
              rows="3"
              class="box w500"
              placeholder="Description"
              :maxlength="maxlength.description"
              v-model="currentProductVariant.description"
            ></textarea><br>
            <span v-if="VariantPriceValidation" class="form-error">{{ VariantPriceValidation }}</span>
          </div>          
        </div>
        <div class="fifth-row">
          <table class="">
            <colgroup>
              <col span="1" style="width: 14%;">
              <col span="1" style="width: 14%;">
              <col span="1" style="width: 14%;">
              <col span="1" style="width: 14%;">
              <col span="1" style="width: 40%;">
              <col span="1" style="width: 4%;">
            </colgroup>
            <tr class="fr-row header2">
              <th style="border-radius: 10px 0px 0px 0px; text-align:center">Color</th>
              <th>Size</th>
              <th>Price</th>
              <th>Sale Price</th>
              <th>Description</th>
              <th style="border-radius: 0px 10px 0px 0px; text-align:center"><img :src="del" alt="Delete"></th>
            </tr>
            <tr v-for="(productVariant, index) in product.productVariants" v-bind:key="productVariant.id" class="fr-row content2">
              <td>
                <input
                  class="tbl_item_input"
                  type="text"
                  placeholder="Color"
                  v-model="productVariant.color"
                />
              </td>
              <td>
                <input
                  class="tbl_item_input"
                  type="text"
                  placeholder="Size"
                  v-model="productVariant.size"
                />
              </td>
              <td>
                <input
                  class="tbl_item_input"
                  type="text"
                  placeholder="Price"
                  v-model="productVariant.price"
                  @input="checkTablePrice(index)"
                />
              </td>
              <td>
                <input
                  class="tbl_item_input"
                  type="text"
                  placeholder="Sale Price"
                  v-model="productVariant.sale_price"
                  @input="checkTablePrice(index)"
                />
              </td>
              <td>
                <input
                  class="tbl_item_input"
                  type="text"
                  placeholder="Description"
                  v-model="productVariant.description"
                />
              </td>
              <td @click="removeProductVariant(index)" style="text-align: center">
               <img id="del_img" :src="del" alt="Delete">
              </td>
            </tr>
          </table>
        </div>
        <div class="p-error-div">
          <p v-if="tablePriceValidation" class="form-error">{{ tablePriceValidation }}.</p>
          <p v-if="updateDeleteLastVarient" class="form-error"> {{ updateDeleteLastVarient }}</p>
          <p v-if="productVariant_error" class="p-error form-error">{{productVariant_error}}</p>
        </div>
        <div class="ab_btn_container">
          <div>
            <button class="btn ab_orange_hover btn-orange" @click="addProductVariant" >Add another Variant</button>
          </div>
          <div>
            <button
              class="btn ab_orange_hover btn-orange"
              style=""
              @click="addUpdateProduct"
            >
              <span v-if="productId">Update</span>
              <span v-else>Add</span>
            </button>
          </div>
          <div>
            <router-link
              to="/products"
              style="margin-right: 20px"
              class="btn ab_blue_hover btn-blue"
            >Cancel</router-link>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { Product, ProductVariant, Unit } from '@/store/models/product';
import { ActionTypes } from '@/store/modules/order/actions';
import ErrorField from '@/components/common-components/ErrorField.vue';

export default defineComponent({
  name: 'AddEditProduct',
  props: ['productId'],
  components: {
    ErrorField,
  },
  data() {
    const productVariants: ProductVariant[] = [];
    return {
      del:require('../../assets/delete_icon.svg'),
      productName_error: "",
      productBar_error: "",
      productVariant_error: "",
      maxlength: {
        name: 50,
        barcode: 48,
        unitName: 20,
        color: 20,
        size: 20,
        description: 250
      },
      product: {
        name: '',
        barcode: '',
        category: 0,
        unit: '',
        token: false,
        productVariants: productVariants
      },
      currentProductVariant: {
        color: '',
        size: '',
        price: '',
        sale_price: '',
        description: ''
      },
      VariantPriceValidation: '',
      tablePriceValidation: '',
      updateDeleteLastVarient: ''
    }
  },
  computed: {
    ...mapGetters({
      units: 'getUnits',
      singleProduct: 'getSingleProduct',
      fieldErrors: 'getFieldError',
      categories: 'getCategories',
    })
  },
  methods: {
    // validation function
    productCreationValidation: function () {
      if (this.product.name.length <= 0) {
        this.productName_error = "Name is required"
      }
      else{
        this.productName_error = ""
      }
      if (this.product.barcode.length <= 0) {
        this.productBar_error = "Barcode is required"
      }
      else{
        this.productBar_error = ""
      }
      if (this.product.productVariants.length <= 0) {
        this.productVariant_error = "At least one product variant is required"
      }
      else{
        this.productVariant_error = ""
      }
      if (this.productName_error === "" && 
          this.productBar_error === "" &&
          this.productVariant_error === "")
        {
          return true
        }
      else{
        false
      }
    },
    clearProductVariant: function () {
      this.currentProductVariant.color = '';
      this.currentProductVariant.size = '';
      this.currentProductVariant.price = '';
      this.currentProductVariant.sale_price = '';
      this.currentProductVariant.description = '';
    },

    priceValidation: function (price: string) {
      let errorMessage = null;
      const _price = parseFloat(price);
      if (!_price && isNaN(_price)) {
        errorMessage = 'Price is required';
      } 
      if (!isNaN(_price) &&  _price <= 0) {
        errorMessage = 'price should be greater than zero';
      }
      return errorMessage;
    },

    addProductVariant: function() {
      // validate data
      const validation: any = this.priceValidation(this.currentProductVariant.price);
      if (validation) {
        this.VariantPriceValidation = validation;
        return;
      }
      this.VariantPriceValidation = '';

      const singleProductVariant: ProductVariant = {
        color: this.currentProductVariant.color,
        size: this.currentProductVariant.size,
        price: this.currentProductVariant.price,
        sale_price: this.currentProductVariant.sale_price,
        description: this.currentProductVariant.description
      }

      this.product.productVariants.push(singleProductVariant);
      this.clearProductVariant();
    },

    removeProductVariant: function(index: number) {
      if (this.productId) {
        if (this.product.productVariants.length > 1) {
          const deleteProductVariantID = this.product.productVariants[index].id;
          // Delete Variant
          if (deleteProductVariantID) {
            this.deleteProductVariant(deleteProductVariantID);
            this.updateDeleteLastVarient = '';
            this.product.productVariants.splice(index, 1);
          } else {
            this.product.productVariants.splice(index, 1);
          }
        }
        else if (this.product.productVariants.length == 1) {
          this.updateDeleteLastVarient = 'You cannot delete last product variant.';
        }
      } else {
        this.product.productVariants.splice(index, 1);
      }
    },

    checkTablePrice: function (index: number) {
      const price = this.product.productVariants[index].price;
      this.tablePriceValidation = '';
      if (price) {
        const validation = this.priceValidation(price);
        if (validation) {
          this.tablePriceValidation = validation;
        }
      }
    },

    addUpdateProduct: async function() {
      let productIdNumber = 0;
      if (this.productId) {
        productIdNumber = parseFloat(this.productId);
        if (isNaN(productIdNumber)) return;
      }

      const unproxiedProductVariants = this.product.productVariants.map((item: ProductVariant) => {
        const Variant = {
          price: item.price,
          sale_price: item.sale_price,
          color: item.color,
          description: item.description,
          size: item.size
        } as ProductVariant;
        // To Update
        if (item.id) Variant.id = item.id;
        if (this.productId) Variant.product = productIdNumber;
        return Variant;
      });

      const currentProduct: Product = {
        name: this.product.name,
        bar_code: this.product.barcode,
        token: this.product.token,
        category: this.product.category !== 0 ? this.product.category : undefined,
        product_variant: unproxiedProductVariants
      };

      currentProduct.unit = null;
      const unitID = parseFloat(this.product.unit);
      if (!isNaN(unitID)) {
        const currentUnit = this.units.find((unitItem: Unit) => unitItem.id === unitID);
        if (currentUnit) {
          currentProduct.unit = {
            id: currentUnit.id,
            name: currentUnit.name
          } as Unit;
        }
      }

      // submit to API call action from store
      if (this.productId) {
        currentProduct.id = productIdNumber;
        if(this.productCreationValidation()){
          await this.updateProduct({
            productID: this.productId,
            product: currentProduct
          });
          this.$router.push({name: 'Product'});
        }
      } else {
        if(this.productCreationValidation()){
          await this.createProduct(currentProduct);
          this.$router.push({name: 'Product'});
        }
      }
    },

    loadData: function (product: Product) {
      this.product.name = product.name ? product.name : '';
      this.product.barcode = product.bar_code ? product.bar_code : '';
      this.product.unit = product.unit && typeof product.unit !== 'number' && product.unit.id ? product.unit.id.toString() : '';
      this.product.token = product.token ? product.token : false;
      this.product.productVariants = product.product_variant ? product.product_variant : [];
      this.product.category = product.category ? product.category : 0;
    },

    ...mapActions({
      getUnits: ActionTypes.GET_UNITS,
      getProduct: ActionTypes.GET_SINGLE_PRODUCT,
      createProduct: ActionTypes.CREATE_PRODUCT,
      updateProduct: ActionTypes.UPDATE_PRODUCT,
      deleteProductVariant: ActionTypes.DELETE_PRODUCT_Variant,
      setFieldError: ActionTypes.SET_FIELD_ERROR,
      fetchCategories: ActionTypes.FETCH_CATEGORIES,
    })
  },
  async created () {
    await this.getUnits();
    await this.fetchCategories();
    if (this.productId) {
      await this.getProduct(this.productId);
      console.log(this.singleProduct)
      this.loadData(this.singleProduct);
    }
  },
  async unmounted () {
    await this.setFieldError({});
  }
});
</script>

<style lang="scss" scoped>
  // ab css
  #AddEditProduct {
    padding: 1.65% 26%;
  }
  .diff-shadow{
    padding: 1.65% 6.56%;
  }
  .diff-shadow > h2 {
    text-align: center;
    color: #e73b2a;
    margin-bottom: 40px;
}


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
    padding: 8px;
    border-radius: 10px;
    font-size: 11px;
    font-family: seg;
    background-color: #e5e9ea;
  }
  .ab-input-container > input[type=text]{
    padding: 8px;
    border-radius: 10px;
    font-size: 11px;
    font-family: seg;
    border:1px solid #cfd1d0;
    background:#e5e9ea;
  }
  .ab-input-container > input[type=password]{
    padding: 8px;
    border-radius: 10px;
    font-size: 11px;
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
    width: 25%;
    font-size: 0.875em;
  }
  .form-error{
    font-size: 0.65em; 
  }

  // full row designs
  .full-row{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 20px 0;
  }
  .full-row div{
    display: flex;
    align-items: baseline;
    flex-grow: 1;
  }
  .full-row div > label{
    font-size: 0.875em;
  }
  .full-row div:first-child{
    align-items: center;
    justify-content: space-between;

  }
  .full-row div:first-child > label{
    margin: 0 7px 0 0;
    width: 50px; 

  }
  .full-row-input{
    width:65px; 
    padding:5px;
    font-family:seg;
    font-size:11px;
    border:1px solid #cfd1d0;
    border-radius:10px;
    margin-left:5px;
    background:#e5e9ea;
  }

  // forth-row designs
  .forth-row{
    display: flex;
    justify-content: space-between;
  }
  .forth-row > label{
    font-size: 0.875em;
    width: 13%
  }
  .forth-row > div{
    width: 86%;
  }

  // table designs
  .fifth-row{
    display: flex;
    justify-content: flex-end;
  }
  .fifth-row > table{
    border-collapse: collapse;
    border-radius: 7px 7px 0 0;
    overflow: hidden;
    width: 86%;
  }
  .fifth-row > table > tr th{
    padding: 3px 0;
    font-size: 13px;
    background-color: $primary-color;
    color: white;
    text-align: center;
  }
  .fifth-row > table > tr td{
    padding: 3px 0;
    font-size: 12px;
    vertical-align: middle;
  }
  .fifth-row > table > tr td > input{
    
    text-align: center;
  }
  .p-error-div{
    display: flex;
    justify-content: flex-end;
  }
  .p-error{
    width: 86%;

  }

  .ab_btn_container{
    margin-top: 30px;
    display: flex;
    justify-content: flex-start;
    margin-left: 66px;
    font-family:seg;
  }
  .ab_btn_container > div{
    margin: 0 10px;
  }
  .ab_btn_container > div:first-child button:first-child{
    border-radius: 20px;
    padding: 6px 13px;
    border: 1.5px solid $primary-color !important;
    
  }
  .ab_btn_container > div:nth-child(2) button:first-child{
    border-radius: 20px;
    padding: 6px 40px;
    border: 1.5px solid $primary-color !important;
    width:8rem;
  }
  .ab_orange_hover:hover{
    border: 1.5px solid $primary-color;
    color: $primary-color;
    background-color: white;
  }
  .btn-blue{
    background-color:#0f2636;
    border-radius: 20px;
    padding: 6px 30px;
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
  .head{
    font-family:seg;
    font-size:20px;
    font-weight:bold;
  }
  .pd-lbl{
    font-family:seg;
    font-size: 12px;
  }
  .mr-1{
    margin-left:10px;
  }
  .box{
  font-family:seg;
  font-size:11px;
  padding:5px;
  border-radius:8px;
  border:1px #dddee0 solid;
  width:164px;
  background-color: #e5e9ea !important;
  margin-bottom: 10px;
}
.w500{
  width:80%;
  height:75px;
}
.fr-row {
  font-size: 12px;
  font-family: seg;
  vertical-align:text-bottom;
}
.header2{
  background-color: #e43d2a; 
  color: white;
  
}
.content2{
  background-color: #e3e2e2 !important; 
  color: #0f2634;
  text-align:center;
}
.tbl_item_input{
  padding:0 !important;
  background: none !important;
}
#del_img{
  margin-left: 1px;
  width: 12px;
  height: 12px;
  filter: invert(31%) sepia(29%) saturate(5827%) hue-rotate(347deg) brightness(94%) contrast(92%);
}
</style>