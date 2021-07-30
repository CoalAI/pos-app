<template>
  <Alert v-if="create_expense" type="success" >"Transaction Successful!"</Alert>
  <div id="expense">
    <div class="diff-shadow">
      <ul class="nav nav-tabs">
        <li class="nav-item" @click="expenseMethod = 'Credit'">
          <span :class="expenseMethod === 'Credit' ? 'nav-link active' : 'nav-link'">
            <strong>Cash Received</strong>
          </span>
        </li>
        <li class="nav-item" @click="expenseMethod = 'Debit'">
          <span :class="expenseMethod === 'Debit' ? 'nav-link active' : 'nav-link'">
            <strong>Debit</strong>
          </span>
        </li>
        <!-- <li class="nav-item" @click="expenseMethod = 'Expense'">
          <span :class="expenseMethod === 'Expense' ? 'nav-link active' : 'nav-link'">
            <strong>Expense</strong>
          </span>
        </li> -->
      </ul>
      <h2>{{expenseMethod}}</h2>
      <div class="flex-box">
        <label class="pad-label w100" for="products">
          <strong>Payee:</strong>
        </label>
        <select
          id="user-dropdown"
          name="user-dropdown"
          class="custom-select"
          v-model="transaction.payee"
        >
          <option :value="-1">SELF</option>
          <option disabled>--- username - company ---</option>
          <option class="batches-op" v-for="item in users" v-bind:key="item.id" v-bind:value="item.id">
            <span>{{item.username}} - {{item.company.company_name}}</span>
          </option>
          <template v-if="expenseMethod === 'Expense'">
            <option disabled>--- vendor - phone - company ---</option>
            <option class="batches-op" v-for="item in vendors" v-bind:key="item.id" v-bind:value="item.id">
              <span>{{item.first_name}} - {{item.username}} - {{item.company.company_name}}</span>
            </option>
          </template>
        </select>
      </div>
      <div class="flex-box">
        <label class="pad-label w100" for="balance">
          <strong>Balance:</strong>
        </label>
        <div class="full-width">
          <input
            name="balance"
            type="text"
            placeholder="Balance of company"
            v-model="userdata.company.balance"
            readonly
          />
          <!-- <span v-if="batchQuantityValidation" class="form-error">{{ batchQuantityValidation }}</span> -->
        </div>
      </div>
      <div class="flex-box">
        <label class="pad-label w100" for="amount">
          <strong>{{expenseMethod}} amount:</strong>
        </label>
        <div class="full-width">
          <input
            name="amount"
            type="number"
            placeholder="Enter amount"
            v-model="transaction.amount"
          />
          <span v-if="amountValidation" class="form-error">{{ amountValidation }}</span>
        </div>
      </div>
      <div class="flex-box">
        <label class="pad-label w100" for="amount">
          <strong>Description:</strong>
        </label>
        <div class="full-width">
          <textarea 
            name="description"
            rows="7"
            placeholder="description"
            v-model="transaction.description"
          ></textarea>
          <span v-if="descriptionValidation" class="form-error">{{ descriptionValidation }}</span>
        </div>
      </div>
      <div style="text-align: right; padding-bottom: 50px">
        <router-link
          to="/"
          style="margin-right: 20px"
          class="btn btn-orange btn-mr btn-link"
        >Cancel</router-link>
        <button
          class="btn btn-orange btn-mr"
          style="width: 150px" @click="addExpense">Add Expense</button>
      </div>
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

export default defineComponent({
  name: 'Expense',
  components: {
    Alert
  },
  data() {
    return {
      expenseMethod: 'Credit',
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
      loader: false
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

    ...mapGetters({
      users: 'getListOfUsers',
      userdata: 'getUser',
      expense: 'getExpense',
      vendors: 'getListOfVendors',
    })
  },
  methods: {
    ...mapActions({
      fetchCompanies: AuthActionTypes.FETCH_COMPANIES,
      fetchUsers: AuthActionTypes.GET_USERS,
      fetchUserData: AuthActionTypes.USER_DATA,
      createExpense: AuthActionTypes.CREATE_EXPENSE,
      getVendors: AuthActionTypes.FETCH_VENDORS,
    }),
    addExpense: async function(){
      if(this.amountValidation==null && this.descriptionValidation == null) {
        this.transaction.payee = this.transaction.payee === -1 ? this.userdata.id : this.transaction.payee;
        this.transaction.amount = this.expenseMethod === 'Credit' ? this.transaction.amount: (-parseFloat(this.transaction.amount)).toString();
        this.transaction.payor = this.userdata.id;
        this.loader = true
        await this.createExpense(this.transaction as Transaction).finally(() => this.loader = false);
        this.create_expense = this.expense && this.expense.id;
        this.transaction.clear();
        await this.fetchUserData();
      }
    },
  },
  async beforeMount () {
    await this.fetchUsers();
    await this.getVendors();
    await this.fetchUserData();
  }
});
</script>

<style lang="scss" scoped>
  #expense {
    padding-left: 15%;
    padding-right: 15%;
    margin-top: 3%;
  }

  .pad-label {
    padding: 20px 20px 20px 0px;
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

  .nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
    color: $primary-color;
    background-color: #fff;
    border-color: #dee2e6 #dee2e6 #fff;
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
  }
</style>
