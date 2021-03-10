<template>
  <div>
    <div class="product-container">
      <div class="box1">
        <div class="form-container">
          <label class="bc pad-label" for="barcode">
            <strong>Bar Code:</strong>
          </label>
          <input class="bc-i" type="text"
          placeholder="Bar code" name="barcode" />
          <!-- <a class="btn btn-orange btn-mr bc-b" v-on:click="openSelectProductModal">search</a> -->

          <label class="q pad-label" for="quantity">
            <strong>Quantity:</strong>
          </label>
          <input  class="q-i" type="text"
          placeholder="quantity" name="quantity"/>

          <label class="pn pad-label" for="productname">
            <strong>Product Name:</strong>
          </label>
          <input class="pn-i" type="text"
          placeholder="Product Name" name="productname"/>
          <!-- <a class="btn btn-orange btn-mr pn-b" v-on:click="openSelectProductModal">search</a> -->

          <label class="d pad-label" for="discount">
            <strong>Discount:</strong>
          </label>
          
          <input class="d-i" type="text"
          placeholder="discount" name="discount"/>
          
          <div class="ap">
            <button class="btn btn-orange ap">Add Product</button>
          </div>
        </div>
      </div>
      <div class="box2">
        <div class="pad-2">
          <p>Invoice no</p>
          <p>Date Time</p>
        </div>
      </div>
    </div>

    <div class="table-container" style="margin-top: 0;">
      <p style="margin-left: 20px"><strong>Product Results</strong></p>
      <p><strong>Order Items</strong></p>
    </div>

    <!-- Order Items table -->
    <div class="table-container">
      <div class="box2 box1-tab">
        <ul class="pr-s-r-ul">
          <li>
            <div class="shadow-box mr-all">
              <table class="pr-s-r-table">
                <tr>
                  <td>Product Name</td>
                  <td>#barcode</td>
                </tr>
                <tr>
                  <td>100 Rs</td>
                  <td class="out-of-stock">Out of Stock</td>
                </tr>
              </table>
            </div>
          </li>
          <li>
            <div class="shadow-box mr-all">
              <table class="pr-s-r-table">
                <tr>
                  <td>Product Name</td>
                  <td>#barcode</td>
                </tr>
                <tr>
                  <td>100 Rs</td>
                  <td class="out-of-stock">Out of Stock</td>
                </tr>
              </table>
            </div>
          </li>
          <li>
            <div class="shadow-box mr-all">
              <table class="pr-s-r-table">
                <tr>
                  <td>Product Name</td>
                  <td>#barcode</td>
                </tr>
                <tr>
                  <td>100 Rs</td>
                  <td class="out-of-stock">Out of Stock</td>
                </tr>
              </table>
            </div>
          </li>
          <li>
            <div class="shadow-box mr-all">
              <table class="pr-s-r-table">
                <tr>
                  <td>Product Name</td>
                  <td>#barcode</td>
                </tr>
                <tr>
                  <td>100 Rs</td>
                  <td class="out-of-stock">Out of Stock</td>
                </tr>
              </table>
            </div>
          </li>
          <li>
            <div class="shadow-box mr-all">
              <table class="pr-s-r-table">
                <tr>
                  <td>Product Name</td>
                  <td>#barcode</td>
                </tr>
                <tr>
                  <td>100 Rs</td>
                  <td class="out-of-stock">Out of Stock</td>
                </tr>
              </table>
            </div>
          </li>
        </ul>
      </div>
      <div class="box1-tab">
        <table style="width: 100%">
          <colgroup>
            <col span="1" style="width: 5%;">
            <col span="1" style="width: 20%;">
            <col span="1" style="width: 35%;">
            <col span="1" style="width: 10%;">
            <col span="1" style="width: 10%;">
            <col span="1" style="width: 7%;">
            <col span="1" style="width: 13%;">
          </colgroup>

          <tr>
            <th>Sr No.</th>
            <th>Bar Code</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Disc</th>
            <th>Total Price</th>
          </tr>
          <tr>
            <td>1</td>
            <td>3572937</td>
            <td>Germany</td>
            <td>2</td>
            <td>$3</td>
            <td>0.0</td>
            <td>$6</td>
          </tr>
          <tr>
            <td>1</td>
            <td>3572937</td>
            <td>Germany</td>
            <td>2</td>
            <td>$3</td>
            <td>0.0</td>
            <td>$6</td>
          </tr>
          <tr>
            <td>1</td>
            <td>3572937</td>
            <td>Germany</td>
            <td>2</td>
            <td>$3</td>
            <td>0.0</td>
            <td>$6</td>
          </tr>
          <tr>
            <td>1</td>
            <td>3572937</td>
            <td>Germany</td>
            <td>2</td>
            <td>$3</td>
            <td>0.0</td>
            <td>$6</td>
          </tr>
          <tr>
            <td>1</td>
            <td>3572937</td>
            <td>Germany</td>
            <td>2</td>
            <td>$3</td>
            <td>0.0</td>
            <td>$6</td>
          </tr>
          <tr>
            <td>1</td>
            <td>3572937</td>
            <td>Germany</td>
            <td>2</td>
            <td>$3</td>
            <td>0.0</td>
            <td>$6</td>
          </tr>
          <tr>
            <td>1</td>
            <td>3572937</td>
            <td>Germany</td>
            <td>2</td>
            <td>$3</td>
            <td>0.0</td>
            <td>$6</td>
          </tr>
          <tr>
            <td>1</td>
            <td>3572937</td>
            <td>Germany</td>
            <td>2</td>
            <td>$3</td>
            <td>0.0</td>
            <td>$6</td>
          </tr>
          <tr>
            <td>1</td>
            <td>3572937</td>
            <td>Germany</td>
            <td>2</td>
            <td>$3</td>
            <td>0.0</td>
            <td>$6</td>
          </tr>
        </table>
      </div>
    </div>

    <div style="padding: 20px 20px 0px 20px">
      <div class="flex-box">
        <p class="labl-txt"><strong>Payment method:</strong></p>
        <label class="custom-radio" style="margin-right: 10px">Cash
          <input type="radio" name="payment_method" value="cash">
          <span class="checkmark"></span>
        </label>
        <label class="custom-radio">Card
          <input type="radio" name="payment_method" value="card">
          <span class="checkmark"></span>
        </label>
      </div>
    </div>

    <!-- Payment Process -->
    <div class="payment-container" style="padding: 0px 20px 20px 20px">

      <div id="pay-box1" class="payment-container-inner">

        <div class="float-left flex-box">
          <label class="pad-label-side" for="total_discount">
            <strong>Total Discount:</strong>
          </label>
          <input type="text"
          placeholder="Discount on total bill"
          name="total_discount"/>
        </div>

        <div class="float-left flex-box">
          <label class="pad-label-side" for="barcode">
            <strong>Total Amount:</strong>
          </label>
          <input type="text"
          value="1000 RS"
          name="total_amount" readonly/>
        </div>

        <div class="float-left flex-box">
          <label class="pad-label-side" for="barcode">
            <strong>Cash Received:</strong>
          </label>
          <input type="text"
          placeholder="Enter Cash Received"
          name="cash_received"/>
        </div>

        <div class="float-left flex-box">
          <label class="pad-label-side" for="return">
            <strong>Cash Returned:</strong>
          </label>
          <input type="text"
          value="0 Rs"
          name="return" readonly/>
        </div>

      </div>
      <div id="pay-box2">
        <div class="float-left submit-btn">
          <button class="btn btn-orange">Submit and Print</button>
        </div>
        <div class="float-right submit-btn">
          <button class="btn btn-orange">Submit</button>
        </div>
        <div>
          <button class="btn btn-orange" @click="cancelModal = true">Cancel Order</button>
        </div>
      </div>
    </div>

    <Modal v-if="cancelModal">
      <template v-slot:header>
        <h2>Confirm Cancellation</h2>
      </template>

      <template v-slot:body>
        <p>Are you sure you want to cancel this order?</p>
      </template>

      <template v-slot:footer>
        <div class="flex-box">
          <button class="btn btn-orange btn-mr" @click="cancelModal = false">Cancel</button>
          <button class="btn btn-orange btn-mr">Yes</button>
        </div>
      </template>
    </Modal>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Modal from '@/components/common-components/Modal.vue';
