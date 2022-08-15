<template>
  <div class="container-fluid" :style="{backgroundColor: header_color}">
    <div class="logo">
      <router-link v-if="salesStaff" to="/">
        <img class="logo-img-head" :src="logoimg ? logoimg : src_img" alt="coaldev">
      </router-link>
      <router-link v-else-if="admin" to="/admin/order">
        <img class="logo-img-head" :src="logoimg" alt="coaldev">
      </router-link>
      <!--<img class="logo-img-head" :src="logo" alt="coaldev">-->
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
    <div class="b menu-cont">
        <router-link class="btn-grid btn-mr" to="/" v-if="salesStaff" v-show="!showActiveOrder" target="_blank" @click="activeOrder()">
        <img :src="order" class="block-align">NEW ORDER</router-link>
        <router-link class="no btn-grid btn-mr" href="/admin/order" v-else-if="admin" target="_blank">
        <img :src="order" class="block-align">NEW ORDER</router-link>
        <router-link class="btn-grid btn-mr" to="/admin/order" v-show="showActiveOrder" target="_blank" style="border-bottom:none !important" @click="activeOrder()" >
        <img :src="order" class="block-align">NEW ORDER</router-link>

        <router-link v-show="manager" to="/inventory" class="i btn-grid btn-mr">
        <img :src="inventory" class="block-align">INVENTORY</router-link>
        <router-link v-show="admin" to="/users" class="u btn-grid btn-mr">
        <img :src="users" class="block-align">USERS</router-link>
        <router-link v-show="manager" :to="{name: 'order-analytics'}" class="a btn-grid btn-mr">
        <img :src="analytics" class="block-align">ANALYTICS</router-link>
        <router-link v-show="admin" to="/products" class="p btn-grid btn-mr">
        <img :src="products" class="block-align">PRODUCTS</router-link>
        <router-link v-show="admin" to="/batchs" class="b btn-grid btn-mr">
        <img :src="batches" class="block-align">BATCHES</router-link>
        <router-link v-show='admin' to="/vendors" class="v btn-grid btn-mr">
        <img :src="vendor" class="block-align">VENDORS</router-link>
        <router-link v-show='admin' to="/departments" class="d btn-grid btn-mr">
        <img :src="department" class="block-align">DEPARTMENTS</router-link>
        <router-link v-show="manager" to="/request" class="r btn-grid btn-mr">
        <img :src="request" class="block-align">REQUESTS</router-link>
        <router-link v-show="manager" to="/response" class="rs btn-grid btn-mr">
        <img :src="responses" class="block-align">RESPONSES</router-link>
        <router-link v-show="manager" to="/expense-summary" class="su btn-grid btn-mr">
        <img :src="summary" class="block-align">SUMMARY</router-link>
        <router-link v-show="manager" to="/expense" class="f btn-grid btn-mr brdr-right">
        <img :src="finance" class="block-align">FINANCE</router-link>
    </div>
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
      <div class="dropdown">
        <img :src="userdata.user_profilepic ? userdata.user_profilepic : login_user_png" @click="toggleClass" width="50" height="50" alt="user" class="user">
        <div class="white-color">
          <strong v-if="userdata.first_name" >{{ userdata.first_name }} {{ userdata.last_name }}</strong>
          <strong v-else >{{ userdata.username }}</strong>
        </div>
        <div id="mydropdown" class="dropdown-content" :class="{active: show}">
          <router-link v-if="manager" to="/settings" class="u btn-grid btn-mr">Settings</router-link>
          <router-link v-show="superadmin" :to="{name: 'reports'}" class="u btn-grid btn-mr">Reports</router-link>
          <a @click="logout" class="u btn-grid btn-mr">Logout</a>
        </div>
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
import { ActionTypes as OrderActionTypes } from '@/store/modules/order/actions';
import offlineStoreService from '@/utils/offline-store';
import { Notification } from '@/store/models/notification';
import { MutationTypes } from "@/store/modules/order/mutations";


