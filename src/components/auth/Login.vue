<template>
  <div>
    <div class="row">
      <div class="col">
        <div>Login form</div>
        <form>
          <input
            v-model="userName"
            label="Username"
            name="username"
            type="text"
          />

          <input
            v-model="password"
            id="password"
            label="Password"
            name="password"
            type="password"
          />
        </form>
        <button @click="submitLogin">Login</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapGetters, mapActions } from 'vuex';

@Component({
  computed: mapGetters(['getUser', 'getToken']),
})
export default class Login extends Vue {
  private userName: string;
  private password: string;

  loginUser: any;

  constructor() {
    super();
    this.loginUser = mapActions(['loginUser']);
    this.userName = '';
    this.password = '';
  }

  // data() : {username:string, password:string} {
  //   return {
  //     username: '',
  //     password: '',
  //   };
  // }

  submitLogin() {
    this.loginUser({ username: this.userName, password: this.password });
  }
}
</script>
