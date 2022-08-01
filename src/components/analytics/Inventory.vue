<template>
  <div class="ab-flex-box">
    <label class="labelCmp" for="start_date">
      <strong>Company:</strong>
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
        <button class="btn btn-orange" @click="fetchAnalyticsBtn">Search</button>
    </div>
  </div>
  <div id="print">
    <table class="tble-mt">
      <colgroup>
        <col span="1" style="width: 35%;">
        <col span="1" style="width: 35%;">
        <col span="1" style="width: 35%;">
      </colgroup>
      <thead>
        <tr class="fr-row header">
          <th scope="col">Category</th>
          <th scope="col">Total Products</th>
          <th scope="col">Total Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr class="fr-row content" v-for="(item, key) in analytics.category_stats" :key="key">
          <td>{{key}}</td>
          <td>{{item.quantity}}</td>
          <td>{{item.total_amount}}</td>
        </tr>
      </tbody>
    </table>
    <div class="analytics">
      <div>
        <span>
          Net Products:
        </span>
        <span>{{analytics.unique_products_count}}</span>
      </div>
      <div>
        <span>
          Net Amount:
        </span>
        <span>{{analytics.total_inventory_amount}}</span> 
      </div>
    </div>
  <div class="no_print">
    <BarChart
        :chartData="chartData"
        style="height: 322px; width: 691px"
      />
  </div>
      <img src="" alt="graph" id="graph-img">
  </div>
  <div class="flex-container">
    <button
      class="btn-orange btn mt-5"
      @click="printDiv('print', 'Inventory')"
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
import { mapGetters, mapActions } from 'vuex';
import { ActionTypes } from '@/store/modules/order/actions';
import { ActionTypes as AuthActionTypes } from '@/store/modules/auth/actions';
import printDiv from '@/utils/print';
import { BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import { store } from "@/store";
import chartConfig from "@/constants";

export default defineComponent({
  name: 'InventoryAnaltyics',
   components: {
    BarChart,
  },
  data() {
    const date = new Date();
    const dateStr = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    return {
      startDate: dateStr,
      endDate: dateStr,
      company: 0,
      chartData: {},
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
      const data = JSON.parse(JSON.stringify(store.getters.getAnalytics.category_stats));
      const graph_data=[]
      for (const key in data) {
          graph_data.push({x:key,y:data[key].quantity})
      }
      this.chartData = {
        labels: [],
        datasets: [
          {
            label: "Category",
            data: graph_data,
            backgroundColor: ['#f46a9b', '#00bfa0', '#0bb4ff', '#e60049', '#b33dc6'],
            borderColor: ['#f46a9b', '#00bfa0', '#0bb4ff', '#e60049', '#b33dc6'],
          },
        ],
        options: {
    parsing: {
        key: 'index.quantity',
    }
}
      };
    },
    printDiv(div_id: string, title: string, style?: string) {
      const canvas = document.getElementById('bar-chart') as HTMLCanvasElement;
      const img = canvas.toDataURL('image/png')
      const graph_img = document.getElementById('graph-img') as HTMLImageElement
      graph_img.src = img
      printDiv(div_id, title, style);
    },
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

.analytics{
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin-left: 1rem;
}
.analytics > div > span:first-child{
  font-size: 15px;
  font-weight: 600;
}
.analytics > div > span:last-child{
  font-size: 15px;
  font-weight: 500;
  color: #e73b2a;
}

/* ab css */
  /* ab-flex-box */
  .ab-flex-box{
    display: flex;
    align-items: baseline;
  }
  .ab-flex-box > .ab-select-container{
    width: 100%;
    margin-left: 10px;
  }
  .ab-flex-box > label{
    font-weight: 500;
  }
  /* select designs */
  .ab-select-container > select{
    padding: 8px 18px;
    font-size: 12px;
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
.labelCmp{
  padding: 20px;
}
.custom-select{
  width: 35%;
}

.b{
  text-align: right;
  padding: 7px;
  margin-left: 1rem;
  width: 7rem;
}
#graph-img {
  display: none;
}
.flex-container {
  display: flex;
  flex-direction: row-reverse;
}
</style>
