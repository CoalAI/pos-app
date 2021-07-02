<template>
  <div id="expenseSummary">
    <Header/>
    <div class="page-mr">
      <div class="diff-shadow">
        <h2>Expense Summary</h2>
        <div class="filter-grid mr-2">
          <div class="sw">
            <label class="custom-radio" style="margin-right: 10px">Daily
              <input type="radio" name="order_type" value="from" :checked="!custom_range"  @change="custom_range=false">
              <span class="checkmark"></span>
            </label>
            <label class="custom-radio" style="margin-right: 10px">Custom
              <input type="radio" name="order_type" value="to" :checked="custom_range" @change="custom_range=true">
              <span class="checkmark"></span>
            </label>
          </div>
          <label class="pad-label ls" for="start_date">
            <strong>Start:</strong>
          </label>
          <div class="s-i">
            <input
              name="start_date"
              type="date"
              v-model="from"
            />
          </div>
          <label class="pad-label mr-l le" for="end_date">
            <strong>End:</strong>
          </label>
          <div class="e-i">
            <input
              name="end_date"
              type="date"
              v-model="to"
            />
            <span v-if="dateValidation" class="form-error">{{dateValidation}}</span>
          </div>
          <div class="b">
            <button class="btn btn-orange" @click="fetchTrans">Search Summary</button>
          </div>
        </div>
        <div class="mr-2 box1-tab">
          <table>
            <colgroup>
              <col span="1" style="width: auto;">
              <col span="1" style="width: auto;">
              <col span="1" style="width: auto;">
              <col span="1" style="width: auto;">
              <col span="1" style="width: auto;">
            </colgroup>
            <tr>
              <th>Sr No.</th>
              <th>Transaction ID</th>
              <th>Order ID</th>
              <th>Received From</th>
              <th>To</th>           
              <th>Payment Service</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
            <template v-for="(transaction,index) in transactions" :key="transaction.id">
              <tr>
                <td>{{index+1}}</td>
                <td>{{transaction.transaction_id}}</td>
                <td>{{transaction.order}}</td>
                <td>{{transaction.payor.username}} - {{transaction.payor.company.company_name}}</td>
                <td>{{transaction.payee.username}} - {{transaction.payee.company.company_name}}</td>
                <td>{{transaction.payment_service}}</td>
                <td>{{transaction.description}}</td>
                <td>{{transaction.amount}}</td>
              </tr>
            </template>
          </table>
        </div>
        <div id="Balance-information" class="mr-2">
          <label class="pad-label" for="balance">
            <strong>Current Balance:</strong>
          </label>
          <div>
            <input
              name="balance"
              type="text"
              :value="getBalance"
              readonly
            />
          </div>
          <label class="pad-label" for="Starting-Balance">
            <strong>Starting Balance:</strong>
          </label>
          <div>
            <input
              name="Starting-Balance"
              type="text"
              value="0.0000"
              readonly
            />
          </div>
          <label class="pad-label" for="expense">
            <strong>Total Expense:</strong>
          </label>
          <div>
            <input
              name="expense"
              type="text"
              :value="totalExpense"
              readonly
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { ActionTypes } from '@/store/modules/auth/actions';
import { Transaction } from '@/store/models/transaction';
import { User } from '@/store/models/user';
import { Company } from '@/store/models/company';
import Header from '../common-components/Header.vue';

export default defineComponent({
  name: 'ExpenseSummary',
  components: {
    Header
  },
  data(){
    return {
      custom_range : false,
      from : '',
      to : ''
    }
  },
  created: async function(){
    await this.getTransactions()
    await this.getUserData()
  },
  computed:{
    ...mapGetters({
        transactions : 'getTransactions',
        user: 'getUser'
    }),
    dateValidation: function(): string | null {
      if(this.from !== undefined && this.to !== undefined && 
        this.from !=='' && this.to !== '' &&
        Date.parse(this.from) <= Date.parse(this.to)
      ){
        return null;
      }

      return 'invalid date range';
    },
    totalExpense: function(): string {
      const trans: Transaction[] = this.transactions;
      const requester_company = this.user.company.id;
      let sum = 0.00;
      if(trans !==undefined && requester_company !==undefined ){
        trans.map( function(element: Transaction) {
            if(element){
              if(element.payor){
                  const payor = element.payor as User;
                  const company = payor.company as Company;
                  const company_id = company.id;

                   if(element.amount && company_id === requester_company && parseFloat(element.amount)<0) {
                     sum = sum + parseFloat(element.amount);
                   }
              }
            }
        });
      }
      return Math.abs(sum).toFixed(4);
    },
    getBalance: function(): number {

      if(this.user.company && this.user.company.balance)
        return this.user.company.balance;        

      return 0;
    }
  },
  methods:{
    ...mapActions({
       getTransactions : ActionTypes.FETCH_TRANSACTIONS,
       getUserData: ActionTypes.USER_DATA
    }),
    fetchTrans: async function(){
      if(this.custom_range){
         if (this.dateValidation === null)
           await this.getTransactions({start_date:this.from, end_date:this.to})
      }
      else
        await this.getTransactions()
    },
  }
});
</script>

<style lang="scss" scoped>
  .filter-grid {
    display: grid;
    grid-template-columns: 1fr 0.5fr 2fr 0.5fr 2fr 1fr;
    grid-template-rows: 1fr;
    gap: 0.1em 0.1em;
    grid-template-areas:
    "sw ls s-i le e-i b"
  }

  .sw .custom-radio {
    grid-area: sw;
    font-size: 15px;
  }
  .ls {grid-area: ls;}
  .s-i {grid-area: s-i;}
  .le {grid-area: le;}
  .e-i {grid-area: e-i;}
  .b {grid-area: b;}

  #Balance-information {
    display: grid;
    grid-template-columns: 0.3fr 1fr 0.3fr 1fr;
    grid-template-rows: 1fr 1fr;
  }

  .btn-mr{
    margin: 10px;
  }

  .btn-mr-inner{
    margin: 1px 1px 1px 5px;
  }

  .pr-var-mr {
    margin: 10px;
  }

  #company-type {
    width: $w200;
    margin-left: 5%;
  }

  #delete-table td {
    border: none;
  }

  #delete-table tr:nth-child(even) {
    background-color: $white-color;
  }

  .pad-label {
    padding: 20px 20px 20px 0px;
  }

  .mr-l {
    margin-left: 10px;
  }

  .box1-tab {
    overflow-y: auto;
    height: $order-item-table-height;
  }
</style>
