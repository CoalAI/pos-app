<template>
  <div class="response-container">
    <div class="diff-shadow">
      <!-- <h2>Responses</h2> -->
      <div class="page-upper">
        <ul class="nav nav-tabs">
          <li :class="tab === 'Request' ? 'active-li' : ''" @click="tab = 'Request'">
            <span>
              <strong>Request Items</strong>
            </span>
          </li>
          <li :class="tab === 'Order' ? 'active-li' : ''" @click="tab = 'Order'">
            <span>
              <strong>Orders</strong>
            </span>
          </li>
        </ul>
        <!-- <ul class="nav nav-tabs">
          <li class="nav-item" @click="tab = 'Request'">
            <span :class="tab === 'Request' ? 'nav-link active' : 'nav-link'">
              <strong>Request Items</strong>
            </span>
          </li>
          <li class="nav-item" @click="tab = 'Order'">
            <span :class="tab === 'Order' ? 'nav-link active' : 'nav-link'">
              <strong>Orders</strong>
            </span>
          </li>
        </ul> -->
        <div v-if="tab === 'Request'" class="right-cont">
          <div class="flex-box"> 
            <label class="">
              <strong>Status filter:</strong>
            </label>
            <div class="ab-select-container">
              <select class="transtype custom-select" v-model="searchStatus" @change="onChangeStatusFilter">
                <option value="">Select:</option>
                <option value="PENDING">PENDING</option>
                <option value="APPROVED">APPROVED</option>
                <option value="COMPLETE">COMPLETE</option>
                <option value="CANCEL">CANCEL</option>
              </select>
            </div>
          </div>
        </div>
        <div v-else-if="tab === 'Order'" class="right-cont">
          <div class="flex-box"> 
            <label class="">
              <strong>Status filter:</strong>
            </label>
            <div class="ab-select-container">
              <select
              class="transtype custom-select"
              v-model="orderStatus"
              @change="onOrderStatusChangeFilter"
              >
                <option value="">Select:</option>
                <option v-for="item in statuses" v-bind:key="item.status" v-bind:value="item.status">
                {{item.status}}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div v-if="tab === 'Request'" class="mt-20">
        <div class="ab-mb-7 box1-tab">
          <table>
            <colgroup>
              <col span="1" style="width: 2%;">
              <col span="1" style="width: 5%;">
              <col span="1" style="width: 10%;">
              <col span="1" style="width: 10%;">
              <col span="1" style="width: 10%;">
              <col span="1" style="width: 15%;">
              <col span="1" style="width: 10%;">
              <col span="1" style="width: 10%;">
              <col span="1" style="width: 25%;">
            </colgroup>

            <tr class="fr-row header">
              <th>Sr No.</th>
              <th>Req Id</th>
              <th>From</th>
              <th>to</th>
              <th>Request Type</th>
              <th>Description</th>
              <th>Created On</th>
              <th>Delivery Date</th>
              <th>Status</th>
            </tr>
            <template v-for="(request,index) in requests" v-bind:key="request.id">
              <tr class="fr-row content" @click="selectRequest(request.id)" :class="selected_request===request.id?'table-active':''">
                <td>{{index+1}}</td>
                <td>{{request.id}}</td>
                <td>{{request.sender.username}}<br>{{request.sender.company.company_name}}</td>
                <td>{{request.receiver.username}}<br>{{request.receiver.company.company_name}}</td>
                <td>{{request.request_type}}</td>
                <td>{{request.description}}</td>
                <td>{{datestr(request.created)}}</td>
                <td>{{request.expected_delivery_date}}</td>
                <td>
                  <div class="ab-select-container">
                    <select
                    class="custom-select"
                    v-model="request.status"
                    @change="sendResponse(request.id)"
                    :disabled="diableRequestStatus(request.id)">
                      <option v-for="stat in requestStatuses(request)" v-bind:key="stat" v-bind:value="stat">
                        {{stat}}
                      </option>
                    </select>
                  </div>
                </td>
              </tr>      
            </template>
          </table>
        </div>
        <Paginator :count="counts.requests" @pageChange="onRequestChangePage"/>
      </div>
      <div v-else-if="tab === 'Order'" class="mt-20">
        <div class="ab-mb-7 box1-tab">
          <table>
            <colgroup>
              <col span="1" style="width: 2%;">
              <col span="1" style="width: 15%;">
              <col span="1" style="width: 15%;">
              <col span="1" style="width: 15%;">
              <col span="1" style="width: 13%;">
              <col span="1" style="width: 15%;">
              <col span="1" style="width: 25%;">
            </colgroup>

            <tr class="fr-row header">
              <th>Sr No.</th>
              <th>Order Id</th>
              <th>Buyer</th>
              <th>Seller</th>
              <th>Total</th>
              <th>Created On</th>
              <th>Status</th>
            </tr>
            <template v-for="(order, index) in orders" v-bind:key="order.id">
              <tr class="fr-row content" @click="selectOrder(order.id)" :class="selected_order===order.id?'table-active':''">
                <td>{{index+1}}</td>
                <td>{{order.id}}</td>
                <td>{{order.buyer}}</td>
                <td>{{order.seller}}</td>
                <td>{{trimDecimalPlaces(order.total)}}</td>
                <td>{{datestr(order.created)}}</td>
                <td>
                  <div class="ab-select-container">
                    <select
                    class="custom-select"
                    v-model="order.status"
                    @change="onChangeOrderStatus(order.id)"
                    :disabled="diableOrderStatus(order.id)"
                    >
                      <option v-for="item in statuses" v-bind:key="item.status" v-bind:value="item.status">
                        {{item.status}}
                      </option>
                    </select>
                  </div>
                </td>
              </tr>      
            </template>
          </table>
        </div>
        <Paginator :count="counts.orders" @pageChange="onOrderChangePage"/>
      </div>
      <!-- <div v-if="tab === 'Request'">
        <div class="search-grid-list-pages">
          <div class="flex-box"> 
            <label class="pad-label w100">
              <strong>Status filter:</strong>
            </label>
            <select class="transtype custom-select" v-model="searchStatus" @change="onChangeStatusFilter">
              <option value="">All</option>
              <option value="PENDING">PENDING</option>
              <option value="APPROVED">APPROVED</option>
              <option value="COMPLETE">COMPLETE</option>
              <option value="CANCEL">CANCEL</option>
            </select>
          </div>
        </div>
        <div class="mr-2">
          <div class="box1-tab">
            <table>
              <colgroup>
                <col span="1" style="width: 5%;">
                <col span="1" style="width: 5%;">
                <col span="1" style="width: 10%;">
                <col span="1" style="width: 10%;">
                <col span="1" style="width: 10%;">
                <col span="1" style="width: 25%;">
                <col span="1" style="width: 10%;">
                <col span="1" style="width: 10%;">
                <col span="1" style="width: 15%;">
              </colgroup>

              <tr>
                <th>Sr No.</th>
                <th>Req Id</th>
                <th>From</th>
                <th>to</th>
                <th>Request Type</th>
                <th>Description</th>
                <th>Created On</th>
                <th>Delivery Date</th>
                <th>Status</th>
              </tr>
              <template v-for="(request,index) in requests" v-bind:key="request.id">
                <tr @click="selectRequest(request.id)" :class="selected_request===request.id?'table-active':''">
                  <td>{{index+1}}</td>
                  <td>{{request.id}}</td>
                  <td>{{request.sender.username}}<br>{{request.sender.company.company_name}}</td>
                  <td>{{request.receiver.username}}<br>{{request.receiver.company.company_name}}</td>
                  <td>{{request.request_type}}</td>
                  <td>{{request.description}}</td>
                  <td>{{datestr(request.created)}}</td>
                  <td>{{request.expected_delivery_date}}</td>
                  <td>
                    <select
                    class="custom-select"
                    v-model="request.status"
                    @change="sendResponse(request.id)"
                    :disabled="diableRequestStatus(request.id)">
                      <option v-for="stat in requestStatuses(request)" v-bind:key="stat" v-bind:value="stat">
                        {{stat}}
                      </option>
                    </select>
                  </td>
                </tr>      
              </template>
            </table>
          </div>
          <Paginator :count="counts.requests" @pageChange="onRequestChangePage"/>
        </div>
      </div> -->
      <!-- <div v-else-if="tab === 'Order'">
        <div class="search-grid-list-pages">
          <div class="flex-box"> 
            <label class="pad-label w100">
              <strong>Status filter:</strong>
            </label>
            <select
            class="transtype custom-select"
            v-model="orderStatus"
            @change="onOrderStatusChangeFilter"
            >
              <option value="">ANY</option>
              <option v-for="item in statuses" v-bind:key="item.status" v-bind:value="item.status">
              {{item.status}}
              </option>
            </select>
          </div>
        </div>
        <div class="mr-2">
          <div class="box1-tab">
            <table>
              <colgroup>
                <col span="1" style="width: 10%;">
                <col span="1" style="width: 10%;">
                <col span="1" style="width: 10%;">
                <col span="1" style="width: 10%;">
                <col span="1" style="width: 20%;">
                <col span="1" style="width: 25%;">
                <col span="1" style="width: 15%;">
              </colgroup>

              <tr>
                <th>Sr No.</th>
                <th>Order Id</th>
                <th>Buyer</th>
                <th>Seller</th>
                <th>Total</th>
                <th>Created On</th>
                <th>Status</th>
              </tr>
              <template v-for="(order, index) in orders" v-bind:key="order.id">
                <tr @click="selectOrder(order.id)" :class="selected_order===order.id?'table-active':''">
                  <td>{{index+1}}</td>
                  <td>{{order.id}}</td>
                  <td>{{order.buyer}}</td>
                  <td>{{order.seller}}</td>
                  <td>{{trimDecimalPlaces(order.total)}}</td>
                  <td>{{datestr(order.created)}}</td>
                  <td>
                    <select
                    class="custom-select"
                    v-model="order.status"
                    @change="onChangeOrderStatus(order.id)"
                    :disabled="diableOrderStatus(order.id)"
                    >
                      <option v-for="item in statuses" v-bind:key="item.status" v-bind:value="item.status">
                        {{item.status}}
                      </option>
                    </select>
                  </td>
                </tr>      
              </template>
            </table>
          </div>
          <Paginator :count="counts.orders" @pageChange="onOrderChangePage"/>
        </div>
      </div> -->
      <!-- commented as this was not in the mockup -->
      <!-- <div class="container">
        <h2>{{tab}} Detail</h2>
        <textarea id="requestdetail" type="text" v-bind:value="request_detail" readonly></textarea>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

