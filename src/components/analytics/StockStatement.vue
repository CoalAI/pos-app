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
        <option class="batches-op" v-for="company in companies" v-bind:key="company.id" v-bind:value="company.id">
          {{company.company_name}}
        </option>
      </select>
      <label class="labelCmp ls" style="padding-left:12px;padding-right:12px">
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
    <div id="print">

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
          <td v-if="data.quantity != 0">{{showcategoryName(categories, data.batch.product_variant.product.category).name}}</td>
          <td v-if="data.quantity != 0">{{parseInt(data.quantity)}}</td>
          <td v-if="data.quantity != 0">{{data.quantity * data.batch.product_variant.price}}</td>
        </tr>
      </tbody>
    </table>
    <Paginator :count="counts.inventory" @pageChange="changePage"/>
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
      @click="printPage()"
      :disabled="submitOrderButton"
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

export default defineComponent({
  name: 'OperatorSalesDetail',
  components: {
    Paginator,
  },
  data() {
    return {
      company: 0,
      category:0,
    };
  },
  computed: {
    ...mapGetters({
      inventory: 'getInventory',
      companies: 'getInventoryCompanies',
      userdata: 'getUser',
      categories: 'getCategories',
      counts: 'getTotalCounts',
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
    async fetchAnalyticsBtn() {
      await this.getProducts({
         company: this.company,
         category: this.category,
      });
    },
     changePage: async function (pageNo: number) {
      await this.fetchCompanies({
         company: this.company,
        // search: this.search,
        page: pageNo,
      });
    },
    showcategoryName: function(categories: Category[], id: number) {
      return categories.find(function(data) {
          console.log(data.name)
          if(data.id === id){
              return data.name
          }
      });
    },
    getElementTag: function (tag: keyof HTMLElementTagNameMap): string {
      const html: string[] = [];
      const elements = document.getElementsByTagName(tag);
      for (let index = 0; index < elements.length; index++) {
        html.push(elements[index].outerHTML);
      }
      return html.join("\r\n");
    },

    getHtmlContents: function () {
      const printContents = document.getElementById("print");
      return printContents && printContents.innerHTML
        ? printContents.innerHTML
        : "";
    },

    printPage: function () {
      let styles = "",
        links = "";
      styles = `
			<style lang="scss" scoped>	
				th:first-child {
    border-radius: 10px 0px 0px 10px;
}
h1 {
    text-align: center;
}

.pagination {
    display: none;
}

.header > th {
    text-align: center;
}

td, th {
    border: 1px solid;
    border-color: #ddd;
    text-align: left;
    padding: 8px;
}
th {
    text-align: inherit;
}
th {
    display: table-cell;
    vertical-align: inherit;
    font-weight: bold;
    text-align: -internal-center;
}

.fr-row {
    font-size: 12px;
}

.header {
    border-radius: 5px;
    background-color: #0f2634;
    color: white;
}

table {
    border-collapse: collapse;
    width: 100%;
}
table {
    border-collapse: collapse;
}
user agent stylesheet
table {
    border-collapse: separate;
    text-indent: initial;
    border-spacing: 2px;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

body {
    margin: 0;
    font-size: 100%;
}
body {
    margin: 0;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: left;
    background-color: #fff;
}

html {
    font-family: sans-serif;
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    -ms-overflow-style: scrollbar;
    -webkit-tap-highlight-color: transparent;
}
.stats{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    margin-left: 1rem;
    margin-right: 1rem;
}

			</style>
			`;
      // links = this.getElementTag('link');
      links = "";
      const printContents = this.getHtmlContents();
      console.log(printContents, "printContents");
      this.printContent(printContents, styles, links);
      // this.checkToken();
    },
    printContent: function (
      htmlcontent: string,
      styles: string,
      links: string
    ) {
      const endscripttag = "/script";
      const popupWin = window.open(
        "",
        "_blank",
        "top=0,left=0,height=auto,width=auto,focused=false"
      );

      if (popupWin) {
        popupWin.document.open();
        popupWin.document.write(`
        <html>
          <head>
          <title></title>
          ${styles}
          ${links}
          </head>
          <body>
          <h1>Stock Statement</h1>
          ${htmlcontent}
          <script defer>
            function triggerPrint(event) {
            window.removeEventListener('load', triggerPrint, false);
            setTimeout(function() {
              closeWindow(window.print());
            }, 100);
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
