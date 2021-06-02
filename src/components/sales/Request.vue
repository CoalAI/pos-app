<template>
  <div id="request">
    <div class="diff-shadow">
      <h2>Send Request</h2>
      <Alert type="success" v-if="created">{{created}}</Alert>
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
        <label class="pad-label w100" for="users">
          <strong>User:</strong>
        </label>
        <div class="full-width">
          <select
            id="users"
            name="users"
            class="custom-select"
            v-model="requestee"
          >
            <option :value="0">None</option>
            <option class="batches-op" v-for="item in users" v-bind:key="item.id" v-bind:value="item.id">
              {{item.username}}
            </option>
          </select>
          <span v-if="requesteeValidation" class="form-error">{{ requesteeValidation }}</span>
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
          <option v-for="rType in requestTypes" v-bind:key="rType" v-bind:value="rType">
            {{ rType }}
          </option>
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
          :disabled="addBtn"
          @click="addRequestbtn"
          class="btn btn-orange btn-mr"
          style="width: 150px">Send Request</button>
      </div>
      <Loader v-show="loader"></Loader>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from'vuex';

import Loader from '@/components/common-components/Loader.vue';
import Alert from '@/components/common-components/Alert.vue';
import { ActionTypes as AuthActionTypes } from '@/store/modules/auth/actions';
import { ActionTypes as OrderActionTypes } from '@/store/modules/order/actions';
import { Request } from '@/store/models/request';

export default defineComponent({
  name: 'Request',
  components: {
    Loader,
    Alert
  },

  data() {
    return {
      loader: false,
      company: 0,
      requestee: 0,
      requestType: 'SPECIAL_ORDER',
      delivery: '',
      description: '',
      created: ''
    }
  },
  computed: {
    companyValidation: function () {
      let errorMessage = null;
      if (this.companies.length <= 0) {
        errorMessage = "Comapny is required. Add store to system"
      }
      return errorMessage;
    },

    requesteeValidation: function () {
      let errorMessage = null;
      if (this.users.length <= 0) {
        errorMessage = "Requestee is required. Add selected store's user to system"
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

    addBtn: function () {
      let disable = true;
      if ( this.companyValidation === null &&
      this.requesteeValidation === null &&
      this.deliveryValidation === null &&
      this.descriptionValidation === null) {
        disable = false;
      }
      return disable
    },

    ...mapGetters({
      companies: 'getCompanies',
      requestTypes: 'getRequestTypes',
      userData: 'getUser',
      users: 'getListOfUsers',
      requestSent: 'getRequest',
    })
  },
  methods: {
    onChangeCompany: async function () {
      if (this.company > 0) {
        await this.getUsers({
          company: this.company
        });
        if (this.users && this.users.length > 0) {
          this.requestee = this.users[0].id;
        }
      }
    },

    addRequestbtn: async function () {
      this.loader = true;
      const request: Request = {
        requester: this.userData.id,
        requestee: this.requestee,
        expected_delivery_date: this.delivery,
        description: this.description,
        request_type: this.requestType,
      };

      await this.createRequest(request);

      this.delivery = '';
      this.description = '';
      this.requestType = 'SPECIAL_ORDER';
      this.loader = false;

      this.created = '';
      if (this.requestSent && this.requestSent.id) {
        this.created = `Request is sent. Request id is ${this.requestSent.id}`;
      }
    },

    ...mapActions({
      fetchCompanies: AuthActionTypes.FETCH_COMPANIES,
      fetchTypes: AuthActionTypes.FETCH_TYPES,
      createRequest: OrderActionTypes.CREATE_REQUEST,
      getUserData: AuthActionTypes.USER_DATA,
      getUsers: AuthActionTypes.GET_USERS,
    })
  },
  async beforeMount () {
    await this.getUserData();
    await this.fetchTypes();
    await this.fetchCompanies({
      company_type: 'STORE',
      search: ''
    });
    if (this.companies && this.companies.length > 0) {
      this.company = this.companies[0].id;
      await this.onChangeCompany();
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
