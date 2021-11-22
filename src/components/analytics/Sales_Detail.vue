<template>
  <div>
    <div class="flex-box">
      <label class="pad-label ls" for="start_date">
        <strong>Department:</strong>
      </label>
      <select
        id="company-type"
        name="company-type"
        class="custom-select"
        style="width: 30%"
        v-model="company"
        @change="fetchSalesanalyticsBtn"
        :disabled="!admin"
      >
        <option class="batches-op" v-for="company in companies" v-bind:key="company.id" v-bind:value="company.id">
          {{company.company_name}}
        </option>
      </select>
    </div>
    <div class="flex-box">
      <DateRange @dateRangeChange="setRange"  />
      <div class="b" style="margin-left: 10px">
        <button class="btn btn-orange" @click="fetchSalesanalyticsBtn">Search</button>
      </div>
    </div>
    <table class="marginTop">
    <thead>
      <tr>
        <th scope="col">User Name</th>
        <th scope="col">User Type</th>
        <th scope="col">Total Orders</th>
        <th scope="col">Total Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="data in salesanalytics.result" :key="data">
        <td>{{data.username}}</td>
        <td>{{data.user_type}}</td>
        <td>{{data.order_count}}</td>
        <td>{{data.total_amount}}</td>
      </tr>
    </tbody>
  </table>
  <div class="flex-container marginTop">
    <button class="btn btn-orange" style="width:80px">Print</button>
  </div> 
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import { mapActions, mapGetters } from 'vuex';

import DateRange from '@/components/common-components/DateRange.vue';
import { ActionTypes } from '@/store/modules/order/actions';
import { ActionTypes as AuthActionTypes } from '@/store/modules/auth/actions';

export default defineComponent({
  name: 'OperatorSalesDetail',
  components: {
    DateRange,
  },
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
      salesanalytics: 'getSalesanalytics',
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
    dateValidation: function(): string | null {
      if(this.startDate !== undefined && this.endDate !== undefined && 
        this.startDate !=='' && this.endDate !== '' &&
        Date.parse(this.startDate) <= Date.parse(this.endDate)
      ){
        return null;
      }
      return 'invalid date range';
    },
  },
  methods: {
    ...mapActions({
      fetchSalesanalytics: ActionTypes.FETCH_SALESANALYTICS,
      fetchCompanies: AuthActionTypes.FETCH_ALL_COMPANIES,
      fetchUser: AuthActionTypes.USER_DATA,
    }),
    setRange(range: null | {startDate: Date; endDate: Date}) {
      if (range !== null) {
        this.startDate = range.startDate.toString();
        this.endDate = range.endDate.toString();
      }
    },
    async fetchSalesanalyticsBtn() {
      await this.fetchSalesanalytics({
        start_date: this.startDate,
        end_date: this.endDate,
        company: this.company,
      });
    }
  },
  async mounted() {
    await this.fetchUser();
    await this.fetchCompanies();
    await this.fetchSalesanalyticsBtn();
    this.company = this.userdata.company.id;
  },
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
.flex-container {
  display: flex;
  flex-direction: row-reverse;
}
</style>
