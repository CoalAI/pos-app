<template>
    <div id="AddEditProduct">
      <h1><span>Add</span> New Product</h1>
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
      <p><span><strong>Product Variants</strong></span></p>
      <table class="mr-2">
        <tr>
          <th>Color Code</th>
          <th>Size</th>
          <th>Pirce</th>
          <th>Description</th>
        </tr>
        <tr>
          <td>#dcdcdc</td>
          <td>Small</td>
          <td>$20</td>
          <td>this is the products descriptions.</td>
        </tr>
      </table>
      <p><span><strong>Add New Product Variants</strong></span></p>
      <form style="margin-bottom: 20px">
        <div class="flex-box">
          <input class="pr-var-mr" name="colorcode" type="text" placeholder="Color Code"/>
          <input class="pr-var-mr" name="size" type="text" placeholder="Size"/>
          <input class="pr-var-mr" name="price" type="text" placeholder="Price"/>
        </div>
        <textarea name="description" rows="3" placeholder="description"></textarea>
        <div class="mr-2">
          <a class="btn btn-orange" >Add another varient</a>
        </div>
      </form>

      <div style="text-align: right; padding-bottom: 50px">
        <router-link to="/products" style="margin-right: 20px" class="btn btn-orange btn-mr">Back to products</router-link>
        <a class="btn btn-orange btn-mr">Add Product</a>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import { useStore } from 'vuex'
// import { ActionTypes } from '@/store/modules/auth/actions'

export default defineComponent({
  name: 'AddEditProduct',
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
    width: 80px;
  }

  textarea {
    width: 100%;
    padding: 12px 20px;
    margin: 0;
    display: inline-block;
    border: none;
    box-sizing: border-box;
    outline-color: $primary-color;
    background-color: #f5f2f2;

     -webkit-box-shadow: 1px 1px 10px -1px $input-shadow-color;
    -moz-box-shadow: 1px 1px 10px -1px  $input-shadow-color;
    box-shadow: 1px 1px 10px -1px  $input-shadow-color;
  }

  label {
    text-align: left;
  }
</style>