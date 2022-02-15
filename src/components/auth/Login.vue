<template>
  <div>
    <!--<h1 class="text-center">CoalDev POS</h1>-->
    <!-- <img src="../../assets/logo.png" alt="coaldev"> -->
    <div class="header">
      <img :src="logo" alt="coaldev" class="img-center">  
    </div>
    <h2 class="head ">POS</h2>
    <div class="wrapper mr-top">
      <div class="col">
        <form method="POST" @submit="(e) => e.preventDefault()">
          <div class="flex-box">
            <img :src="user" class="user login" width="20" height="20" align="center" />
            <!--<label class="pad-label" for="username">
              <strong>Username:</strong>
            </label>-->
            <button class="btn-search btn-orange">
              <img :src="luser" alt="Search">
            </button>
            <input
              class="search-input search-box"
              v-model="username"
              label="Username"
              name="username"
              type="text"
              placeholder="Username"
              required="True"
            />
          </div>
          <div class="flex-box">
            <!--<label class="pad-label" for="password">
              <strong>Password:</strong>
            </label>-->
            <button class="btn-search btn-orange">
              <img :src="pass" alt="Search">
            </button>
            <input
              class="search-input search-box"
              v-model="password"
              id="password"
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
              required="True"
            />
          </div>
          <span v-if="loginValidation" class="form-error">{{ loginValidation }}</span>

          <input
          type="submit"
          class="btn-red btn-orange"
          @click="submitLogin"
          value="Login"/>
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
      logo: require('../../assets/login-top-logo.svg'),
      pass: require('../../assets/login-password.svg'),
      luser: require('../../assets/login-user.svg'),
      user:require('../../assets/user-login.svg'),
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
        }).finally(()=> {
          this.showLoader=false;
          this.$router.push({name: 'Order'});
        });
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
    grid-column: 6/10;
    border: 1px solid $white-color;
    border-radius: 10px;
    padding: 2em 4em;
    left:-25%;

    -webkit-box-shadow: 1px 1px 10px -1px $login-shodow-color;
    -moz-box-shadow: 1px 1px 10px -1px $login-shodow-color;
    box-shadow: 1px 1px 10px -1px $login-shodow-color;
  }
  .col:focus{
    border:1px solid #e43d2a;
  }
  
  .col:active{
    border:1px solid #e43d2a;
  }
  
  .col:hover{
    border:1px solid #e43d2a;
  }

  .pad-label {
    padding:20px;
  }

  .header{
    background-color: #e43d2a;
    width:100%;
    position:absolute;
    top:0;
    left:0;
    height:150px;
    border-radius:0px 0px 50px 50px;
  }

  .img-center{
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 15%;
    height:95%;
  }
  .mr-top{
    margin-top:65px;
  }
  .head{
  color:black;
  font-size:100px;
  font-weight:bold;
  font-family:seg;
  margin-top:150px;
  text-align: center;
}
.user{
  outline:none;
  border:none;
  background-color:#0f2634;
  border-radius:50%;
  width:70px;
  height:70px;
  position:absolute;
  top:-40px;
  left:calc(50% - 40px);
}
.btn-search {
    border-radius:20px 0px 0px 20px;
    color: $white-color;
    //padding: $normal-btn-pad;
    margin: $margin-btn-input;
    cursor: pointer;
    font-family:seg;
    font-size: 10px;
    border: 1px solid #dfe0e1;
    border-right-style:none!important;
    text-align: center;
    width:20%; 
  }
  .btn-search:focus{
    outline:none;
  }
  .search-box{
    border-radius:0px 20px 20px 0px;
    padding:0px 0px 0px 10px;
    margin:8px 0px 8px 0px;
    font-size:14px;
    color: black;
    font-family:seg;
    border: 1px solid #dfe0e1;
    border-right-style:none !important;
}
.search-box:focus{
  outline:none;
}
.flex-box{
  width: 250px;
  height:50px; 
  margin-left:20px;
}
.form-error{
  font-family:seg;
  font-size:11px;
  display:block;
  margin-left:25px;
}
.btn-red{
  background-color:#e43d2a;
  font-family:seg;
  font-size: 12px;
  margin:31px 0px 2px 82px;
  border-radius: 20px;
  width: 135px;
  cursor: pointer;
  color:$white-color;
  border:none;
  padding:5px;
  font-weight:bold;
}
.btn-red:focus{
  outline: none;
}

</style>
