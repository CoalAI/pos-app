<template>
  <div class="order-list-container">
    <div class="diff-shadow">
      <div class="page-upper">
        <div class="page-left-conta">
          <div id="status-container">
            <label class="" for="orderStatus">
              <!-- <strong>Status:</strong> -->
              Status:
            </label>
            <div class="ab-select-container">
              <select
                id="orderStatus"
                name="orderStatus"
                class=""
                v-model="orderStatus"
                @change="onChangeFilters"
              >
                <option value="">Select</option>
                <option v-for="item in statuses" v-bind:key="item.status" v-bind:value="item.status">
                {{item.status}}
                </option>
              </select>
            </div>
          </div>
          <div id="method-container">
            <label style="" class="" for="paymentMethod">
              <!-- <strong>Method:</strong> -->
              Method:
            </label>
            <div class="ab-select-container">
              <select
                id="paymentMethod"
                name="paymentMethod"
                class=""
                v-model="paymentMethod"
                @change="onChangeFilters"
              >
                <option value="">Select</option>
                <option :value="true">Cash</option>
                <option :value="false">Card</option>
              </select>
            </div>
          </div>
          <div id="start-date-container">
            <label style="" class="" for="orderDate">
              <!-- <strong>Date:</strong> -->
              Date:
            </label>
            <div class="ab-input-container">
              <input
                type="date" 
                id="orderDate" 
                name="orderDate" 
                class="order-search-date"
                v-model="orderDate"
                @change="onChangeFilters"
              >
            </div>
          </div>
        </div>
        <div id="search-container">
          <form class="ab-form-pos">
            <input
              label="orderIdSearch"
              name="orderIdSearch"
              type="text"
              placeholder="Search"
              class=""
              v-model="search"
              @input="searchOrders"
            />
            <button class="btn ab-pos btn-orange" @click="searchOrders">
              <svg id="White_search_icon" data-name="White search icon" xmlns="http://www.w3.org/2000/svg" width="13.049" height="13.048" viewBox="0 0 13.049 13.048">
                <path id="Path_99" data-name="Path 99" d="M23.076,23.074a.816.816,0,0,1,1.154,0l3.14,3.14a.816.816,0,0,1-1.153,1.154l-3.14-3.14a.816.816,0,0,1,0-1.154Z" transform="translate(-14.56 -14.558)" fill="#fff" fill-rule="evenodd"/>
                <path id="Path_100" data-name="Path 100" d="M5.3,9.786A4.485,4.485,0,1,0,.816,5.3,4.485,4.485,0,0,0,5.3,9.786ZM10.6,5.3A5.3,5.3,0,1,1,5.3,0a5.3,5.3,0,0,1,5.3,5.3Z" fill="#fff" fill-rule="evenodd"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
      <!-- <div id="filter-box" class="flex-box"> -->
        

        

        
        
        <!-- <div style="width: 46%; margin-left: 5px">
          <button
            class="btn btn-orange"
            @click="clearFilters"
          >Clear Filters</button>
        </div> -->
      <!-- </div> -->
      <!-- <div>
        <div class="flex-box">
          
        </div>
      </div> -->
      <div class="ab-mb-7">
        <table>
          <colgroup>
            <col span="1" style="width: 2%;">
            <col span="1" style="width: 12%;">
            <col span="1" style="width: 7%;">
            <col span="1" style="width: 7%;">
            <col span="1" style="width: 7%;">
            <col span="1" style="width: 7%;">
            <col span="1" style="width: 7%;">
            <col span="1" style="width: 8%;">
            <col span="1" style="width: 7%;">
            <col span="1" style="width: 15%;">
            <col span="1" style="width: 25%;">
          </colgroup>

          <tr class="fr-row header">
            <th>Sr No.</th>
            <th>Invoice ID</th>
            <th>Order ID</th>
            <th>Total</th>
            <th>Amount Received</th>
            <th>Status</th>
            <th>Payment Method</th>
            <th>Discount Type</th>
            <th>Discount</th>
            <th>Date</th>
            <th>Action</th>
            <!-- <th></th> -->
          </tr>
          <tr class="fr-row content" v-for="(order, index) in orders" v-bind:key="order.id">
            <td>{{ index + 1 }}</td>
            <td>{{order.invoice_id}}</td>
            <td>{{order.id}}</td>
            <td>{{trimDecimalPlaces(order.total)}}</td>
            <td>{{trimDecimalPlaces(order.amount_received)}}</td>
            <td>{{order.status}}</td>
            <td v-if="order.cash_payment">Cash</td><td v-else>Card</td>
            <td v-if="order.amount_discount">Amount</td><td v-else>Percentage</td>
            <td>{{trimDecimalPlaces(order.total_discount)}}</td>
            <td>
              <div>
                <p class="text-center">{{getCurrentDate(order.created)}}</p>
                <p class="text-center">{{getCurrentTime(order.created)}}</p>
              </div>
            </td>
            <td>
              <div class="flex-box">
                <div>
                  <router-link 
                  :to="{name: 'OrderDetails', params: {orderId: order.id}}"
                  class="btn-blue">Details</router-link>
                </div>
                <div class="ab_btn btn-orange" @click="printOrderBill(order.id)">Print</div>
              </div>
            </td>
            <!-- <td style="width: 150px">
            </td> -->
          </tr>
        </table>
      </div>
      <Paginator :count="counts.orders" @pageChange="changePage"/>
    </div>
  </div>
  <Modal v-if="order_response && printOrder" type="scrollable">
      <template v-slot:header>
        <h2>Order Status</h2>
      </template>

      <template v-slot:body>
        <OrderBill :orderId="order_response.id" :user="user"/>
      </template>

      <template v-slot:footer>
        <div class="flex-box">
          <button @click="closeReprintDialog();" class="btn btn-orange btn-mr" v-focus>Close</button>
        </div>
      </template>
  </Modal>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

