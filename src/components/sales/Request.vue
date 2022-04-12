<template>
  <div id="request">
    <div class="diff-box">
      <h2 class="head">Send Request</h2>
      <Alert type="success" v-if="created">{{ created }}</Alert>
      <div class="flex-box mr-b">
        <div class="rows">
          <span class="required">*</span>
          <label class="pd-lbl" for="products">
            <strong>Company:</strong>
          </label>
          <!--<div class="full-width">-->
          <div>
            <select
              id="company-type"
              name="company-type"
              class="custom-select text-box"
              v-model="company"
              @change="onChangeCompany"
            >
              <option :value="0">None</option>
              <option
                class="batches-op"
                v-for="item in companies"
                v-bind:key="item.id"
                v-bind:value="item.id"
              >
                {{ item.company_name }}
              </option>
            </select>
            <span v-if="companyValidation" class="form-error">{{
              companyValidation
            }}</span>
          </div>
        </div>
        <div class="rows">
          <span class="required">*</span>
          <label class="pd-lbl" for="users">
            <strong>User:</strong>
          </label>
          <!--<div class="full-width">-->
          <div>
            <select
              id="users"
              name="users"
              class="custom-select text-box"
              v-model="requestee"
            >
              <option :value="0">None</option>
              <option
                class="batches-op"
                v-for="item in users"
                v-bind:key="item.id"
                v-bind:value="item.id"
              >
                {{ item.username }}
              </option>
            </select>
            <span v-if="requesteeValidation" class="form-error">{{
              requesteeValidation
            }}</span>
          </div>
        </div>
      </div>
      <div class="flex-box mr-b">
        <div class="rows">
        <span class="required"></span>
        <label class="pd-lbl" for="balance">
          <strong>Balance:</strong>
        </label>
        <div>
          <select
            id="company-type"
            name="company-type"
            class="custom-select text-box"
            v-model="requestType"
          >
            <option
              v-for="rType in requestTypes"
              v-bind:key="rType"
              v-bind:value="rType"
            >
              {{ rType }}
            </option>
          </select>
        </div>
        </div>
        <div class="rows">
          <span class="required">*</span>
          <label class="pd-lbl" for="delivery">
            <strong>Delivery:</strong>
          </label>
          <!--<div class="full-width">-->
          <div>
            <input class="box" name="delivery" type="date" v-model="delivery" />
            <span v-if="deliveryValidation" class="form-error">{{
              deliveryValidation
            }}</span>
          </div>
        </div>
      </div>

      <div class="rowFifth mr-b">
        <span class="required">*</span>
        <label class="pd-lbl w100" for="amount" style="padding-right: 37px;">
          <strong>Description:</strong>
        </label>
        <!--<div class="full-width">-->
        <div>
          <textarea
            name="description"
            rows="7"
            class="box w500"
            placeholder="Description"
            v-model="description"
          ></textarea>
          <span v-if="descriptionValidation" class="form-error">{{
            descriptionValidation
          }}</span>
        </div>
      </div>
      <div style="padding-bottom: 20px; margin-left: 5rem">
        <button
          :disabled="addBtn"
          @click="addRequestbtn"
          class="btn-b btn-orange btn-mr"
          style="width: 150px"
        >
          Send Request
        </button>
        <router-link
          to="/"
          style="margin-right: 20px"
          class="btn-b blue btn-mr btn-link"
          >Cancel</router-link
        >
      </div>
      <Loader v-show="loader"></Loader>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

import Loader from "@/components/common-components/Loader.vue";
import Alert from "@/components/common-components/Alert.vue";
import { ActionTypes as AuthActionTypes } from "@/store/modules/auth/actions";
import { ActionTypes as OrderActionTypes } from "@/store/modules/order/actions";
import { Request } from "@/store/models/request";

