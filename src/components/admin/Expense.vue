<template>
  <Alert v-if="create_expense" type="success" >"Transaction Successful!"</Alert>
  <div id="expense">
    <!--<div class="diff-shadow">-->
    <div class="diff-shadow">
      <h2 class="head">Finance</h2>
      <div class="page-upper">
        <ul class="nav nav-tabs">
          <li :class="expenseMethod === 'Received' ? 'active-li ab1' : 'ab1'" @click="expenseMethod = 'Received'">
            <span>
              <strong>Cash Received</strong>
            </span>
          </li>
          <li :class="expenseMethod === 'Debit' ? 'active-li ab1 tab2' : 'ab1 tab2'" @click="expenseMethod = 'Debit'">
            <span>
              <strong>Debit</strong>
            </span>
          </li>
          <li :class="expenseMethod === 'Credit' ? 'active-li ab1 tab3' : 'ab1 tab3'" @click="expenseMethod = 'Credit'">
            <span >
              <strong>Credit</strong>
            </span>
          </li>
            <li :class="expenseMethod === 'Journal Entry' ? 'active-li ab1 tab4' : 'ab1 tab4'" @click="expenseMethod = 'Journal Entry'">
            <span>
              <strong>Journal Entry</strong>
            </span>
          </li>
          <li :class="expenseMethod === 'Expense' ? 'active-li ab1 tab5' : 'ab1 tab5'" @click="expenseMethod = 'Expense'">
            <span>
              <strong>Expense</strong>
            </span>
          </li>
        </ul>
      </div>
    
      <!-- <h2>{{expenseMethod}}</h2> -->
      <template v-if="expenseMethod === 'Received'">
        <div class="first-row row">
          <div class="left">
            <label for="products" style="padding-left: 8px">
              <strong>Payor:</strong>
            </label>
            <div class="ab-select-container">
              <select
                id="user-dropdown"
                name="user-dropdown"
                class="custom-select"
                v-model="transaction.payor"
              >
                <option :value="-1">SELF</option>
                <option disabled>---User---</option>
                <option class="batches-op" v-for="item in creditUsers"
                  v-bind:key="item.id" v-bind:value="item.id">
                  <span>{{item?.username}}  {{item?.company?.company_name}}</span>
                </option>
              </select>
            </div>
          </div>
        
          <div class="right">
            <label for="balance">
              <strong>Balance:</strong>
            </label>
            <div class="ab-input-container">
              <input
                name="balance"
                type="text"
                placeholder="00"
                v-model="userdata.company.balance"
                readonly
              />
            </div>
          </div>
        </div>
      </template>
      <template v-if="expenseMethod === 'Debit' || expenseMethod === 'Credit'">
        <div class="first-row row">
          <div class="left">
            <label for="products" style="padding-left: 8px">
              <strong>Payee:</strong>
            </label>
            <div class="ab-select-container">
              <select
                id="user-dropdown"
                name="user-dropdown"
                class="custom-select" 
                v-model="transaction.payee"
              >
                <option :value="-1">SELF</option>
                <option disabled>--- username - company ---</option>
                <option class="batches-op" v-for="item in users" v-bind:key="item.id" v-bind:value="item.id">
                  <span>{{item?.username}} -  {{item?.company?.company_name}}</span>
                </option>
                <template v-if="userdata.company.company_type == 'STORE'">
                  <option disabled>--- vendor - phone - company ---</option>
                  <option class="batches-op" v-for="item in vendors" v-bind:key="item.id" v-bind:value="item.id">
                    <span>{{item.first_name}} - {{item.username}} -  {{item?.company?.company_name}}</span>
                  </option>
                </template>
              </select>
            </div>
          </div>
          <div class="right">
            <label for="balance">
              <strong>Balance:</strong>
            </label>
            <div class="ab-input-container">
              <input
                name="balance"
                type="text"
                placeholder="00"
                v-model="userdata.company.balance"
                readonly
              />
            </div>
          </div>
        </div>
      </template>
      <template v-if="expenseMethod === 'Debit' || expenseMethod === 'Credit' || expenseMethod === 'Received'">
        
        <div class="second-row row">
          <div class="left">
            <label for="amount">
              <strong><strong id="req_sign">*</strong>{{expenseMethod}} amount:</strong>
            </label>
            <div class="ab-input-container">
              <input
                name="amount"
                type="number"
                placeholder="00"
                v-model="transaction.amount"
              />
              <span v-if="amountrequired_error" class="form-error">{{ amountrequired_error }}</span><br>
              <span v-if="numberallowd_error" class="form-error">{{ numberallowd_error }}</span>
            </div>
          </div>
        </div>
        <div class="third-row row">
          <div class="left">
            <label for="description">
              <strong><strong id="req_sign">*</strong>Description:</strong>
            </label>
            <div class="textarea-container">
              <textarea
                name="description"                
                placeholder="Description"
                v-model="transaction.description"
              ></textarea>
              <span v-if="descriptionrequired_error" class="form-error">{{ descriptionrequired_error }}</span>
            </div>
          </div>
        </div>
        <div style="text-align: center; margin-top:2%">
          <button
            class="ab_btn btn-orange"
            style="margin-right: 20px" @click="addExpense">Add Expense</button>
            <router-link
            to="/"
            class="btn-blue"
          >Cancel</router-link>
        </div>
      </template>
      <template v-if="expenseMethod === 'Journal Entry'">
        <div class="first-row row">
          <div class="left">
            <label for="products">
              <strong>Payor:</strong>
            </label>
            <div class="ab-select-container">
              <select
                id="user-dropdown"
                name="user-dropdown"
                v-model="transaction.payor"
              >
                <option :value="-1">SELF</option>
                <option disabled>---User---</option>
                <option class="batches-op" v-for="item in creditUsers"
                  v-bind:key="item.id" v-bind:value="item.id">
                  <span>{{item?.username}}  {{item?.company?.company_name}}</span>
                </option>
              </select>
            </div>
          </div>
          <div class="right">
            <label for="products"  style="padding-left: 15px;">
              <strong>Payee:</strong>
            </label>
            <div class="ab-select-container">
              <select
                id="user-dropdown"
                name="user-dropdown"
                v-model="transaction.payee"
              >
                <option :value="-1">SELF</option>
                <option disabled>--- username - company ---</option>
                <option class="batches-op" v-for="item in users" v-bind:key="item.id" v-bind:value="item.id">
                  <span>{{item?.username}} -  {{item?.company?.company_name}}</span>
                </option>
                <template v-if="userdata.company.company_type == 'STORE'">
                  <option disabled>--- vendor - phone - company ---</option>
                  <option class="batches-op" v-for="item in vendors" v-bind:key="item.id" v-bind:value="item.id">
                    <span>{{item.first_name}} - {{item.username}} -  {{item?.company?.company_name}}</span>
                  </option>
                </template>
              </select>
            </div>
          </div>
        </div>
        <div class="second-row row">
          <div class="left">
            <label for="products">
              <strong>Dept:</strong>
            </label>
            <div class="ab-select-container">
              <select
                id="user-dropdown"
                name="user-dropdown"                
                v-model="company.name"
              >
                <option disabled>--- department ---</option>
                <option class="batches-op" v-for="company in companies" v-bind:key="company.id" v-bind:value="company.company_name">
                  {{company.company_name}}
                </option>
              </select>
            </div>
          </div>
          <div class="right">
            <label for="amount">
              <strong><strong id="req_sign">*</strong>Amount:</strong>
            </label>
            <div class="ab-input-container">
              <input               
                name="amount"
                type="number"
                placeholder="00"
                v-model="transaction.amount"
              />
              <span v-if="amountrequired_error" class="form-error">{{ amountrequired_error }}</span>
            </div>
          </div>
        </div>
        <div style="text-align: right; padding-bottom: 20px">
          <button
            class="ab_btn btn-orange"
             @click="addDept">Add</button>
        </div>
        <table>
          <thead>
            <tr class="fr-row header">
              <th style="border-radius: 10px 0px 0px 10px" scope="col">Dept Name</th>
              <th style="border-radius: 0px 10px 10px 0px" scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="a in table" :key="a.id" class="fr-row content">
              <td>{{a.dept}}</td>
              <td>{{a.amount}}</td>
            </tr>
          </tbody>
        </table>
        <div style="text-align: center; padding-top:20px">
          <button
            class="btn-blue"
            style="width: 150px">Submit</button>
        </div>
      </template>
      
    </div>
  </div>
  <Loader v-show="loader"></Loader>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from'vuex';

