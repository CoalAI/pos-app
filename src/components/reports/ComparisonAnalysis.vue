<template>
  <div>
    <div class="flex-box">
      <label class="pad-label ls" for="start_date">
        <strong>Department type:</strong>
      </label>
      <select
        id="company-type"
        name="company-type"
        class="custom-select"
        v-model="company"
        :disabled="!admin"
      >
        <option
          class="batches-op"
          v-for="company_type in companies_types"
          v-bind:key="company_type.id"
          v-bind:value="company_type.name"
        >
          {{ company_type.name }}
        </option>
      </select>

      <div class="b">
        <button class="btn btn-orange" @click="fetchAnalyticsComparisonBtn()">
          Search
        </button>
      </div>
    </div>
    <div class="container d-flex" id="print">
      <img src="" alt="graph" id="graph-img">
      <div class="profit"></div>
      <BarChart
        :chartData="chartData"
        :options="options"
        style="height: 322px; width: 691px"
      />
    </div>
    <button
            class="btn-orange btn mt-5"
            @click="printBill('print','Comparison Analysis')"
            :disabled="submitOrderButton"
            ref="submitandprint"
          >
            Print</button
          >
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRaw } from "vue";
import { mapActions, mapGetters } from "vuex";
import { ActionTypes } from "@/store/modules/order/actions";
import { ActionTypes as AuthActionTypes } from "@/store/modules/auth/actions";
import { BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import { store } from "@/store";
import printBill from '@/utils/print';
import chartConfig from "@/constants";
Chart.register(...registerables);

export default defineComponent({
  name: "ComparisonAnalysis",
  components: {
    BarChart,
  },
  setup() {
    const testData = {
      datasets: [
        {
          data: JSON.parse(JSON.stringify(store.getters.getComparisonanalysis)),
        },
      ],
    };
    const options = {
      parsing: {
        xAxisKey: "company_name",
        yAxisKey: "profit",
      },
    };
    return { testData, options };
  },
  data() {
    const date = new Date();
    const dateStr = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;

    return {
      chartData: {},
      startDate: "2022-01-01",
      endDate: "2022-05-20",
      company: 0,
      company_type: "",
      companies_types: [
        { name: "FACTORY", value: "factory" },
        { name: "STORE", value: "store" },
        { name: "RETIAL", value: "retial" },
        { name: "VENDOR", value: "vendor" },
        { name: "PARENT", value: "parent" },
        { name: "WALK_IN_CUSTOMER", value: "walk_in_customer" },
      ],
      printDelay: 100,
    };
  },
  computed: {
    ...mapGetters({
      salesanalytics: "getSalesanalytics",
      userdata: "getUser",
      comparisonAnalysis: "getComparisonanalysis",
    }),
  },
  methods: {
    ...mapActions({
      getComparisonAnalysis: ActionTypes.FETCH_COMPARISON_ANALYSIS,
    }),
    admin() {
      const allowedRoles = ["SUPER_ADMIN", "ADMIN"];
      const allowedCompanies = ["PARENT", "STORE"];
      if (
        this.userdata != null &&
        allowedRoles.includes(this.userdata.user_type) &&
        allowedCompanies.includes(this.userdata.company.company_type)
      ) {
        return true;
      }
      return false;
    },
    async fetchAnalyticsComparisonBtn() {
      await this.getComparisonAnalysis({
        company_type: this.company,
      });
      this.chartData = {
        labels: [],
        datasets: [
          {
            label: "Companies",
            data: JSON.parse(
              JSON.stringify(store.getters.getComparisonanalysis)
            ),
            backgroundColor: chartConfig.backgroundColor,
            borderColor: chartConfig.borderColor,
          },
        ],
      };
    },
    printBill(div_id: string, title: string) {
      const canvas = document.getElementById('bar-chart') as HTMLCanvasElement;
      const img = canvas.toDataURL('image/png')
      const graph_div = document.getElementById('bar-chart') as HTMLBodyElement
      const graph_img = document.getElementById('graph-img') as HTMLImageElement
      graph_img.src = img
      console.log(img)
      printBill(div_id, title);
    },
    
  },
});
</script>

<style scoped>
.ab-flex-box {
  display: flex;
  align-items: baseline;
}
/* upper left designs */
#select-con {
  display: flex;
  align-items: baseline;
}
#select-con > .ab-select-container {
  width: 100%;
}
#select-con > .ab-select-container > select {
  margin-left: 10px;
}
.date-container {
  display: flex;
}
/* table designs */
.tble-mt {
  margin: 20px 0;
}

.fr-row {
  font-size: 12px;
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
.content {
  background-color: white;
  color: #0f2634;
}
.content > td {
  text-align: center;
}
.b {
  text-align: right;
  padding: 7px;
  margin-left: 1rem;
  width: 7rem;
}
.btn {
  margin: 2px 0;
}
.custom-select {
  width: 28%;
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
.profit {
  transform: rotate(-90deg);
  height: 0%;
  margin-top: 9rem;
}
#graph-img {
  display: none;
}
</style>
