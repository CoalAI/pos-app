<template>
  <div class="container-fluid">
    <div class="logo">
      <!--<router-link v-if="salesStaff" to="/">
        <img class="logo_img" src="../../assets/rohi_logo.jpg" alt="coaldev">
      </router-link>
      <router-link v-else-if="admin" to="/admin/order">
        <img class="logo_img" src="../../assets/rohi_logo.jpg" alt="coaldev">
      </router-link>-->
      <img class="logo_img" src="../../assets/logo.png" alt="coaldev">
    </div>
    <!--<div class="b">
      <div class="flex-box">
        <a class="btn btn-grid btn-orange btn-mr" href="/" v-if="salesStaff"
        target="_blank">New Order</a>
        <a class="btn btn-grid btn-orange btn-mr" href="/admin/order" v-else-if="admin"
        target="_blank">New Order</a>
        <router-link v-show="manager" to="/inventory" class="btn btn-grid btn-orange btn-mr">Inventory</router-link>
        <router-link v-show="superadmin" to="/settings" class="btn btn-orange btn-grid btn-mr">Settings</router-link>
        <router-link v-show="admin" to="/users" class="btn btn-grid btn-orange btn-mr">Users</router-link>
        <router-link v-show="manager" :to="{name: 'order-analytics'}" class="btn btn-grid btn-orange btn-mr">Analytics</router-link>
      </div>
      <div class="flex-box">
        <router-link v-show="admin" to="/products" class="btn btn-grid btn-orange btn-mr">Products</router-link>
        <router-link v-show="admin" to="/batchs" class="btn btn-grid btn-orange btn-mr">Batches</router-link>
        <router-link v-show='admin' to="/vendors" class="btn btn-grid btn-orange btn-mr">Vendors</router-link>
        <router-link v-show='admin' to="/departments" class="btn btn-grid btn-orange btn-mr">Deparments</router-link>
      </div>
      <div class="flex-box">
        <router-link v-show="manager" to="/request" class="btn btn-grid btn-orange btn-mr">Request</router-link>
        <router-link v-show="manager" to="/response" class="btn btn-grid btn-orange btn-mr">Responses</router-link>
        <router-link v-show="manager" to="/expense-summary" class="btn btn-grid btn-orange btn-mr">Finance Summary</router-link>
        <router-link v-show="manager" to="/expense" class="btn btn-grid btn-orange btn-mr">Finance</router-link>
      </div>
    </div>-->
    
    <!--<div class="s">
      <div class="flex-box search-bar">
        <button
          @click="searchOrder"
          class="btn-search btn-left">Search Order</button>
        <input
          label="ordersearch"
          name="ordersearch"
          type="text"
          placeholder="Invoice ID"
          class="order-search-in order-search"
          v-model="orderSearch"
          @input="searchTyped"
          autocomplete="off"
        />
        <input
          type="date" 
          id="manufactured" 
          name="manufactured"
          class="order-search-date order-search"
          v-model="orderDate"
        >
        <button
          @click="searchOrder"
          class="btn-search btn-right">Search</button>
      </div>
      <div v-show="showResult" class="search-result-upper">
        <ul class="search-result">
          <li
            class="single-search-item"
            v-for="order in orders" v-bind:key="order.id"
            @click="orderDetails(order.id)"
          >
            <span><strong>#{{order.id}}</strong></span>
            <span>{{onlyDate(order.created)}}</span>
          </li>
        </ul>
      </div>
    </div>-->
    <div class="name user-name">
      <img src="" alt="user" class="user">
      <div class="white-color">
        <strong v-if="userdata.first_name" >{{ userdata.first_name }} {{ userdata.last_name }}</strong>
        <strong v-else >{{ userdata.username }}</strong>
      </div>
      <!--<div class="flex-box">
        <div class="notification" @click="notificationPanel = !notificationPanel">
          <span><img src="../../assets/bell.png" height="30"></span>
          <span v-if="messages.length > 0" class="badge">{{messages.length}}</span>
        </div>
        <div class="notification">
          <span>
            <img v-if="online" src="../../assets/wifi.png" height="30">
            <img v-else src="../../assets/no-signal.png" height="30">
          </span>
        </div>
      </div>-->
      <div v-show="notificationPanel" class="search-result-upper notification-panel">
        <ul class="search-result">
          <li
            class="single-search-item"
            v-for="notification in messages" v-bind:key="notification.id">
            <router-link :to="findNotificationURL(notification.notif_type)">
              <div class="flex-box ">
                <img :src="findImageURL(notification.notif_type)" height="25">
                <div style="float: right; margin-left: 10px;">
                  <p>{{notification.message}}</p>
                  <p style="font-size: 12px">
                    <span>{{onlyDate(notification.created)}}</span>
                    <span v-if="notification.read" style="margin-left: 10px" class="dot"></span>
                  </p>
                </div>
              </div>
            </router-link>
          </li>
          <li>
            <router-link to="/notification" @click="notificationPanel = false"><p class="text-center">See More</p></router-link>
          </li>
        </ul>
      </div>
      
    </div>
  </div>
  <div>
  <div class="b menu-cont">
        <a class="no btn-grid btn-mr" href="/" v-if="salesStaff" target="_blank">
        <img src="../../assets/new-order.png" class="block-align">NEW ORDER</a>
        <a class="no btn-grid btn-mr" href="/admin/order" v-else-if="admin" target="_blank">
        <img src="../../assets/new-order.png" class="block-align">NEW ORDER</a>
        <router-link v-show="manager" to="/inventory" class="i btn-grid btn-mr">
        <img src="../../assets/inventory.png" class="block-align">INVENTORY</router-link>
        <router-link v-show="superadmin" to="/settings" class="s btn-grid btn-mr">
        <img src="../../assets/settings.png" class="block-align">SETTINGS</router-link>
        <router-link v-show="admin" to="/users" class="u btn-grid btn-mr">
        <img src="../../assets/users.png" class="block-align">USERS</router-link>
        <router-link v-show="manager" :to="{name: 'order-analytics'}" class="a btn-grid btn-mr">
        <img src="../../assets/analystics.png" class="block-align">ANALYTICS</router-link>
        <router-link v-show="admin" to="/products" class="p btn-grid btn-mr">
        <img src="../../assets/products.png" class="block-align">PRODUCTS</router-link>
        <router-link v-show="admin" to="/batchs" class="b btn-grid btn-mr">
        <img src="../../assets/batches.png" class="block-align">BATCHES</router-link>
        <router-link v-show='admin' to="/vendors" class="v btn-grid btn-mr">
        <img src="../../assets/vendors.png" class="block-align">VENDORS</router-link>
        <router-link v-show='admin' to="/departments" class="d btn-grid btn-mr">
        <img src="../../assets/department.png" class="block-align">DEPARTMENTS</router-link>
        <router-link v-show="manager" to="/request" class="r btn-grid btn-mr">
        <img src="../../assets/requests.png" class="block-align">REQUEST</router-link>
        <router-link v-show="manager" to="/response" class="rs btn-grid btn-mr">
        <img src="../../assets/responses.png" class="block-align">RESPONSES</router-link>
        <router-link v-show="manager" to="/expense-summary" class="su btn-grid btn-mr">
        <img src="../../assets/summary.png" class="block-align">SUMMARY</router-link>
        <router-link v-show="manager" to="/expense" class="f btn-grid btn-mr">
        <img src="../../assets/finance.png" class="block-align">FINANCE</router-link>
        <div class="logout">
          <button class="btn-lo" @click="logout"><img src=""></button>
        </div>
    </div>
    
  </div>
  <div class="s">
      <div class="flex-box search-bar">
        <button
          @click="searchOrder"
          class="btn-search btn-left">Search Order</button>
        <input
          label="ordersearch"
          name="ordersearch"
          type="text"
          placeholder="Invoice ID"
          class="order-search-in order-search"
          v-model="orderSearch"
          @input="searchTyped"
          autocomplete="off"
        />
        <input
          type="date" 
          id="manufactured" 
          name="manufactured"
          class="order-search-date order-search"
          v-model="orderDate"
        >
        <button
          @click="searchOrder"
          class="btn-search btn-right">Search</button>
      </div>
      <div v-show="showResult" class="search-result-upper">
        <ul class="search-result">
          <li
            class="single-search-item"
            v-for="order in orders" v-bind:key="order.id"
            @click="orderDetails(order.id)"
          >
            <span><strong>#{{order.id}}</strong></span>
            <span>{{onlyDate(order.created)}}</span>
          </li>
        </ul>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { ActionTypes } from '@/store/modules/auth/actions';
