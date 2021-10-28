
<template>
  <div id="ChangePassword">
    <div class="diff-shadow">
      <form>
          <div class="form-group">
            <label for="InputPassword">New Password</label>
            <input v-model = "inputPassword" type="password" class="form-control" id="InputPassword" placeholder="New Password">
          </div>
           <div class="form-group">
            <label for="ConfirmPassword">Confirm Password</label>
            <input v-model = "confirmPassword" type="password" class="form-control" id="ConfirmPassword" placeholder="Confirm Password">
          </div>
        <button class="btn btn-orange btn-mr" style="width: 150px" v-on:click="changePassword(inputPassword, userId)">
          Change Password
        </button>
        <div>
         <span v-if="passwordValidation" class="form-error">{{passwordValidation}}</span>
        </div>
        <div>
         <span v-if="ConfirmPasswordValidation" class="form-error">{{ConfirmPasswordValidation}}</span>
         </div>
        </form>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import axios from 'axios';
import { mapActions } from 'vuex';
import { ActionTypes } from '@/store/modules/auth/actions';
import Loader from '../common-components/Loader.vue';

export default defineComponent({
  name: 'ChangePassword',
  props: ['userId'],
  data () {
    return {
      inputPassword : "",
      confirmPassword : "",
      URL : ""
    }
  },
  methods: {
    ...mapActions({
      changePass: ActionTypes.CHANGE_PASSWORD
    }),
    changePassword: async function (password: string, id: any) {
        this.changePass({
          id:id,
          password: password
        }).finally(()=> {
          this.$router.push({name: 'User'});
        });
    },
  },
  computed: {
     passwordValidation: function () {
      let errorMessage = null;
        const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (this.inputPassword.length <= 0) {
          errorMessage = "Password is required"
        }  else if (!re.test(this.inputPassword)) {
          errorMessage = "Minimum eight characters, at least one letter, one number and one special character (@$!%*#?&)"
        }
      return errorMessage;
    },
    ConfirmPasswordValidation: function () {
      let errorMessage = null;
        if (this.confirmPassword.length <= 0) {
          errorMessage = "Confirm Password is required"
        } else if (this.inputPassword!== this.confirmPassword) {
          errorMessage = "Passwords does not match with password"
        }
      return errorMessage;
    }
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