import { Request } from '@/store/models/request';
import { ActionTypes as OrderActionTypes } from '@/store/modules/order/actions';
import { ActionTypes as AuthActionTypes } from '@/store/modules/auth/actions';
import { Order } from '@/store/models/order';
import { OrderItem } from '@/store/models/orderItem';
import Paginator from '@/components/common-components/Paginator.vue';
import { Transaction } from '@/store/models/transaction';


export default defineComponent({
  name:'Response',
  components: {
    Paginator
  },
  data(){
    return {
      request_detail:'request detail here!',
      searchStatus: 'PENDING',
      selected_request: 0,
      tab: 'Request',
      orderStatus: '',
      selected_order: 0,
    }
  },
  computed: {
    ...mapGetters({
      requests: 'getListOfRequests',
      user: 'getUser',
      orders: 'getListOfOrders',
      statuses: 'getOrderStatuses',
      counts: 'getTotalCountsOrderModule',
    }),
  },
  methods:{
    requestStatuses(request: Request) {
      if (request.request_type && request.sender && request.receiver && request.status) {
        const readOnlyStatuses = ['APPROVED', 'COMPLETE']
        const isSender = typeof request.sender != 'number' && this.user.id == request.sender.id;
        const isReceiver = typeof request.receiver != 'number' && this.user.id == request.receiver.id;
        if (isSender)  {
          const currentStatuses = ['PENDING', 'CANCEL']
          if (readOnlyStatuses.includes(request.status)) return [...currentStatuses, ...readOnlyStatuses]
          return currentStatuses
        }
        if (request.request_type == 'TRANSACTION' && isReceiver) return ['PENDING', 'COMPLETE', 'CANCEL']
        else if (isReceiver) return ['PENDING', 'APPROVED', 'COMPLETE', 'CANCEL']
      }
      return []
    },

    selectRequest: function (requestId: number) {
      const request = this.requests.find((item: Request) => item.id && item.id == requestId);
      let buffer = '';
      if (request) {
        buffer+=request.id +'\r\n';
        buffer+=request.sender.username+'\r\n';
        buffer+=request.created+'\r\n';
        buffer+=request.expected_delivery_date+'\r\n';
        buffer+=request.status+'\r\n';
        buffer+=request.request_type+'\r\n';
      }
      this.request_detail=buffer+'\r\n';
      this.selected_request = requestId;
    },

    diableRequestStatus: function (requestId: number) {
      const request = this.requests.find((item: Request) => item.id && item.id == requestId);
      const unChangedStatuses = ['APPROVED', 'CANCEL',];
      if (request.status === 'COMPLETE' ||
      (this.user.company.company_type == 'RETIAL' && unChangedStatuses.includes(request.status))) {
        return true;
      }
      return false;
    },

    sendResponse: async function (requestID: number) {
      const request = this.requests.find((item: Request) => item.id && item.id == requestID);
      await this.updateRequest({
        id: request.id,
        status: request.status,
      });
    },

    onChangeStatusFilter: async function (Event?: Event, pageNo?: number) {
      if (this.user) {
        let filter = {};
        if (this.user.company.company_type == 'RETIAL') filter = {sender__company: this.user.company.id, status: this.searchStatus, page:pageNo?pageNo:1};
        else if (this.user.company.company_type == 'STORE') filter = {receiver__company: this.user.company.id, status: this.searchStatus, page:pageNo?pageNo:1};
        await this.fetchRequests(filter);
      }
    },

    datestr: function(date: string) {
      const _date = new Date(date);
      return _date.getFullYear() + '-' + _date.getMonth() + '-' + _date.getDate();
    },

    trimDecimalPlaces: function (value: string | undefined) {
      return parseFloat(value !== undefined ? value : '0.0').toFixed(2);
    },

    onOrderStatusChangeFilter: async function (Event?: Event, pageNo?: number) {
      if (this.user) {
        let filter = {};
        if (this.user.company.company_type == 'RETIAL') filter = {buyer__company: this.user.company.id, status: this.orderStatus, page: pageNo?pageNo:1};
        else if (this.user.company.company_type == 'STORE') filter = {seller__company: this.user.company.id, status: this.orderStatus, page: pageNo?pageNo:1};
        await this.fetchOrders(filter);
      }
    },

    selectOrder: function (orderID: number) {
      const order = this.orders.find((item: Order) => item.id && item.id == orderID);
      let buffer = '';
      if (order) {
        buffer+=order.id +'\r\n';
        buffer+=order.seller+'\r\n';
        buffer+=order.buyer+'\r\n';
        buffer+=this.trimDecimalPlaces(order.total)+'\r\n';
        buffer+=order.created+'\r\n';
        buffer+=order.status+'\r\n';
        buffer+='Order Items:'+'\r\n';
        buffer+='BarCode \t Product Name \t Quantity \t Price \t Discount'+'\r\n';
        order.order_item.forEach((orderItem: OrderItem) => {
          if (orderItem.batch &&
          typeof orderItem.batch !== 'number' &&
          orderItem.batch.product_variant && 
          typeof orderItem.batch.product_variant !== 'number' &&
           orderItem.batch.product_variant.product && 
          typeof orderItem.batch.product_variant.product !== 'number') {
            buffer += orderItem.batch.product_variant.product.bar_code + ', ';
            buffer += orderItem.batch.product_variant.product.name + ', ';
            buffer += this.trimDecimalPlaces(orderItem.quantity) + ', ';
            buffer += this.trimDecimalPlaces(orderItem.price) + ', ';
            buffer += orderItem.discount + '\r\n';
          }
        });
      }
      this.request_detail=buffer+'\r\n';
      this.selected_order = orderID;
    },

    diableOrderStatus: function (orderID: number) {
      const request = this.orders.find((item: Order) => item.id && item.id == orderID);
      if (request.status === 'COMPLETE') {
        return true;
      }
      return false;
    },

    onChangeOrderStatus: async function (orderID: number) {
      const selectedOrder = this.orders.find((item: Order) => item.id && item.id == orderID);
      if (selectedOrder) {
        const order = {
          id: selectedOrder.id,
          status: selectedOrder.status,
        }
        await this.updateOrderStatus(order);
      }
    },

    onRequestChangePage: async function (pageNo: number) {
        await this.onChangeStatusFilter(undefined, pageNo);

    },

    onOrderChangePage: async function (pageNo: number) {
        await this.onOrderStatusChangeFilter(undefined, pageNo);
    },

    ...mapActions({
      fetchRequests: OrderActionTypes.FETCH_REQUESTS,
      updateRequest: OrderActionTypes.UPDATE_REQUEST,
      userdata: AuthActionTypes.USER_DATA,
      fetchOrders: OrderActionTypes.FETCH_ORDERS,
      fetchOrderStatuses: OrderActionTypes.FETCH_ORDER_STATUSES,
      updateOrderStatus: OrderActionTypes.UPDATE_ORDER,
      createTransaction: AuthActionTypes.CREATE_EXPENSE,
    })
  },
  async beforeMount () {
    await this.userdata();
    await this.onChangeStatusFilter();
    await this.fetchOrderStatuses();
    await this.onOrderStatusChangeFilter();
  }
});
</script>




