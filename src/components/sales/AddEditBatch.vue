<template>
    <div id="AddEditBatch">
      <h1><span>Add</span> New Batch</h1>
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

      <div style="text-align: right; padding-bottom: 50px">
        <router-link to="/batchs" style="margin-right: 20px" class="btn btn-orange btn-mr">Back to batches</router-link>
        <a class="btn btn-orange btn-mr">Add batch</a>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import { useStore } from 'vuex'
// import { ActionTypes } from '@/store/modules/auth/actions'

export default defineComponent({
  name: 'AddEditBatch',
});
</script>

<style lang="scss" scoped>
  #AddEditBatch {
    padding-left: 15%;
    padding-right: 15%;
    margin-top: 3%;
  }

  .pad-label {
    padding: 20px 20px 20px 0px;
  }

  .w100 {
    width: 150px;
  }

  label {
    text-align: left;
  }
</style>