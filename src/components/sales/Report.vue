<template>
    <div>
      <Header/>
      <form>
        <div class="flex-box mr-2">
          <label class="pad-label" for="username">
            <strong>Start:</strong>
          </label>
          <input
            v-model="username"
            label="Username"
            name="username"
            type="text"
            placeholder="Enter Username"
          />
          <label class="pad-label" for="username">
            <strong>End:</strong>
          </label>
          <input
            v-model="username"
            label="Username"
            name="username"
            type="text"
            placeholder="Enter Username"
          />
          <button class="btn btn-orange"
          style="margin: 10px 60px 10px 60px">Search Report</button>
        </div>
      </form>
      <div class="report-main" style="padding: 10px;">
        <div style="border: 1px solid #e73b2a; height: 350px">
          <h1>Report Details Shown Here</h1>
        </div>
      </div>
      <div class="float-right">
        <button class="btn btn-orange"
          style="width: 250px; margin-right: 10px;">Print Report</button>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './Header.vue';
// import { useStore } from 'vuex'
// import { ActionTypes } from '@/store/modules/auth/actions'

export default defineComponent({
  name: 'Report',
  components: {
    Header,
  },
});
</script>

<style scoped>
.pad-label{
    padding:20px;
  }
</style>
