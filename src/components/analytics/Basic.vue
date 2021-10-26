<template>
  <div id="expense">
    <div class="diff-shadow">
      <div class="flex-box">
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
        <div class="b" style="margin-left: 10px">
          <button class="btn btn-orange" @click="fetchAnalyticsBtn">Search Analytics</button>
        </div>
      </div>
    <div class="flex-box">
          <button :class=" tab === 'order' ? 'nav-link active' : 'nav-link'" class="btn btn-grid">
            <router-link @click="tab = 'order'" :to="{name: 'order-analytics'}">
              <strong>Orders</strong>
            </router-link>
        </button>
          <button :class="tab === 'inventory' ? 'nav-link active' : 'nav-link'" class="btn btn-grid">
            <router-link @click="tab = 'inventory'" :to="{name: 'inventory-analytics'}">
              <strong>Inventory</strong>
            </router-link>
          </button>
          <button :class="tab === 'finance' ? 'nav-link active' : 'nav-link'" class="btn btn-grid">
            <router-link @click="tab = 'finance'" :to="{name: 'finance-analytics'}">
              <strong>Finance</strong>
            </router-link>
          </button>
        
      </div>
      <hr class="solid">
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
    }
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

  .nav-tabs .nav-item {
    margin-bottom: -1px;
    width: 25%;
  }

.nav-tabs .nav-link.active {
    color: $primary-color;
    background-color: #fff;
    border-color: #dee2e6 #dee2e6 #fff;
  }

  .nav-link {
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
    .btn-grid {
    width: $w100;
    margin: 2px;
  }
  hr.solid {
  border-top: 3px solid #bbb;
}
</style>
