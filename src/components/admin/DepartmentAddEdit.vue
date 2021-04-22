<template>
    <div id="AddEditdepartment">
      <div class="diff-shadow">
        <h2><span>Add</span> New Department (To Be Implemented)</h2>
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
          <label class="pad-label w100" for="products">
            <strong>Type:</strong>
          </label>

          <select name="products" class="custom-select" id="products">
            <option>Store</option>
            <option>Factory</option>
            <option>Retail</option>
          </select>
        </div>

        <div style="text-align: right; padding-bottom: 50px">
          <router-link to="/departments" style="margin-right: 20px" class="btn btn-orange btn-mr">Cancel</router-link>
          <a class="btn btn-orange btn-mr">Add department</a>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DepartmentAddEdit',
});
</script>

<style lang="scss" scoped>
  #AddEditdepartment {
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