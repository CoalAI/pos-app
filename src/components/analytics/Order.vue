<template>
  <div>
    <div class="ab-flex-box">
      <div id="select-con">
        <label class="labelCmp" for="start_date">
          <strong>Company:</strong>
        </label>
        <div class="ab-select-container">
          <select
            id="company-type"
            name="company-type"
            class="custom-select"
            v-model="company"
            @change="fetchAnalyticsBtn"
            :disabled="!admin"
          >
            <option class="batches-op" v-for="company in companies" v-bind:key="company.id" v-bind:value="company.id">
              {{company.company_name}}
            </option>
          </select>
        </div>
      </div>
      <div class="d-flex">
        <div class="date-container">
          <DateRange @dateRangeChange="setRange"  />
        </div>
        <div class="b">
          <button class="btn btn-orange" @click="fetchAnalyticsBtn">Search</button>
        </div>
      </div>
    </div>
   
    <!-- commented out -->
    <!-- <div class="flex-box">
      <div class="b" style="margin-left: 10px">
        <button class="btn btn-orange" @click="fetchAnalyticsBtn">Search Analytics</button>
      </div>
    </div> -->
    <!-- <table>
      <colgroup>
        <col span="1" style="width: 50%;">
        <col span="1" style="width: 50%;">
      </colgroup>
      <tr>
        <td><strong>Total Orders</strong></td>
        <td>{{analytics.total_orders}}</td>
      </tr>
      <tr>
        <td><strong>Total Amount</strong></td>
        <td>PKR {{analytics.total_orders_amount}}</td>
      </tr>
      <tr>
        <td><strong>Expense</strong></td>
        <td>PKR {{analytics.total_expense}}</td>
      </tr>
    </table> -->
    <div class="stats">
      <div>
        <span>Total Orders:</span>
        <span>{{analytics.total_orders}}</span>
      </div>
      <div>
        <span>Total Amount:</span>
        <span>{{analytics.total_orders_amount}}</span>
      </div>
      <div>
        <span>Expenses:</span>
        <span>{{analytics.total_expense}}</span>
      </div>
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
  name: 'OrderAnaltyics',
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
      fetchAnalytics: ActionTypes.FETCH_ANALYTICS,
      fetchCompanies: AuthActionTypes.FETCH_ALL_COMPANIES,
      fetchUser: AuthActionTypes.USER_DATA,
    }),
    setRange(range: null | {startDate: Date; endDate: Date}) {
      if (range !== null) {
        this.startDate = range.startDate.toString();
        this.endDate = range.endDate.toString();
      }
    },
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
  },
})
</script>

<style lang="scss" scoped>
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

/* ab css */
.ab-flex-box{
  // display: flex;
  align-items: baseline;
}

/* upper left designs */
#select-con{
  display: flex;
  align-items: baseline;
}
#select-con > .ab-select-container{
  width: 100%;
}
#select-con > .ab-select-container > select{
  margin-left: 10px;
  /* padding: 8px 18px;
  border-radius: 10px;
  font-size: 12px; */
}
.date-container{
  display: flex;
}


/* btn search  */
.b{
  text-align: right;
  padding: 7px;
  margin-left: 1rem;
  width: 7rem;
}
.btn-blue{
  text-decoration: none;
  text-align: center;
  background-color:#0f2636;
  font-size: 12px;
  border-radius: 20px;
  padding: 6px 40px;
  cursor: pointer;
  color:$white-color;
  border: 1.5px solid #0f2636 !important;
}
.btn-blue:hover{
  color: #0f2636;
  background-color: white;
  border: 1.5px solid #0f2636;
}

// stats designs
.stats{
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  margin-left: 1rem;
  margin-right: 1rem;
}
.stats > div > span:first-child{
  font-size: 15px;
  font-weight: 600;
  margin-right: 2px;
}
.stats > div > span:last-child{
  font-size: 15px;
  font-weight: 550;
  color: #e73b2a;
}
.labelCmp{
  padding: 20px;
}
.custom-select{
  width: 35%;
}
</style>
