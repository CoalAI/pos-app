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
      <div class="flex-box">
        <div class="date-container">
          <DateRange @dateRangeChange="setRange"  />
        </div>
        <div class="b" >
          <button class="btn btn-orange" @click="fetchAnalyticsBtn">Search</button>
        </div>
      </div>
      </div>
    <!-- commnet out -->
    <!-- <div class="flex-box">
      <DateRange @dateRangeChange="setRange"  />
      <div class="b" style="margin-left: 10px">
        <button class="btn btn-orange" @click="fetchAnalyticsBtn">Search</button>
      </div>
    </div> -->
    <!-- <div class="row">
      <div class="column">
        <h4>Total Order Received: {{analytics.total_orders}}</h4>
        <h4>Total Amount Received: {{analytics.total_orders_amount}}</h4>
      </div>
      <div class="column">
        <h4>Total Order Given: {{analytics.purchasing_orders}}</h4>
        <h4>Expense: {{analytics.total_expense}}</h4>
        <h4>Total Amount Given: {{analytics.purchasing_orders_amount}}</h4>
      </div>
    </div> -->
    <div id="print">
      <div id="header-section" style="display: none;">
          <div>
            <img class="img-responsive" :src="logoimg ? logoimg : src_img" alt="Rohi">
          </div>
        <div class="company-info">
          <p class="mb-5 pb-5" style="font-size: 16px;"><strong>{{userdata.company.company_name}}</strong></p>
          <p class="text-center">{{userdata.company.address}}</p>
          <p class="text-center">{{userdata.company.contact_number}}</p>
        </div>
      </div>
      <div id="date-section" class="mb-5 pt-5" style="display: none;">
        <p class="text-center">{{getCurrentTime()}}</p>
        <p class="text-center">{{getCurrentDate()}}</p>
      </div>
      <div class="stats">
        <div class="stat-row">
          <div>
            <span>Total Orders Received:</span>
            <span>{{analytics.total_orders}}</span>
          </div>
          <div>
            <span>Total Amount:</span>
            <span>{{analytics.total_orders_amount}}</span>
          </div>
          <div>
            <span>Total Order Given:</span>
            <span>{{analytics.purchasing_orders}}</span>
          </div>
        </div>
        <div class="stat-row-2">
          <div>
            <span>Expense:</span>
            <span>{{analytics.total_expense}}</span>
          </div>
          <div>
            <span>ExpenseTotal Amount Given:</span>
            <span>{{analytics.purchasing_orders_amount}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex-container">
    <button
        class="btn-orange btn mt-5"
        @click="printDiv('print', 'Profit Loss Report')"
        :disabled="submitOrderButton"
        ref="submitandprint"
        style="width:80px;margin-right:7px"
      >
        Print
    </button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import { mapActions, mapGetters } from 'vuex';

import DateRange from '@/components/common-components/DateRange.vue';
import { ActionTypes } from '@/store/modules/order/actions';
import { ActionTypes as AuthActionTypes } from '@/store/modules/auth/actions';
import printDiv from '@/utils/print';
export default defineComponent({
  name: 'ProfitLossReport',
  components: {
    DateRange,
  },
  data() {
    const date = new Date();
    const dateStr = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    return {
      src_img: require('@/assets/DefoultLogoAvatar-01.png'),
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
      logoimg: 'getLogoImg',

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
    },
    getCurrentTime(){
			return new Date().toLocaleTimeString();
		},

		getCurrentDate(){
			const current = new Date()
      return current.toLocaleDateString()
		},
    printDiv(div_id: string, title: string) {
      const styles = `
				<style lang="scss" scoped>	
				@page {
				size: 180mm;
				margin: 0
				}

				@body {
				margin-left: 5%;
				}

        .maindiv-print {
				padding: 4px;
				max-width: 800px;
				}

        .mb-5 {
				border-bottom: 2px solid black;
				padding-bottom: 5px;
				}

        .pt-5 {
				padding-top: 5px;
				}

        #date-section {
				display: grid !important;
				grid-template-columns: 1fr 2fr;
				grid-template-rows: 1fr;
				gap: 0.1em 0.1em;
				width:80mm;
				}
				.company-info{
				display: flex;
				flex-wrap: nowrap;
				flex-direction: column;
				align-content: center;
				justify-content: center;
				align-items: center;
				font-size: 12px;
				}
				#header-section {
				display: grid !important;
				grid-template-columns: 1fr 2fr;
				grid-template-rows: 1fr;
				gap: 0.1em 0.1em;
				width:80mm;
				}

				#order-items-section th {
				border: 1px solid;
				border-color: black;
				text-align: center;
				padding: 1px;
				}
				.img-responsive{
				max-width: 100%;
				height: auto;
				}

				.text-center{
				text-align: center
				}
        .tble-mt {
          text-align: center;
          margin: 20px 0;
        }
        .header > th {
          text-align: center;
        }
        .header > th:first-child {
          border: none;
          border-radius: 10px 0px 0px 10px;
        }
        .header > th:last-child {
          border: none;
          border-radius: 0px 10px 10px 0px;
        }
        .header {
          border-radius: 5px;
          background-color: #0f2634;
          color: white;
        }
        td > .flex-box {
          justify-content: space-around;
          align-items: center;
        }
        .fr-row {
          font-size: 12px;
        }
        .stats {
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
          margin-left: 1rem;
          margin-right: 1rem;
        }
        .stats > div > span:first-child {
          font-size: 15px;
          font-weight: 600;
          margin-right: 2px;
        }
        .stats > div > span:last-child {
          font-size: 15px;
          font-weight: 550;
          color: #e73b2a;
        }
        .labelCmp {
          padding: 20px;
        }
        .custom-select {
          width: 35%;
        }

				</style>
				`;
      printDiv(div_id, title, styles);
    },
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
.flex-container {
  display: flex;
  flex-direction: row-reverse;
}
.column {
  float: left;
  width: 45%;
  padding:2.5%
}
.row:after {
  content: "";
  display: table;
  clear: both;
}


/* ab css */
.ab-flex-box{
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
/* btn blue  */
.b{
  text-align: right;
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
.stats{
  margin-left: 1rem;
  margin-right: 1rem;
}
// stats designs
.stat-row{
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
}
.stat-row-2{
  margin-bottom: 20px;
  display: flex;
  // justify-content: space-between;
}
.stat-row-2 > div{
  width: 46%;
}
.stats div > span:first-child{
  font-size: 15px;
  font-weight: 600;
  margin-right: 2px;
}
.stats div > span:last-child{
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
