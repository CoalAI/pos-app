<template>
    <div id="AddEditProduct">
      <div class="diff-shadow">
        <h2>
          <span v-if="productId">Edit</span>
          <span v-else>Add New</span>
          <span>Product</span>
        </h2>
        <div class="flex-box">
          <label class="pad-label w100" for="name">
            <strong>Name:</strong>
          </label>
          <div style="width: 100%">
            <input
              name="name"
              type="text"
              placeholder="Enter product name"
              :maxlength="maxlength.name"
              v-model="product.name"
            />
            <span v-if="productNameValidation" class="form-error">{{ productNameValidation }}</span>
            <ErrorField v-if="fieldErrors.name" :errorField="fieldErrors.name"></ErrorField>
          </div>
        </div>
        <div class="flex-box">
          <label class="pad-label w100" for="barcode">
            <strong>Bar code:</strong>
          </label>
          <div style="width: 100%">
            <input
              name="barcode"
              type="text"
              placeholder="Enter product bar-code"
              :maxlength="maxlength.barcode"
              v-model="product.barcode"
            />
            <span v-if="productBarCodeValidation" class="form-error">{{productBarCodeValidation}}</span>
            <ErrorField v-if="fieldErrors.bar_code" :errorField="fieldErrors.bar_code"></ErrorField>
          </div>
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
            <option value="">No Unit</option>
            <option v-for="unit in units" v-bind:key="unit.id" v-bind:value="unit.id">
              {{ unit.name }}
            </option>
          </select>
        </div>
        <div class="flex-box">
          <label class="pad-label w100" for="token">
            <strong>Token Printing:</strong>
          </label>
          <input style="margin-top: 21px" type="checkbox" id="token" name="token" v-model="product.token">
        </div>
        <p><span><strong>Product Variants</strong></span></p>
        <div class="product_Variant_box">
          <table class="mr-2">
            <colgroup>
              <col span="1">
              <col span="1">
              <col span="1">
              <col span="1">
              <col span="1" style="width: 40%;">
              <col span="1" style="width: 4%;">
            </colgroup>
            <tr>
              <th>Color</th>
              <th>Size</th>
              <th>Price</th>
              <th>Sale Price</th>
              <th>Description</th>
              <th></th>
            </tr>
            <tr v-for="(productVariant, index) in product.productVariants" v-bind:key="productVariant.id">
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
              <td style="cursor: pointer;" @click="removeProductVariant(index)">
                <hr style="border: 1px solid red">
              </td>
            </tr>
          </table>
          <span v-if="tablePriceValidation" class="form-error">{{ tablePriceValidation }}.</span>
          <span v-if="updateDeleteLastVarient" class="form-error"> {{ updateDeleteLastVarient }}</span>
        </div>
        <p class="mr-2"><span><strong>Add New Product Variants</strong></span></p>
        <div style="margin-bottom: 20px">
          <div class="flex-box">
            <input
              class="pr-var-mr"
              name="colorcode"
              type="text"
              placeholder="Color"
              :maxlength="maxlength.color"
              v-model="currentProductVariant.color"
            />
            <input
              class="pr-var-mr"
              name="size"
              type="text"
              placeholder="Size"
              :maxlength="maxlength.size"
              v-model="currentProductVariant.size"
            />
            <input
              class="pr-var-mr"
              name="price"
              type="number"
              placeholder="Price"
              v-model="currentProductVariant.price"
            />
            <input
              class="pr-var-mr"
              name="sale_price"
              type="number"
              placeholder="Sale Price"
              v-model="currentProductVariant.sale_price"
            />
          </div>
          <textarea 
            name="description"
            rows="3"
            placeholder="description"
            :maxlength="maxlength.description"
            v-model="currentProductVariant.description"
          ></textarea>
          <span v-if="VariantPriceValidation" class="form-error">{{ VariantPriceValidation }}</span>
          <div class="mr-2">
            <button style="width: 150px" class="btn btn-orange" @click="addProductVariant" >Add another Variant</button>
          </div>
        </div>
        <p v-if="productVariantValidation" class="form-error">{{productVariantValidation}}</p>
        <div style="text-align: right; padding-bottom: 50px">
          <router-link
            to="/products"
            style="margin-right: 20px"
            class="btn btn-orange btn-mr btn-link"
          >Cancel</router-link>
          <button
            class="btn btn-orange btn-mr"
            style="width: 150px"
            :disabled="addEditBtn"
            @click="addUpdateProduct"
          >
            <span v-if="productId">Update</span>
            <span v-else>Add</span>
            <span> Product</span>
          </button>
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

    productNameValidation: function () {
      let errorMessage = null;
      if (this.product.name.length <= 0) {
        errorMessage = "Name is required"
      }
      return errorMessage;
    },

    productBarCodeValidation: function () {
      let errorMessage = null;
      if (this.product.barcode.length <= 0) {
        errorMessage = "Barcode is required"
      }
      return errorMessage;
    },

    productVariantValidation: function () {
      let errorMessage = null;
      if (this.product.productVariants.length <= 0) {
        errorMessage = "At least one product variant is required"
      }
      return errorMessage;
    },

    addEditBtn: function () {
      let disable = true;
      if ( this.product.productVariants.length > 0 &&
      this.productNameValidation === null &&
      this.productBarCodeValidation === null) {
        disable = false;
      }
      return disable
    },

    ...mapGetters({
      units: 'getUnits',
      getSignleProduct: 'getSignleProduct',
      fieldErrors: 'getFieldError',
    })
  },
  methods: {
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
        errorMessage = 'price is required';
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
          this.deleteProductVariant(deleteProductVariantID);
          this.updateDeleteLastVarient = '';
          this.product.productVariants.splice(index, 1);
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
        await this.updateProduct({
          productID: this.productId,
          product: currentProduct
        });
      } else {
        await this.createProduct(currentProduct);
      }
      if (Object.keys(this.fieldErrors).length === 0) {
        this.$router.push({name: 'Product'});
      } else {
        window.scrollTo(0,0);
      }
    },

    loadData: function (product: Product) {
      this.product.name = product.name ? product.name : '';
      this.product.barcode = product.bar_code ? product.bar_code : '';
      this.product.unit = product.unit && typeof product.unit !== 'number' && product.unit.id ? product.unit.id.toString() : '';
      this.product.token = product.token ? product.token : false;
      this.product.productVariants = product.product_variant ? product.product_variant : [];
    },

    ...mapActions({
      getUnits: ActionTypes.GET_UNITS,
      getProducts: ActionTypes.GET_PRODUCTS,
      createProduct: ActionTypes.CREATE_PRODUCT,
      updateProduct: ActionTypes.UPDATE_PRODUCT,
      deleteProductVariant: ActionTypes.DELETE_PRODUCT_Variant,
      setFieldError: ActionTypes.SET_FIELD_ERROR,
    })
  },
  async created () {
    await this.getUnits();
    await this.getProducts();
    if (this.productId) {
      await this.getProducts();
      const product_id = parseInt(this.productId);
      const product = isNaN(product_id) ? undefined : this.$store.getters.getSignleProduct(product_id);
      if (product) {
        this.loadData(product);
      }
      else {
        // Show 404 page on screen
        this.$router.push({name: 'notFound'});
      }
    }
  },
  async unmounted () {
    await this.setFieldError({});
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

  label {
    text-align: left;
  }

  .product_Variant_box {
    overflow-y: auto;
    height: 180px;
  }
</style>