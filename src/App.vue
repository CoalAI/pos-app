<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <Home/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Home from './components/Home.vue';

export default defineComponent({
  components: { Home },
})
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0;
  }

  a {
    text-decoration: none;
  }

  label {
    font-size: 13px;
  }

  .wrapper {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-auto-rows: minmax(100px, auto);
    gap: 1em;
  }

  .btn {
    color: white;
    padding: 8px 12px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 100%;
    font-size: 12px;
  }

  .btn-lg {
    padding: 14px 20px;
    font-size: 16px;
  }

  .btn:hover {
    opacity: 0.90;
  }

  .btn-orange {
    background-color: #e73b2a;
  }

  /* Full-width inputs */
  input[type=text], input[type=password] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: none;
    box-sizing: border-box;
    outline-color: #e73b2a;
    background-color: #f5f2f2;

     -webkit-box-shadow: 1px 1px 10px -1px #423144;
    -moz-box-shadow: 1px 1px 10px -1px  #423144;
    box-shadow: 1px 1px 10px -1px  #423144;
  }

  .flex-box {
    display: flex;
  }

  .mr-2 {
    margin-top: 20px;
  }

  .mr-6 {
    margin-top: 60px;
  }

  .text-center {
    text-align: center;
  }

  .white-color {
    color: white;
  }

  .float-right {
    float: right;
  }

  .float-left {
    float: left;
  }
</style>
