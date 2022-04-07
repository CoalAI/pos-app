<template>
  <div id="AddEditUser">
    <div class="diff-shadow">
      <h2>
        <span v-if="userId">Update</span>
        <span v-else>Add New</span>
        <span> User</span>
      </h2>
      <div v-if="!userId">
        <div class="first-row row">
          <div class="left">
            <label class="" for="first_name">
              <strong>First Name:</strong>
            </label>
            <div class="ab-input-container">
              <input
                name="first_name"
                type="text"
                placeholder="Enter First Name"
                v-model="user.firstName"
              />
            </div>
          </div>
          <div class="right">
            <label class="" for="last_name">
              <strong>Last Name:</strong>
            </label>
            <div class="ab-input-container">
              <input
                name="last_name"
                type="text"
                placeholder="Enter Last Name"
                v-model="user.lastName"
              />
            </div>
          </div>
        </div>
        <div class="second-row row">
          <div class="left">
            <label class="" for="email">
              <strong>Email:</strong>
            </label>
            <div class="ab-input-container">
              <input
                name="email"
                type="text"
                placeholder="Enter Email"
                v-model="user.email"
              />
              <span v-if="emailValidation" class="form-error">{{emailValidation}}</span>
            </div>
          </div>
          <div v-if="!userId" class="right">
            <label class="" for="thisusername">
              <strong>Username:</strong>
            </label>
            <div class="ab-input-container">
              <input
                name="thisusername"
                type="text"
                placeholder="Enter User Name"
                v-model="user.userName"
              />
              <span v-if="userNameValidation" class="form-error">{{userNameValidation}}</span> <br> 
              <span v-if="ab_error_message" class="form-error">{{ab_error_message}}</span> <br>
              <ErrorField v-if="fieldErrors.username" :errorField="fieldErrors.username"></ErrorField>
            </div>
          </div>
        </div>
        <div class="third-row row">
          <div v-if="!userId" class="left">
            <label class="" for="thisuserpassword">
              <strong>Password:</strong>
            </label>
            <div class="ab-input-container">
              <input
                autocomplete="new-password"
                name="thisuserpassword"
                type="password"
                placeholder="Enter Password"
                v-model="user.password"
              />
              <span v-if="passwordValidation" class="form-error">{{passwordValidation}}</span> <br>
              <span v-if="ps_error_message" class="form-error">{{ps_error_message}}</span> <br>
              <ErrorField v-if="fieldErrors.password" :errorField="fieldErrors.password"></ErrorField>
            </div>
          </div>
          <div v-if="!userId" class="right">
            <label class="" for="confirmpassword">
              <strong>Confirm Password:</strong>
            </label>
            <div class="ab-input-container">
              <input
                name="confirmpassword"
                type="password"
                placeholder="Enter confirm password"
                v-model="user.confirmPassword"
              />
              <span v-if="ConfirmPasswordValidation" class="form-error">{{ConfirmPasswordValidation}}</span> <br>
              <span v-if="cp_error_message" class="form-error">{{cp_error_message}}</span> <br>
            </div>
          </div>
        </div>
        <div class="forth-row row">
          <div class="left">
            <label class="" for="in_stock">
              <strong>Active:</strong>
            </label>
            <div class="ab-input-container">
              <input
                style="margin-top: 21px"
                type="checkbox"
                id="active"
                name="active"
                v-model="user.active"
              >
            </div>
          </div>
          <div class="right">
            <label class="" for="role">
              <strong>Role:</strong>
            </label>

            <div class="ab-select-container">
              <select name="role" class="custom-select" id="unit" v-model="user.user_type">
                <option v-for="role in roles" v-bind:key="role" v-bind:value="role">
                  {{ role }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="fifth-row row">
          <div v-if="!userId" class="left">
            <label class="" for="companies">
              <strong>Company:</strong>
            </label>

            <div class="ab-select-container">
              <select name="companies" class="custom-select" id="companies" v-model="user.company">
                <option value="0">Select</option>
                <option v-for="company in companies" v-bind:key="company.id" v-bind:value="company.id">
                  {{ company.company_name }}
                </option>
              </select>
              <span v-if="company_errormessage" class="form-error">{{company_errormessage}}</span>
              <ErrorField v-if="fieldErrors.company" :errorField="fieldErrors.company"></ErrorField>
            </div>
          </div>
          <div class="right">
            <label class="" for="contact_number">
              <strong>Contact Number:</strong>
            </label>
            <div class="ab-input-container">
              <input
                name="contact_number"
                type="text"
                placeholder="Enter contact number"
                v-model="user.contactNumber"
              />
              <span v-if="contactNumberValidation" class="form-error">{{contactNumberValidation}}</span> <br>
              <span v-if="num_error_message" class="form-error">{{num_error_message}}</span> <br>
            </div>
          </div>
        </div>
      </div>
      <div v-if="userId">
        <div class="first-row row">
          <div class="left">
            <label class="" for="first_name">
              <strong>First Name:</strong>
            </label>
            <div class="ab-input-container">
              <input
                name="first_name"
                type="text"
                placeholder="Enter First Name"
                v-model="user.firstName"
              />
            </div>
          </div>
          <div class="right">
            <label class="" for="last_name">
              <strong>Last Name:</strong>
            </label>
            <div class="ab-input-container">
              <input
                name="last_name"
                type="text"
                placeholder="Enter Last Name"
                v-model="user.lastName"
              />
            </div>
          </div>
        </div>
        <div class="second-row row">
          <div class="left">
            <label class="" for="email">
              <strong>Email:</strong>
            </label>
            <div class="ab-input-container">
              <input
                name="email"
                type="text"
                placeholder="Enter Email"
                v-model="user.email"
              />
              <span v-if="emailValidation" class="form-error">{{emailValidation}}</span>
            </div>
          </div>
          <div class="right">
            <label class="" for="role">
              <strong>Role:</strong>
            </label>

            <div class="ab-select-container">
              <select name="role" class="custom-select" id="unit" v-model="user.user_type">
                <option v-for="role in roles" v-bind:key="role" v-bind:value="role">
                  {{ role }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="third-row row">
          <div v-if="!userId" class="left">
            <label class="" for="thisuserpassword">
              <strong>Password:</strong>
            </label>
            <div class="ab-input-container">
              <input
                autocomplete="new-password"
                name="thisuserpassword"
                type="password"
                placeholder="Enter Password"
                v-model="user.password"
              />
              <span v-if="passwordValidation" class="form-error">{{passwordValidation}}</span> <br>
              <span v-if="ps_error_message" class="form-error">{{ps_error_message}}</span> <br>
              <ErrorField v-if="fieldErrors.password" :errorField="fieldErrors.password"></ErrorField>
            </div>
          </div>
          <div v-if="!userId" class="right">
            <label class="" for="confirmpassword">
              <strong>Confirm Password:</strong>
            </label>
            <div class="ab-input-container">
              <input
                name="confirmpassword"
                type="password"
                placeholder="Enter confirm password"
                v-model="user.confirmPassword"
              />
              <span v-if="ConfirmPasswordValidation" class="form-error">{{ConfirmPasswordValidation}}</span> <br>
              <span v-if="cp_error_message" class="form-error">{{cp_error_message}}</span> <br>
            </div>
          </div>
        </div>
        <div class="forth-row row">
          <div class="left">
            <label class="" for="in_stock">
              <strong>Active:</strong>
            </label>
            <div class="ab-input-container">
              <input
                style="margin-top: 21px"
                type="checkbox"
                id="active"
                name="active"
                v-model="user.active"
              >
            </div>
          </div>
          <div class="right">
            <label class="" for="contact_number">
              <strong>Contact Number:</strong>
            </label>
            <div class="ab-input-container">
              <input
                name="contact_number"
                type="text"
                placeholder="Enter contact number"
                v-model="user.contactNumber"
              />
              <span v-if="contactNumberValidation" class="form-error">{{contactNumberValidation}}</span> <br>
              <span v-if="num_error_message" class="form-error">{{num_error_message}}</span> <br>
            </div>
          </div>
          
        </div>
        <div class="fifth-row row">
          <div v-if="!userId" class="left">
            <label class="" for="companies">
              <strong>Company:</strong>
            </label>

            <div class="ab-select-container">
              <select name="companies" class="custom-select" id="companies" v-model="user.company">
                <option v-for="company in companies" v-bind:key="company.id" v-bind:value="company.id">
                  {{ company.company_name }}
                </option>
              </select>
            </div>
            <span v-if="company_errormessage" class="form-error">{{company_errormessage}}</span>
            <ErrorField v-if="fieldErrors.company" :errorField="fieldErrors.company"></ErrorField>
          </div>
        </div>
      </div>

      <div class="ab_btn_container">
        <div>
          <button
            class="btn ab_orange_hover btn-orange"
            
            @click="addUpdateUser"
          >
            <span v-if="userId">Update</span>
            <span v-else>Add</span>
            <span> User</span>
          </button>
        </div>
        <div>
          <router-link
            to="/users"
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

import { ActionTypes } from '@/store/modules/auth/actions';
import { User } from '@/store/models/user';
import ErrorField from '@/components/common-components/ErrorField.vue';

export default defineComponent({
  name: 'AddEditUser',
  props: ['userId'],
  components: {
    ErrorField,
  },
  data () {
    return {
      ab_error_message: '',
      ps_error_message: '',
      cp_error_message: '',
      num_error_message: '',
      company_errormessage: '',
      user: {
        userName: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        email: '',
        active: true,
        contactNumber: '',
        user_type: 'SALES_STAFF',
        company: 0
      }
    }
  },
  computed: {
    userNameValidation: function () {
      let errorMessage = null;
      const re = /^[a-zA-Z0-9@.+\-_]{3,150}$/;
      if (this.user.userName.length > 150) {
        errorMessage = "Only 150 characters or fewer are allowed";
      }else if (this.user.userName.length != 0 && !re.test(this.user.userName)) {
        errorMessage = "Minimum three characters and only letters, digits and these character (@ . + - _) are allowed"
      }
      return errorMessage;
    },

    passwordValidation: function () {
      let errorMessage = null;
      if (!this.userId) {
        const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (this.user.password.length != 0 && !re.test(this.user.password)) {
          errorMessage = "Minimum eight characters, at least one letter, one number and one special character (@$!%*#?&)"
        }
      }
      return errorMessage;
    },

    ConfirmPasswordValidation: function () {
      let errorMessage = null;
      if (!this.userId) {
        if (this.user.confirmPassword.length != 0 && this.user.password && this.user.password !== this.user.confirmPassword) {
          errorMessage = "Confirm Password does not matches with password"
        }
      }
      return errorMessage;
    },

    emailValidation: function () {
      let errorMessage = null;
      if (this.user.email && !this.validEmail(this.user.email)) {
        errorMessage = "Enter a valid email"
      }
      return errorMessage;
    },

    contactNumberValidation: function () {
      let errorMessage = null;
      const regex = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{3,5}-{0,1}\d{7}$/;
      if (this.user.contactNumber.length != 0 && !regex.test(this.user.contactNumber)) {
        errorMessage = "Phone number is not valid"
      }
      return errorMessage;
    },
    ...mapGetters({
      roles: 'getRoles',
      companies: 'getCompaniesFilterVendor',
      fieldErrors: 'getAuthFieldError',
    })
  },
  methods: {
    checkAllValidation: function(){
      // validate
      if (this.user.userName.length <= 0) {
        this.ab_error_message = "User Name is required";
      }
      else {
        this.ab_error_message = ""
      }
      if (this.user.password.length <= 0) {
        this.ps_error_message = "Password is required"
      }
      else {
        this.ps_error_message = ""
      }
      if (this.user.confirmPassword.length <= 0) {
        this.cp_error_message = "Confirm Password is required" 
      }
      else {
        this.cp_error_message = ""
      }
      if (this.user.contactNumber.length <= 0) {
        this.num_error_message = "Number is required"
      }
      else {
        this.num_error_message = ""
      }
      if (this.user.company === 0) {
        this.company_errormessage = "Comapny is required. Add Comapany to system"
      }
      else{
        this.company_errormessage = ""
      }
  
      if ( this.userNameValidation === null &&
          this.passwordValidation === null &&
          this.ConfirmPasswordValidation === null &&
          this.emailValidation === null &&
          this.contactNumberValidation === null &&      
          this.ab_error_message === "" && 
          this.ps_error_message === "" &&
          this.cp_error_message === "" && this.num_error_message === "" && this.company_errormessage === ""){
            return true
          }
      else{
        return false
      }
    },
    addUpdateUser: async function () {
      let userIdNumber = 0;
      if (this.userId) {
        userIdNumber = parseFloat(this.userId);
        if (isNaN(userIdNumber)) return;
      }

      const user: User = {
        username: this.user.userName,
        first_name: this.user.firstName,
        last_name: this.user.lastName,
        email: this.user.email,
        is_active: this.user.active,
        is_staff: true,
        user_type: this.user.user_type,
        contact_number: this.user.contactNumber
      }

      if (this.userId) {
        if (this.contactNumberValidation === null && this.num_error_message === ""){
          user.id = userIdNumber;
          await this.updateUser(user);
          if (Object.keys(this.fieldErrors).length === 0) {
            this.$router.push({name: 'User'});
          } else {
            window.scrollTo(0,0);
          }
        }
      } 
      else {
        if (this.checkAllValidation())
          {
            console.log("in the air")
            user.company = this.user.company,
            user.password = this.user.password;
            await this.registerUser(user);
            if (Object.keys(this.fieldErrors).length === 0) {
              this.$router.push({name: 'User'});
            } else {
              window.scrollTo(0,0);
            }
          }
      }
    },

    loadData: function (user: User) {
      this.user.firstName = user.first_name ? user.first_name : '';
      this.user.lastName = user.last_name ? user.last_name : '';
      this.user.email = user.email ? user.email : '';
      this.user.userName = user.username ? user.username : '';
      this.user.active = user.is_active ? user.is_active : true;
      this.user.user_type = user.user_type ? user.user_type : '';
      this.user.company = user.company && typeof user.company !== 'number' && user.company.id ? user.company.id : 0;
      this.user.contactNumber = user.contact_number ? user.contact_number : '';
    },

    validEmail: function (email: string): boolean {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },

    ...mapActions({
      registerUser: ActionTypes.REGISTER_USER,
      fetchTypes: ActionTypes.FETCH_TYPES,
      fetchCompanies: ActionTypes.FETCH_COMPANIES,
      updateUser: ActionTypes.UPDATE_USER,
      getUsersList: ActionTypes.GET_USERS,
      setFieldError: ActionTypes.SET_FIELD_ERROR,
    })
  },
  async beforeMount () {
    await this.fetchTypes();
    await this.fetchCompanies();

    if (this.companies && this.companies.length > 0) {
      // this.user.company = this.companies[0].id;
    }

    if (this.userId) {
      await this.getUsersList();
      const user_id = parseInt(this.userId);
      const user = isNaN(user_id) ? undefined : this.$store.getters.getSignleUser(user_id);
      if (user) {
        this.loadData(user);
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
  #AddEditUser {
    // padding: 2.65% 30%;
    padding: 2.65% 26%;
    // padding-left: 15%;
    // padding-right: 15%;
    margin-top: 3%;
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
    margin-bottom: 50px;
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
    padding: 6px 48px;
    border: 1.5px solid #0f2636 !important;
  }
  .ab_blue_hover:hover{
    color: #0f2636;
    background-color: white;
    border: 1.5px solid #0f2636;
  }
  .ab_btn_container a{
    color:white;
  }
</style>