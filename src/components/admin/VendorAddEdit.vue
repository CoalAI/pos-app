<template>
  <div id="AddEditVendor">
    <div class="diff-shadow">
      <h2>
        <span v-if="vendorId">Update</span>
        <span v-else>Add New</span>
        <span> Vendor</span>
      </h2>
      <div>
        <div class="first-row row">
          <div class="left">
            <label class="" for="firstname">
              <strong>First Name:</strong>
            </label>
            <div class="ab-input-container">
              <input
                name="firstname"
                type="text"
                placeholder="Enter First Name"
                v-model="vendor.firstName"
              />
            </div>
          </div>
          <div class="right">
            <label class="" for="lastname">
              <strong>Last Name:</strong>
            </label>
            <div class="ab-input-container">
              <input
                class="text-box tl"
                name="lastname"
                type="text"
                placeholder="Enter Last Name"
                v-model="vendor.lastName"
              />
            </div>
          </div>
        </div>
        <div class="second-row row mt-3">
          <div class="left">
            <div class="d-flex" style="width: 5.5rem;">
              <span class="required">*</span>
              <label class="" for="contact_number">
                <strong>Contact:</strong>
              </label>
            </div>
            <div class="ab-input-container">
              <input
                name="contact_number"
                type="text"
                placeholder="Enter Contact"
                v-model="vendor.contact"
              />
              <span v-if="contactNumberValidation" class="form-error">{{contactNumberValidation}}</span>
            </div>
          </div>
          <div class="right">
            <div class=" d-flex" style="width: 5.5rem;">
              <span v-if="!vendorId" class="required">*</span>
              <label v-if="!vendorId" class="" for="companies">
                <strong>Company:</strong>
              </label>
            </div>
            <div  v-if="!vendorId" class="ab-select-container">
              <select name="companies" class="custom-select" id="companies" v-model="vendor.company">
                <option v-for="company in companies" v-bind:key="company.id" v-bind:value="company.id">
                  {{ company.company_name }}
                </option>
              </select>
              <span v-if="companyValidation" class="form-error">{{companyValidation}}</span>
            </div>
          </div>
        </div>
      </div>      
      <div class="ab_btn_container">
        <div>
          <button
            class="btn ab_orange_hover btn-orange"
            :disabled="addEditBtn"
            @click="addUpdateVendor"
          >
            <span v-if="vendorId">Update</span>
            <span v-else>Add</span>
          </button>
        </div>
        <div>
          <router-link
            to="/Vendors"
            style="margin-left: 20px"
            class="btn ab_blue_hover btn-blue"
          >Cancel</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

import { User } from '@/store/models/user';
import { ActionTypes } from '@/store/modules/auth/actions';
import ErrorField from '@/components/common-components/ErrorField.vue';

