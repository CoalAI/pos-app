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
        v-model="company"
        :disabled="!admin"
      >
        <option value="0">Select</option>
        <option class="batches-op" v-for="company in companies" v-bind:key="company.id" v-bind:value="company.id">
          {{company.company_name}}
        </option>
      </select>
      <label class="labelCmp ls" style="padding-left:12px;padding-right:12px">
        <strong>Product Category:</strong>
      </label>
      <!-- <select
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
      </select> -->
      <div>
        <form class="filter inline">
          <div><input type ="checkbox" value="" @change="onCheckAll"  :checked="checkall"> All</div>
          <div class="batches-op d-flex" v-for="category in categories" v-bind:key="category.id">
            <input type="checkbox" @change="onCheckChange"
            :value="category.id"
            :checked="checkedValue==category.id"/>
            <span>{{category.name}}</span>
          </div>
        </form>
      </div>
      <div class="b" style="margin-left: 10px">
        <button class="btn btn-orange" @click="fetchAnalyticsBtn">Search</button>
      </div>
    </div>
    <div id="print">
      <PrintHeader />
      <table class="tble-mt">
        <colgroup>
          <col span="1" style="width: 25%;">
          <col span="1" style="width: 25%;">
          <col span="1" style="width: 25%;">
          <col span="1" style="width: 25%;">
        </colgroup>
        <thead>
          <tr class="fr-row header">
            <th scope="col">Product Name</th>
            <th scope="col">Product Category</th>
            <th scope="col">Quantity</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
        <tr v-for="data in inventory" :key="data.id">
            <td v-if="data.quantity != 0">{{data.batch.product_variant.product.name}}</td>
            <td v-if="data.quantity != 0">{{showcategoryName(categories, data.batch.product_variant.product.category)}}</td>
            <td v-if="data.quantity != 0">{{parseInt(data.quantity)}}</td>
            <td v-if="data.quantity != 0">{{data.quantity * data.batch.product_variant.price}}</td>
          </tr>
        </tbody>
      </table>
      <Paginator
      class="mr-2 pager"
      :count="counts.inventory"
      @pageChange="changePage"
    />
    <div class="stats">
      <div>
        <span>Total Quantity:</span>
        <span>{{inventory.map((item) => parseInt(item.quantity)).reduce((a, b) => a + b, 0)}}</span>
      </div>
      <div>
        <span>Total Amount:</span>
        <span>{{inventory.map((item) => parseInt(item.quantity * item.batch.product_variant.price)).reduce((a, b) => a + b, 0)}}</span>
      </div>
    </div>
    </div>
    
    <div class="flex-container marginTop">
      <!-- <button class="btn btn-orange">Print</button> -->
      <button
      class="btn-orange btn mt-5"
     @click="printDiv('print', 'Stock Statement')"
      style="width:80px;margin-right:7px"
      ref="submitandprint"
    >
      Print
    </button>
    </div> 
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import { mapActions, mapGetters } from 'vuex';

import { ActionTypes } from '@/store/modules/order/actions';
import { ActionTypes as AuthActionTypes } from '@/store/modules/auth/actions';
import { Category } from '@/store/models/product'
import Paginator from '@/components/common-components/Paginator.vue';
import printDiv from '@/utils/print';
import PrintHeader from '@/components/common-components/PrintHeader.vue'
import {styles1 as styles} from '@/constants/analytics_print'

export default defineComponent({
  name: 'OperatorSalesDetail',
  components: {
    Paginator,
    PrintHeader,
  },
  data() {
    return {
      src_img: require('@/assets/DefoultLogoAvatar-01.png'),
      company: "",
      category:"",
      checkall: false,
      checkedValue: -1,
    };
  },
  computed: {
    ...mapGetters({
      inventory: 'getInventory',
      companies: 'getInventoryCompanies',
      userdata: 'getUser',
      categories: 'getCategories',
      counts: "getTotalCountsOrderModule",
      logoimg: 'getLogoImg',
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
      getProducts: ActionTypes.PRODUCT_QUANTITY,
      fetchCompanies: AuthActionTypes.FETCH_ALL_COMPANIES,
      fetchUser: AuthActionTypes.USER_DATA,
      fetchCategories: ActionTypes.FETCH_CATEGORIES,
    }),
    onCheckChange: async function(e: any){
      this.category = e.target.value
      this.checkall = false
      this.checkedValue = e.target.value
    },

    onCheckAll: async function(e: any){
      this.category = ""
      this.checkall = true
      this.checkedValue = e.target.value
    },
    async fetchAnalyticsBtn() {
      await this.getProducts({
         company: this.company,
         category: this.category
      });
    },
    changePage: async function (pageNo: number) {
      await this.getProducts({
        company: this.company,
        category: this.category,
        page: pageNo,
      });
    },
    showcategoryName: function(categories: Category[], id: number) {
      const name=categories.find(function(data) {
          if(data.id === id){
              return data.name
          }
      });
      if(name){
        return name.name
      }
      else{
        return "NA"
      }
    },
    printDiv(div_id: string, title: string) {
      printDiv(div_id, title, styles);
    },
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
.flex-container {
  display: flex;
  flex-direction: row-reverse;
}
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
  display: flex;
  justify-content: space-between;
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