import { ActionTypes as AuthActionTypes } from '@/store/modules/auth/actions';
import { Transaction } from '@/store/models/transaction';
import Alert from '@/components/common-components/Alert.vue'
import Loader from '@/components/common-components/Loader.vue'
import { User } from '@/store/models/user';
import { Request } from '@/store/models/request';
import { ActionTypes as OrderActionTypes } from '@/store/modules/order/actions';

export default defineComponent({
  name: 'Expense',
  components: {
    Alert,
    Loader
  },
  data() {
    return {
      numberallowd_error: '',
      amountrequired_error: '',
      descriptionrequired_error: '',
      expenseMethod: 'Received',
      transaction: {
        payor:-1,
        payee:-1,
        amount:'',
        transaction_id:'',
        description:'',
        clear: function() {
          this.payor = -1;
          this.payee = -1;
          this.amount = '';
          this.transaction_id = '',
          this.description = ''
        }
      }, 
      create_expense : false,
      loader: false,
      dept:'',
      table:[{
        amount:'',
        dept:''
      }],
      company:{
        name:''
      }
    }
  },
  computed: {
    creditUsers: function (): User[] {
      let users = []
      if (this.userdata.company.company_type == 'RETIAL') {
        users = this.users.filter((usr: User) => usr && usr.user_type && usr.user_type == 'REGULAR_CUSTOMER');
      } else if (this.userdata.company.company_type == 'STORE') {
        users = this.users.filter((usr: User) => usr && usr.company
          && typeof usr.company !== 'number' && usr.company.company_type == 'STORE');
        users = [
          ...users,
          ...this.vendors,
        ];
      }
      return users;
    },

    ...mapGetters({
      users: 'getListOfUsers',
      userdata: 'getUser',
      expense: 'getExpense',
      vendors: 'getListOfVendors',
      companies: 'getInventoryCompanies',
    })
  },
  methods: {
    ...mapActions({
      fetchUsers: AuthActionTypes.GET_All_USERS,
      fetchUserData: AuthActionTypes.USER_DATA,
      createExpense: AuthActionTypes.CREATE_EXPENSE,
      getVendors: AuthActionTypes.FETCH_VENDORS,
      createRequest: OrderActionTypes.CREATE_REQUEST,
      fetchCompanies: AuthActionTypes.FETCH_ALL_COMPANIES,
    }),
    amound_validation: function(){
      if (this.transaction.amount === '') {
        this.amountrequired_error = 'Amount is required';
        return false
      }
      else{
        this.amountrequired_error = ''
        return true
      }
    },
    numbers_allowed_validation: function(){      
      if (this.transaction.amount !== '' && this.transaction.amount !== undefined) {
        const value = parseFloat(this.transaction.amount);
        if (isNaN(value)) 
        {
          this.numberallowd_error = 'Only numbers are allowed';
          return false
        }
        else{
          this.numberallowd_error = ''
          return true
        }
      }
    },
    description_validation: function(){
      if (this.transaction.description === '') {
        this.descriptionrequired_error = 'Description is required';
        return false
      }
      else{
        this.descriptionrequired_error = ''
        return true
      }
    },
    allValidation: function(){
      if(this.amound_validation() && 
        this.numbers_allowed_validation() && 
        this.description_validation())
      {
        return true
      }
      else{
        return false
      }
    },
    addExpense: async function(){
      if(this.allValidation()){

        if (this.expenseMethod === 'Received') {
          this.transaction.payee = this.userdata.id;
          this.transaction.payor = this.transaction.payor === -1 ? this.userdata.id : this.transaction.payor;
        } else if (this.expenseMethod === 'Debit') {
          this.transaction.payor = this.userdata.id;
          this.transaction.payee = this.transaction.payee === -1 ? this.userdata.id : this.transaction.payee;
          this.transaction.amount = (-parseFloat(this.transaction.amount)).toString();
        }
        this.loader = true;
        await this.createExpense(this.transaction as Transaction).finally(() => this.loader = false);
        this.create_expense = this.expense && this.expense.id;

        this.transaction.clear();
        await this.fetchUserData();
      }
    },
    addDept: async function(){
      if(this.amound_validation()){
        this.table.push({amount:this.transaction.amount,dept:this.company.name})
      }
    },
  },
  async beforeMount () {
    await this.fetchUsers();
    await this.getVendors();
    await this.fetchUserData();
    await this.fetchCompanies();
  },

});
</script>

