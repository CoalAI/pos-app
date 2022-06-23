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
        <option class="batches-op" v-for="company in companies" v-bind:key="company.id" v-bind:value="company.id">
          {{company.company_name}}
        </option>
      </select>
      <div class="b">
        <button class="btn btn-orange" @click="fetchSalesanalyticsBtn">Search</button>
      </div>
    </div>
    <div id="print">
      <table class="tble-mt">
        <colgroup>
          <col span="1" style="width: 25%;">
          <col span="1" style="width: 25%;">
          <col span="1" style="width: 25%;">
      </colgroup>
      <thead>
        <tr class="fr-row header">
          <th scope="col">Department Name</th>
          <th scope="col">Department Type</th>
          <th scope="col">Payable Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr >
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
      </table>
      <div class="stats">
      <div>
          
        </div>
        <div>
          <span>Total Amount:</span>
          <span>0</span>
        </div>
      </div>
    </div>
  </div>
  <button
      class="btn-orange btn mt-5"
      @click="printDiv('print', 'Day Total Payable')"
      :disabled="submitOrderButton"
      ref="submitandprint"
    >
      Print Details
    </button>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { ActionTypes } from '@/store/modules/order/actions';
import { ActionTypes as AuthActionTypes } from '@/store/modules/auth/actions';
import printDiv from '@/utils/print';

export default defineComponent({
  name: 'DayTotalPayable',
  components: {
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
        },
    printDiv(div_id: string, title: string) {
      printDiv(div_id, title);
    },
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
</style>