export default defineComponent({
  name: 'Header',
  data () {
    return{
      logo: require('../../assets/login-top-logo.svg'),
      src_img: require('../../assets/DefoultLogoAvatar-01.png'),
      toggle:false,
      show:false,
      animated:false,
      login_user_png: require('../../assets/DefaultProfileAvatar-01.png'),
      order: require('../../assets/new-order.svg'),
      inventory: require('../../assets/inventory.svg'),
      users: require('../../assets/users.svg'),
      request:require('../../assets/request.svg'),
      analytics: require('../../assets/analytics.svg'),
      products: require('../../assets/products.svg'),
      vendor: require('../../assets/Vendors.svg'),
      batches: require('../../assets/batches.svg'),
      department: require('../../assets/department.svg'),
      settings:require('../../assets/request.svg'),
      responses:require('../../assets/response.svg'),
      summary:require('../../assets/summary.svg'),
      finance:require('../../assets/finance.svg'),
      log:require('../../assets/logout-arrow.svg'),
      orderSearch: '',
      showResult: false,
      notificationPanel: false,
      orderDate: '',
      showActiveOrder: false,
    }
  },
  computed: {
    ...mapGetters({
      userdata: 'getUser',
      orders: 'getListOfOrders',
      messages: 'getNotifications',
      online: 'getNetworkStatus',
      logoimg: 'getLogoImg',
      header_color: 'getHeaderCol'
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
     activeOrder(){
      this.showActiveOrder = !this.showActiveOrder;
    },
    animate(){
      this.animated = true
      this.toggle = !this.toggle
    },
    toggleClass: function(){
      this.show = !this.show
    },
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
      fetchlogo: OrderActionTypes.FETCH_LOGO_IMAGE,
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
    getCookie(name: string) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2){
        const cok_str = parts.pop()
        if (cok_str){
          return cok_str.split(';').shift()
        }
      }
    },

    async logout() {
      await offlineStoreService.clear();
      this.$router.push({name: 'logout'});
    }
  },
  beforeMount: async function() {
    await this.getuserdate();
    await this.fetchlogo();
    // this.$socket.emit('client_info', {id: this.userdata.id, company: this.userdata.company.id});
    const headrclr = await this.getCookie("HeaderColor") || "#e73b2a"
    this.$store.commit(MutationTypes.SetHeaderColor, headrclr)
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
    grid-template-columns: 1fr 10fr 1fr;
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
    margin-top:50px !important;
  }
  .name {
    grid-area: name;
  }
  .menu-cont{
    display:grid;
    grid-template-columns: 1.2fr  1.1fr 1.1fr 1.1fr 1.1fr 1.1fr 1.1fr 1.1fr 1.1fr 1.1fr 1.1fr 1.1fr;
    grid-template-areas: 
    "no i s u a p b v d r rs su f";
    background-color: #0b2532;
    width:100%;
    height:85%;
    margin: 0 auto;
    border-radius:0px 0px 20px 20px;
    text-align:center;
    //top:-80px;
    padding: 0px 18px 0px 15px;
    margin-top: 59px;
    margin-bottom: -40px;
  }
  /*.brdr-left{
    border-radius: 0px 0px 0px 20px;
  }
  .brdr-right{
    border-radius: 0px 0px 20px 0px;
  }*/
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
    padding: 11px;
    margin: 0;
    border: none;
    cursor: pointer;
    text-align: center;
    padding-bottom: 2px !important;
  }
  .btn-grid:hover{
    outline:none;
    text-decoration: none;
    border-bottom: 5px solid #e73b2a;
  }
  .btn-grid.router-link-active, .btn-grid.btn-grid.router-link-exact-active{
    outline:none;
    border-bottom: 5px solid #e73b2a !important;
  }
  .btn-grid:active::after{
    outline:none;
    border-bottom: 5px solid #e73b2a !important;
  }
  .btn-grid:focus{
    outline:none;
    border-bottom: 5px solid #e73b2a;
  }
  .btn-grid:target{
    outline:none;
    border-bottom: 5px solid #e73b2a;
  }
  .logo-img-head {
    height: 86px;
    //width: 160px;
    object-fit: contain;
  }

  .user-name {
    margin-top: 12px;
    font-family:seg;
    text-align: center;
    padding-right: 14px;
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
    background:white;
    border:none;
    width:50px;
    height:50px;
    margin-right:auto;
    margin-left: auto;
    cursor: pointer;
  }
  .lg-btn{
    color: white;
    background-color: #0b2532;
    font-family: seg;
    font-size: 12px;
    display: inline-block;
    padding: 5px;
    margin: 0;
    cursor: pointer;
    height: 30px;
    left: calc(100% - 77px);
    position: absolute;
    top: 90px;
    font-weight: bold;
    border: none;
  }
  .lg-btn:focus{
    outline:none;
  }
  
  .btn-lo:focus{
    outline:none;
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
    top:90px;
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
    width:30%;
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
    padding: 4px !important;
  
  }
  .btn-right{
    border-radius: 0px 40px 40px 0px;
    background: #e73b2a;
    border:1px solid #ea9493 !important;
    
  }
  .block-align{
    display: block;
    margin:auto; 
    width:30px;
    height: 30px;
    margin-bottom:5px;
  }
  //dropdown styles
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  left: -9px;
  // background-color: #f1f1f1;
  // min-width: 160px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  border-bottom: 1px solid #f1f1f1;
  z-index: 1;
}

.dropdown-content a {
  color: white;
  padding:2px 16px;
  font-size: 12px;
  text-decoration: none;
  display: block;
}

.dropdown a:hover {
  background-color: white;
  color: #0b2532;
  border-bottom: 2px solid #e73b2a;
}
.dropdown > .active{
  display: block;
}
.dropdown-content > .btn-grid.router-link-active, .dropdown-content > .btn-grid.btn-grid.router-link-exact-active{
  outline:none;
  color: black;
  border-bottom: 1px solid #0b2532 !important;
  background-color: white;
}
</style>
