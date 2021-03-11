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

<style lang="scss">

  #app {
    font-family: $font-family;
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
    font-size: $label-font-size;
  }

  /* Button styles */
  .btn {
    color: $white-color;
    padding: $normal-btn-pad;
    margin: $margin-btn-input;
    border: none;
    cursor: pointer;
    width: 100%;
    font-size: $btn-font-size;
    text-align: center;
  }

  .btn-lg {
    padding: $large-btn-pad;
    font-size: $large-btn-font-size;
  }

  .btn:hover {
    opacity: 0.90;
  }

  .btn-orange {
    background-color: $primary-color;
  }

  /* Full-width inputs */
  input[type=text], input[type=password], input[type=date], select {
    width: 100%;
    padding: $input-pad;
    margin: $margin-btn-input;
    display: inline-block;
    border: none;
    box-sizing: border-box;
    outline-color: $primary-color;
    background-color: $input-background-color;
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
    color: $white-color;
  }

  .float-right {
    float: right;
  }

  .float-left {
    float: left;
  }

  /* table styles */
  table {
    border-collapse: collapse;
    width: 100%;
  }

  td, th {
    border: 1px solid;
    border-color: $table-border;
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: $table-nth-row-color;
  }

  /* Search bar with button */
  .search-input {
    width: 80% !important;
  }

  .search-btn {
    width: 20% !important;
  }

  /* Radio buttons styles */
  /* The custom-radio */
  .custom-radio {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 20px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /* Hide the browser's default radio button */
  .custom-radio input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  /* Create a custom radio button */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: $custom-radio;
    border-radius: 50%;
  }

  /* On mouse-over, add a grey background color */
  .custom-radio:hover input ~ .checkmark {
    background-color: $custom-radio-hover;
  }

  /* When the radio button is checked, add a blue background */
  .custom-radio input:checked ~ .checkmark {
    background-color: $primary-color;
  }

  /* Create the indicator (the dot/circle - hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  /* Show the indicator (dot/circle) when checked */
  .custom-radio input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the indicator (dot/circle) */
  .custom-radio .checkmark:after {
    top: 9px;
    left: 9px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: $white-color;
  }

  .shadow-box {
    -webkit-box-shadow: 1px 1px 6px -1px  $input-shadow-color;
    -moz-box-shadow: 1px 1px 6px -1px  $input-shadow-color;
    box-shadow: 1px 1px 6px -1px  $input-shadow-color;
  }

  .pad-label {
    padding: $label-pad;
  }

  .pad-2 {
    padding: 20px;
  }
</style>
