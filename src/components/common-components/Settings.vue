<template>
  <div id="Settings">
    <div class="diff-shadow">
      <h2>Settings (To Be Implemented)</h2>
      <div class="flex-box">
        <label class="pad-label w100" for="font-size">
            <strong>Font Size:</strong>
          </label>
          <input
            id="font-size"
            name="font-size"
            type="text"
            placeholder="Font size"
            value="100%"
          />
      </div>
      <div class="flex-box">
        <label class="pad-label w100" for="primary-color">
          <strong>Primary Color:</strong>
        </label>
        <input
          id="primary-color"
          name="primary-color"
          type="color"
          value="#e73b2a"
        />
      </div>
      <div class="flex-box">
        <label class="pad-label w100" for="header-color">
          <strong>Header Color:</strong>
        </label>
        <input
          id="header-color"
          name="header-color"
          type="color"
          value="#423144"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Settings'
})
</script>

<style lang="scss" scoped>
  #Settings {
    padding-left: 15%;
    padding-right: 15%;
    margin-top: 3%;
  }

  .pad-label {
    padding: 20px 20px 20px 0px;
  }

  .w100 {
    width: $w150;
  }

  label {
    text-align: left;
  }
</style>