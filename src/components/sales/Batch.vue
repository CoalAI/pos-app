<template>
  <div class="diff-shadow">
    <h2>Batches</h2>
    <div class="search-grid-list-pages">
        <router-link to="/batch/create" class="btn btn-orange add-btn-width">Add New Batch</router-link>
        <div class="float-right">
          <form class="flex-box">
            <input
              label="Username"
              name="username"
              type="text"
              placeholder="Enter product name to search"
              class="search-input"
              v-model="search"
              @input="searchProducts"
            />
            <button class="btn btn-orange search-btn" @click="searchProducts">Search batch</button>
          </form>
        </div>
    </div>
    <div class="mr-2">
      <table>
        <colgroup>
          <col span="1" style="width: 5%;">
          <col span="1" style="width: 35%;">
          <col span="1" style="width: 10%;">
          <col span="1" style="width: 10%;">
          <col span="1" style="width: 10%;">
          <col span="1" style="width: 10%;">
          <col span="1" style="width: 20%;">
        </colgroup>

        <tr>
          <th>Sr No.</th>
          <th>Product Name</th>
          <th>Quantity</th>
          <th>Manufactured Date</th>
          <th>Expiry Date</th>
          <th>In stock</th>
          <th></th>
        </tr>

        <template v-for="(product, index) in products" v-bind:key="product.id">
          <template v-for="productVariant in product.product_variant" v-bind:key="productVariant.id">
            <tr v-for="productVariantBatch in productVariant.batch" v-bind:key="productVariantBatch.id">
              <td>{{index}}</td>
              <td>{{product.name}}: {{productVariant.price}}</td>
              <td>{{productVariantBatch.quantity}}</td>
              <td>{{productVariantBatch.manufacturing_date}}</td>
              <td>{{productVariantBatch.expiry_date}}</td>
              <td>{{productVariantBatch.in_stock}}</td>
              <td style="width: 150px">
                <div class="flex-box">
                  <button
                    class="btn btn-orange btn-mr-inner"
                    @click="openDeleteBatchModal(product.name + ': ' + productVariant.price, productVariantBatch)"
                  >delete</button>
                  <router-link
                    :to="{
                      name: 'EditBatch',
                      params: {
                        productId: product.id,
                        productVariantId: productVariant.id,
                        batchId: productVariantBatch.id
                      }
                    }"
                    class="btn btn-orange btn-mr-inner">edit</router-link>
                </div>
              </td>
            </tr>
          </template>
        </template>
      </table>
    </div>

    <!-- The deletion Modal -->
    <Modal v-if="deleteBatchModal">
      <template v-slot:header>
        <h2>Confirm Deletion</h2>
      </template>

      <template v-slot:body>
        <p>Are you sure you want to delete this batch?</p>
        <template v-if="batch">
          <table id="delete-table" class="mr-2">
            <tr>
              <td><strong>Product Name:</strong></td>
              <td>{{batch.productName}}</td>
            </tr>
            <tr>
              <td><strong>Quantity:</strong></td>
              <td>{{batch.quantity}}</td>
            </tr>
            <tr>
              <td><strong>Manufactured Date:</strong></td>
              <td>{{batch.manufacturedDate}}</td>
            </tr>
            <tr>
              <td><strong>Expiry Date:</strong></td>
              <td>{{batch.expiryDate}}</td>
            </tr>
          </table>
        </template>
      </template>

      <template v-slot:footer>
        <div class="flex-box">
          <button class="btn btn-orange btn-mr" @click="closeDeleteBatchModal">Cancel</button>
          <button class="btn btn-orange btn-mr" @click="deleteBatchYes">Yes</button>
        </div>
      </template>
    </Modal>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

import { ActionTypes } from '@/store/modules/order/actions';
import Modal from '@/components/common-components/Modal.vue';
import { Batch } from '@/store/models/batch';

export default defineComponent({
  name: 'Batch',
  components: {
    Modal,
  },
  data() {
    return {
      deleteBatchModal: false,
      search: '',
      batch: {
        id: 0,
        productName: '',
        quantity: '',
        manufacturedDate: '',
        expiryDate: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      products: 'getListOfProducts'
    })
  },
  // define methods under the `methods` object
  methods: {
    clearDeleteBatch: function () {
      this.batch.id = 0;
      this.batch.productName = '';
      this.batch.quantity = '';
      this.batch.manufacturedDate = '';
      this.batch.expiryDate = '';
    },

    closeDeleteBatchModal: function () {
      this.deleteBatchModal = false;
      this.clearDeleteBatch();
    },

    openDeleteBatchModal: function (productName: string, batch: Batch) {
      this.deleteBatchModal = true;
      this.batch.id = batch && batch.id ? batch.id : 0;
      this.batch.productName = productName ? productName : '';
      this.batch.quantity = batch && batch.quantity ? batch.quantity : '';
      this.batch.manufacturedDate = batch && batch.manufacturing_date ? batch.manufacturing_date : '';
      this.batch.expiryDate = batch && batch.expiry_date ? batch.expiry_date : '';
    },

    deleteBatchYes: async function () {
      if (this.batch && this.batch.id) {
        await this.deleteBatch(this.batch.id.toString());
        await this.getProducts();
        this.deleteBatchModal = false;
        this.clearDeleteBatch();
      }
    },

    searchProducts: function (event: Event) {
      if (event) {
        event.preventDefault()
      }
      this.getProducts(this.search)
    },

    ...mapActions({
      getProducts: ActionTypes.GET_PRODUCTS,
      deleteBatch: ActionTypes.DELETE_BATCH
    })
  },
  async beforeMount () {
    await this.getProducts('');
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
</style>