export default defineComponent({
  name: 'VendorAddEdit',
  props: ['vendorId'],
  components: {
    // ErrorField,
  },
  data () {
    return {
      vendor: {
        contact: '',
        firstName: '',
        lastName: '',
        company: 0
      },
      showErrorContact: false,
      showErrorCompany: false,
    }
  },
  computed: {
    contactNumberValidation: function () {
      let errorMessage = null;
      if (this.vendor.contact.length <= 0 && this.showErrorContact==true) {
        errorMessage = "Number is required"
      }
      return errorMessage;
    },

    addEditBtn:  function () {
      let disable = true;
      if (this.contactNumberValidation === null) {
        disable = false
      }
      return disable;
    },

    companyValidation: function () {
      let errorMessage = null;
      if (this.companies.length <= 0 && this.showErrorCompany==true) {
        errorMessage = "Comapny is required. Add vendor comapany to system"
      }
      return errorMessage;
    },

    ...mapGetters({
      companies: 'getCompanies',
      fieldErrors: 'getAuthFieldError',
    })
  },
  methods: {
    addUpdateVendor: async function () {
      this.showErrorContact = true;
      this.showErrorCompany = true;
      let vendorIdNumber = 0;
      if (this.vendorId) {
        vendorIdNumber = parseFloat(this.vendorId);
        if (isNaN(vendorIdNumber)) return;
      }

      const user: User = {
        first_name: this.vendor.firstName,
        last_name: this.vendor.lastName,
        username: this.vendor.contact,
        contact_number: this.vendor.contact,
        company: this.vendor.company,
        is_active: true
      };

      if (this.vendorId) {
        user.id = vendorIdNumber;
        await this.updateUser(user);
      } else {
        user.user_type = 'VENDOR';
        await this.registerUser(user);
      }
      if (Object.keys(this.fieldErrors).length === 0) {
        this.$router.push({name: 'Vendor'});
      } else {
        window.scrollTo(0,0);
      }
    },

    loadData: function (vendor: User) {
      this.vendor.contact = vendor.contact_number ? vendor.contact_number : '';
      this.vendor.firstName = vendor.first_name ? vendor.first_name : '';
      this.vendor.lastName = vendor.last_name ? vendor.last_name : '';
      this.vendor.company = vendor.company && typeof vendor.company === 'number' ? vendor.company : 0;
    },

    ...mapActions({
      registerUser: ActionTypes.REGISTER_USER,
      updateUser: ActionTypes.UPDATE_USER,
      fetchCompanies: ActionTypes.FETCH_COMPANIES,
      getVendorsList: ActionTypes.FETCH_VENDORS,
      setFieldError: ActionTypes.SET_FIELD_ERROR,
    })
  },
  async beforeMount () {
    await this.fetchCompanies({
      company_type: 'VENDOR',
      search: ''
    });

    if (this.companies && this.companies.length > 0) {
      this.vendor.company = this.companies[0].id;
    }

    if (this.vendorId) {
      await this.getVendorsList('');
      const vendor_id = parseInt(this.vendorId);
      const vendor = isNaN(vendor_id) ? undefined : this.$store.getters.getSignleVendor(vendor_id);
      if (vendor) {
        this.loadData(vendor);
      }
      else {
        // Show 404 page on screen
        this.$router.push({name: 'notFound'});
      }
    }
  },
  async unmounted () {
    await this.setFieldError({});
  },
});
</script>

<style lang="scss" scoped>
  #AddEditVendor {
    // padding: 2.65% 30%;
    padding: 1.65% 26%;
    // padding-left: 15%;
    // padding-right: 15%;
    // margin-top: 3%;
    // padding-left: 15%;
    // padding-right: 15%;
    // margin-top: 3%;
  }
  .diff-shadow{
    padding: 1.65% 6.56%;
  }
  .diff-shadow > h2{
    text-align: center;
    color: $primary-color;
    margin-bottom: 40px;
  }
  

  // .pad-label {
  //   padding: 20px 20px 20px 0px;
  // }

  // .w100 {
  //   width: $w150;
  // }

  // label {
  //   text-align: left;
  // }

  // .full-width {
  //   width: 100%;
  // }

  // ab-css
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
  .ab-input-container > input[type=password]{
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
    width: 30%;
    font-size: 0.875em;
  }
  .form-error{
    font-size: 0.65em; 
  }

  // buttons designs 
  .ab_btn_container{
    margin-top: 50px;
    display: flex;
    justify-content: center;
  }
  .ab_btn_container > div:first-child button:first-child{
    border-radius: 20px;
    padding: 6px 48px;
    border: 1.5px solid $primary-color !important;
  }
  .ab_orange_hover:hover{
    border: 1.5px solid $primary-color;
    color: $primary-color;
    background-color: white;
  }
  .btn-blue{
    background-color:#0f2636;
    border-radius: 20px;
    padding: 6px 30px;
    border: 1.5px solid #0f2636 !important;
    width:8rem;
  }
  .ab_blue_hover:hover{
    color: #0f2636;
    background-color: white;
    border: 1.5px solid #0f2636;
  }
  .ab_btn_container a{
    color:white;
  }
  .required{
    content:" *";
    color: red;
    font-size: 17px;
    margin-right: 3px;
}
</style>