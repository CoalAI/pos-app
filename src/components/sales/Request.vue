<template>
  <div id="request">
    <div class="diff-shadow">
      <h2>Send Request (To Be Implemented)</h2>
      <div class="flex-box">
        <label class="pad-label w100" for="products">
          <strong>Company:</strong>
        </label>
        <div class="full-width">
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
          <span v-if="companyValidation" class="form-error">{{ companyValidation }}</span>
        </div>
      </div>
      <div class="flex-box">
        <label class="pad-label w100" for="balance">
          <strong>Balance:</strong>
        </label>
        <select
          id="company-type"
          name="company-type"
          class="custom-select"
          v-model="requestType"
        >
          <option value="">Special order</option>
          <option value="1">User Changes</option>
        </select>
      </div>
      <div class="flex-box">
        <label class="pad-label w100" for="delivery">
          <strong>Delivery:</strong>
        </label>
        <div class="full-width">
          <input
            name="delivery"
            type="date"
            v-model="delivery"
          />
          <span v-if="deliveryValidation" class="form-error">{{ deliveryValidation }}</span>
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
          style="width: 150px">Send Request</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from'vuex';

import { ActionTypes as AuthActionTypes } from '@/store/modules/auth/actions';

export default defineComponent({
  name: 'Request',
  data() {
    return {
      company: 0,
      requestType: '',
      delivery: '',
      description: ''
    }
  },
  computed: {
    companyValidation: function () {
      let errorMessage = null;
      if (this.companies.length <= 0) {
        errorMessage = "Comapny is required. Add vendor comapany to system"
      }
      return errorMessage;
    },

    deliveryValidation: function () {
      let errorMessage = null;
      if (this.delivery === '') {
        errorMessage = 'Delivery is required';
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
    ...mapActions({
      fetchCompanies: AuthActionTypes.FETCH_COMPANIES
    })
  },
  async beforeMount () {
    await this.fetchCompanies({
      company_type: 'STORE',
      search: ''
    });
    if (this.companies && this.companies.length > 0) {
      this.company = this.companies[0].id;
    }
  }
});
</script>

<style lang="scss" scoped>
  #request {
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