import { ActionTypes as OrderActionTypes } from '@/store/modules/order/actions'
import { Notification } from '@/store/models/notification';

export default defineComponent({
  name: 'Header',
  data () {
    return{
      orderSearch: '',
      showResult: false,
      notificationPanel: false,
      orderDate: '',
    }
  },
  computed: {
    ...mapGetters({
      userdata: 'getUser',
      orders: 'getListOfOrders',
      messages: 'getNotifications',
      online: 'getNetworkStatus',
    }),
    admin(){
      const allowedRoles = ['SUPER_ADMIN', 'ADMIN'];
      const allowedCompanies = ['PARENT', 'STORE'];
      if(this.userdata != null && allowedRoles.includes(this.userdata.user_type)
        && allowedCompanies.includes(this.userdata.company.company_type) 
      ){
        return true;
      }
      return false;
    },
    superadmin(){
      const allowedRoles = ['SUPER_ADMIN'];
      if(this.userdata != null && allowedRoles.includes(this.userdata.user_type)){
        return true;
      }
      return false;
    },
    salesStaff(){
      const allowedRoles = ['SALES_STAFF', 'SUPER_ADMIN', 'ADMIN' ];
      const allowedCompanies = ['PARENT', 'STORE', 'RETIAL']
      if(this.userdata != null && allowedRoles.includes(this.userdata.user_type)
          && allowedCompanies.includes(this.userdata.company.company_type)){
        return true;
      }
      return false;
    },
    manager(){
      const allowedRoles = ['SUPER_ADMIN', 'ADMIN'];
      const allowedCompanies = ['PARENT', 'STORE', 'RETIAL']
      
      if(this.userdata != null && allowedRoles.includes(this.userdata.user_type) && 
          allowedCompanies.includes(this.userdata.company.company_type)){
        return true;
      }
      return false;
    },
  },
  methods: {
    clear: function () {
      this.orderSearch = '';
      this.showResult = false;
      this.orderDate = '';
    },

    findNotificationURL: function (type: string) {
      if (type === 'REQUEST' || type === 'RESPONSE') {
        return '/response';
      } else if (type === 'INV_QUANTITY') {
        return '/inventory';
      }
    },

    findImageURL: function (type: string) {
      const images = require.context('../../assets/', false, /\.png$/)
      if (type === 'REQUEST') {
        return images('./email.png');
      } else if (type === 'RESPONSE') {
        return images('./arrow.png');
      } else if (type === 'INV_QUANTITY') {
        return images('./overflow.png');
      }
    },

    searchOrder: function () {
      this.$router.push({
        name: 'OrdersList',
        query: {
          invoiceId: this.orderSearch,
          date: this.orderDate
        }
      });
      this.clear();
    },

    orderDetails: function (id: number) {
      this.$router.push({
        name: 'OrderDetails',
        params: {
          orderId: id
        }
      });
      this.clear();
    },

    onlyDate: function (value: string) {
      const givenDate = new Date(value)
      return givenDate.toDateString()
    },

    ...mapActions({
      getuserdate: ActionTypes.USER_DATA,
      fetchOrders: OrderActionTypes.FETCH_ORDERS,
    }),

    searchTyped() {
      if (this.orderSearch == ''){
        this.showResult = false;
        return
      }
      this.fetchOrders({
        id__contains: this.orderSearch
      });
      this.showResult = true;
    },

    logout() {
      this.$router.push({name: 'logout'});
    }
  },
  beforeMount: async function() {
    await this.getuserdate();
    this.$socket.emit('client_info', {id: this.userdata.id, company: this.userdata.company.id});
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  /*.container{
    background-color: #e73b2a;
    padding-bottom: $header-padding-bottom;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 0.4fr;
    gap: 1em 1em;
    grid-template-areas:
    "logo b b b b b s s s s name logout"
  }*/
  .container-fluid {
    background-color: #e73b2a;
    padding-bottom: $header-padding-bottom;
    display: grid;
    grid-template-columns: 1fr 10fr 0.2fr;
    grid-template-rows: 0.4fr;
    gap: 1em 1em;
    grid-template-areas:
    "logo b name"
  }
  .logo {
    grid-area: logo;
  }
  .b {grid-area: b;}
  .s {
    //grid-area: s;
    width:30%;
    margin: 0 auto;
    margin-top:20px !important;
  }
  .name {
    grid-area: name;
  }
  .menu-cont{
    display:grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-areas: 
    "no i s u a p b v d r rs su f";
    background-color: #0b2532;
    width:60%;
    margin: 0 auto;
    border-radius: 0px 0px 15px 15px;
    text-align:center;
  }

  .logout {
    //grid-area:logout;
    display:inline-block;
    margin:0 !important;
    padding:0 !important;
  }

  .btn-grid {
    //width: $w100;
    //margin: 2px;
    font-family: seg;
    font-size: 10px;
    background: #0b2532;
    color: $white-color;
    padding: 8px;
    margin: 0;
    border: none;
    cursor: pointer;
    text-align: center;
    border-radius: 0px 0px 20px 20px;
  }
  .menu-cont :first-child{
    text-align: left;
    padding-right:15px;
  }

  .logo_img {
    height: $logo_img_height;
    width: $logo_img_width;
    object-fit: contain;
  }

  .user-name {
    margin-top: 12px;
    font-family:seg;
    //text-align: right;
  }

  .search-result-upper {
    position: absolute;
    width: 24%;
    text-align: left;
    margin-top: -1px;
    z-index: 3;
    cursor: default;
    user-select: none;
    -webkit-user-select: none;
  }

  .search-result {
    background-color: $input-background-color;
    box-shadow: 0 4px 6px rgb(32 33 36 / 28%);
    display: flex;
    flex-direction: column;
    list-style-type: none;
    margin: 0;
    padding: 0;
    border: 0;
    padding-bottom: 4px;
    overflow: hidden;
  }

  .single-search-item {
    display: flex;
    padding: 15px;
    justify-content: space-between;
  }

  .single-search-item:hover {
    background-color: $search-hover-color;
  }

  .logo_img {
    height: $logo_img_height;
    width: $logo_img_width;
    object-fit: contain;
  }
  /*.order-search-in{
    width:43%;
  }
  .order-search-date{
    width:37%;
  }*/
  .order-search-in {
    margin:0 !important;
    width: 37%;
    border-right: 1px solid #949ea0;
  }
  .order-search-date {
    padding:0 !important;
    margin:0 !important;
    width: 43%;
  }
  .order-search{
    padding:5px 5px 5px 30px !important;
    background: white;
    border-top: 1px solid #949ea0;
    border-bottom: 1px solid #949ea0;
    color: #dcdddf !important;
  }

  /*.order-search-btn {
    width: 20%;
  }*/

  // Notifiction icon
  .notification {
    padding: 8px;
    margin: 12px;
    text-decoration: none;
    position: relative;
    display: inline-block;
    border-radius: 20px;
    background-color: $white-color;
  }

  .notification:hover {
    cursor: pointer;
  }

  .notification .badge {
    position: absolute;
    top: -10px;
    right: -10px;
    padding: 5px 10px;
    border-radius: 50%;
    background-color: $primary-color;
    color: $white-color;
  }

  .notification-panel {
    right: 11%;
    top: 12%;
  }

  @media screen and (min-width: 1900px) {
    .notification-panel {
      right: 10%;
      top: 6%;
    }
  }

  .dot {
    height: 8px;
    width: 8px;
    background-color: $primary-color;
    border-radius: 50%;
    display: inline-block;
  }
  .user{
    float:none;
    display:block;
    border-radius: 50%;
    background: white;
    border:none;
    width:50px;
    height:50px;
  }
  .btn-lo {
    //color: $white-color;
    display:inline-block;
    padding: 0;
    margin: 0;
    border: none;
    cursor: pointer;
    background-color: #e73b2a;
    width:30px;
    height:30px;
    position:absolute;
    left:calc(100% - 30px);
  }
  .search-bar{
    border-radius: 40px;
    font-family:seg;
    font-size:12px;
  }
  .btn-search{
    padding:0 !important;
    margin:0 !important;
    width:20%;
    color:white;
    cursor:pointer;
    border:none;
  }
  .btn-search:focus{
    outline: none;
  }
  .btn-left{
    border-radius: 40px 0px 0px 40px;
    background-color: #0b2532;
    border: 1px solid #0b2532;
  }
  .btn-right{
    border-radius: 0px 40px 40px 0px;
    background: #e73b2a;
    border:1px solid #ea9493 !important;
    
  }
  .block-align{
    display: block;
    margin:auto; 
  }
</style>
