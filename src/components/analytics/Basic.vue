<template>
  <div id="expense">
    <div class="diff-shadow">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <span :class="tab === 'order' ? 'nav-link active' : 'nav-link'">
            <router-link @click="tab = 'order'" :to="{name: 'order-analytics'}">
              <strong>Orders</strong>
            </router-link>
          </span>
        </li>
        <li class="nav-item">
          <span :class="tab === 'inventory' ? 'nav-link active' : 'nav-link'">
            <router-link @click="tab = 'inventory'" :to="{name: 'inventory-analytics'}">
              <strong>Inventory</strong>
            </router-link>
          </span>
        </li>
        <li class="nav-item">
          <span :class="tab === 'detail' ? 'nav-link active' : 'nav-link'">
            <router-link @click="tab = 'detail'" :to="{name: 'operator-sales-detail'}">
              <strong>Operator Sales</strong>
            </router-link>
          </span>
        </li>
      </ul>
      <div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Expense',
  data() {
    const path = window.location.pathname;
    return {
      tab: path.split('/')[2],
    }
  },
});
</script>

<style lang="scss" scoped>
  #expense {
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

  .full-width {
    width: 100%;
  }

  .checkbox-label {
    font-size: $label-font-size;
  }

  .nav {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
  }

  .nav-tabs {
    border-bottom: 1px solid #dee2e6;
  }

  .nav-tabs .nav-item {
    margin-bottom: -1px;
    width: 25%;
  }

  .nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
    color: $primary-color;
    background-color: #fff;
    border-color: #dee2e6 #dee2e6 #fff;
  }

  .nav-tabs .nav-link {
    border: 1px solid transparent;
    border-top-left-radius: .25rem;
    border-top-right-radius: .25rem;
  }

  .nav-link {
    color: #495057;
    display: block;
    padding: .5rem 1rem;
  }
  a:visited {
    color: #495057;
  }
  .active a {
    color: $primary-color;
  }
</style>
