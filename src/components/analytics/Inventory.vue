<template>
  <table>
    <colgroup>
      <col span="1" style="width: 50%;">
      <col span="1" style="width: 50%;">
    </colgroup>
    <tr>
      <td><strong>Total Products</strong></td>
      <td>{{analytics.unique_products_count}}</td>
    </tr>
    <tr>
      <td><strong>Total Inventory Amount</strong></td>
      <td>PKR {{analytics.total_inventory_amount}}</td>
    </tr>
  </table>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'InventoryAnaltyics',
  computed: {
    ...mapGetters({
      analytics: 'getAnalytics',
    })
  }
})
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: none;
  text-align: left;
  padding: 20px;
}

tr:nth-child(even) {
  background-color: inherit;
}

tr:nth-child(odd) input {
  background-color: inherit;
}
</style>
