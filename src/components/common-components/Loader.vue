<template>
  <Modal>
    <template v-slot:header>
        <h2>Loading...</h2>
    </template>

    <template v-slot:body>
      <div class="container"><h2>{{message}}</h2>  <div class="loader"></div></div>
    </template>

    <template v-slot:footer>
    </template>
  </Modal>
  
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import Modal from '../common-components/Modal.vue'

export default defineComponent({
  props: {
    message: {
      type:String,
      default:'Please Wait...',
    },
  },
  components: {
      Modal,
  },
})
</script>


<style lang="scss" scoped>
.loader {
  border: $loader-border solid #f3f3f3;
  border-radius: 50%;
  border-top: $loader-border solid $primary-color;
  width: $loader-width;
  height: $loader-width;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
  align-self: flex-end;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.container{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 2.5%;
    bottom: 0;
}
</style>