<style lang="scss" scoped>
#expense {
    padding: 1.65% 24%;
}
.diff-shadow{
  padding: 1.65% 3.56%;
}

// ab css
.nav-tabs{
  position: relative;
  border:none;
  color: black !important;
}
.nav-tabs > button{
width: 22%;
padding: 0.5rem 1rem;
background-color: #f5f2f2;
border-radius: 20px;
font-size: 13px;
border: none;
outline: none;
font-weight: 500;
}
.nav-tabs > button:first-child a{
  padding: 0.5rem 48px;
}
.nav-tabs > button a{
  padding: 0.5rem 0;
  text-decoration: none;
  color: black;
}
.nav-tabs > .active-li{
  z-index: 10;
  background-color: $primary-color;
  color: white;
}
// btn alignmnet
.nav-tabs > button{
  position: absolute;
}
.ab2{
  left: 138px;
}
.ab3{
  left: 290px;
}
.ab4{
  left: 443px;
}
.ab5{
  left: 599px;
}

.page-upper{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 60px;
}
.page-upper > .right-cont{
  width: 30%;
}
.page-upper > .right-cont > .flex-box{
  align-items: baseline;
  width: 100%;
}
.page-upper > .right-cont > .flex-box > label{
  margin-right: 10px;
  font-size: 13px;
  // font-weight: 500;
}

  // page upper ul designs;
  // normalization
  .page-upper > .nav-tabs{
    border: none;
    position: relative;
  }
  .page-upper > .nav-tabs > li{
    width: 150px;
    padding: 0.5rem 1rem;
    background-color: #f5f2f2;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
  }
  // active
  .page-upper > .nav-tabs > .active-li{
    z-index: 10;
    background-color: $primary-color;
    color: white;
    text-align: center;
  }
  .page-upper > .custom-toggle-btn-ab{
    display: flex;
    align-items: center;
    list-style-type: none;
  }
  .ab1{
    text-align: center;
    position: absolute;
  }
  .tab2{
    left: 124px;
  }
  .tab3{
    left: calc(124px * 2);
    width: 168px !important;
  }
  .tab4{
    left: calc(127px * 3);
    width: 180px !important;
  }
  .tab5{
    left: calc(130px * 4);
    width: 173px !important;
  }
  @media Screen and (max-width: 1375px){
    .diff-shadow{
      width: 62vw;
    }
  }
  @media Screen and (max-width: 1164px){
    .diff-shadow{
      width: 72vw;
    }
  }
  // ab css rows desgins
  .row{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin: 0;
  }
  .left{
    width: 48%;
    display: flex;
    align-items: baseline;
  }
  .right{
    width: 48%;
    display: flex;
    align-items: baseline;
  }
  .ab-select-container > select{
    padding: 8px 18px;
    border-radius: 10px;
    font-size: 12px;
  }
  .ab-input-container > input[type=text]{
    padding: 8px 18px;
    border-radius: 10px;
    font-size: 0.75em;
  }
  .ab-input-container > input[type=number]{
    padding: 8px 18px;
    border-radius: 10px;
    font-size: 0.75em;
  }
  .ab-input-container{
    width: 60%;
    flex-grow: 1
  }
  .ab-select-container{
    width: 60%;
    flex-grow: 1
  }
  .row  label{
    // margin-right: 50px;
    width: 35%;
    font-size: 0.875em;
  }
  .form-error{
    font-size: 0.7em; 
  }
  .third-row .left{
    width: 100%;
    align-items: flex-start;
  }
  .third-row .left label{
    width: 16.5%;
  }

  .textarea-container{
    flex-grow: 1;
  }
  .textarea-container > textarea{
    border-radius: 6px;
  }
  #req_sign{
    color: red;
  }
  // ab btn css
  .ab_btn{
    color: $white-color;
    text-decoration: none;
    padding: 4px 22px;
    cursor: pointer;
    font-size: $btn-font-size;
    border: 1.5px solid $primary-color !important;
    border-radius: 20px;
    outline:none;
  }
  .ab_btn:hover{
    background-color: white;
    color: $primary-color;
    border: 1.5px solid $primary-color;
  }
  .btn-blue{
    background-color:#0f2636;
    border-radius: 20px;
    padding: 6px 48px;
    border: 1.5px solid #0f2636 !important;
  }
  .ab_blue_hover:hover{
    color: #0f2636;
    background-color: white;
    border: 1.5px solid #0f2636;
  }
  .btn-blue{
    text-decoration: none;
    text-align: center;
    background-color:#0f2636;
    font-size: 12px;
    border-radius: 20px;
    padding: 6px 40px;
    cursor: pointer;
    color:$white-color;
    border: 1.5px solid #0f2636 !important;
  }
  // hover blue
  .btn-blue:hover{
    color: #0f2636;
    background-color: white;
    border: 1.5px solid #0f2636;
  }
