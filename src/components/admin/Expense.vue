<template>
  <div id="expense">
    <div class="diff-shadow">
      <h2>Expense</h2>
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
          <strong>Amount:</strong>
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
      <div class="flex-box mr-2">
        <p class="checkbox-label w100"><strong>Expense type:</strong></p>
        <label class="custom-radio" style="margin-right: 10px">Credit
          <input type="radio" name="expense_method" value="credit" v-model="expenseMethod">
          <span class="checkmark"></span>
        </label>
        <label class="custom-radio" style="margin-right: 10px">Debit
          <input type="radio" name="expense_method" value="debit" v-model="expenseMethod">
          <span class="checkmark"></span>
        </label>
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
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from'vuex';

import { ActionTypes as AuthActionTypes } from '@/store/modules/auth/actions';
import { Transaction } from '@/store/models/transaction';

export default defineComponent({
  name: 'Expense',
  data() {
    return {
      expenseMethod: 'credit',
      transaction: {
        payor:-1,
        payee:-1,
        amount:'',
        transaction_id:'',
        description:'',
        clear: function(){
           this.payor=-1
           this.payee=-1
           this.amount=''
           this.description=''
        }
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

    ...mapGetters({
      users: 'getListOfUsers',
      userdata: 'getUser'
    })
  },
  methods: {
    ...mapActions({
      fetchCompanies: AuthActionTypes.FETCH_COMPANIES,
      fetchUsers: AuthActionTypes.GET_USERS,
      fetchUserData: AuthActionTypes.USER_DATA,
      createExpense: AuthActionTypes.CREATE_EXPENSE
    }),
    addExpense: async function(){
      this.transaction.payee = this.transaction.payee === -1 ? this.userdata.id : this.transaction.payee;
      this.transaction.amount = this.expenseMethod === 'credit' ? this.transaction.amount: (-parseFloat(this.transaction.amount)).toString();
      this.transaction.payor = this.userdata.id;
      await this.createExpense(this.transaction as Transaction);
      this.$router.go(0)
    }
  },
  async beforeMount () {
    await this.fetchUsers();
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
</style>
