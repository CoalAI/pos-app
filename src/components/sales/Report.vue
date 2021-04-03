<template>
    <div class="diff-shadow">
      <h2>Reports</h2>
      <form>
        <div class="flex-box mr-2">
          <label class="pad-label" for="start_date">
            <strong>Start:</strong>
          </label>
          <input
            name="start_date"
            type="date"
          />
          <label class="pad-label" for="end_date">
            <strong>End:</strong>
          </label>
          <input
            name="end_date"
            type="date"
          />
          <button class="btn btn-orange"
          style="margin: 10px 60px 10px 60px">Search Report</button>
        </div>
      </form>
      <div class="report-main">
        <div style="border: 1px solid #000; height: 350px">
          <h1>Report Details Shown Here</h1>
        </div>
      </div>
      <div style="overflow:hidden">
        <button class="btn btn-orange"
          style="
          width: 250px;
          float: right;
          ">Print Report</button>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Report',
});
</script>

<style lang="scss" scoped>
</style>
