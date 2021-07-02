<template>
  <div>
    <h1 class="text-center">CoalDev POS</h1>
    <!-- <img src="../../assets/logo.png" alt="coaldev"> -->
    <div class="wrapper mr-6">
      <div class="col">
        <form method="POST" @submit="(e) => e.preventDefault()">
          <div class="flex-box">
            <label class="pad-label" for="username">
              <strong>Username:</strong>
            </label>
            <input
              v-model="username"
              label="Username"
              name="username"
              type="text"
              placeholder="Enter Username"
              required="True"
            />
          </div>
          <div class="flex-box">
            <label class="pad-label" for="password">
              <strong>Password:</strong>
            </label>
            <input
              v-model="password"
              id="password"
              label="Password"
              name="password"
              type="password"
              placeholder="Enter Password"
              required="True"
            />
          </div>
          <span v-if="loginValidation" class="form-error">{{ loginValidation }}</span>

          <input
          type="submit"
          class="btn btn-orange btn-lg"
          @click="submitLogin"
          value="login"/>
        </form>
        <Loader v-show="showLoader"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import { ActionTypes } from '@/store/modules/auth/actions';
import Loader from '../common-components/Loader.vue';


export default defineComponent({
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      showLoader:false
    }
  },
  computed:{
    loginValidation(){
      if (this.username=='' || this.password==''){
        return 'Both fields are required!';
      }
      return false;
      
    }
  },
  methods: {
    ...mapActions({
      loginUser: ActionTypes.LOGIN_USER
    }),
    submitLogin() {
      if(!this.loginValidation){
        this.showLoader=true;
        this.loginUser({
          username: this.username,
          password: this.password
        }).finally(()=>this.showLoader=false)
        
      }
    },
  },
  components:{
    Loader 
  }
});
</script>

<style lang="scss" scoped>
  .wrapper {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-auto-rows: minmax(100px, auto);
    gap: 1em;
  }

  .col {
    grid-column: 4/10;
    border: 1px solid $white-color;
    border-radius: 10px;
    padding: 4em;

    -webkit-box-shadow: 1px 1px 10px -1px $login-shodow-color;
    -moz-box-shadow: 1px 1px 10px -1px $login-shodow-color;
    box-shadow: 1px 1px 10px -1px $login-shodow-color;
  }

  .pad-label {
    padding:20px;
  }
</style>
