<template>
    <div id="AddEditVendor">
      <div class="diff-shadow">
        <h2><span>Add</span> New Vendor</h2>
        <div class="flex-box">
          <label class="pad-label w100" for="quantity">
            <strong>Name:</strong>
          </label>
          <input
            name="quantity"
            type="text"
            placeholder="Enter Name"
          />
        </div>
        <div class="flex-box">
          <label class="pad-label w100" for="quantity">
            <strong>Contact Number:</strong>
          </label>
          <input
            name="quantity"
            type="text"
            placeholder="Enter contact"
          />
        </div>

        <div style="text-align: right; padding-bottom: 50px">
          <router-link to="/Vendors" style="margin-right: 20px" class="btn btn-orange btn-mr">Cancel</router-link>
          <a class="btn btn-orange btn-mr">Add Vendor</a>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'VendorAddEdit',
});
</script>

<style lang="scss" scoped>
  #AddEditVendor {
    padding-left: 15%;
    padding-right: 15%;
    margin-top: 3%;
  }

  .pad-label {
    padding: 20px 20px 20px 0px;
  }

  .w100 {
    width: $w150;
  }

  label {
    text-align: left;
  }
</style>