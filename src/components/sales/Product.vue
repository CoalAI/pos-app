<template>
  <div class="diff-shadow pad-2">
    <h2>Products</h2>
    <div class="search-grid-list-pages">
        <router-link to="/product/create" class="btn btn-orange add-btn-width">Add New Product</router-link>
        <div class="float-right">
          <form class="flex-box">
            <input
              label="Username"
              name="username"
              type="text"
              placeholder="Enter product name or barcode to search"
              class="search-input"
              v-model="search"
              @input="searchProducts"
            />
            <button class="btn btn-orange search-btn">Search product</button>
          </form>
        </div>
    </div>
    <div class="mr-2">
      <table>
        <colgroup>
          <col span="1" style="width: 2%;">
          <col span="1" style="width: 20%;">
          <col span="1" style="width: 20%;">
          <col span="1" style="width: 14%;">
          <col span="1" style="width: 24%;">
          <col span="1" style="width: 20%;">
        </colgroup>

        <tr>
          <th>Sr No.</th>
          <th>Product Name</th>
          <th>Bar code</th>
          <th>Token</th>
          <th>Product Variants</th>
          <th></th>
        </tr>
        <template v-for="(product, index) in products" v-bind:key="product.id">
          <tr >
            <td>{{ index + 1 }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.bar_code }}</td>
            <td v-if="product.token">Yes</td><td v-else>No</td>
            <td>
              <table class="nested-table">
                <colgroup>
                  <col span="1" style="width: 40%;">
                  <col span="1" style="width: 30%;">
                  <col span="1" style="width: 30%;">
                </colgroup>

                <tr>
                  <th>Price</th>
                  <th>Size</th>
                  <th>Color</th>
                </tr>

                <tr v-for="productvarient in product.product_varient" v-bind:key="productvarient.id">
                  <td>{{ productvarient.price }}</td>
                  <td v-if="productvarient.size">{{productvarient.size}}</td><td v-else class="text-center">-</td>
                  <td v-if="productvarient.color">{{productvarient.color}}</td><td v-else class="text-center">-</td>
                </tr>
              </table>
            </td>
            <td style="width: 150px">
              <div class="flex-box">
                <a class="btn btn-orange btn-mr-inner" @click="OpenDeleteProductModal(product)">delete</a>
                <router-link :to="{name: 'EditProduct', params: {productId: product.id}}" class="btn btn-orange btn-mr-inner">edit</router-link>
              </div>
            </td>
          </tr>
        </template>
      </table>
    </div>

    <!-- The deletion Modal -->
    <Modal v-if="deleteProductModal">
      <template v-slot:header>
        <h2>Confirm Deletion</h2>
      </template>

      <template v-slot:body>
        <p style="padding: 8px"><strong>Are you sure you want to delete this product?</strong></p>
        <template v-if="deleteProduct">
          <table id="delete-table" class="mr-2">
            <tr>
              <td><strong>Name:</strong></td>
              <td>{{deleteProduct.name}}</td>
            </tr>
            <tr>
              <td><strong>BarCode:</strong></td>
              <td>{{deleteProduct.bar_code}}</td>
            </tr>
          </table>
        </template>
      </template>

      <template v-slot:footer>
        <div class="flex-box">
          <button class="btn btn-orange btn-mr" @click="deleteProductModal = false; deleteProduct = {};">Cancel</button>
          <button class="btn btn-orange btn-mr">Yes</button>
        </div>
      </template>
    </Modal>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Modal from '@/components/common-components/Modal.vue';
import { mapActions, mapGetters } from 'vuex';
import { ActionTypes } from '@/store/modules/order/actions';
import { Product } from '@/store/models/product';

export default defineComponent({
  name: 'Product',
  components: {
    Modal,
  },
  data() {
    const product: Product = {};
    return {
      search: '',
      deleteProductModal: false,
      deleteProduct : product
    }
  },
  computed: {
    ...mapGetters({
      products: 'getListOfProducts'
    })
  },
  // define methods under the `methods` object
  methods: {
    closeDeleteProductModal: function (id: string) {
      this.deleteProductModal = false;
      this.deleteProduct = {};
      // perform delete logic
    },

    OpenDeleteProductModal: function (product: Product) {
      this.deleteProductModal = true;
      this.deleteProduct = product;
    },

    searchProducts: function () {
      this.getProducts(this.search)
    },

    ...mapActions({
      getProducts: ActionTypes.GET_PRODUCTS
    })
  },
  beforeMount () {
    this.getProducts('');
  }
});
</script>

<style lang="scss" scoped>
  .btn-mr{
    margin: 10px;
  }

  .btn-mr-inner{
    margin: 1px 1px 1px 5px;
  }

  .pr-var-mr {
    margin: 10px;
  }

  #delete-table td {
    border: none;
  }
  #delete-table tr:nth-child(even) {
    background-color: $white-color;
  }

  .nested-table td {
    background-color: $white-color !important;
    padding: 3px;
  }

  .nested-table th {
    padding: 3px;
  }
</style>
