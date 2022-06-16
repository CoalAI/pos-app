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
    <div class="container d-flex">
      <div class="profit">Profit</div>
      <BarChart
        :chartData="chartData"
        :options="options"
        style="height: 322px; width: 691px"
      />
    </div>
    <button
            class="btn-red block"
            @click="printBill()"
            :disabled="submitOrderButton"
            ref="submitandprint"
          >
            Submit and Print</button
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
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(201, 203, 207, 0.2)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
            ],
          },
        ],
      };
    },
    getElementTag: function(tag: keyof HTMLElementTagNameMap): string {
			const html: string[] = [];
			const elements = document.getElementsByTagName(tag);
			for (let index = 0; index < elements.length; index++) {
				html.push(elements[index].outerHTML);
			}
			return html.join('\r\n');
		},

		getHtmlContents: function() {
			const printContents = document.getElementById("expense");
			return printContents && printContents.innerHTML?printContents.innerHTML:'';
		},

		printBill: function() {
			let styles = '', links = '';
			styles = ``;
			// links = this.getElementTag('link');
			links = '';
			const printContents = this.getHtmlContents();
      this.printContent(printContents, styles, links);
      // this.checkToken();
		},
    printContent: function(htmlcontent: string, styles: string, links: string) {

      const endscripttag = "/script"
      const popupWin = window.open("", "_blank", "top=0,left=0,height=auto,width=auto,focused=false");
        
      if (popupWin) {
        popupWin.document.open()
        popupWin.document.write(`
        <html>
          <head>
          <title></title>
          ${styles}
          ${links}
          </head>
          <body>
          ${htmlcontent}
          <script defer>
            function triggerPrint(event) {
            window.removeEventListener('load', triggerPrint, false);
            setTimeout(function() {
              closeWindow(window.print());
            }, ${this.printDelay});
            }
            function closeWindow(){
              window.close();
            }
            window.addEventListener('load', triggerPrint, false);
          <${endscripttag}>
          </body>
        </html>`);
        popupWin.document.close();
      }
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
</style>
