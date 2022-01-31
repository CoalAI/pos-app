<template>
  <div>
    <div class="flex-box">
      <label class="pad-label ls">
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
        <option class="batches-op" v-for="company in companies" v-bind:key="company.id" v-bind:value="company.id">
          {{company.company_name}}
        </option>
      </select>
      <label class="pad-label ls">
        <strong>Product Category:</strong>
      </label>
      <select
        id="category-type"
        name="category-type"
        class="custom-select"
        style="width: 25%"
        v-model="category"
        :disabled="!admin"
      >
        <option class="batches-op" v-for="category in categories" v-bind:key="category.id" v-bind:value="category.id">
          {{category.name}}
        </option>
      </select>
      <div class="b" style="margin-left: 10px">
        <button class="btn btn-orange" @click="fetchAnalyticsBtn">Search</button>
      </div>
    </div>
    <table class="marginTop">
      <thead>
        <tr>
          <th scope="col">Product Name</th>
          <th scope="col">Product Category</th>
          <th scope="col">Quantity</th>
          <th scope="col">Amount</th>
        </tr>
      </thead>
      <tbody>
       <tr v-for="data in getProducts.result" :key="data">
          <th scope="col">{{data.name}}</th>
          <th scope="col">{{data.category.name}}</th>
          <th scope="col">{{data.product_variant.batch.quantity}}</th>
          <th scope="col">{{data.product_variant.price}}</th>
        </tr>
      </tbody>
    </table>
    <div class="flex-row">
        <div><b>Total Quantity:</b> 11</div>
        <div><b>Total Amount:</b> 1100</div>
    </div>
    <div class="flex-container marginTop">
      <button class="btn btn-orange" style="width:80px">Print</button>
    </div> 
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import { mapActions, mapGetters } from 'vuex';

import { ActionTypes } from '@/store/modules/order/actions';
import { ActionTypes as AuthActionTypes } from '@/store/modules/auth/actions';

export default defineComponent({
  name: 'OperatorSalesDetail',
  data() {
    return {
      company: 0,
      category:0,
    };
  },
  computed: {
    ...mapGetters({
      products: 'getListOfProducts',
      companies: 'getInventoryCompanies',
      userdata: 'getUser',
      categories: 'getCategories'
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
      getProducts: ActionTypes.PODUCT_QUANTITY,
      fetchCompanies: AuthActionTypes.FETCH_ALL_COMPANIES,
      fetchUser: AuthActionTypes.USER_DATA,
      fetchCategories: ActionTypes.FETCH_CATEGORIES,
    }),
    async fetchAnalyticsBtn() {
      await this.getProducts({
         company: this.company,
         category: this.category,
      });
    }
  },
  async mounted() {
    await this.fetchUser();
    await this.fetchCompanies();
    await this.fetchAnalyticsBtn();
    await this.fetchCategories();
    this.company = this.userdata.company.id;
  },
})
</script>

<style scoped>
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
.flex-row{
   display: flex;
   justify-content: space-between;
   padding: 2%
}
</style>
