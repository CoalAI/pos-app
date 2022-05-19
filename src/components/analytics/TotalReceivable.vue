<template>
  <div>
    <div class="flex-box">
      <label class="labelCmp ls" style=";padding-right:12px">
        <strong>Department:</strong>
      </label>
      <select
        id="company-type"
        name="company-type"
        class="custom-select"
        style="width: 25%"
        v-model="company"
        :disabled="!admin"
      >
        <option value="0">Select</option>
        <option class="batches-op" v-for="company in companies" v-bind:key="company.id" v-bind:value="company.id">
          {{company.company_name}}
        </option>
      </select>
      <div class="b" style="margin-left: 10px">
          <button class="btn btn-orange" @click="fetchAnalyticsBtn(companies, company)">Search</button>
      </div>
    </div>
    <table class="tble-mt">
        <colgroup>
          <col span="1" style="width: 33%;">
          <col span="1" style="width: 33%;">
          <col span="1" style="width: 34%;">
        </colgroup>
        <thead>
          <tr class="fr-row header">
            <th scope="col">Department Name</th>
            <th scope="col">Department Type</th>
            <th scope="col">Receivable Amount</th>
          </tr>
        </thead>
        <tbody>
        <tr v-if="single_company">
          <td>{{ single_company.company_type }}</td>
            <td>{{ single_company.company_name }}</td>
            <td>{{ single_company.credit }}</td>
          </tr> 
        </tbody>
      </table>
    <div class="stats">
      <div>
        <span>Total Amount:</span>
        <span>{{ single_company.credit }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { ActionTypes as AuthActionTypes } from '@/store/modules/auth/actions';



export default defineComponent({
  name: 'TotalReceivable',
  components: {
  },
  data() {
    return {
      company: 0,
      single_company: "",
    }
  },
  computed: {
    ...mapGetters({
      userdata: 'getUser',
      companies: 'getCompanies',
      singlecompany: 'getSignleCompany',

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
      fetchUser: AuthActionTypes.USER_DATA,
      fetchCompanies: AuthActionTypes.FETCH_COMPANIES,
    }),
    async fetchAnalyticsBtn() {
      this.single_company = await this.singlecompany(this.company);
      console.log(this.single_company)
    },
  },
  async mounted() {
    await this.fetchCompanies();
    await this.fetchUser();
  },
})  

</script>

<style scoped>
.flex-row{
   display: flex;
   justify-content: space-between;
   padding: 2%
}
.labelCmp{
  padding: 20px;
  padding-top: 14px !important;
}
.tble-mt{
  margin: 20px 0;
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
.fr-row {
  font-size: 12px;
}
.stats{
  margin-top: 20px;
  text-align: right;
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
</style>
