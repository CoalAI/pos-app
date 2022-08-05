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
        v-model="company"
        :disabled="!admin"
      >
        <option class="batches-op" v-for="company in companies" v-bind:key="company.id" v-bind:value="company.id">
          {{company.company_name}}
        </option>
      </select>
      
      <div class="b">
        <button class="btn btn-orange" @click="fetchAnalyticsComparisonBtn()">Search</button>
      </div>
     
    </div>
    <div class="container d-flex" id="print">
      <PrintHeader />
      <img src="" alt="graph" id="graph-img">
      
      <BarChart :chartData="chartData" :options="options" style="height: 322px;width: 691px;"/>
    </div>
    <div class="flex-container">
      <button
          class="btn-orange btn mt-5"
          @click="printBill('print', 'Comparison Expense Sales')"
          :disabled="submitOrderButton"
          ref="submitandprint"
          style="width:80px;margin-right:7px"
        >
          Print
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onBeforeMount } from 'vue';
import { mapActions, mapGetters, useStore } from 'vuex';
import { ActionTypes } from '@/store/modules/order/actions';
import { ActionTypes as AuthActionTypes } from '@/store/modules/auth/actions';
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import PrintHeader from '@/components/common-components/PrintHeader.vue'
import {styles2 as styles} from '@/constants/analytics_print'
import printDiv from '@/utils/print';

Chart.register(...registerables);

export default defineComponent({
  name: 'ComparisonExpenseSales',
  components: {
      BarChart,
      PrintHeader,
  },
  data() {
    return {
      src_img: require('@/assets/DefoultLogoAvatar-01.png'),
      company: 0,
      chartData: {},
      options: {
        responsive: true,
        scales: {
          y: {
            title: {
              display: true,
              text: 'Amount'
            }
          }
        },  
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Sales-Expense Comparison Chart',
          },
        },      
      },
      
    };
  },
  computed: {
    ...mapGetters({
      companies: 'getInventoryCompanies',
      userdata: 'getUser',
      expensesales: 'getExpenseSales',
      logoimg: 'getLogoImg',
    }),
  },
  methods: { 
    ...mapActions({
      fetchAnalytics: ActionTypes.FETCH_ANALYTICS,
      fetchCompanies: AuthActionTypes.FETCH_ALL_COMPANIES,
      fetchexpensesales: ActionTypes.FETCH_EXPENSE_SALES, 
      fetchUser: AuthActionTypes.USER_DATA,
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
    fillChartData(){
      this.chartData = {
        labels: [this.expensesales['company_name']],
        datasets: [
          {
            label: "Sale",
            data: [this.expensesales['total_sales']],
            backgroundColor: ['#edbf33', '#b33dc6', '#ef9b20', '#ea5545', '#0bb4ff'],
            borderColor: ['#edbf33', '#b33dc6', '#ef9b20', '#ea5545', '#0bb4ff'],
          },
          {
            label: "Expense",
            data: [-(this.expensesales['total_expense'])],
            backgroundColor: ['#0bb4ff', '#50e991', '#e6d800', '#9b19f5', '#e60049'],
            borderColor: ['#0bb4ff','#50e991', '#e6d800', '#9b19f5', '#e60049'],
          },
        ],
      };
    },
    async fetchAnalyticsComparisonBtn() {
      await this.fetchexpensesales(this.company);
      this.fillChartData()
    },
    printDiv(div_id: string, title: string) {
      const canvas = document.getElementById('bar-chart') as HTMLCanvasElement;
      const img = canvas.toDataURL('image/png')
      const graph_div = document.getElementById('bar-chart') as HTMLBodyElement
      const graph_img = document.getElementById('graph-img') as HTMLImageElement
      graph_img.src = img
      printDiv(div_id, title, styles);
    },
  },
  async mounted() {
    await this.fetchUser();
    await this.fetchCompanies();
    this.company = this.userdata.company.id;
    await this.fetchexpensesales(this.company);
    this.fillChartData()
  }
})
</script>

<style scoped>

.ab-flex-box{
  display: flex;
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
}
.date-container{
  display: flex;
}
/* table designs */
.tble-mt{
  margin: 20px 0;
}

.fr-row {
  font-size: 12px;
}
.header > th{
  text-align: center;
}
.header > th:first-child{
  border: none;
  border-radius: 10px 0px 0px 10px;
}
.header > th:last-child{
  border: none;
  border-radius: 0px 10px 10px 0px;
}
.header {
  border-radius: 5px;
  background-color: #0f2634; 
  color: white;
}
td > .flex-box{
  justify-content: space-around;
  align-items: center;
}
.content{
  background-color: white; 
  color: #0f2634;
}
.content > td{
  text-align: center;
}
.b{
  text-align: right;
  padding: 7px;
  margin-left: 1rem;
  width: 7rem;
}
.btn{
    margin: 2px 0;
}
.custom-select{
  width:28%;
}
.stats{
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
.expense{
  transform: rotate(-90deg);
  height: 0%;
  margin-top: 9rem;
}
.flex-container {
  display: flex;
  flex-direction: row-reverse;
}
#graph-img {
  display: none;
}
</style>
