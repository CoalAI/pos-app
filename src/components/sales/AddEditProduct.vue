<template>
    <div id="AddEditProduct">
      <div class="diff-shadow">
        <h2><span>Add</span> New Product</h2>
        <div class="flex-box">
          <label class="pad-label w100" for="name">
            <strong>Name:</strong>
          </label>
          <div>
            <input
              name="name"
              type="text"
              placeholder="Enter product name"
              :maxlength="maxlength.name"
              v-model="product.name"
            />
            <span v-if="productNameValidation" class="form-error">{{ productNameValidation }}</span>
          </div>
        </div>
        <div class="flex-box">
          <label class="pad-label w100" for="barcode">
            <strong>Bar code:</strong>
          </label>
          <input
            name="barcode"
            type="text"
            placeholder="Enter product bar-code"
            :maxlength="maxlength.barcode"
            v-model="product.barcode"
          />
        </div>
        <div class="flex-box">
          <label class="pad-label w100" for="unit">
            <strong>Unit:</strong>
          </label>

          <select 
            name="cars"
            class="custom-select"
            id="unit"
            v-model="product.unit"
          >
            <option v-for="unit in unitSelectOptions" v-bind:key="unit.id" v-bind:value="unit">
              {{ unit.name }}
            </option>
            <option value="kg">Kg</option>
          </select>
        </div>
        <div class="flex-box">
          <button style="width: 150px" class="btn btn-orange" @click="addUnitsection = !addUnitsection; arrow = addUnitsection ? '▲': '▼'" >Add New Unit {{arrow}}</button>
        </div>
        <div v-if="addUnitsection" class="flex-box">
          <label class="pad-label w100" for="unit">
            <strong>Unit:</strong>
          </label>

          <input
            name="unitname"
            type="text"
            placeholder="Enter New Unit Name"
            :maxlength="maxlength.unitName"
            v-model="unitName"
          />
          <button style="width: 150px" class="btn btn-orange" @click="addUnit">Add</button> 
        </div>
        <div class="flex-box">
          <label class="pad-label w100" for="token">
            <strong>Token Printing:</strong>
          </label>
          <input style="margin-top: 21px" type="checkbox" id="token" name="token" v-model="product.token">
        </div>
        <p><span><strong>Product Variants</strong></span></p>
        <div class="product_varient_box">
          <table class="mr-2">
            <colgroup>
              <col span="1" style="width: 12%;">
              <col span="1" style="width: 12%;">
              <col span="1" style="width: 12%;">
              <col span="1" style="width: 60%;">
              <col span="1" style="width: 4%;">
            </colgroup>
            <tr>
              <th>Color Code</th>
              <th>Size</th>
              <th>Pirce</th>
              <th>Description</th>
              <th></th>
            </tr>
            <tr v-for="(productVarient, index) in product.productVarients" v-bind:key="productVarient.id">
              <td>
                <input
                  class="tbl_item_input"
                  type="text"
                  placeholder="Color"
                  v-model="productVarient.color"
                />
              </td>
              <td>
                <input
                  class="tbl_item_input"
                  type="text"
                  placeholder="Size"
                  v-model="productVarient.size"
                />
              </td>
              <td>
                <input
                  class="tbl_item_input"
                  type="text"
                  placeholder="Price"
                  v-model="productVarient.price"
                  @input="checkTablePrice(index)"
                />
              </td>
              <td>
                <input
                  class="tbl_item_input"
                  type="text"
                  placeholder="Description"
                  v-model="productVarient.description"
                />
              </td>
              <td style="cursor: pointer;" @click="removeProductVarient(index)">
                <hr style="border: 1px solid red">
              </td>
            </tr>
            <tr>
              <td>#dcdcdc</td>
              <td>Small</td>
              <td>$20</td>
              <td>this is the products descriptions.</td>
              <td style="cursor: pointer;">
                <hr style="border: 1px solid red">
              </td>
            </tr>
          </table>
          <span v-if="tablePriceValidation" class="form-error">{{ tablePriceValidation }}</span>
        </div>
        <p><span><strong>Add New Product Variants</strong></span></p>
        <div style="margin-bottom: 20px">
          <div class="flex-box">
            <input
              class="pr-var-mr"
              name="colorcode"
              type="text"
              placeholder="Color"
              :maxlength="maxlength.color"
              v-model="currentProductVarient.color"
            />
            <input
              class="pr-var-mr"
              name="size"
              type="text"
              placeholder="Size"
              :maxlength="maxlength.size"
              v-model="currentProductVarient.size"
            />
            <input
              class="pr-var-mr"
              name="price"
              type="number"
              placeholder="Price"
              v-model="currentProductVarient.price"
            />
          </div>
          <textarea 
            name="description"
            rows="3"
            placeholder="description"
            :maxlength="maxlength.description"
            v-model="currentProductVarient.description"
          ></textarea>
          <span v-if="varientPriceValidation" class="form-error">{{ varientPriceValidation }}</span>
          <div class="mr-2">
            <button style="width: 150px" class="btn btn-orange" @click="addProductVarient" >Add another varient</button>
          </div>
        </div>
        <div style="text-align: right; padding-bottom: 50px">
          <router-link to="/products" style="margin-right: 20px" class="btn btn-orange btn-mr">Cancel</router-link>
          <a class="btn btn-orange btn-mr">Add Product</a>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Product, ProductVarient } from '@/store/models/product';

