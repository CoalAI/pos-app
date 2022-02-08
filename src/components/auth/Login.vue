<template>  
  <div class="header">
      <h1 class="text-center"><img src="../../assets/logo.png" alt="coaldev" class="img-center"></h1>  
  </div>
  <div>
    <!--<div class="wrapper"-->
    <div style="background:url(../../assets/login-back.png)">
      <h1 class="head">POS</h1>    
      <div class="col">
        <img src="" class="user"/>
        <form method="POST" @submit="(e) => e.preventDefault()">
          <div class="flex-box">
            <!--<label class="pad-label" for="username">
              <strong>Username:</strong>
            </label>-->
            <button class="btn-search btn-orange">
              <img src="" alt="Search">
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
              <img src="" alt="Search">
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
  body{
    margin:0;
    padding:0;
    background: url(../../assets/login-back.png);
    background-size: cover;
    background-position: center;
  }
  .wrapper {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-auto-rows: minmax(100px, auto);
    gap: 1em;
    top:50%;
    left:50%;
    position:absolute;
  }

  .col {
    box-sizing: border-box;
    top:50%;
    left:34%;
    position:absolute;
    width:500px;
    background-color:#ffffff;
    border: 1px solid $white-color;
    border-radius: 10px;
    padding: 2em;
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
    height:100%;
    margin-top:1%;
  }
  .flex-box{
    width: 250px;
    height:50px;
    
    
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
  .search-box{
    border-radius:0px 20px 20px 0px;
    padding:0px 0px 0px 10px;
    margin:8px 0px 8px 0px;
    font-size:14px;
    color:#9ea3a6;
    font-family:seg;
    border: 1px solid #dfe0e1;
    border-right-style:none !important;
}
.btn-red{
  background-color:#e43d2a;
  font-family:seg;
  font-size: 12px;
  margin:8px 0px 2px 60px;
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
.user{
  outline:none;
  border:none;
  background-color:#0f2634;
  border-radius:50%;
  width:70px;
  height:70px;
  position:absolute;
  top:-40px;
  left:calc(50% - 50px);
}
form{
  margin-left:18%;
}
.form-error{
  font-family:seg;
  font-size:11px;
  display:block;
}
.head{
  color:black;
  font-size:max;
  font-family:seg;
}
</style>
