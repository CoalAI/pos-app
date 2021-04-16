<template>
  <div id="AddEditUser">
    <div class="diff-shadow">
      <h2><span>Add</span> New User</h2>
      <div class="flex-box">
        <label class="pad-label w100" for="name">
          <strong>First Name:</strong>
        </label>
        <input
          name="name"
          type="text"
          placeholder="Enter First Name"
          v-model="user.firstName"
        />
      </div>
      <div class="flex-box">
        <label class="pad-label w100" for="name">
          <strong>Last Name:</strong>
        </label>
        <input
          name="name"
          type="text"
          placeholder="Enter Last Name"
          v-model="user.lastName"
        />
      </div>
      <div class="flex-box">
        <label class="pad-label w100" for="name">
          <strong>Email:</strong>
        </label>
        <div class="full-width">
          <input
            name="name"
            type="text"
            placeholder="Enter Email"
            v-model="user.email"
          />
          <span v-if="emailValidation" class="form-error">{{emailValidation}}</span>
        </div>
      </div>
      <div class="flex-box">
        <label class="pad-label w100" for="thisusername">
          <strong>Username:</strong>
        </label>
        <div class="full-width">
          <input
            name="thisusername"
            type="text"
            placeholder="Enter User Name"
            v-model="user.userName"
          />
          <span v-if="userNameValidation" class="form-error">{{userNameValidation}}</span>
        </div>
      </div>
      <div class="flex-box">
        <label class="pad-label w100" for="name">
          <strong>Password:</strong>
        </label>
        <div class="full-width">
          <input
            name="thisuserpassword"
            type="password"
            placeholder="Enter Password"
            v-model="user.password"
          />
          <span v-if="passwordValidation" class="form-error">{{passwordValidation}}</span>
        </div>
      </div>
      <div class="flex-box">
        <label class="pad-label w100" for="name">
          <strong>Confirm Pwd:</strong>
        </label>
        <div class="full-width">
          <input
            name="confirmpassword"
            type="password"
            placeholder="Enter confirm password"
            v-model="user.confirmPassword"
          />
          <span v-if="ConfirmPasswordValidation" class="form-error">{{ConfirmPasswordValidation}}</span>
        </div>
      </div>
      <div class="flex-box">
        <label class="pad-label w100" for="in_stock">
          <strong>Active:</strong>
        </label>
        <input
          style="margin-top: 21px"
          type="checkbox"
          id="active"
          name="active"
          v-model="user.active"
        >
      </div>
      <div class="flex-box">
        <label class="pad-label w100" for="unit">
          <strong>Role:</strong>
        </label>

        <select name="cars" class="custom-select" id="unit">
          <option v-for="role in roles" v-bind:key="role.name" v-bind:value="role.name">
            {{ role.name }}
          </option>
        </select>
      </div>
      <div class="flex-box">
        <label class="pad-label w100" for="companies">
          <strong>Company:</strong>
        </label>

        <select name="companies" class="custom-select" id="companies">
          <option v-for="company in companies" v-bind:key="company.id" v-bind:value="company.id">
            {{ company.company_name }}
          </option>
        </select>
      </div>
      <div class="flex-box">
        <label class="pad-label w100" for="barcode">
          <strong>Contact Number:</strong>
        </label>
        <div class="full-width">
          <input
            name="barcode"
            type="text"
            placeholder="Enter contact number"
            v-model="user.contactNumber"
          />
          <span v-if="contactNumberValidation" class="form-error">{{contactNumberValidation}}</span>
        </div>
      </div>

      <div class="mr-2" style="text-align: right; padding-bottom: 50px">
        <router-link
          to="/users"
          style="margin-right: 20px"
          class="btn btn-orange btn-mr btn-link"
        >Cancel</router-link>
        <button
          class="btn btn-orange btn-mr"
          style="width: 150px"
          :disabled="addEditBtn"
        >
          <span v-if="userId">Update</span>
          <span v-else>Add</span>
          <span> User</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

import { ActionTypes } from '@/store/modules/auth/actions';
import { User } from '@/store/models/user';

export default defineComponent({
  name: 'AddEditUser',
  props: ['userId'],
  data () {
    return {
      user: {
        userName: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        email: '',
        active: true,
        contactNumber: '',
        userRole: '',
        company: 0
      }
    }
  },
  computed: {
    userNameValidation: function () {
      let errorMessage = null;
      console.log(this.user.userName)
      const re = /^[a-zA-Z0-9@.+\-_]{3,150}$/;
      if (this.user.userName.length <= 0) {
        errorMessage = "User Name is required";
      } else if (this.user.userName.length > 150) {
        errorMessage = "Only 150 characters or fewer are allowed";
      }else if (!re.test(this.user.userName)) {
        errorMessage = "Minimum three characters and only letters, digits and these character (@ . + - _) are allowed"
      }
      return errorMessage;
    },

    passwordValidation: function () {
      let errorMessage = null;
      const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      if (this.user.password.length <= 0) {
        errorMessage = "Password is required"
      }  else if (!re.test(this.user.password)) {
        errorMessage = "Minimum eight characters, at least one letter, one number and one special character (@$!%*#?&)"
      }
      return errorMessage;
    },

    ConfirmPasswordValidation: function () {
      let errorMessage = null;
      if (this.user.confirmPassword.length <= 0) {
        errorMessage = "Confirm Password is required"
      } else if (this.user.password && this.user.password !== this.user.confirmPassword) {
        errorMessage = "Confirm Password does not matches with password"
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
      if (this.user.contactNumber.length <= 0) {
        errorMessage = "Number is required"
      }
      return errorMessage;
    },

    addEditBtn: function () {
      let disable = true;
      if ( this.userNameValidation === null &&
      this.passwordValidation === null &&
      this.ConfirmPasswordValidation === null &&
      this.emailValidation === null &&
      this.contactNumberValidation === null) {
        disable = false;
      }
      return disable
    },

    ...mapGetters({
      roles: 'getRoles',
      companies: 'getCompanies'
    })
  },
  methods: {
    addUpdateUser: function () {
      const user: User = {
        username: this.user.userName,
        first_name: this.user.firstName,
        last_name: this.user.lastName,
        email: this.user.email,
        password: this.user.password,
        is_active: this.user.active,
        company: this.user.company,
        user_type: this.user.userRole,
        contact_number: this.user.contactNumber
      }

      this.registerUser(user);
    },

    validEmail: function (email: string): boolean {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },

    ...mapActions({
      registerUser: ActionTypes.REGISTER_USER,
      fetchRoles: ActionTypes.FETCH_ROLES,
      fetchCompanies: ActionTypes.FETCH_COMPANIES
    })
  },
  async beforeMount () {
    await this.fetchRoles();
    await this.fetchCompanies();
  }
});
</script>

<style lang="scss" scoped>
  #AddEditUser {
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
</style>