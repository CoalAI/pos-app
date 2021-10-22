<template>
  <div class="flex-box">
    <label class="pad-label ls" for="start_date">
      <strong>Company:</strong>
    </label>
    <select
      id="company-type"
      name="company-type"
      class="custom-select"
      style="width: 30%"
      v-model="company"
      @change="fetchAnalyticsBtn"
      :disabled="!admin"
    >
      <option class="batches-op" v-for="company in companies" v-bind:key="company.id" v-bind:value="company.id">
        {{company.company_name}}
      </option>
    </select>
  </div>
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
import { mapGetters, mapActions } from 'vuex';
import { ActionTypes } from '@/store/modules/order/actions';
import { ActionTypes as AuthActionTypes } from '@/store/modules/auth/actions';

export default defineComponent({
  name: 'InventoryAnaltyics',
  data() {
    const date = new Date();
    const dateStr = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    return {
      startDate: dateStr,
      endDate: dateStr,
      company: 0,
    };
  },
  computed: {
    ...mapGetters({
      analytics: 'getAnalytics',
      companies: 'getInventoryCompanies',
      userdata: 'getUser',
    }),
    admin(){
      const allowedRoles = ['SUPER_ADMIN', 'ADMIN'];
      const allowedCompanies = ['PARENT', 'STORE'];
      if(this.userdata != null && allowedRoles.includes(this.userdata.user_type)
        && allowedCompanies.includes(this.userdata.company.company_type) 
      ){
        return true;
      }
      return false;
    },
  },
  methods: {
    ...mapActions({
      fetchAnalytics: ActionTypes.FETCH_ANALYTICS,
      fetchCompanies: AuthActionTypes.FETCH_ALL_COMPANIES,
      fetchUser: AuthActionTypes.USER_DATA,
    }),
    async fetchAnalyticsBtn() {
      await this.fetchAnalytics({
        start_date: this.startDate,
        end_date: this.endDate,
        company: this.company,
      });
    }
  },
  async mounted() {
    await this.fetchUser();
    await this.fetchCompanies();
    await this.fetchAnalyticsBtn();
    this.company = this.userdata.company.id;
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
