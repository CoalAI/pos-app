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
        @change="fetchSalesanalyticsBtn"
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

    <table class="tble-mt">
      <colgroup>
        <col span="1" style="width: 25%" />
        <col span="1" style="width: 25%" />
        <col span="1" style="width: 25%" />
        <col span="1" style="width: 25%" />
      </colgroup>
      <thead>
        <tr class="fr-row header">
          <th scope="col">User Name</th>
          <th scope="col">User Type</th>
          <th scope="col">Total Orders</th>
          <th scope="col">Total Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in salesanalytics.result" :key="data">
          <td>{{ data.username }}</td>
          <td>{{ data.user_type }}</td>
          <td>{{ data.order_count }}</td>
          <td>{{ data.total_amount }}</td>
        </tr>
      </tbody>
    </table>
    
    <div class="d-flex justify-content-between flex-row">
      <div class="p-2"><span> Total Amount: </span>
        <span>{{ salesanalytics.total_orders }}</span></div>
      <div class="p-2"><span> Total Quantity: </span>
        <span>{{ salesanalytics.total_amount }}</span></div>
      
    </div>

    <!-- commented out as this was not in the mockup -->
    <!-- <div class="flex-container marginTop">
    <button class="btn btn-orange" style="width:80px">Print</button>
  </div>  -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

// import DateRange from "@/components/common-components/DateRange.vue";
import { ActionTypes } from "@/store/modules/order/actions";
import { ActionTypes as AuthActionTypes } from "@/store/modules/auth/actions";

export default defineComponent({
  name: "EndOfDay",
  components: {
    // DateRange,
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
      salesanalytics: "getSalesanalytics",
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
      fetchSalesanalytics: ActionTypes.FETCH_SALESANALYTICS,
      fetchCompanies: AuthActionTypes.FETCH_ALL_COMPANIES,
      fetchUser: AuthActionTypes.USER_DATA,
    }),
    setRange(range: null | { startDate: Date; endDate: Date }) {
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
    },
  },
  async mounted() {
    await this.fetchUser();
    await this.fetchCompanies();
    await this.fetchSalesanalyticsBtn();
    this.company = this.userdata.company.id;
  },
});
</script>

<style scoped>
/* table {
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
} */

/* ab css */
/* ab-flex-box */
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
  /* padding: 8px 18px;
  border-radius: 10px;
  font-size: 12px; */
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
.custom-select {
  width: 28%;
}
</style>
