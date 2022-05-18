<template>
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
    {{ company}}
  </div>
  <!-- <p>{{ companies[company]['id']}}</p> -->
  <!-- {{companies}} -->
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { ActionTypes as AuthActionTypes } from '@/store/modules/auth/actions';
import { Company } from '@/store/models/company';




export default defineComponent({
  name: 'TotalReceivable',
  components: {
  },
  data() {
    return {
      company: 0,
      company_detail: 0,
    }
  },
  computed: {
    ...mapGetters({
      userdata: 'getUser',
      companies: 'getCompanies',

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
    async fetchAnalyticsBtn(companies: Company[], company: number) {
      return companies.find(function(data: Company) {
          if(data.id === company){
              console.log(data)
              return data
          }
      });
    },
  },
  async mounted() {
    await this.fetchCompanies();
    await this.fetchUser();
  },
})  

</script>

<style scoped>

</style>
