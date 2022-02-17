<template>
  <div class="batch-container">
    <div class="diff-shadow">
      <div class="page-upper">
          <div>
            <router-link to="" class="btn batch-btn ab_btn btn-orange">Add Batch</router-link>
          </div>
          <div id="search-container">
            <form class="ab-form-pos">
              <input
                label="Username"
                name="username"
                type="text"
                placeholder="Search"
                class=""
                v-model="search"
                @input="searchProducts"
              />
              <button class="ab-pos btn-orange" @click="searchProducts">
                <svg id="White_search_icon" data-name="White search icon" xmlns="http://www.w3.org/2000/svg" width="13.049" height="13.048" viewBox="0 0 13.049 13.048">
                    <path id="Path_99" data-name="Path 99" d="M23.076,23.074a.816.816,0,0,1,1.154,0l3.14,3.14a.816.816,0,0,1-1.153,1.154l-3.14-3.14a.816.816,0,0,1,0-1.154Z" transform="translate(-14.56 -14.558)" fill="#fff" fill-rule="evenodd"/>
                    <path id="Path_100" data-name="Path 100" d="M5.3,9.786A4.485,4.485,0,1,0,.816,5.3,4.485,4.485,0,0,0,5.3,9.786ZM10.6,5.3A5.3,5.3,0,1,1,5.3,0a5.3,5.3,0,0,1,5.3,5.3Z" fill="#fff" fill-rule="evenodd"/>
                </svg>
              </button>
            </form>
          </div>
      </div>
      <div class="ab-mb-7">
        <table>
          <colgroup>
            <col span="1" style="width: 30%;">
            <col span="1" style="width: 7%;">
            <col span="1" style="width: 16%;">
            <col span="1" style="width: 10%;">
            <col span="1" style="width: 7%;">
            <col span="1" style="width: 30%;">
          </colgroup>

          <tr class="fr-row header">
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Manufactured Date</th>
            <th>Expiry Date</th>
            <th>In stock</th>
            <th>Action</th>
          </tr>

          <template v-for="product in products" v-bind:key="product.id">
            <template v-for="productVariant in product.product_variant" v-bind:key="productVariant.id">
              <tr class="fr-row content" v-for="productVariantBatch in productVariant.batch" v-bind:key="productVariantBatch.id">
                <td>{{product.name}}: {{productVariant.price}}</td>
                <td>{{productVariantBatch.quantity}}</td>
                <td>{{productVariantBatch.manufacturing_date}}</td>
                <td>{{productVariantBatch.expiry_date}}</td>
                <td>{{productVariantBatch.in_stock}}</td>
                <td>
                  <div class="flex-box">
                    <button
                      class="ab_btn btn-orange"
                      @click="openDeleteBatchModal(product.name + ': ' + productVariant.price, productVariantBatch)"
                    >Delete</button>
                    <router-link
                      :to="{
                        name: 'EditBatch',
                        params: {
                          productId: product.id,
                          productVariantId: productVariant.id,
                          batchId: productVariantBatch.id
                        }
                      }"
                      class="btn-blue">Edit</router-link>
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
          <p style="text-align: center;">Are you sure you want to delete this batch?</p>
          <template v-if="batch">
            <div class="delete-modal-body-container">
              <div class="upper">
                <div class="left">
                  <p>Product Name:</p>
                  <span>{{batch.productName}}</span>

                  <p>Manufactured Date:</p>
                  <span>{{batch.manufacturedDate}}</span>
                </div>
                <div class="right">
                  <p>Quantity:</p>
                  <span>{{batch.quantity}}</span>

                  <p>Expiry Date:</p>
                  <span>{{batch.expiryDate}}</span>
                </div>
              </div>
            </div>
            <!-- <table id="delete-table" class="mr-2">
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
            </table> -->
          </template>
        </template>

        <template v-slot:footer>
          <div class="delete-model-footer-container">
            <button class="ab_btn btn-orange delete-model-yes-btn" @click="deleteBatchYes">Yes</button>
            <button class="btn-blue" @click="closeDeleteBatchModal">Cancel</button>
          </div>
        </template>
      </Modal>

    </div>
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
      this.getProducts(this.search);
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
  // .btn-mr{
  //   margin: 10px;
  // }

  // .btn-mr-inner{
  //   margin: 1px 1px 1px 5px;
  // }

  // .pr-var-mr {
  //   margin: 10px;
  // }

  // #delete-table td {
  //   border: none;
  // }

  // #delete-table tr:nth-child(even) {
  //   background-color: $white-color;
  // }

  // ab css
  .batch-container{
    // padding: 2.65% 16%;
    max-width: 1140px;
    margin: 0 auto;
  }
  .diff-shadow{
    padding: 1.6% 5.5% 5.5% 5.5%;
  }
  .page-upper{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  #search-container{
    width: 50%;
  }
  .btn-blue{
    text-decoration: none;
    text-align: center;
    background-color:#0f2636;
    // font-family:seg;
    font-size: 12px;
    border-radius: 20px;
    // width: 135px;
    // padding:5px;
    padding: 8px 40px;
    cursor: pointer;
    color:$white-color;
    border:none;
    // font-weight:bold;
    // for this page
    width: 135px;
  }
  
  .ab_btn{
    color: $white-color;
    text-decoration: none;
    padding: 8px 22px;
    cursor: pointer;
    font-size: $btn-font-size;
    border:none;
    border-radius: 20px;
    // for this page
    width: 135px;
  }
  .ab-form-pos{
    position: relative;
    text-align: right;
    margin-right: 10px;
  }
  .ab-pos{
    position: absolute;
    width: 50px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    top:0px; 
    right: 0px;
    height: 40px;
    border: none;
    cursor: pointer;
  }
  .ab-mb-7{
    margin-top: 20px;
    margin-bottom: 70px;
  }
  #White_search_icon {
    fill: white;
    width: 24px;
    vertical-align: middle; 
    cursor: pointer;
    background-color: $primary-color;
  }
  #search-container > form > input{
    width: 80%;
    margin: 0;
    padding: 8px 70px 8px 20px;
    border-radius: 20px;
  }

  // table desgins
  .fr-row {
    font-size: 12px;
  }
  .header > th{
    text-align: center;
  }
  .header > th:first-child{
    border: none;
    border-radius: 10px 0px 0px 10px;
  }
  .header > th:last-child{
    border: none;
    border-radius: 0px 10px 10px 0px;
  }
  .header {
    border-radius: 5px;
    background-color: #0f2634; 
    color: white;
  }
  td > .flex-box{
    justify-content: space-around;
  }
  .content{
    background-color: white; 
    color: #0f2634;
  }
  .content > td{
    text-align: center;
  }
  .ab-mb-7{
    margin-bottom: 70px;
  }

  // delete model styles
  .modal-footer{
    justify-content: center;
  }
  .delete-model-yes-btn{
    width: 135px;
    margin-right: 20px;
  }
  .delete-model-footer-container{
    width: 100%;
    display: flex;
    justify-content: center;
  }

  // delete modal body designs
  .delete-modal-body-container p{
    display: inline-block;
    color: $primary-color;
  }
  .delete-modal-body-container > .upper{
    display: flex;
    justify-content: space-around;
    font-size: 15px;
    padding: 8px 0;
  }
  .delete-modal-body-container > .upper p{
    padding: 5px 0;
  }


</style>
