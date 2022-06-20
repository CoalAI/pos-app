<template>
  <div class="summary-container">
    <div class="diff-shadow">
      <div class="page-upper">
        <div class="page-upper-left">
          <div>
            <input type="radio" name="order_type" value="from" :checked="!custom_range"  @change="custom_range=false">
            <label for="">Daily</label>
          </div>
          <div>
            <input type="radio" name="order_type" value="to" :checked="custom_range" @change="custom_range=true">
            <label for="">Custom</label>
          </div>
        </div>
        <div class="page-upper-right">
          <div class="pur_1">
            <label class="" for="start_date">
              Start:
            </label>
            <div class="ab-input-container">
              <input
                name="start_date"
                type="date"
                v-model="from"
              />
              <span v-if="date_validation_error" class="form-error">{{date_validation_error}}</span>
            </div>
          </div>
          <div class="pur_2">
            <label class="" for="end_date">
              End:
            </label>
            <div class="ab-input-container">
              <input
                name="end_date"
                type="date"
                v-model="to"
                @change=dateValidation
              />
            </div>
          </div>
        </div>
      </div>
      <div class="ab-mb-7">
        <table>
          <colgroup>
            <col span="1" style="width: 2%;">
            <col span="1" style="width: 10%;">
            <col span="1" style="width: 7%;">
            <col span="1" style="width: 7%;">
            <col span="1" style="width: 10%;">
            <col span="1" style="width: 15%;">
            <col span="1" style="width: 5%;">
            <col span="1" style="width: 5%;">
            <col span="1" style="width: 7%;">
            <col span="1" style="width: 7%;">
          </colgroup>
          <tr class="fr-row header">
            <th>Sr No.</th>
            <th>Transaction ID</th>
            <th>Payor</th>
            <th>Payee</th>           
            <th>Payment Service</th>
            <th>Description</th>
            <th>Credit</th>
            <th>Debit</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
          <template v-for="(transaction,index) in transactions" :key="transaction.id">
            <tr class="fr-row content">
              <td>{{index+1}}</td>
              <td>{{transaction.transaction_id ? transaction.transaction_id : '-'}}</td>
              <td>{{transaction.payor.username}} - {{transaction.payor.company.company_name}}</td>
              <td>{{transaction.payee.username}} - {{transaction.payee.company.company_name}}</td>
              <td>{{transaction.payment_service ? transaction.payment_service : '-' }}</td>
              <td>{{transaction.description ? transaction.description : '-'}}</td>
              <template v-if="transaction.amount > 0">
                <td>{{trimNumber(transaction.amount)}}</td>
                <td> - </td>
              </template>
              <template v-else>
                <td> - </td>
                <td>{{trimNumber(transaction.amount * -1) ? transaction.ammount : '-'}}</td>
              </template>
              <td>{{trimNumber(transaction.amount) }}</td>
              <td>{{transaction.created.split('T')[0]}}</td>
            </tr>
          </template>
        </table>
      </div>
      <div id="Balance-information">
        <div class="balance-info-1">
          <label class="" for="balance">
            <strong>Current Balance:</strong>
          </label>
          <div class="ab-input-container">
            <input
              name="balance"
              type="text"
              :value="getBalance"
              readonly
            />
          </div>
        </div>
        <div class="balance-info-2">
          <label class="" for="Starting-Balance">
            <strong>Starting Balance:</strong>
          </label>
          <div class="ab-input-container">
            <input
              name="Starting-Balance"
              type="text"
              value="0.0000"
              readonly
            />
          </div>
        </div>
        <div class="balance-info-3">
          <label class="" for="expense">
            <strong>Total Expense:</strong>
          </label>
          <div class="ab-input-container">
            <input
              name="expense"
              type="text"
              :value="totalExpense"
              readonly
            />
          </div>
        </div>
      </div>
      <Paginator :count="counts.transactions" @pageChange="changePage"/>
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
import Paginator from '@/components/common-components/Paginator.vue';

