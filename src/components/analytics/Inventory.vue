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
    <thead>
      <tr>
        <th scope="col">Category</th>
        <th scope="col">Total Products</th>
        <th scope="col">Total Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, key) in analytics.category_stats" :key="key">
        <td>{{key}}</td>
        <td>{{item.quantity}}</td>
        <td>{{item.total_amount}}</td>
      </tr>
    </tbody>
  </table>
  <div class="analytics">
    <div>
      <b>
        Total Products:
      </b>
      {{analytics.unique_products_count}}
    </div>
    <div style="margin-right:100px">
      <b>
        Total Amount:
      </b>
      {{analytics.total_inventory_amount}}
    </div>
  </div>
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
.analytics{
  display: flex;
  justify-content: space-between;
  margin:15px
}
</style>
