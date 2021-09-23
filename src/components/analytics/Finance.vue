<template>
  <table>
    <colgroup>
      <col span="1" style="width: 50%;">
      <col span="1" style="width: 50%;">
    </colgroup>
    <tr>
      <td><strong>Total Orders</strong></td>
      <td>{{analytics.total_orders}}</td>
    </tr>
    <tr>
      <td><strong>Expense</strong></td>
      <td>PKR {{analytics.total_expense}}</td>
    </tr>
  </table>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
    name: 'FinanceAnaltyics',
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