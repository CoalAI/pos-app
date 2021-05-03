<template>
  <div class="diff-shadow">
    <div class="search-grid-list-pages">
        <h2>Previous Orders</h2>
        <div class="float-right">
          <form class="flex-box">
            <input
              label="orderIdSearch"
              name="orderIdSearch"
              type="text"
              placeholder="Enter invoice id to search"
              class="search-input"
              v-model="search"
              @input="searchOrders"
            />
            <button class="btn btn-orange search-btn" @click="searchOrders">Search Order</button>
          </form>
        </div>
    </div>
    <div id="filter-box" class="flex-box">
      <label class="pad-label pn" for="orderStatus">
        <strong>Status:</strong>
      </label>
      <select
        id="orderStatus"
        name="orderStatus"
        class="custom-select"
        v-model="orderStatus"
        @change="onChangeFilters"
      >
        <option value="">ANY</option>
        <option v-for="item in statuses" v-bind:key="item.status" v-bind:value="item.status">
        {{item.status}}
        </option>
      </select>

      <label style="margin-left: 5px" class="pad-label pn" for="paymentMethod">
        <strong>Method:</strong>
      </label>
      <select
        id="paymentMethod"
        name="paymentMethod"
        class="custom-select"
        v-model="paymentMethod"
        @change="onChangeFilters"
      >
        <option value="">ANY</option>
        <option :value="true">Cash</option>
        <option :value="false">Card</option>
      </select>

      <label style="margin-left: 5px" class="pad-label pn" for="orderDate">
        <strong>Date:</strong>
      </label>
      <input
        type="date" 
        id="orderDate" 
        name="orderDate" 
        class="order-search-date"
        v-model="orderDate"
        @change="onChangeFilters"
      >
      
      <div style="width: 46%; margin-left: 5px">
        <button
          class="btn btn-orange"
          @click="clearFilters"
        >Clear Filters</button>
      </div>
    </div>
    <div>
      <div class="flex-box">
        
      </div>
    </div>
    <div class="mr-2">
      <table>
        <colgroup>
          <col span="1" style="width: 2%;">
          <col span="1" style="width: 14%;">
          <col span="1" style="width: 14%;">
          <col span="1" style="width: 14%;">
          <col span="1" style="width: 14%;">
          <col span="1" style="width: 14%;">
          <col span="1" style="width: 14%;">
          <col span="1" style="width: 14%;">
        </colgroup>

        <tr>
          <th>Sr No.</th>
          <th>Total</th>
          <th>Amount Received</th>
          <th>Status</th>
          <th>Payment Method</th>
          <th>Discount Type</th>
          <th>Discount</th>
          <th></th>
        </tr>
        <tr v-for="(order, index) in orders" v-bind:key="order.id">
          <td>{{ index + 1 }}</td>
          <td>{{order.total}}</td>
          <td>{{order.amount_received}}</td>
          <td>{{order.status}}</td>
          <td v-if="order.cash">Cash</td><td v-else>Card</td>
          <td v-if="order.amount_discount">Amount</td><td v-else>Percentage</td>
          <td>{{order.total_discount}}</td>
          <td style="width: 150px">
            <div class="flex-box">
              <router-link 
              :to="{name: 'OrderDetails', params: {orderId: order.id}}"
              class="btn btn-orange btn-mr-inner">Details</router-link>
            </div>
          </td>
        </tr>
      </table>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

import { ActionTypes } from '@/store/modules/order/actions';

export default defineComponent({
  name: 'OrdersList',
  data () {
    return {
      search: '',
      orderStatus: '',
      orderDate: '',
      paymentMethod: ''
    }
  },
  computed: {
    ...mapGetters({
      orders: 'getListOfOrders',
      statuses: 'getOrderStatuses'
    })
  },
  methods: {
    clearFilters: async function () {
      this.paymentMethod = '';
      this.orderStatus = '';
      this.orderDate = '';
      await this.fetchOrders({
        search: this.search
      })
    },

    onChangeFilters: async function () {
      await this.fetchOrders({
        search: this.search,
        status: this.orderStatus,
        cash: this.paymentMethod,
        created__date: this.orderDate
      });
    },

    searchOrders: function (event: Event) {
      if (event) {
        event.preventDefault()
      }
      this.fetchOrders({
        search: this.search,
        status: this.orderStatus,
        cash: this.paymentMethod,
        created__date: this.orderDate
      })
    },

    ...mapActions({
      fetchOrders: ActionTypes.FETCH_ORDERS,
      fetchOrderStatuses: ActionTypes.FETCH_ORDER_STATUSES
    })
  },
  async beforeMount () {
    if (this.$route.query.invoiceId || this.$route.query.date) {
      this.orderDate = this.$route.query.date ? this.$route.query.date as string : '';
      this.search = this.$route.query.invoiceId ? this.$route.query.invoiceId as string : '';
      await this.onChangeFilters();
    } else {
      await this.fetchOrders();
    }
    await this.fetchOrderStatuses();
  }
});
</script>

<style lang="scss" scoped>
  .btn-mr{
    margin: 10px;
  }

  .btn-mr-inner{
    margin: 1px 1px 1px 5px;
  }

  .pr-var-mr {
    margin: 10px;
  }

  .pad-label {
    padding: 20px 20px 20px 0px;
  }
</style>
