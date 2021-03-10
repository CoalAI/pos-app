<template>
  <div id="AddEditUser">
    <h1><span>Add</span> New User</h1>
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
      <label class="pad-label w100" for="unit">
        <strong>Role:</strong>
      </label>

      <select name="cars" class="custom-select" id="unit">
        <option value="kg">Manager</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
    </div>
    <div class="flex-box">
      <label class="pad-label w100" for="unit">
        <strong>Company:</strong>
      </label>

      <select name="cars" class="custom-select" id="unit">
        <option value="kg">Rohi</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
    </div>
    <div class="flex-box">
      <label class="pad-label w100" for="barcode">
        <strong>Contact Number:</strong>
      </label>
      <input
        name="barcode"
        type="text"
        placeholder="Enter contact number"
      />
    </div>

    <div class="mr-2" style="text-align: right; padding-bottom: 50px">
      <router-link to="/users" style="margin-right: 20px" class="btn btn-orange btn-mr">Back to users</router-link>
      <a class="btn btn-orange btn-mr">Add User</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AddEditUser',
});
</script>

<style lang="scss" scoped>
  #AddEditUser {
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