export default defineComponent({
  name: "Request",
  components: {
    Loader,
    Alert,
  },
  
  data() {
    return {
      loader: false,
      company: 0,
      requestee: 0,
      requestType: "SPECIAL_ORDER",
      delivery: "",
      description: "",
      created: "",

      showErrorCompany: false,
      showErrorUser: false,
      showErrorDelivery: false,
      showErrorDescription: false,
    };
  },
  computed: {
    companyValidation: function () {
      let errorMessage = null;
      if (this.companies.length <= 0 && this.showErrorCompany == true) {
        errorMessage = "Comapny is required. Add store to system";
      }
      return errorMessage;
    },

    requesteeValidation: function () {
      let errorMessage = null;
      if (this.users.length <= 0 && this.showErrorUser == true) {
        errorMessage = "Requestee is required. Add store's user to system.";
      }
      return errorMessage;
    },

    deliveryValidation: function () {
      let errorMessage = null;
      if (this.delivery === "" && this.showErrorDelivery == true) {
        errorMessage = "Delivery is required";
      }
      return errorMessage;
    },

    descriptionValidation: function () {
      let errorMessage = null;
      if (this.description === "" && this.showErrorDescription == true) {
        errorMessage = "Description is required";
      }
      return errorMessage;
    },

    addBtn: function () {
      let disable = true;
      if (
        this.companyValidation === null &&
        this.requesteeValidation === null &&
        this.deliveryValidation === null &&
        this.descriptionValidation === null
      ) {
        disable = false;
      }
      return disable;
    },

    ...mapGetters({
      companies: "getCompanies",
      requestTypes: "getRequestTypes",
      userData: "getUser",
      users: "getListOfUsers",
      requestSent: "getRequest",
    }),
  },
  methods: {
    
    onChangeCompany: async function () {
      if (this.company > 0) {
        await this.getUsers({
          company: this.company,
        });
        if (this.users && this.users.length > 0) {
          this.requestee = this.users[0].id;
        }
      }
    },

    addRequestbtn: async function () {
      
      this.showErrorCompany= true
      this.showErrorUser= true
      this.showErrorDelivery=true
      this.showErrorDescription=true
      if(this.requesteeValidation == null && this.companyValidation==null &&
        this.deliveryValidation == null &&
        this.descriptionValidation == null)
      {
        this.loader = true;
      const request: Request = {
        sender: this.userData.id,
        receiver: this.requestee,
        expected_delivery_date: this.delivery,
        description: this.description,
        request_type: this.requestType,
      };

      await this.createRequest(request);

      this.delivery = "";
      this.description = "";
      this.requestType = "SPECIAL_ORDER";
      this.loader = false;

      this.created = "";
      if (this.requestSent && this.requestSent.id) {
        this.created = `Request is sent. Request id is ${this.requestSent.id}`;
      }
      }
    },

    ...mapActions({
      fetchCompanies: AuthActionTypes.FETCH_COMPANIES,
      fetchTypes: AuthActionTypes.FETCH_TYPES,
      createRequest: OrderActionTypes.CREATE_REQUEST,
      getUserData: AuthActionTypes.USER_DATA,
      getUsers: AuthActionTypes.GET_USERS,
    }),
  },
  async beforeMount() {
    await this.getUserData();
    await this.fetchTypes();
    await this.fetchCompanies({
      company_type: "STORE",
      search: "",
    });
    if (this.companies && this.companies.length > 0) {
      this.company = this.companies[0].id;
      await this.onChangeCompany();
    }
  },
});
</script>

<style lang="scss" scoped>
#request {
  padding-left: 22%;
  padding-right: 22%;
  margin-left: 5%;
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
.head {
  font-family: seg;
  font-size: 20px;
  font-weight: bold;
  color: #e43d2a;
  text-align: center;
  margin-bottom: 20px;
}
.pd-lbl {
  padding: 13px 20px 20px 0px;
  font-family: seg;
  font-size: 12px;
  width: 113px;
}
.mr-mm {
  margin-left: 10%;
}
.form-error {
  font-family: seg;
  display: block;
  font-size: 9px;
}
.w500 {
  width: 464px !important;
  height: 75px;
}
.text-box {
  border-radius: 6px;
  font-family: seg;
  font-size: 11px;
  width: 164px;
  height: 30px;
  background-color: #e5e9ea !important;
  border: 1px #dddee0 solid;
}
.box {
  font-family: seg;
  font-size: 12px;
  padding: 5px;
  border-radius: 8px;
  border: 1px #dddee0 solid;
  width: 164px;
  background-color: #e5e9ea !important;
}
.diff-box {
  border: 1px solid $white-color;
  border-radius: 10px;
  padding: 1em 3em;
  margin-top: 15px;

  -webkit-box-shadow: 1px 1px 5px -1px $login-shodow-color;
  -moz-box-shadow: 1px 1px 5px -1px $login-shodow-color;
  box-shadow: 1px 1px 5px -1px $login-shodow-color;
}
.mr-l {
  margin-left: 4%;
}
.blue {
  background-color: #0f2636;
}
.btn-b {
  font-family: seg;
  font-size: 12px;
  margin: 8px 0px 2px 20px;
  padding: 4px 2px 4px 2px;
  border-radius: 20px;
  width: 135px;
  padding: 5px;
  cursor: pointer;
  color: $white-color;
  border: none;
  font-weight: bold;
  text-decoration: none;
  text-align: center;
}
.btn-b:focus {
  outline: none;
}
.mr-b {
  margin-bottom: 10px;
}
.required{  
  color: red;
  font-size: 17px;
  margin-right: 3px;
  padding-top: 8px;
}
.rows{
    width: 16rem;
    display: flex;
    align-items: baseline;
}
.rowFifth{
  width: 11rem;
  display: flex;
  margin-left:-1rem;
}
.flex-box{
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 0;
  width: 35rem;
}
@media screen and (max-width:1214px){
  #request {
    padding-left: 18%;
    padding-right: 18%;
  }
}
@media screen and (max-width:1055px){
  #request {
    padding-left: 16%;
    padding-right: 16%;
  }
}
</style>