export default defineComponent({
  name: 'AddEditProduct',
  data() {
    const productVarients: ProductVarient[] = [];
    return {
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
        unit: '',
        token: false,
        productVarients: productVarients
      },
      unitSelectOptions: '',
      addUnitsection: false,
      arrow: '▼',
      unitName: '',
      currentProductVarient: {
        color: '',
        size: '',
        price: '',
        description: ''
      },
      varientPriceValidation: '',
      tablePriceValidation: ''
    }
  },
  methods: {
    clearProductVarient: function () {
      this.currentProductVarient.color = '';
      this.currentProductVarient.size = '';
      this.currentProductVarient.price = '';
      this.currentProductVarient.description = '';
    },

    priceValidation: function (price: string) {
      let errorMessage = null;
      const _price = parseFloat(price);
      if (!_price && isNaN(_price)) {
        errorMessage = 'price is required';
      } 
      if (!isNaN(_price) &&  _price <= 0) {
        errorMessage = 'price should be greater than zero';
      }
      return errorMessage;
    },

    addProductVarient: function() {
      // validate data
      const validation: any = this.priceValidation(this.currentProductVarient.price);
      if (validation) {
        this.varientPriceValidation = validation;
        return;
      }
      this.varientPriceValidation = '';

      const singleProductVarient: ProductVarient = {
        color: this.currentProductVarient.color,
        size: this.currentProductVarient.size,
        price: this.currentProductVarient.price,
        description: this.currentProductVarient.description
      }

      this.product.productVarients.push(singleProductVarient);
      this.clearProductVarient();
    },

    removeProductVarient: function(index: number) {
      this.product.productVarients.splice(index, 1)
    },

    checkTablePrice: function (index: number) {
      const price = this.product.productVarients[index].price;
      this.tablePriceValidation = '';
      if (price) {
        const validation = this.priceValidation(price);
        if (validation) {
          this.tablePriceValidation = validation;
        }
      }
    },

    addProduct: function() {
      // validate data

      const unproxiedProductVarients = this.product.productVarients.map((item: ProductVarient) => item as ProductVarient);

      const currentProduct: Product = {
        name: this.product.name,
        bar_code: this.product.barcode,
        unit: parseFloat(this.product.unit),
        product_varients: unproxiedProductVarients
      };

      // submit to API call action from store

    },

    addUnit: function () {
      // call api and update unit list
    }
  }
});
</script>

<style lang="scss" scoped>
  #AddEditProduct {
    padding-left: 15%;
    padding-right: 15%;
    margin-top: 3%;
  }

  .pad-label {
    padding: 20px 20px 20px 0px;
  }

  .w100 {
    width: $w80;
  }

  textarea {
    width: 100%;
    padding: $input-pad;
    margin: 0;
    display: inline-block;
    border: none;
    box-sizing: border-box;
    outline-color: $primary-color;
    background-color: $input-background-color;
  }

  label {
    text-align: left;
  }

  .product_varient_box {
    overflow-y: auto;
    height: 180px;
  }
</style>