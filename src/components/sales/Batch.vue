<template>
  <div>
    <Header/>
    <div class="mr-2" style="padding-left: 10px">
        <a class="btn btn-orange btn-mr" v-on:click="openProductAddEditModal">Add New Batch</a>
    </div>
    <div class="mr-2 pad-2">
      <table>
        <tr>
          <th>Sr No.</th>
          <th>Product Name</th>
          <th>Quantity</th>
          <th>Manufactured Date</th>
          <th>Expiry Date</th>
          <th>In stock</th>
          <th></th>
        </tr>
        <tr>
          <td>1</td>
          <td>Sugar</td>
          <td>25</td>
          <td>12-02-2021</td>
          <td>12-02-2021</td>
          <td>Yes</td>
          <td style="width: 150px">
            <div class="flex-box">
              <a class="btn btn-orange btn-mr-inner" v-on:click="openModal">delete</a>
              <a class="btn btn-orange btn-mr-inner" v-on:click="openProductAddEditModal">edit</a>
            </div>
          </td>
        </tr>
        <tr>
          <td>1</td>
          <td>Sugar</td>
          <td>25</td>
          <td>12-02-2021</td>
          <td>12-02-2021</td>
          <td>Yes</td>
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
          <h2>Add New Batch</h2>
        </div>
        <div class="modal-body">
          <div class="flex-box">
            <label class="pad-label w100" for="products">
              <strong>Products:</strong>
            </label>

            <select name="products" class="custom-select" id="products">
              <option value="kg">Sugar</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
          </div>
          <div class="flex-box">
            <label class="pad-label w100" for="quantity">
              <strong>Quantity:</strong>
            </label>
            <input
              name="quantity"
              type="text"
              placeholder="Enter quantity"
            />
          </div>
          <div class="flex-box">
            <label class="pad-label w100" for="start">
              <strong>Manufactured date:</strong>
            </label>
            <input type="date" id="start" name="trip-start"
                  value="2018-07-22"
                  min="2018-01-01" max="2018-12-31">
          </div>
          <div class="flex-box">
            <label class="pad-label w100" for="start">
              <strong>Expiry date:</strong>
            </label>
            <input type="date" id="start" name="trip-start"
                  value="2018-07-22"
                  min="2018-01-01" max="2018-12-31">
          </div>
          <div class="flex-box">
              <label class="pad-label w100" for="in_stock">
                <strong>In Stock:</strong>
              </label>
              <input style="margin-top: 21px" type="checkbox" id="in_stock" name="in_stock">
            </div>
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

<script>
import Header from './Header.vue';

export default {
  name: 'Batch',
  components: {
    Header,
  },
  // define methods under the `methods` object
  methods: {
    openModal: (event) => {
      if (event) {
        // Get the modal
        const modal = document.getElementById('myModal');
        modal.style.display = 'block';
      }
    },
    closeModal: (event) => {
      if (event) {
        // Get the modal
        const modal = document.getElementById('myModal');
        modal.style.display = 'none';
      }
    },
    openProductAddEditModal: (event) => {
      if (event) {
        // Get the modal
        const modal = document.getElementById('productAddEditModal');
        modal.style.display = 'block';
      }
    },
    closeProductAddEditModal: (event) => {
      if (event) {
        // Get the modal
        const modal = document.getElementById('productAddEditModal');
        modal.style.display = 'none';
      }
    },
  },
};
</script>

<style scoped>
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
    background-color: #e73b2a;
    color: white;
  }

  .modal-body {padding: 2px 16px;}

  .modal-footer {
    padding: 2px 16px;
    background-color: #e73b2a;
    color: white;
  }

  .pad-label {
    padding:20px;
  }

  .w100 {
    width: 200px;
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
    outline-color: #e73b2a;
    background-color: #f5f2f2;

     -webkit-box-shadow: 1px 1px 10px -1px #423144;
    -moz-box-shadow: 1px 1px 10px -1px  #423144;
    box-shadow: 1px 1px 10px -1px  #423144;
  }
</style>
