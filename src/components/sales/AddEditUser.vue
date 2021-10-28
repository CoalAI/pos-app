<template>
  <div id="AddEditUser">
    <div class="diff-shadow">
      <h2>
        <span v-if="userId">Update</span>
        <span v-else>Add New</span>
        <span> User</span>
      </h2>
      <div class="flex-box">
        <label class="pad-label w100" for="first_name">
          <strong>First Name:</strong>
        </label>
        <input
          name="first_name"
          type="text"
          placeholder="Enter First Name"
          v-model="user.firstName"
        />
      </div>
      <div class="flex-box">
        <label class="pad-label w100" for="last_name">
          <strong>Last Name:</strong>
        </label>
        <input
          name="last_name"
          type="text"
          placeholder="Enter Last Name"
          v-model="user.lastName"
        />
      </div>
      <div class="flex-box">
        <label class="pad-label w100" for="email">
          <strong>Email:</strong>
        </label>
        <div class="full-width">
          <input
            name="email"
            type="text"
            placeholder="Enter Email"
            v-model="user.email"
          />
          <span v-if="emailValidation" class="form-error">{{emailValidation}}</span>
        </div>
      </div>
      <div v-if="!userId" class="flex-box">
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
          <span v-if="userNameValidation" class="form-error">{{userNameValidation}}</span> <br>
          <ErrorField v-if="fieldErrors.username" :errorField="fieldErrors.username"></ErrorField>
        </div>
      </div>
      <div v-if="!userId" class="flex-box">
        <label class="pad-label w100" for="thisuserpassword">
          <strong>Password:</strong>
        </label>
        <div class="full-width">
          <input
            autocomplete="new-password"
            name="thisuserpassword"
            type="password"
            placeholder="Enter Password"
            v-model="user.password"
          />
          <span v-if="passwordValidation" class="form-error">{{passwordValidation}}</span>
          <ErrorField v-if="fieldErrors.password" :errorField="fieldErrors.password"></ErrorField>
        </div>
      </div>
      <div v-if="!userId" class="flex-box">
        <label class="pad-label w100" for="confirmpassword">
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
        <label class="pad-label w100" for="role">
          <strong>Role:</strong>
        </label>

        <select name="role" class="custom-select" id="unit" v-model="user.user_type">
          <option v-for="role in roles" v-bind:key="role" v-bind:value="role">
            {{ role }}
          </option>
        </select>
      </div>
      <div v-if="!userId" class="flex-box">
        <label class="pad-label w100" for="companies">
          <strong>Company:</strong>
        </label>

        <select name="companies" class="custom-select" id="companies" v-model="user.company">
          <option v-for="company in companies" v-bind:key="company.id" v-bind:value="company.id">
            {{ company.company_name }}
          </option>
        </select>
        <span v-if="companyValidation" class="form-error">{{companyValidation}}</span>
        <ErrorField v-if="fieldErrors.company" :errorField="fieldErrors.company"></ErrorField>
      </div>
      <div class="flex-box">
        <label class="pad-label w100" for="contact_number">
          <strong>Contact Number:</strong>
        </label>
        <div class="full-width">
          <input
            name="contact_number"
            type="text"
            placeholder="Enter contact number"
            v-model="user.contactNumber"
          />
          <span v-if="contactNumberValidation" class="form-error">{{contactNumberValidation}}</span>
        </div>
        {{userId}}
      </div>

      <div style=" text-align: right; padding-bottom: 50px">
                <router-link :to="{name: 'ChangePassword', params: {userId: userId}}" class="btn btn-orange btn-mr-inner" style="margin-right: 20px; width: 150px">Change Password</router-link>
      
        <router-link
          to="/users"
          style="margin-right: 20px"
          class="btn btn-orange btn-mr btn-link"
        >Cancel</router-link> 
        <button
          class="btn btn-orange btn-mr"
          style="width: 150px"
          :disabled="addEditBtn"
          @click="addUpdateUser"
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
import ErrorField from '@/components/common-components/ErrorField.vue';
export default defineComponent({
  name: 'AddEditUser',
  props: ['userId'],
  components: {
    ErrorField,
  },
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
        user_type: 'SALES_STAFF',
        company: 0
      }
    }
  },
  computed: {
    userNameValidation: function () {
      let errorMessage = null;
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
      if (!this.userId) {
        const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (this.user.password.length <= 0) {
          errorMessage = "Password is required"
        }  else if (!re.test(this.user.password)) {
          errorMessage = "Minimum eight characters, at least one letter, one number and one special character (@$!%*#?&)"
        }
      }
      return errorMessage;
    },
    ConfirmPasswordValidation: function () {
      let errorMessage = null;
      if (!this.userId) {
        if (this.user.confirmPassword.length <= 0) {
          errorMessage = "Confirm Password is required"
        } else if (this.user.password && this.user.password !== this.user.confirmPassword) {
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
      if (this.user.contactNumber.length <= 0) {
        errorMessage = "Number is required"
      } else {
        const regex = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{3,5}-{0,1}\d{7}$/;
        if (!regex.test(this.user.contactNumber)) {
          errorMessage = "Phone number is not valid"
        }
      }
      return errorMessage;
    },
    companyValidation: function () {
      let errorMessage = null;
      if (this.companies.length <= 0) {
        errorMessage = "Comapny is required. Add Comapany to system"
      }
      return errorMessage;
    },
    addEditBtn: function () {
      let disable = true;
      if ( this.userNameValidation === null &&
      this.passwordValidation === null &&
      this.ConfirmPasswordValidation === null &&
      this.emailValidation === null &&
      this.contactNumberValidation === null &&
      this.companyValidation === null) {
        disable = false;
      }
      return disable
    },
    ...mapGetters({
      roles: 'getRoles',
      companies: 'getCompaniesFilterVendor',
      fieldErrors: 'getAuthFieldError',
    })
  },
  methods: {
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
        user.id = userIdNumber;
        await this.updateUser(user);
      } else {
        user.company = this.user.company,
        user.password = this.user.password;
        await this.registerUser(user);
      }
      if (Object.keys(this.fieldErrors).length === 0) {
        this.$router.push({name: 'User'});
      } else {
        window.scrollTo(0,0);
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
      this.user.company = this.companies[0].id;
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