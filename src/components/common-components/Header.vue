<template>
  <div class="container">
    <div class="logo">
      <router-link v-if="salesStaff" to="/">
        <img class="logo_img" src="../../assets/rohi_logo.jpg" alt="coaldev">
      </router-link>
      <router-link v-else-if="admin" to="/admin/order">
        <img class="logo_img" src="../../assets/rohi_logo.jpg" alt="coaldev">
      </router-link>
    </div>
    <div class="b">
      <div class="flex-box">
        <a class="btn btn-grid btn-orange btn-mr" href="/" v-if="salesStaff"
        target="_blank">New Order</a>
        <a class="btn btn-grid btn-orange btn-mr" href="/admin/order" v-else-if="admin"
        target="_blank">New Order</a>
        <router-link v-show="manager" to="/inventory" class="btn btn-grid btn-orange btn-mr">Inventory</router-link>
        <router-link v-show="superadmin" to="/settings" class="btn btn-orange btn-grid btn-mr">Settings</router-link>
        <router-link v-show="admin" to="/users" class="btn btn-grid btn-orange btn-mr">Users</router-link>
      
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
        <router-link v-show="manager" to="/expense-summary" class="btn btn-grid btn-orange btn-mr">Summary</router-link>
        <router-link v-show="manager" to="/expense" class="btn btn-grid btn-orange btn-mr">Expense</router-link>
      </div>
    </div>
    <div class="s">
      <div class="flex-box">
        <input
          label="ordersearch"
          name="ordersearch"
          type="text"
          placeholder="Invoice ID"
          class="order-search-in"
          v-model="orderSearch"
          @input="searchTyped"
          autocomplete="off"
        />
        <input
          type="date" 
          id="manufactured" 
          name="manufactured" 
          class="order-search-date"
          v-model="orderDate"
        >
        <button
          @click="searchOrder"
          class="btn btn-orange order-search-btn">Search Order</button>
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
    <div class="name user-name">
      <span class="white-color">
        <strong v-if="userdata.first_name" >{{ userdata.first_name }} {{ userdata.last_name }}</strong>
        <strong v-else >{{ userdata.username }}</strong>
      </span>
    </div>
    <div class="logout">
        <button class="btn btn-orange" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { ActionTypes } from '@/store/modules/auth/actions';
import { ActionTypes as OrderActionTypes } from '@/store/modules/order/actions'

export default defineComponent({
  name: 'Header',
  data () {
    return{
      orderSearch: '',
      showResult: false,
      orderDate: ''
    }
  },
  computed: {
    ...mapGetters({
      userdata: 'getUser',
      orders: 'getListOfOrders',
      user_company: 'getUserCompany',
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
      logoutUser: ActionTypes.LOGOUT_USER,
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
      this.logoutUser();
    }
  },
  beforeMount: async function() {
    await this.getuserdate();
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .container {
    background-color: $header-color;
    padding-bottom: $header-padding-bottom;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 0.4fr;
    gap: 1em 1em;
    grid-template-areas:
    "logo b b b b b s s s s name logout"
  }
  .logo {
    grid-area: logo;
  }
  .b {grid-area: b;}
  .s {
    grid-area: s;
  }
  .name {
    grid-area: name;
  }

  .logout {
    grid-area: logout;
  }

  .btn-grid {
    width: $w100;
    margin: 2px;
  }

  .logo_img {
    height: $logo_img_height;
    width: $logo_img_width;
    object-fit: contain;
  }

  .user-name {
    margin-top: 12px;
    text-align: right;
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

  .order-search-in {
    width: 43%;
  }

  .order-search-date {
    width: 37%;
  }

  .order-search-btn {
    width: 20%;
  }
</style>
