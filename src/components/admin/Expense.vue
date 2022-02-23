<template>
  <Alert v-if="create_expense" type="success" >"Transaction Successful!"</Alert>
  <div id="expense">
    <!--<div class="diff-shadow">-->
      <div class="diff-box">
      <h3 class="head">Finance</h3>

  <nav class="navbar navbar-expand-lg ">
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-item"  @click="expenseMethod = 'Received'" 
        :class="expenseMethod === 'Received' ? 'nav-link active' : 'nav-link'" >
          Cash Received
        </a>
        <a class="nav-item" @click="expenseMethod = 'Debit'" 
        :class="expenseMethod === 'Debit' ? 'nav-link active' : 'nav-link'"  >
          Debit
        </a>
        <a class="nav-item" @click="expenseMethod = 'Credit'" 
        :class="expenseMethod === 'Credit' ? 'nav-link active' : 'nav-link'" >
          Credit
        </a>
        <a class="nav-item"  @click="expenseMethod = 'Journal Entry'" 
        :class="expenseMethod === 'Journal Entry' ? 'nav-link active' : 'nav-link'" >
          Journal Entry
        </a>
      </div>
    </div>
  </nav>
      <!--<ul class="nav nav-tabs">
        <li class="nav-item" @click="expenseMethod = 'Received'">
          <a :class="expenseMethod === 'Received' ? 'nav-link active' : 'nav-link'">
            <strong>Cash Received</strong>
          </a>
        </li>
        <li class="nav-item" @click="expenseMethod = 'Debit'">
          <a :class="expenseMethod === 'Debit' ? 'nav-link active' : 'nav-link'">
            <strong>Debit</strong>
          </a>
        </li>
      </ul>
         <li class="nav-item" @click="expenseMethod = 'Credit'">
          <span :class="expenseMethod === 'Credit' ? 'nav-link active' : 'nav-link'">
            <strong>Credit</strong>
          </span>
         </li>
          <li class="nav-item" @click="expenseMethod = 'Journal Entry'">
          <span :class="expenseMethod === 'Journal Entry' ? 'nav-link active' : 'nav-link'">
            <strong>Journal Entry</strong>
          </span>
        </li>
         <li class="nav-item" @click="expenseMethod = 'Expense'">
          <span :class="expenseMethod === 'Expense' ? 'nav-link active' : 'nav-link'">
            <strong>Expense</strong>
          </span>
        </li>
      </ul>-->
    
      <!--<h2>{{expenseMethod}}</h2>-->
      <template v-if="expenseMethod === 'Received'">
        <div class="flex-box">
          <label class="pad-label" for="products">
            <strong>Payor:</strong>
          </label>
          <select
            id="user-dropdown"
            name="user-dropdown"
            class="custom-select text-box mr-mm"
            v-model="transaction.payor"
          >
            <option :value="-1">SELF</option>
            <option disabled>---User---</option>
            <option class="batches-op" v-for="item in creditUsers"
              v-bind:key="item.id" v-bind:value="item.id">
              <span>{{item?.username}}  {{item?.company?.company_name}}</span>
            </option>
          </select>
        
        <div class="flex-box mr-l">
          <label class="pad-label" for="balance">
            <strong>Balance:</strong>
          </label>
          <div>
            <input
              name="balance"
              class="box"
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
        <div class="flex-box">
          <label class="pad-label " for="products">
            <strong>Payee:</strong>
          </label>
          <select
            id="user-dropdown"
            name="user-dropdown"
            class="custom-select text-box mr-mm" 
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
          
            <div class="flex-box mr-l">
              <label class="pad-label " for="balance">
                <strong>Balance:</strong>
              </label>
            <div>
            <input
              name="balance"
              class="box"
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
        
        <div class="flex-box">
          <label class="pad-label" for="amount">
            <strong>{{expenseMethod}} amount:</strong>
          </label>
          <div>
            <input
              name="amount"
              type="number"
              class="box mr-mi"
              placeholder="00"
              v-model="transaction.amount"
            />
            <span v-if="amountValidation" class="form-error">{{ amountValidation }}</span>
          </div>
        </div>
        <div class="flex-box">
          <label class="pad-label" for="amount">
            <strong>Description:</strong>
          </label>
          <div>
            <textarea 
              name="description"
              rows="7"
              class="box w500"
              placeholder="Description"
              v-model="transaction.description"
            ></textarea>
            <span v-if="descriptionValidation" class="form-error">{{ descriptionValidation }}</span>
          </div>
        </div>
        <div style="text-align: center; margin-top:2%">
          <button
            class="btn-b btn-orange btn-mr"
            style="margin-right: 20px" @click="addExpense">Add Expense</button>
            <router-link
            to="/"
            class="btn-b blue btn-mr btn-link"
          >Cancel</router-link>
        </div>
      </template>
      <template v-if="expenseMethod === 'Journal Entry'">
        <div class="flex-box">
          <label class="pad-label" for="products">
            <strong>Payor:</strong>
          </label>
          <select
            id="user-dropdown"
            name="user-dropdown"
            class="custom-select text-box mr-mi"
            v-model="transaction.payor"
          >
            <option :value="-1">SELF</option>
            <option disabled>---User---</option>
            <option class="batches-op" v-for="item in creditUsers"
              v-bind:key="item.id" v-bind:value="item.id">
              <span>{{item?.username}}  {{item?.company?.company_name}}</span>
            </option>
          </select>
          <label class="pad-label mr-l" for="products">
            <strong>Payee:</strong>
          </label>
          <select
            id="user-dropdown"
            name="user-dropdown"
            class="custom-select text-box mr-mi" 
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
          <div class="flex-box">
          <label class="pad-label" for="products">
            <strong>Dept:</strong>
          </label>
          <select
            id="user-dropdown"
            name="user-dropdown"
            class="custom-select text-box mr-mi"
            v-model="company.name"
          >
            <option disabled>--- department ---</option>
            <option class="batches-op" v-for="company in companies" v-bind:key="company.id" v-bind:value="company.company_name">
              {{company.company_name}}
            </option>
          </select>
        
          <label class="pad-label mr-l" for="amount">
            <strong>Amount:</strong>
          </label>
          <div>
            <input
              class="box mr-mi"
              name="amount"
              type="number"
              placeholder="00"
              v-model="transaction.amount"
            />
            <span v-if="amountValidation" class="form-error">{{ amountValidation }}</span>
          </div>
        </div>
        <div style="text-align: right; padding-bottom: 20px">
          <button
            class="btn-b btn-orange btn-mr"
            style="width: 150px" @click="addDept">Add</button>
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
            class="btn-b blue btn-mr"
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
    amountValidation: function () {
      let errorMessage = null;
      if (this.transaction.amount === '') {
        errorMessage = 'Amount is required';
      }
      else if (this.transaction.amount !== undefined) {
        const value = parseFloat(this.transaction.amount);
        if (isNaN(value)) 
        {
          errorMessage = 'Only numbers are allowed';
        }
      }
      return errorMessage;
    },

    descriptionValidation: function () {
      let errorMessage = null;
      if (this.transaction.description === '') {
        errorMessage = 'Description is required';
      }
      return errorMessage;
    },

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
    addExpense: async function(){
      if(this.amountValidation==null && this.descriptionValidation == null) {

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
     this.table.push({amount:this.transaction.amount,dept:this.company.name})
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
.diff-box{
  border: 1px solid $white-color;
    border-radius: 10px;
    padding: 1em 3em;
    margin-top: 15px;

    -webkit-box-shadow: 1px 1px 5px -1px $login-shodow-color;
    -moz-box-shadow: 1px 1px 5px -1px $login-shodow-color;
    box-shadow: 1px 1px 5px -1px $login-shodow-color;
}
  #expense {   
    padding-left: 22%;
    padding-right: 22%;
    margin-left:5%;
    margin-top: 3%;
  }

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
    font-family:seg;
    color:#e43d2a;
    text-align: center;
    font-weight: bold;
  }
  .blue{
    background-color: #0f2636;
  }
  .btn-b{
    font-family:seg;
  font-size: 12px;
  margin:8px 0px 2px 20px;
  padding:4px 2px 4px 2px;
  border-radius: 20px;
  width: 135px;
  padding:5px;
  cursor: pointer;
  color:$white-color;
  border:none;
  font-weight:bold;
  text-decoration: none;
  }
  .btn-b:focus{
    outline:none;
  }
  .text-box {
  border-radius: 6px;
  font-family: seg;
  font-size: 11px;
  width: 164px;
  height: 30px;
  //margin-top: 15px;
  background-color: #e5e9ea !important;
  border:1px #dddee0 solid;
}
.box{
  font-family:seg;
  font-size:12px;
  padding:5px;
  border-radius:8px;
  border:1px #dddee0 solid;
  width:164px;
  background-color: #e5e9ea !important;
}
.h-50{
  height:50%;
}
.mr-l{
  margin-left:3%;
}
.w500{
  width:458px;
  height:75px;
}
/*.mr-mi{
  margin-left:-4%;
}*/
.mr-mm{
  margin-left:10%;
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
.content{
  background-color: white; 
  color: #0f2634;
}
</style>
