<template>
  <div>
    <div class="table-container">
      <div class="box1">
        <div class="form-container">
          <label class="bc pad-label" for="barcode">
            <strong>Bar Code:</strong>
          </label>
          <input class="bc-i" type="text"
          placeholder="Bar code" name="barcode" />
          <a class="btn btn-orange btn-mr bc-b" v-on:click="openSelectProductModal">search</a>

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
          <a class="btn btn-orange btn-mr pn-b" v-on:click="openSelectProductModal">search</a>

          <label class="d pad-label" for="discount">
            <strong>Discount:</strong>
          </label>
          <input class="d-i" type="text"
          placeholder="discount" name="discount"/>
        </div>
      </div>
      <div class="box2">
        <div class="pad-2">
          <button class="btn btn-orange">Add Product</button>
        </div>
      </div>
    </div>
    <div class="table-container">
      <div class="box1-tab">
        <table>
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
      <div class="box2">
        <div class="float-left">
          <p class="labl-txt"><strong>Payment method</strong></p>
          <input type="radio" id="male" name="payment_method" value="cash">
          <label for="cash">Cash</label><br>
          <input type="radio" id="female" name="payment_method" value="card">
          <label for="card">Card</label><br>
        </div>
        <div class="box-inner-right">
         <p>Invoice no</p>
         <p>Date Time</p>
        </div>
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
        <div class="float-left submit-btn">
          <button class="btn btn-orange">Submit and Print</button>
        </div>
        <div class="float-right submit-btn">
          <button class="btn btn-orange">Submit</button>
        </div>
        <div>
          <button class="btn btn-orange" v-on:click="openModal">Cancel Order</button>
        </div>
      </div>
    </div>

    <!-- The Modal -->
    <div id="cancelOrderModal" class="modal">

      <!-- Modal content -->
      <div class="modal-content">
        <div class="modal-header">
          <span class="close" v-on:click="closeModal">&times;</span>
          <h2>Confirm Cancellation</h2>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to cancel this order?</p>
          <div class="flex-box">
            <a class="btn btn-orange btn-mr" v-on:click="closeModal">Cancel</a>
            <a class="btn btn-orange btn-mr">Yes</a>
          </div>
        </div>
      </div>

    </div>

    <!-- The Modal -->
    <div id="selectProductModal" class="modal">

      <!-- Modal content -->
      <div class="modal-content">
        <div class="modal-header">
          <span class="close" v-on:click="closeModal">&times;</span>
          <h2>Select Product to add</h2>
        </div>
        <div class="modal-body pad-2">

          <table id="customers">
            <tr>
              <th>Sr No.</th>
              <th>Bar code</th>
              <th>Name</th>
              <th>Price</th>
              <th>Select</th>
            </tr>
            <tr>
              <td>1</td>
              <td>1294u9312</td>
              <td>Sugar</td>
              <td>$2</td>
              <td><input type="radio" id="male" name="payment_method" value="cash"></td>
            </tr>
            <tr>
              <td>1</td>
              <td>1294u9312</td>
              <td>Sugar</td>
              <td>$2</td>
              <td><input type="radio" id="male" name="payment_method" value="cash"></td>
            </tr>
          </table>

          <div class="flex-box">
            <a class="btn btn-orange btn-mr" v-on:click="closeSelectProductModal">Cancel</a>
            <a class="btn btn-orange btn-mr">Confirm</a>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import { useStore } from 'vuex'
// import { ActionTypes } from '@/store/modules/auth/actions'

export default defineComponent({
  name: 'Order',
  // define methods under the `methods` object
  methods: {
    openModal: (event: Event) => {
      if (event) {
        // Get the modal
        const modal = document.getElementById('cancelOrderModal');
        modal!.style.display = 'block';
      }
    },
    closeModal: (event: Event) => {
      if (event) {
        // Get the modal
        const modal = document.getElementById('cancelOrderModal');
        modal!.style.display = 'none';
      }
    },
    openSelectProductModal: (event: Event) => {
      if (event) {
        // Get the modal
        const modal = document.getElementById('selectProductModal');
        modal!.style.display = 'block';
      }
    },
    closeSelectProductModal: (event: Event) => {
      if (event) {
        // Get the modal
        const modal = document.getElementById('selectProductModal');
        modal!.style.display = 'none';
      }
    },
  },
});
</script>

<style lang="scss" scoped>
  .form-container {
    display: grid;
    grid-template-columns: 1fr 2.5fr 0.5fr 1fr 2fr;
    grid-template-rows: 1fr 1fr;
    gap: 0.1em 0.1em;
    grid-template-areas:
    "bc bc-i bc-b q q-i"
    "pn pn-i pn-b d d-i"
  }
  .bc { grid-area: bc;}
  .bc-i {grid-area: bc-i;}
  .q {grid-area: q;}
  .q-i {grid-area: q-i;}
  .pn {grid-area: pn;}
  .pn-i {grid-area: pn-i;}
  .d {grid-area: d;}
  .d-i {grid-area: d-i;}
  .bc-b {grid-area: bc-b;}
  .pn-b {grid-area: pn-b;}

  .pad-label {
    padding: 15px 5px;
    text-align: right;
  }

  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
  }

  .table-container {
    margin-top:20px;
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 0.1em 0.1em;
    /* grid-template-areas: */
  }
  .box2{
    padding: 0px 20px;
  }
  .labl-txt{
    text-align: left;
    margin-top:0px ;
  }
  .box-inner-right{
    float: right;
    padding: 20px 20px 0px 20px;
  }
  .btn-mr{
    margin: 10px;
    text-align: center;
  }

  /* The Modal (background) */
  .modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  }

  /* Modal Content */
  .modal-content {
    position: relative;
    background-color: #fefefe;
    margin: auto;
    padding: 0;
    border: 1px solid #888;
    width: 40%;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
    -webkit-animation-name: animatetop;
    -webkit-animation-duration: 0.4s;
    animation-name: animatetop;
    animation-duration: 0.4s
  }

  /* Add Animation */
  @-webkit-keyframes animatetop {
    from {top:-300px; opacity:0}
    to {top:0; opacity:1}
  }

  @keyframes animatetop {
    from {top:-300px; opacity:0}
    to {top:0; opacity:1}
  }

  /* The Close Button */
  .close {
    color: white;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }

  .modal-header {
    padding: 2px 16px;
    background-color: $primary-color;
    color: white;
  }

  .modal-body {padding: 2px 16px;}

  .modal-footer {
    padding: 2px 16px;
    background-color: $primary-color;
    color: white;
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
    text-align: left;
    width: 40%;
  }

</style>