import Paginator from '@/components/common-components/Paginator.vue';
import OrderBill from '@/components/sales/OrderBill.vue';
import Modal from '@/components/common-components/Modal.vue';

import { ActionTypes } from '@/store/modules/order/actions';
import { isManager } from '@/utils/permission_utils';

export default defineComponent({
  name: 'OrdersList',
  components: {
    Paginator,
    OrderBill,
    Modal
  },
  data () {
    return {
      search: '',
      orderStatus: '',
      orderDate: '',
      paymentMethod: '',
      printOrder: false,
      orderid: '',
    }
  },
  computed: {
    ...mapGetters({
      orders: 'getListOfOrders',
      statuses: 'getOrderStatuses',
      counts: 'getTotalCountsOrderModule',
      user: 'getUser',
      order_response: 'getOrder',
    })
  },
  methods: {
    getCurrentTime(date: Date){
			return new Date(date).toLocaleTimeString();
		},

		getCurrentDate(date: Date){
			return new Date(date).toDateString();
		},

    clearFilters: async function () {
      this.paymentMethod = '';
      this.orderStatus = '';
      this.orderDate = '';

      const unproxied_options = {
        invoice_id__contains: this.search,
        buyer__company: '',
        seller__company: '',
      }

      await this.fetchOrders(this.getOptions(unproxied_options));
    },

    getOptions: function(options: any){
        if(isManager()){
          options.buyer__company=this.user.company.id;
          options.seller__company=this.user.company.id;
        }
        return options;
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

      await this.fetchOrders(this.getOptions(unproxied_options));
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

      this.fetchOrders(this.getOptions(unproxied_options))
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

      await this.fetchOrders(this.getOptions(unproxied_options));
    },
    closeReprintDialog: function(){
        this.changeOrderStatus('');
        this.printOrder=false;
    },
    printOrderBill: async function(orderid: any){
      console.log(orderid);
      await this.fetchOrder(orderid);
      this.printOrder=true;
    },
    trimDecimalPlaces: function (value: string) {
      return parseFloat(value !== undefined ? value : '0.0').toFixed(2);
    },

    ...mapActions({
      fetchOrders: ActionTypes.FETCH_ORDERS,
      fetchOrderStatuses: ActionTypes.FETCH_ORDER_STATUSES,
      fetchOrder: ActionTypes.FETCH_ORDER,
      changeOrderStatus: ActionTypes.CHANGE_ORDER_STATUS
    })
  },
  async beforeMount () {
    if (this.$route.query.invoiceId || this.$route.query.date) {
      this.orderDate = this.$route.query.date ? this.$route.query.date as string : '';
      this.search = this.$route.query.invoiceId ? this.$route.query.invoiceId as string : '';
        await this.onChangeFilters();
    } else {
        await this.fetchOrders(this.getOptions({}));
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

  // ab css
  .btn{
    border-radius: 0;
    margin: 0;
  }
  .order-list-container{
    // padding: 2.65% 16%;
    max-width: 1140px;
    margin: 0 auto;
  }
  .diff-shadow{
    padding: 1.6% 5.5% 5.5% 5.5%;
  }

  .page-upper{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  // top designs
  .page-left-conta{
    width: 62%;
    display: flex;
    justify-content: space-between;
  }
  .page-left-conta > div{
    display: flex;
    align-items: baseline;
    width: 34%;
  }
  .page-left-conta > div > label{
    margin-right: 10px;
    font-size: 13px;
    font-weight: bold;
  }
  #search-container{
    width: 35%;
  }

  .user-btn{
    width:135px;
    padding: 8px 22px !important;
  }
  .btn-blue{
    text-decoration: none;
    text-align: center;
    background-color:#0f2636;
    // font-family:seg;
    font-size: 12px;
    border-radius: 20px;
    // width: 135px;
    // padding:5px;
    padding: 6px 40px;
    cursor: pointer;
    color:$white-color;
    border: 1.5px solid #0f2636 !important;
    // font-weight:bold;
  }
  // hover blue
  .btn-blue:hover{
    color: #0f2636;
    background-color: white;
    border: 1.5px solid #0f2636;
  }
  
  .ab_btn{
    color: $white-color;
    text-decoration: none;
    padding: 4px 22px;
    cursor: pointer;
    font-size: $btn-font-size;
    border: 1.5px solid $primary-color !important;
    border-radius: 20px;
    outline:none;
  }
  // hover
  .ab_btn:hover{
    background-color: white;
    color: $primary-color;
    border: 1.5px solid $primary-color;
    // font-weight: bold;
  }
  .ab-form-pos{
    position: relative;
    text-align: right;
    margin-right: 10px;
  }
  .ab-pos{
    position: absolute;
    width: 50px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    top:0px; 
    right: 0px;
    height: 40px;
    border: none;
    cursor: pointer;
  }
  .ab-mb-7{
    margin-top: 20px;
    margin-bottom: 70px;
  }
  #White_search_icon {
    fill: white;
    width: 24px;
    vertical-align: middle; 
    cursor: pointer;
    background-color: $primary-color;
  }
  #search-container > span{
    font-size: 0.8em;
    margin-left: 120px;
    font-style: italic;
  }
  #search-container > form > input{
    width: 100%;
    margin: 0;
    padding: 8px 70px 8px 20px;
    border-radius: 20px;
  }

  // input designs
  .ab-input-container > input[type=date]{
    padding: 8px 18px;
    border-radius: 10px;
    font-size: 0.75em;
  }
  .ab-select-container > select{
    padding: 8px 18px;
    border-radius: 10px;
    font-size: 12px;
  }
  #method-container > .ab-select-container{
    width: 64.13%;
  }

  // table designs
  .fr-row {
    font-size: 12px;
  }
  .header > th{
    text-align: center;
  }
  .header > th:first-child{
    border: none;
    border-radius: 10px 0px 0px 10px;
  }
  .header > th:last-child{
    border: none;
    border-radius: 0px 10px 10px 0px;
  }
  .header {
    border-radius: 5px;
    background-color: #0f2634; 
    color: white;
  }
  td > .flex-box{
    justify-content: space-around;
    align-items: center;
  }
  .content{
    background-color: white; 
    color: #0f2634;
  }
  .content > td{
    text-align: center;
  }
  .ab-mb-7{
    margin-bottom: 70px;
  }


</style>
