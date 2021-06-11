<template id="alert-template">
  <div class="alert" v-bind:class="classObject" v-show="open">
    <!-- <div class="alert__heading">{{type}}</div> -->
    <div class="alert__body">
        <slot>No Message</slot>
    </div>
    <div class="alert__close" @click="close">X</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Alert',
  props: {
    type: {
      type: String,
      default: 'info'
    }
  },
  data() {
    return {
      closed: false,
      classObject: {
        'alert--success': this.type == "success",
        'alert--error': this.type == "error",
        'alert--warning': this.type == "warning"
      }
    }
  },
  computed: {
    open: function() {
      if (this.closed) {
        return false;
      }
      return true;
    },
    
    classes: function() {
      return "1";
    }
  },
  methods: {
    close: function() {
      this.closed = true;
    }
  },
});
</script>

<style lang="scss" scoped>
  h1 {
    text-align: center;
    margin-bottom: 50px;
  }
  .container {
    width: 1024px;
    margin: 0 auto;
  }
  .alert {
    padding: 1em;
    padding-right: 2em;
    margin-bottom: 1em;
    background: #ddd;
    border: 2px solid #9b9b9b;
    position: relative;
    border-radius: 5px;
  }
  .alert.alert--success {
    background: #d9ffd9;
    border: 3px solid #c6ffc6
  }
  .alert .alert--warning {
    background: #ffc;
    border: 3px solid #ffffc2;
  }
  .alert .alert--error {
    background: #fcc;
    border: 3px solid #ffc2c2;
  }
  .alert .alert__heading {
    font-size: 1.2em;
    margin-bottom: 0.5em;
  }
  .alert .alert__close {
    position: absolute;
    right: 1em;
    top: 1em;
  }
  .alert .alert__close:hover {
    cursor: pointer;
  }
</style>
