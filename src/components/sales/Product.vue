<template>
  <div>
    <div class="pad-2" style="padding-left: 10px">
        <a class="btn btn-orange btn-mr" v-on:click="openProductAddEditModal">Add New Product</a>
        <div class="float-right">
          <form class="flex-box">
            <input
              label="Username"
              name="username"
              type="text"
              placeholder="Enter product name to search"
              class="order-search"
            />
            <button class="btn btn-orange order-search-btn">Search product</button>
          </form>
        </div>
    </div>
    <div class="mr-2 pad-2">
      <table>
        <tr>
          <th>Sr No.</th>
          <th>Bar code</th>
          <th>Name</th>
          <th></th>
        </tr>
        <tr>
          <td>1</td>
          <td>1294u9312</td>
          <td>Sugar</td>
          <td style="width: 150px">
            <div class="flex-box">
              <a class="btn btn-orange btn-mr-inner" v-on:click="openModal">delete</a>
              <a class="btn btn-orange btn-mr-inner" v-on:click="openProductAddEditModal">edit</a>
            </div>
          </td>
        </tr>
        <tr>
          <td>1</td>
          <td>1294u9312</td>
          <td>Sugar</td>
          <td style="width: 150px">
            <div class="flex-box">
              <a class="btn btn-orange btn-mr-inner" v-on:click="openModal">delete</a>
              <a class="btn btn-orange btn-mr-inner" v-on:click="openProductAddEditModal">edit</a>
            </div>
          </td>
        </tr>
      </table>
    </div>

    <!-- The deletion Modal -->
    <div id="myModal" class="modal">

      <!-- Modal content -->
      <div class="modal-content">
        <div class="modal-header">
          <span class="close" v-on:click="closeModal">&times;</span>
          <h2>Confirm deletion</h2>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete this product?</p>
          <div class="flex-box">
            <a class="btn btn-orange btn-mr" v-on:click="closeModal">Cancel</a>
            <a class="btn btn-orange btn-mr">Yes</a>
          </div>
        </div>
      </div>

    </div>

    <!-- The Add/edit Modal -->
    <div id="productAddEditModal" class="modal">

      <!-- Modal content -->
      <div class="modal-content">
        <div class="modal-header">
          <span class="close" v-on:click="closeProductAddEditModal">&times;</span>
          <h2>Add New Product</h2>
        </div>
        <div class="modal-body" style="overflow-y: auto;height: 400px;">
            <div class="flex-box">
              <label class="pad-label w100" for="name">
                <strong>Name:</strong>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Enter product name"
              />
            </div>
            <div class="flex-box">
              <label class="pad-label w100" for="barcode">
                <strong>Bar code:</strong>
              </label>
              <input
                name="barcode"
                type="text"
                placeholder="Enter product bar-code"
              />
            </div>
            <div class="flex-box">
              <label class="pad-label w100" for="unit">
                <strong>Unit:</strong>
              </label>

              <select name="cars" class="custom-select" id="unit">
                <option value="kg">Kg</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
              </select>
            </div>
            <table class="mr-2">
              <tr>
                <th>Color Code</th>
                <th>Size</th>
                <th>Pirce</th>
              </tr>
              <tr>
                <td>#dcdcdc</td>
                <td>Small</td>
                <td>$20</td>
              </tr>
            </table>
            <form style="margin-bottom: 20px">
              <div class="flex-box mr-2">
                <input class="pr-var-mr" name="colorcode" type="text" placeholder="Color Code"/>
                <input class="pr-var-mr" name="size" type="text" placeholder="size"/>
                <input class="pr-var-mr" name="price" type="text" placeholder="price"/>
              </div>
              <textarea name="description" rows="3" placeholder="description"></textarea>
              <a class="btn btn-orange btn-mr" >Add another varient</a>
            </form>
        </div>
        <div class="modal-footer">
          <div class="flex-box">
            <a class="btn btn-orange btn-mr" v-on:click="closeProductAddEditModal">Cancel</a>
            <a class="btn btn-orange btn-mr">Add</a>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import { useStore } from 'vuex'
// import { ActionTypes } from '@/store/modules/auth/actions'

export default defineComponent({
  name: 'Product',
  // define methods under the `methods` object
  methods: {
    openModal: (event: Event) => {
      if (event) {
        // Get the modal
        const modal = document.getElementById('myModal');
        modal!.style.display = 'block';
      }
    },
    closeModal: (event: Event) => {
      if (event) {
        // Get the modal
        const modal = document.getElementById('myModal');
        modal!.style.display = 'none';
      }
    },
    openProductAddEditModal: (event: Event) => {
      if (event) {
        // Get the modal
        const modal = document.getElementById('productAddEditModal');
        modal!.style.display = 'block';
      }
    },
    closeProductAddEditModal: (event: Event) => {
      if (event) {
        // Get the modal
        const modal = document.getElementById('productAddEditModal');
        modal!.style.display = 'none';
      }
    },
  },
});
</script>

<style lang="scss" scoped>
  .btn-mr{
    margin: 10px;
    text-align: center;
  }

  table {
    border: 1px solid #dddddd;
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td, th {
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
  }

  .pad-2 {
    padding: 20px;
  }

  .btn-mr-inner{
    margin: 1px 1px 1px 5px;
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

  .pad-label {
    padding:20px;
  }

  .w100 {
    width: 80px;
  }

  .pr-var-mr {
    margin: 10px;
  }

  textarea {
    width: 95%;
    padding: 12px 20px;
    margin: 8px;
    display: inline-block;
    border: none;
    box-sizing: border-box;
    outline-color: $primary-color;
    background-color: #f5f2f2;

     -webkit-box-shadow: 1px 1px 10px -1px #423144;
    -moz-box-shadow: 1px 1px 10px -1px  #423144;
    box-shadow: 1px 1px 10px -1px  #423144;
  }

  .order-search {
    width: 80%;
  }

  .order-search-btn {
    width: 20%
  }
</style>