// ////////////////////////////
  .pad-label {
    padding: 13px 20px 20px 0px;
    font-family:seg;
    font-size:12px;
    width: 113px;
  }


  .w100 {
    width: $w150;
  }

  label {
    text-align: left;
  }

  .full-width {
    width: 100%;
  }

  .checkbox-label {
    font-size: $label-font-size;
  }
  .navbar{
    margin-left:50px;
  }
  .nav {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
  }

  .nav-tabs {
    border-bottom: 1px solid #dee2e6;
  }

  .nav-tabs .nav-item {
    margin-bottom: -1px;
    width: 25%;
  }

  .nav-tabs .nav-item.show .nav-link, .nav-tabs {
    color: $primary-color;
    background-color: #e7e8ea;
    border-color: #dee2e6 #dee2e6 #fff;
  }
  .nav-item{
    background:#e5e9ea;
    border-radius: 30px;
    width:113px;
    text-align:center;
    padding:0.2rem 0.5rem !important;
    cursor:pointer;
  }
  .nav-link.active{
    background: #e43d2a;
    color:white;
    border-radius: 30px;
 }
 .nav-link.active:hover{
   color:white;
 }

  .nav-tabs .nav-link {
    border: 1px solid transparent;
    border-top-left-radius: .25rem;
    border-top-right-radius: .25rem;
  }

  .nav-link {
    color: #495057;
    display: block;
    padding: .5rem 1rem;
    font-family:seg;
  }
  td {
  text-align: center;
  }
  th {
  text-align: center;
  }
  .head{
    margin-bottom: 28px;
    color: $primary-color;
    text-align: center;
  }
  .blue{
    background-color: #0f2636;
  }
.form-error{
  font-family:seg;
  display:block;
}
.mr-b{
  margin-bottom:3%;
}
.fr-row{
  
  font-size: 12px;
  font-family: seg;
}
.header{
  
  border-radius: 5px;
  background-color: #0f2634; 
  color: white;
}
.header > th:first-child{
  border: none;
  border-right: 1px solid grey;
  border-radius: 10px 0px 0px 10px;
}
.header > th:last-child{
  border: none;
  border-radius: 0px 10px 10px 0px;
}
.content{
  background-color: white; 
  color: #0f2634;
}
</style>
