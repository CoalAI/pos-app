<template>
  <div id="expense">
    <div class="diff-shadow">
      <h2>Expense (To Be Implemented)</h2>
      <div class="flex-box">
        <label class="pad-label w100" for="products">
          <strong>Company:</strong>
        </label>
        <select
          id="company-type"
          name="company-type"
          class="custom-select"
          v-model="company"
          @change="onChangeCompany"
        >
          <option :value="0">None</option>
          <option class="batches-op" v-for="item in companies" v-bind:key="item.id" v-bind:value="item.id">
            {{item.company_name}}
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
            v-model="balance"
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
            v-model="amount"
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
            v-model="description"
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
          style="width: 150px">Add Expense</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from'vuex';

import { ActionTypes as AuthActionTypes } from '@/store/modules/auth/actions';
import { Company } from '@/store/models/company';

export default defineComponent({
  name: 'Expense',
  data() {
    return {
      company: 0,
      balance: 0,
      amount: '',
      expenseMethod: 'credit',
      description: ''
    }
  },
  computed: {
    amountValidation: function () {
      let errorMessage = null;
      if (this.amount === '') {
        errorMessage = 'Amount is required';
      }
      else if (this.amount !== undefined) {
        const value = parseFloat(this.amount);
        if (isNaN(value)) 
        {
          errorMessage = 'Only numbers are allowed';
        }
      }
      return errorMessage;
    },

    descriptionValidation: function () {
      let errorMessage = null;
      if (this.description === '') {
        errorMessage = 'Description is required';
      }
      return errorMessage;
    },

    ...mapGetters({
      companies: 'getCompanies'
    })
  },
  methods: {
    onChangeCompany: async function () {
      if (this.company && this.company > 0) {
        const currentCompany = this.companies.find((item: Company) => item.id == this.company)
        this.balance = currentCompany &&  currentCompany.credit ?  currentCompany.credit : 0;
      }
    },

    ...mapActions({
      fetchCompanies: AuthActionTypes.FETCH_COMPANIES
    })
  },
  async beforeMount () {
    await this.fetchCompanies();
    if (this.companies && this.companies.length > 0) {
      this.company = this.companies[0].id;
      this.balance = this.companies[0].credit ? this.companies[0].credit : 0;
    }
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
