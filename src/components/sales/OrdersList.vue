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
          <col span="1" style="width: 6%;">
          <col span="1" style="width: 12%;">
          <col span="1" style="width: 12%;">
          <col span="1" style="width: 12%;">
          <col span="1" style="width: 12%;">
          <col span="1" style="width: 12%;">
          <col span="1" style="width: 12%;">
          <col span="1" style="width: 20%;">
        </colgroup>

        <tr>
          <th>Sr No.</th>
          <th>Invoice ID</th>
          <th>Order ID</th>
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
          <td>{{order.invoice_id}}</td>
          <td>{{order.id}}</td>
          <td>{{trimDecimalPlaces(order.total)}}</td>
          <td>{{trimDecimalPlaces(order.amount_received)}}</td>
          <td>{{order.status}}</td>
          <td v-if="order.cash">Cash</td><td v-else>Card</td>
          <td v-if="order.amount_discount">Amount</td><td v-else>Percentage</td>
          <td>{{trimDecimalPlaces(order.total_discount)}}</td>
          <td style="width: 150px">
            <div class="flex-box">
              <router-link 
              :to="{name: 'OrderDetails', params: {orderId: order.id}}"
              class="btn btn-orange btn-mr-inner">Details</router-link>
            </div>
          </td>
        </tr>
      </table>
      <Paginator :count="counts.orders" @pageChange="changePage"/>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

import Paginator from '@/components/common-components/Paginator.vue';
import { ActionTypes } from '@/store/modules/order/actions';
import { isManager } from '@/utils/permission_utils';

export default defineComponent({
  name: 'OrdersList',
  components: {
    Paginator
  },
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
      statuses: 'getOrderStatuses',
      counts: 'getTotalCountsOrderModule',
      user: 'getUser'
    })
  },
  methods: {
    clearFilters: async function () {
      this.paymentMethod = '';
      this.orderStatus = '';
      this.orderDate = '';

      const unproxied_options = {
        invoice_id__contains: this.search,
        buyer__company: '',
        seller__company: '',
      }
      if(isManager()){
        unproxied_options.buyer__company = this.user.company.id;
        unproxied_options.seller__company = this.user.company.id;
      }

      await this.fetchOrders(unproxied_options);
    },

    onChangeFilters: async function () {
      const unproxied_options = {
        buyer__company: '',
        seller__company: '',
        invoice_id__contains: this.search,
        status: this.orderStatus,
        cash: this.paymentMethod,
        created__date: this.orderDate
      }

      if(isManager()){
        unproxied_options.buyer__company = this.user.company.id;
        unproxied_options.seller__company = this.user.company.id;
      }
      await this.fetchOrders(unproxied_options);
    },

    searchOrders: function (event: Event) {
      if (event) {
        event.preventDefault()
      }
      const unproxied_options = {
        buyer__company: '',
        seller__company: '',
        invoice_id__contains: this.search,
        status: this.orderStatus,
        cash: this.paymentMethod,
        created__date: this.orderDate
      }

      if(isManager()){
        unproxied_options.buyer__company=this.user.company.id;
        unproxied_options.seller__company=this.user.company.id;
      }
      this.fetchOrders(unproxied_options)
    },

    changePage: async function (pageNo: number) {
      const unproxied_options = {
        invoice_id__contains: this.search,
        status: this.orderStatus,
        cash: this.paymentMethod,
        created__date: this.orderDate,
        page: pageNo,
        buyer__company:'',
        seller__company:''
      }
      if(isManager()){
        unproxied_options.buyer__company = this.user.company.id
        unproxied_options.seller__company = this.user.company.id
      }

      await this.fetchOrders(unproxied_options);
    },

    trimDecimalPlaces: function (value: string) {
      return parseFloat(value !== undefined ? value : '0.0').toFixed(2);
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
      const unproxied_options ={ 
        buyer__company: this.user.company.id,
        seller__company: this.user.company.id,
      }
      if(isManager())
        await this.fetchOrders(unproxied_options);
      else
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
