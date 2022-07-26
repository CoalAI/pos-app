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
        :disabled="!admin"
      >
        <option value="0">Select</option>
        <option class="batches-op" v-for="company in companies" v-bind:key="company.id" v-bind:value="company.id">
          {{company.company_name}}
        </option>
      </select>
      <div class="b">
        <button class="btn btn-orange" @click="fetchTotalPayableBtn(companies, company)">Search</button>
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
        </colgroup>
        <thead>
          <tr class="fr-row header">
            <th scope="col">Department Name</th>
            <th scope="col">Department Type</th>
            <th scope="col">Payable Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in total_pay_rec.amount" :key="data">
            <td v-if="data.payable_amount != 0">{{ data.seller_company }}</td>
            <td v-if="data.payable_amount != 0">{{ data.seller_company_type }}</td>
            <td v-if="data.payable_amount != 0">{{ data.payable_amount }}</td>
          </tr>
        </tbody>
      </table>
      <div class="stats">
        <div>
            
          </div>
          <div>
            <span>Total Amount:</span>
            <span>{{total_pay_rec.payable_amount}}</span>
          </div>
        </div>
      </div>
    </div>
  <div class="flex-container">
    <button
      class="btn-orange btn mt-5"
      @click="printDiv('print', 'Total Payable')"
      :disabled="submitOrderButton"
      ref="submitandprint"
      style="width:80px;margin-right:7px"
    >
      Print
    </button>
    
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { ActionTypes } from '@/store/modules/order/actions';
import { ActionTypes as AuthActionTypes } from '@/store/modules/auth/actions';
import printDiv from '@/utils/print';

export default defineComponent({
  name: 'TotalPayable',
  components: {
  },
  data() {
    return {
      src_img: require('@/assets/DefoultLogoAvatar-01.png'),
      single_company: "",
      company: 0,
    };
  },
  computed: {
    ...mapGetters({
      total_pay_rec: 'getTotalpayablereceivable',
      companies: 'getCompanies',
      userdata: 'getUser',
      singlecompany: 'getSignleCompany',
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
      fetchTotalpayablereceivable: ActionTypes.TOTAL_PAYABLE_RECEIVABLE,
      fetchCompanies: AuthActionTypes.FETCH_COMPANIES,
      fetchUser: AuthActionTypes.USER_DATA,
    }),
   
    async fetchTotalPayableBtn() {
       await this.fetchTotalpayablereceivable(this.company);
    },
    getCurrentTime(){
			return new Date().toLocaleTimeString();
		},
		getCurrentDate(){
			const current = new Date()
      return current.toLocaleDateString()
		},
    // async fetchSalesanalyticsBtn() {
    //   await this.fetchSalesanalytics({
    //     start_date: this.startDate,
    //     end_date: this.endDate,
    //     company: this.company,
    //   });
    //     },
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
.flex-container {
  display: flex;
  flex-direction: row-reverse;
}
</style>
