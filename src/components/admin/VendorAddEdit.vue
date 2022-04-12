<template>
    <div id="AddEditVendor">
      <!--<div class="diff-shadow">-->
      <div class="diff-sm-box">
        <h2 class="head">
          <span v-if="vendorId">Update</span>
          <span v-else>Add New</span>
          <span> Vendor</span>
        </h2>
        <div class="container-grid">
          <label class="label fn" for="firstname">
            <strong>First Name:</strong>
          </label>
          <input
            class="text-box mr-r tf"
            name="firstname"
            type="text"
            placeholder="Enter First Name"
            v-model="vendor.firstName"
          />
          <label class="label ln" for="lastname">
            <strong>Last Name:</strong>
          </label>
          <input
            class="text-box tl"
            name="lastname"
            type="text"
            placeholder="Enter Last Name"
            v-model="vendor.lastName"
          />
          <div class="d-flex">
          <div style="padding: 17px 2px;"><span class="required">*</span></div>
          <div>
            <label class="label cn " for="contact_number">
              <strong>Contact:</strong>
            </label>
          </div>
          </div>
          <div>
            <input
              class="text-box mr-r tc"
              name="contact_number"
              type="text"
              placeholder="Enter Contact"
              v-model="vendor.contact"
            />
            <span v-if="contactNumberValidation" class="form-error">{{contactNumberValidation}}</span>
            
          </div>
          <div class="d-flex">
            <div style="padding: 17px 2px;"><span class="required">*</span></div>
            <div>
              <label v-if="!vendorId" class="label c" for="companies">
                <strong>Company:</strong>
              </label>
            </div>
          </div>
          <div v-if="!vendorId">
            <select name="companies" class="custom-select text-box sc" id="companies" v-model="vendor.company">
              <option v-for="company in companies" v-bind:key="company.id" v-bind:value="company.id">
                {{ company.company_name }}
              </option>
            </select>
            <span v-if="companyValidation" class="form-error">{{companyValidation}}</span>
        </div>
        </div>

        <!--<div class="flex-box pad-t">
          <label class="label" for="firstname">
            <strong>First Name:</strong>
          </label>
          <input
            class="text-box mr-r"
            name="firstname"
            type="text"
            placeholder="Enter first name"
            v-model="vendor.firstName"
          />
          <label class="label" for="lastname">
            <strong>Last Name:</strong>
          </label>
          <input
            class="text-box"
            name="lastname"
            type="text"
            placeholder="Enter last name"
            v-model="vendor.lastName"
          />
        </div>
        <div class="flex-box">
          <label class="pad-label w100" for="lastname">
            <strong>Last Name:</strong>
          </label>
          <input
            name="lastname"
            type="text"
            placeholder="Enter last name"
            v-model="vendor.lastName"
          />
        </div>
        <div class="flex-box pad-t">
          <label class="label" for="contact_number">
            <strong>Contact Number:</strong>
          </label>
          <div>
            <input
              class="text-box mr-r"
              name="contact_number"
              type="text"
              placeholder="Enter contact"
              v-model="vendor.contact"
            />
            <span v-if="contactNumberValidation" class="form-error">{{contactNumberValidation}}</span>
            <ErrorField v-if="fieldErrors.username" :errorField="fieldErrors.username"></ErrorField>
          </div>
          
          <div v-if="!vendorId" class="flex-box">
          <label class="label " for="companies">
            <strong>Company:</strong>
          </label>
          <div class="text-box">
            <select name="companies" class="custom-select" id="companies" v-model="vendor.company">
              <option v-for="company in companies" v-bind:key="company.id" v-bind:value="company.id">
                {{ company.company_name }}
              </option>
            </select>
            <span v-if="companyValidation" class="form-error">{{companyValidation}}</span>
            <ErrorField v-if="fieldErrors.company" :errorField="fieldErrors.company"></ErrorField>
          </div>
        </div>
        </div>

        <div v-if="!vendorId" class="flex-box">
          <label class="pad-label w100" for="companies">
            <strong>Company:</strong>
          </label>
          <div class="full-width">
            <select name="companies" class="custom-select" id="companies" v-model="vendor.company">
              <option v-for="company in companies" v-bind:key="company.id" v-bind:value="company.id">
                {{ company.company_name }}
              </option>
            </select>
            <span v-if="companyValidation" class="form-error">{{companyValidation}}</span>
            <ErrorField v-if="fieldErrors.company" :errorField="fieldErrors.company"></ErrorField>
          </div>
        </div>-->

        <div class="ab_btn_container" style="text-align: center; padding-top: 30px">
          <button
            class="btn-b btn-mr red btn-link"
            style=" margin-right: 20px"
            :disabled="addEditBtn"
            @click="addUpdateVendor"
          >
            <span v-if="vendorId">Update</span>
            <span v-else>Add</span>
          </button>
          <router-link
            to="/Vendors"
            class="btn-b blue btn-link"
          >Cancel</router-link>
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
    padding-left: 15%;
    padding-right: 15%;
    margin-top: 3%;
  }

  /*.pad-label {
    padding: 20px 20px 20px 0px;
  }*/
  label{
    font-family:seg;
    font-size: 12px;
    padding:20px 20px 20px 0;
    width:75%;
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
  .head{
    text-align: center;
    font-family: seg;
    font-size:20px;
    font-weight:bold;
    color:#e43d2a;
  }
  .diff-sm-box{
    border: 1px solid #ffffff;
    border-radius: 10px;
    padding: 1em 3em;
    margin: 15px 40px 0px 100px;

    -webkit-box-shadow: 1px 1px 5px -1px $login-shodow-color;
    -moz-box-shadow: 1px 1px 5px -1px $login-shodow-color;
    box-shadow: 1px 1px 5px -1px $login-shodow-color;
  }
  .pad-t{
    padding-top:25px;
  }
  .text-box{
    font-family:seg;
    font-size:12px;
    height:48%;
    margin-top:15px;
    border-radius:0.4rem;
    padding:8px;
    border:1px solid #d8dcdc;
    color: #6c757d;
    width:85%;
  }
  .text-box:focus{
    outline:none;
  }
  .mr-r{
    margin-right:12px;
  }
  .container-grid{
    display:grid;
    margin-top:25px;
    grid-template-columns: 1fr 2fr 1fr 2fr;
    gap:1.2rem 0.4rem;
    grid-template-areas: 
    "fn tf ln tn"
    "cn tc c sc"
  }
  .fn{
    grid-area:fn;
  }
  .tf{
    grid-area:tf;
  }
  .ln{
    grid-area:ln;
  }
  .tn{
    grid-area:tn;
  }
  .cn{
    grid-area:cn;
  }
  .tc{
    grid-area:tc;
  }
  .c{
    grid-area:c;
  }
  .sc{
    grid-area:sc;
  }
  .form-error{
    display:block;
    font-family:seg;
    font-size:12px;
    color:#e43d2a;
}
.btn-b{
  text-decoration:none;

    font-family: seg;
    font-size: 12px;
    border-radius: 20px;
    // width: 100px;
    cursor: pointer;
    color: #ffffff;
    border: none;
    // padding: 12px 6px;
    // font-weight: bold;
    text-align: center;
    // height: 40px;
    margin-top: 12px;

    margin-right: 20px;
    /* height: 33px; */
    width: 8rem;
    font-weight: 400;
    padding-top: 8px;
    padding-bottom: 8px;
}
.btn-b:focus{
  outline:none;
}
.red{
  background-color:#e43d2a;
}
.blue{
  background-color: #0f2634;
}
.required{
  content:" *";
    color: red;
}
.ab_btn_container{
    // margin-top: 30px;
    display: flex;
    justify-content: center;
    // margin-left: 66px;
    // font-family:seg;
  }
</style>