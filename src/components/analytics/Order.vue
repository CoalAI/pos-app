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
            <option
              class="batches-op"
              v-for="company in companies"
              v-bind:key="company.id"
              v-bind:value="company.id"
            >
              {{ company.company_name }}
            </option>
          </select>
        </div>
      </div>
      <div class="d-flex">
        <div class="date-container">
          <DateRange @dateRangeChange="setRange" />
        </div>
        <div class="b">
          <button class="btn btn-orange" @click="fetchAnalyticsBtn">
            Search
          </button>
        </div>
      </div>
    </div>
    <div id="print">
      <table class="tble-mt">
        <colgroup>
        <col span="1" style="width: 25%" />
        <col span="1" style="width: 25%" />
        <col span="1" style="width: 25%" />
        <col span="1" style="width: 25%" />
      </colgroup>
        <thead>
          <tr class="fr-row header">
            <th scope="col">Invoice Id</th>
            <th scope="col">Product Name</th>
            <th scope="col">Total Bill</th>
            <th scope="col">Order Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="data in analytics.table_data"
            :key="data.order__invoice_id"
          >
            <td>{{ data.order__invoice_id }}</td>
            <td>{{ data.batch__product_variant__product__name }}</td>
            <td>{{ data.order__total }}</td>
            <td>{{ data.order__status }}</td>
          </tr>
        </tbody>
      </table>
    <div class="stats">
      <div>
        <span>Total Orders:</span>
        <span>{{ analytics.total_orders }}</span>
      </div>
      <div>
        <span>Total Amount:</span>
        <span>{{ analytics.total_orders_amount }}</span>
      </div>
      <div>
        <span>Expenses:</span>
        <span>{{ analytics.total_expense }}</span>
      </div>
    </div>
    </div>
    <div>

    <div class="flex-container">
      <button
        class="btn-orange btn mt-5"
        @click="printDiv('print', 'Order Analytics')"
        :disabled="submitOrderButton"
        ref="submitandprint"
        style="width:80px;margin-right:7px"
      >
        Print
      </button>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

import DateRange from "@/components/common-components/DateRange.vue";
import { ActionTypes } from "@/store/modules/order/actions";
import { ActionTypes as AuthActionTypes } from "@/store/modules/auth/actions";
import printDiv from '@/utils/print';

export default defineComponent({
  name: "OrderAnaltyics",
  components: {
    DateRange,
  },
  data() {
    const date = new Date();
    const dateStr = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    return {
      startDate: dateStr,
      endDate: dateStr,
      company: 0,
    };
  },
  computed: {
    ...mapGetters({
      analytics: "getAnalytics",
      companies: "getInventoryCompanies",
      userdata: "getUser",
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
    dateValidation: function (): string | null {
      if (
        this.startDate !== undefined &&
        this.endDate !== undefined &&
        this.startDate !== "" &&
        this.endDate !== "" &&
        Date.parse(this.startDate) <= Date.parse(this.endDate)
      ) {
        return null;
      }
      return "invalid date range";
    },
  },
  methods: {
    ...mapActions({
      fetchAnalytics: ActionTypes.FETCH_ANALYTICS,
      fetchCompanies: AuthActionTypes.FETCH_ALL_COMPANIES,
      fetchUser: AuthActionTypes.USER_DATA,
    }),
    setRange(range: null | { startDate: Date; endDate: Date }) {
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
    printDiv(div_id: string, title: string) {
      printDiv(div_id, title);
    },
  },
  async mounted() {
    await this.fetchUser();
    await this.fetchCompanies();
    await this.fetchAnalyticsBtn();
    this.company = this.userdata.company.id;
  },
});
</script>

<style lang="scss" scoped>
/* ab css */
.ab-flex-box {
  // display: flex;
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

/* btn search  */
.b {
  text-align: right;
  padding: 7px;
  margin-left: 1rem;
  width: 7rem;
}
.btn-blue {
  text-decoration: none;
  text-align: center;
  background-color: #0f2636;
  font-size: 12px;
  border-radius: 20px;
  padding: 6px 40px;
  cursor: pointer;
  color: $white-color;
  border: 1.5px solid #0f2636 !important;
}
.btn-blue:hover {
  color: #0f2636;
  background-color: white;
  border: 1.5px solid #0f2636;
}

// stats designs
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

// table designs
.tble-mt {
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
.flex-container {
  display: flex;
  flex-direction: row-reverse;
}
</style>