export default defineComponent({
  name: 'ExpenseSummary',
  components: {
    Paginator,
  },
  data(){
    return {
      date_validation_error : '',
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
      user: 'getUser',
      counts: 'getTotalCounts',
    }),
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
    dateValidation: function(): string {
      if(this.from !== undefined && this.to !== undefined && 
        this.from !=='' && this.to !== '' &&
        Date.parse(this.from) <= Date.parse(this.to)
      ){
        return this.date_validation_error = ""
      }

      return this.date_validation_error =  'Invalid date range';
    },

    trimNumber: function(value: string): string{
        return parseFloat(value !== undefined ? value : '0.0').toFixed(2);
    },

    changePage: async function (pageNo: number) {
      if(this.custom_range){
         if (this.date_validation_error === "")
           await this.getTransactions({start_date:this.from, end_date:this.to, page:pageNo})
      }
      else
        await this.getTransactions({page:pageNo})
    },

    fetchTrans: async function(){
      if(this.custom_range){
         if (this.date_validation_error === "")
           await this.getTransactions({start_date:this.from, end_date:this.to})
      }
      else
        await this.getTransactions()
    },
  }
});
</script>

<style lang="scss" scoped>
  #Balance-information {
    display: flex;
    margin-bottom: 70px;
  }
  #Balance-information > div{
    display: flex;
    align-items: baseline;
    margin-right: 20px;
  }
  #Balance-information > div > label{
    font-size: 13px;
    margin-right: 10px;
  }
  #Balance-information .ab-input-container{
    width: 100px;
  }

  // ab css 
  .summary-container{
    max-width: 1140px;
    margin: 0 auto;
  }
  // top designs
  .page-upper{
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  // page upper left designs
  .page-upper-left{
    display: flex;
  }
  .page-upper-left > div{
    display: flex;
    align-items: center;
  }
  .page-upper-left > div:first-child{
    margin-right: 20px;
  }
  .page-upper-left > div > label{
    margin: 0;
    font-size: 13px;
    font-weight: bold;
    margin-left: 10px;
  }

  // input radio designs
  .page-upper-left > div > input[type='radio'] {
    -webkit-appearance:none;
    width:15px;
    height:15px;
    border:1px solid darkgray;
    border-radius:50%;
    outline:none;
    box-shadow:0 0 1px 0px gray inset;
  }
  .page-upper-left > div > input[type='radio']:hover {
      box-shadow:0 0 1px 0px orange inset;
  }
  .page-upper-left > div > input[type='radio']:before {
      content:'';
      display:block;
      width:60%;
      height:60%;
      margin: 20% auto;    
      border-radius:50%;    
  }
  .page-upper-left > div > input[type='radio']:checked:before {
      background:$primary-color;
  }


  // page-upper-right designs
  .page-upper-right{
    display: flex;
  }
  .page-upper-right > div{
    display: flex;
    align-items: baseline;
    width: 50%;
  }
  .page-upper-right > div:first-child{
    margin-right: 20px;
  }
  .page-upper-right > div > label{
    font-size: 13px;
    font-weight: bold;
    margin-right: 10px;
  }

  // pur designs
  .pur_1 > .ab-input-container{
    flex-grow: 1;
  }

  // input type date designs
  .ab-input-container > input[type=date]{
    padding: 8px 18px;
    border-radius: 10px;
    font-size: 0.75em;
  }
  .ab-input-container > input[type=text]{
    padding: 12px 18px;
    border-radius: 10px;
    font-size: 0.75em;
  }

    // table desgins
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
  .ab-mb-7{
    margin-top: 20px;
    margin-bottom: 70px;
  }
  .diff-shadow{
      border: 1px solid #ffffff;
    border-radius: 10px;
    padding: 1em 4rem;
    box-shadow: 1px 1px 5px -1px rgb(0 0 0 / 75%);
}
</style>
