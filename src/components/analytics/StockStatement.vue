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
      <div id="header-section" style="display: none;">
          <div>
            <img class="img-responsive" :src="logoimg ? logoimg : src_img" alt="Rohi">
          </div>
        <div class="company-info">
          <p class="mb-5 pb-5" style="font-size: 16px;"><strong>{{userdata.company.company_name}}</strong></p>
          <p class="text-center">{{userdata.company.address}}</p>
          <p class="text-center">{{userdata.company.contact_number}}</p>
        </div>
      </div>
      <div id="date-section" class="mb-5 pt-5" style="display: none;">
        <p class="text-center">{{getCurrentTime()}}</p>
        <p class="text-center">{{getCurrentDate()}}</p>
      </div>
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
     @click="printDiv('print', 'Stock Statement')"
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
import printDiv from '@/utils/print';

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
    getCurrentTime(){
			return new Date().toLocaleTimeString();
		},

		getCurrentDate(){
			const current = new Date()
      return current.toLocaleDateString()
		},
    printDiv(div_id: string, title: string) {
      const styles = `
				<style lang="scss" scoped>	
				@page {
				size: 180mm;
				margin: 0
				}

				@body {
				margin-left: 5%;
				}

        .maindiv-print {
				padding: 4px;
				max-width: 800px;
				}

        .mb-5 {
				border-bottom: 2px solid black;
				padding-bottom: 5px;
				}

        .pt-5 {
				padding-top: 5px;
				}

        #date-section {
				display: grid !important;
				grid-template-columns: 1fr 2fr;
				grid-template-rows: 1fr;
				gap: 0.1em 0.1em;
				width:80mm;
				}

				.company-info{
				display: flex;
				flex-wrap: nowrap;
				flex-direction: column;
				align-content: center;
				justify-content: center;
				align-items: center;
				font-size: 12px;
				}

				#header-section {
				display: grid !important;
				grid-template-columns: 1fr 2fr;
				grid-template-rows: 1fr;
				gap: 0.1em 0.1em;
				width:80mm;
				}

				#order-items-section th {
				border: 1px solid;
				border-color: black;
				text-align: center;
				padding: 1px;
				}
				.img-responsive{
				max-width: 100%;
				height: auto;
				}

				.text-center{
				text-align: center
				}
        .tble-mt {
          text-align: center;
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
        .pagination{
          display: none !important;
        }
        </style>
				`;
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
