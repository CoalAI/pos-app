<template>
  <Modal v-if="getError">
    <template v-slot:header>
      <h2>Error</h2>
    </template>

    <template v-slot:body>
      <p>{{ getError }}</p>
    </template>

    <template v-slot:footer>
      <div class="flex-box">
        <button @click="dismissError" class="btn btn-orange btn-mr">Dismiss</button>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex';
import { defineComponent } from 'vue';
import Modal from "./Modal.vue";

export default defineComponent({
  name: 'ErrorHandler',
  components: {
    Modal
  },
  computed: {
    ...mapGetters(['getError'])
  },
  methods: {
    dismissError: function () {
      this.setError(null);
    },
  
    ...mapActions(['setError'])
  }
})
</script>

<style lang="sass" scoped>

</style>