<style lang="scss" scoped>
  // #requestdetail{
  //   height:$w200;
  // }

  // .pad-label {
  //   padding: 20px 20px 20px 0px;
  // }

  // .w100 {
  //   width: $w150;
  // }

  // .table-active{
  //   background-color:rgba(0,0,0,.4)
  // }

  // .box1-tab {
  //   overflow-y: auto;
  //   height: $order-item-table-height;
  // }

  // .nav {
  //   display: -webkit-box;
  //   display: -ms-flexbox;
  //   display: flex;
  //   -ms-flex-wrap: wrap;
  //   flex-wrap: wrap;
  //   padding-left: 0;
  //   margin-bottom: 0;
  //   list-style: none;
  // }

  // .nav-tabs {
  //   border-bottom: 1px solid #dee2e6;
  // }

  // .nav-tabs .nav-item {
  //   margin-bottom: -1px;
  // }

  // .nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
  //   color: #000;
  //   background-color: #fff;
  //   border-color: #dee2e6 #dee2e6 #fff;
  // }

  // .nav-tabs .nav-link {
  //   border: 1px solid transparent;
  //   border-top-left-radius: .25rem;
  //   border-top-right-radius: .25rem;
  // }

  // .nav-link {
  //   color: #495057;
  //   display: block;
  //   padding: .5rem 1rem;
  // }

  // ab css
  .response-container{
    // padding: 2.65% 16%;
    max-width: 1140px;
    margin: 0 auto;
  }

  .page-upper{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .page-upper > .right-cont{
    width: 30%;
  }
  .page-upper > .right-cont > .flex-box{
    align-items: baseline;
    width: 100%;
  }
  .page-upper > .right-cont > .flex-box > label{
    margin-right: 10px;
    font-size: 13px;
    // font-weight: 500;
  }
  .page-upper > .right-cont > .flex-box > .ab-select-container{
    flex-grow: 1;
  }

  // page upper ul designs;
  // normalization
  .page-upper > .nav-tabs{
    border: none;
    position: relative;
  }
  .page-upper > .nav-tabs > li{
    width: 135px;
    padding: 0.5rem 1rem;
    background-color: #f5f2f2;
    border-radius: 20px;
    // color: white;
    font-size: 13px;
    font-weight: 500;
  }
  .page-upper > .nav-tabs > li:last-child{
    text-align: center;
    position: absolute;
    left: 108px;
  }

  // active
  .page-upper > .nav-tabs > .active-li{
    z-index: 10;
    background-color: $primary-color;
    color: white;
  }
  .page-upper > .custom-toggle-btn-ab{
    display: flex;
    align-items: center;
    list-style-type: none;
  }

  .mt-20{
    margin-top: 20px;
  }

  .ab-select-container > select{
    padding: 8px 18px;
    border-radius: 10px;
    font-size: 12px;
  }

  // table desgins
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
.diff-shadow{
  border: 1px solid #ffffff;
    border-radius: 10px;
    padding: 1em 4rem;
    margin-top: 15px;
    box-shadow: 1px 1px 5px -1px rgb(0 0 0 / 75%);
}
</style>
