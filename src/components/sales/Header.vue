<template>
  <div class="container">
    <div class="logo">
      <router-link to="/"><img src="../../assets/logo.png" alt="coaldev"></router-link>
    </div>
    <div class="b">
      <div class="flex-box">
        <a class="btn btn-orange btn-mr" href="/"
        target="_blank">New Order</a>
        <!-- <a class="btn btn-orange btn-mr">Report</a> -->
        <router-link to="/report" class="btn btn-orange btn-mr">Report</router-link>
        <a class="btn btn-orange btn-mr">Seetings</a>
      </div>
      <div class="flex-box">
        <a class="btn btn-orange btn-mr">Products</a>
        <a class="btn btn-orange btn-mr">Batches</a>
        <a class="btn btn-orange btn-mr">Users</a>
      </div>
    </div>
    <div class="s">
      <form class="flex-box">
        <input
          label="Username"
          name="username"
          type="text"
          placeholder="Enter Order Number to search"
          class="order-search"
        />
        <button class="btn btn-orange order-search-btn">Search Order</button>
      </form>
    </div>
    <div class="name user-name">
      <span class="white-color">
        <strong>Omer Ali</strong>
      </span>
    </div>
    <div class="logout">
        <a class="btn btn-orange btn-lg">Logout</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import { useStore } from 'vuex'
// import { ActionTypes } from '@/store/modules/auth/actions'

export default defineComponent({
  name: 'Header',
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    background-color: #423144;
    padding: 1em;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 0.4fr;
    gap: 1em 1em;
    grid-template-areas:
    "logo b b b b s s s s name name logout"
  }
  .logo {
    grid-area: logo;
    margin-top:10px;
  }
  .b {grid-area: b;}
  .s {
    grid-area: s;
  }
  .name {
    grid-area: name;
  }

  .logout {
    grid-area: logout;
    margin-top: 13px;
  }

  td {
    padding: 8px;
    text-align: left;
  }

  .btn {
    width: 100px;
    padding: 8px 20px;
  }
  .btn-mr{
    margin: 10px;
    text-align: center;
  }

  .user-name {
    margin-top: 12px;
    text-align: right;
  }

  .order-search {
    width: 80%;
  }

  .order-search-btn {
    width: 20%
  }

</style>
