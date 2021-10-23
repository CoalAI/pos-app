<template>
  <div id="expense">
    <div class="diff-shadow">
      <div class="grid-container">
        <div class="grid-item">
        <label class="pad-label ls" for="start_date">
          <strong>Start:</strong>
        </label>
        <div class="s-i">
          <input
            name="start_date"
            type="date"
            v-model="startDate"
          />
        </div>
        </div>
         <div class="grid-item">
        <label class="pad-label mr-l le" for="end_date">
          <strong>End:</strong>
        </label>
        <div class="e-i">
          <input
            name="end_date"
            type="date"
            v-model="endDate"
          />
        <span v-if="dateValidation" class="form-error">{{dateValidation}}</span>
        </div>
        </div>
        <div class="grid-item">
          <button class="btn btn-orange" @click="fetchAnalyticsBtn">Search Analytics</button>
        </div>
      </div>
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
          <span :class="tab === 'finance' ? 'nav-link active' : 'nav-link'">
            <router-link @click="tab = 'finance'" :to="{name: 'finance-analytics'}">
              <strong>Finance</strong>
            </router-link>
          </span>
        </li>
         <li class="nav-item">
          <span :class="tab === 'StockStatement' ? 'nav-link active' : 'nav-link'">
            <router-link @click="tab = 'StockStatement'" :to="{name: 'StockStatement'}">
              <strong>Stock Statement</strong>
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
import { mapActions } from 'vuex';
import { ActionTypes } from '@/store/modules/order/actions';

export default defineComponent({
  name: 'Expense',
  data() {
    const path = window.location.pathname;
    const date = new Date();
    const dateStr = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    return {
      tab: path.split('/')[2],
      startDate: dateStr,
      endDate: dateStr,
    }
  },
  computed: {
    dateValidation: function(): string | null {
      if(this.startDate !== undefined && this.endDate !== undefined && 
        this.startDate !=='' && this.endDate !== '' &&
        Date.parse(this.startDate) <= Date.parse(this.endDate)
      ){
        return null;
      }

      return 'invalid date range';
    },
  },
  methods: {
    ...mapActions({
      fetchAnalytics: ActionTypes.FETCH_ANALYTICS
    }),
    async fetchAnalyticsBtn() {
      await this.fetchAnalytics({
        start_date: this.startDate,
        end_date: this.endDate,
      });
    },
  },
  async mounted() {
    await this.fetchAnalytics({
      start_date: this.startDate,
      end_date: this.endDate,
    });
  }
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
  .grid-container {
  display: grid;
  grid-template-columns: auto auto auto;
  padding: 10px;
}
.grid-item {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
}
</style>
