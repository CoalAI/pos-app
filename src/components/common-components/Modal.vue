<template>
  <transition name="modal">
    <div class="modal-mask" v-bind:class="classObject">
      <div class="modal-wrapper" v-bind:class="classObject2">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header"/>
          </div>

          <div class="modal-body">
            <slot name="body"/>
          </div>

          <div class="modal-footer">
            <slot name="footer"/>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'modal',
  props: {
    type: {
      type: String,
    }
  },
  data() {
    return {
      classObject: {
        'scroll':  this.type == 'scrollable',
        
      },
      classObject2: {
        'center-align': this.type == 'scrollable',
      }
    }
  }
});
</script>

<style lang="scss" scoped>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(3px);
    display: table;
    transition: opacity 0.3s ease;
    padding:2em;
  }

  .scroll {
    overflow-y: auto !important;
    webkit-transform: translate3d(0,0,0) !important;
    display: -webkit-box !important;
    display: -moz-box !important;
    display: -ms-flexbox !important;
    display: -webkit-flex !important;
    display: flex !important;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .center-align {
    width: 100%;
  } 

  .modal-container {
    width: 40%;
    margin: 0px auto;
    background-color: $white-color;
    border-radius: 5px;
    box-shadow: 0 2px 8px $modal-shadow-color;
    transition: all 0.3s ease;
    border: 1px solid $primary-color;
    padding:0em 4em;
    font-family:seg;

    // overflow-y: auto;
    // height: 600px;

    -webkit-animation-name: animatetop;
    -webkit-animation-duration: 0.4s;
    animation-name: animatetop;
    animation-duration: 0.4s
  }

  .modal-header {
    padding: 10px 16px 5px 16px;
    // background-color: $primary-color;
    // color: $white-color;
    color: $primary-color;
    justify-content: center;
    border: none;
  }

  .modal-body {
    padding: 2px 16px;
  }

  .modal-footer {
    padding: 10px 16px 10px 16px;
    border: none;
    justify-content: center;
  }

  /*
  * The following styles are auto-applied to elements with
  * transition="modal" when their visibility is toggled
  * by Vue.js.
  *
  * You can easily play with the modal transition by editing
  * these styles.
  */

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>