// import { useStore } from 'vuex'
// import { ActionTypes } from '@/store/modules/auth/actions'

export default defineComponent({
  name: 'Order',
  components: {
    Modal,
  },
  data() {
    return {
      cancelModal: false
    }
  },
});
</script>

<style lang="scss" scoped>

  .product-container {
    margin-top:20px;
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 0.1em 0.1em;
  }

  .form-container {
    display: grid;
    grid-template-columns: 1fr 2fr 0.5fr 2fr 1.5fr;
    grid-template-rows: 1fr 1fr;
    gap: 0.1em 0.1em;
    grid-template-areas:
    "bc bc-i q q-i ap"
    "pn pn-i d d-i ap"
  }
  .bc { grid-area: bc;}
  .bc-i {grid-area: bc-i;}
  .q {grid-area: q;}
  .q-i {grid-area: q-i;}
  .pn {grid-area: pn;}
  .pn-i {grid-area: pn-i;}
  .d {grid-area: d;}
  .d-i {grid-area: d-i;}
  .ap {
    grid-area: ap;
    padding: 10px;
  }
  // .bc-b {grid-area: bc-b;}
  // .pn-b {grid-area: pn-b;}

  .pad-label {
    padding: 15px 5px;
    text-align: right;
  }

  .box2{
    padding: 0px 20px;
  }

  .table-container {
    // margin-top:20px;
    display: grid;
    grid-template-columns: 2fr 4.1fr;
    gap: 0.1em 0.1em;
  }

  .labl-txt{
    text-align: left;
    margin-top: 0px;
    padding: 0px 10px;
    font-size: 20px;
  }

  .box-inner-right{
    float: right;
    padding: 20px 20px 0px 20px;
  }
  .btn-mr{
    margin: 10px;
    text-align: center;
  }

  .submit-btn {
    width: 45%;
    margin: 6px;
  }

  .pad-2 {
    padding: 20px;
  }

  .box1-tab {
    overflow-y: auto;
    height: 350px;
  }

  .pad-label-side {
    padding: 15px 5px;
    text-align: right;
    width: 40%;
  }

  .payment-container {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 0.1em 0.1em;
  }

  .payment-container-inner {
    padding-right: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 0.1em 0.1em;
  }

  .pr-s-r-table {
    border: none;
  }

  .pr-s-r-table td {
    border: none;
  }

  .pr-s-r-table tr:nth-child(even) {
    background-color: $white-color;
  }

  .pr-s-r-ul {
    list-style-type: none;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0px;
  }

  .out-of-stock {
    color: $red-color;
  }

  .mr-all {
    margin: 2px 0px 13px 0px;
  }
</style>
