<template>
  <div id="expense">
    <div class="diff-shadow">
      <div class="page-upper">
        <ul class="nav nav-tabs">
          <li :class="tab === 'order' ? 'active-li ab1 tab1' : 'ab1 tab1'" @click="onClickOrder()">
            <span>
              <strong>Order</strong>
            </span>
          </li>
          <li :class="tab === 'inventory' ? 'active-li ab1 tab2' : 'ab1 tab2'" @click="onClickInventory()">
            <span>
              <strong>Inventory</strong>
            </span>
          </li>

          <li :class="tab === 'detail' ? 'active-li ab1 tab3' : 'ab1 tab3'" @click="onClickDetails()" 
          v-if="user_type=='SUPER_ADMIN' || user_type=='ADMIN'">
            <span>
              <strong>Operator Sales</strong>
            </span>
          </li>
          <li :class="tab === 'report' ? 'active-li ab1 tab4' : 'ab1 tab4'" @click="onClickReport()">
            <span>
              <strong>Profit/Loss Report</strong>
            </span>
          </li>
          <li :class="tab === 'StockStatement' ? 'active-li ab1 tab5' : 'ab1 tab5'" @click="onClickStockStatement()"
          v-if="user_type=='SUPER_ADMIN' || user_type=='ADMIN'">
            <span>
              <strong>Stock Statement</strong>
            </span>
          </li>
          
          <li :class="tab === 'TotalPayable' ? 'active-li ab1 tab6' : 'ab1 tab6'" @click="onClickTotalPayable()"
          v-if="user_type=='SUPER_ADMIN' || user_type=='ADMIN'">
            <span>
              <strong>Total Payable</strong>
            </span>
          </li>
          <li :class="tab === 'End of Day' ? 'active-li ab1 tab7' : 'ab1 tab7'" @click="onClickEndOfDay()"
          v-if="user_type=='SUPER_ADMIN' || user_type=='ADMIN'">
            <span>
              <strong>End of Day</strong>
            </span>
          </li>
          <li :class="tab === 'TotalReceivable' ? 'active-li ab1 tab8' : 'ab1 tab8'" @click="onClickTotalReceivable()"
          v-if="user_type=='SUPER_ADMIN' || user_type=='ADMIN'">
            <span>
              <strong>Total Receivable</strong>
            </span>
          </li>
          <li :class="tab === 'comparisonAnalysis' ? 'active-li ab1 tab9' : 'ab1 tab9'" @click="onClickComparisonAnalysis()"
          v-if="user_type=='SUPER_ADMIN' || user_type=='ADMIN'">
            <span>
              <strong>Comparison</strong>
            </span>
          </li>
          <li :class="tab === 'comparisonExpenseSales' ? 'active-li ab1 tab10' : 'ab1 tab10'" @click="onClickComparisonExpenseSales()"
          v-if="user_type=='SUPER_ADMIN' || user_type=='ADMIN'">
            <span>
              <strong>Comparison E/S</strong>
            </span>
          </li>
        </ul>
      </div>
      <div class="route-con">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { ActionTypes } from '@/store/modules/order/actions';

export default defineComponent({
  name: 'Expense',
  data() {
    const path = window.location.pathname;
    return {
      tab: path.split('/')[2],
      user_type: "",
    }
  },
  computed: {
     ...mapGetters({
      userdata: 'getUser',
    })
  },
  methods: {
    onClickOrder(){
      this.tab = 'order'
      this.$router.push({ name: "order-analytics" });
    },
    onClickInventory(){
      this.tab = 'inventory'
      this.$router.push({ name: "inventory-analytics" });
    },
    onClickDetails(){
      this.tab = 'detail'
      this.$router.push({ name: "operator-sales-detail" });
    },
    onClickReport(){
      this.tab = 'report'
      this.$router.push({ name: "profit-loss-report" });
    },
    onClickStockStatement(){
      this.tab = 'StockStatement'
      this.$router.push({ name: "StockStatement" });
    },
    onClickEndOfDay(){
      this.tab = 'End of Day'
      this.$router.push({ name: "end-of-day" });
      },
    onClickTotalReceivable(){
      this.tab = 'TotalReceivable'
      this.$router.push({ name: "TotalReceivable" });
    },
    onClickTotalPayable(){
      this.tab = 'TotalPayable'
      this.$router.push({ name: "TotalPayable" });
    },
    onClickComparisonAnalysis(){
      this.tab = 'comparisonAnalysis'
      this.$router.push({ name: "ComparisonAnalysis" });
    },
    onClickComparisonExpenseSales(){
      this.tab = 'comparisonExpenseSales'
      this.$router.push({ name: "ComparisonExpenseSales" });
    },

  },
  mounted () {
    this.user_type = this.userdata['user_type'];
  }
});
</script>

<style lang="scss" scoped>
  #expense {
    padding: 1.65% 21%;
  }
  .diff-shadow{
    padding: 1.65% 3.56%;
  }
  .route-con{
    margin: 60px 0 20px 0;
  }
  
// ab css
  .nav-tabs{
    position: relative;
    border:none;
  }
 .nav-tabs > button{
  width: 22%;
  padding: 0.5rem 1rem;
  background-color: #f5f2f2;
  border-radius: 20px;
  font-size: 13px;
  border: none;
  outline: none;
  font-weight: 500;
}
.nav-tabs > button:first-child a{
  padding: 0.5rem 48px;
}
.nav-tabs > button a{
  padding: 0.5rem 0;
  text-decoration: none;
  color: black;
}
.nav-tabs > .active-li{
  z-index: 10;
  background-color: $primary-color;
  color: white;
}
.nav-tabs > .active-li > a{
  color: white;
}
// btn alignmnet
.nav-tabs > button{
  position: absolute;
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
  width: 150px;
  padding: 0.5rem 1rem;
  background-color: #f5f2f2;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
}
// active
.page-upper > .nav-tabs > .active-li{
  z-index: 10;
  background-color: $primary-color;
  color: white;
  text-align: center;
}
.page-upper > .custom-toggle-btn-ab{
  display: flex;
  align-items: center;
  list-style-type: none;
}
.ab1{
  text-align: center;
  position: absolute;
}
.tab1{
  left: -11px;
  width: 118px !important;
}
.tab2{
  left: 80px;
  width: 118px !important;
}
.tab3{
  left: 171px;
  width: 149px !important;
}
.tab4{
  left: 294px;
  width: 172px !important;
}
.tab5{
  left: 439px;
  width: 161px !important;
}
.tab6{
  left: 573px;
  width: 165px !important;
}
.tab7{
  left: 711px;
  width: 132px !important;
}
.tab8{
  left: 820px;
  width: 131px !important;
}
.tab9{
  left: 920px;
  width: 98px !important;
}
.tab10{
  left: 1000px;
  width: 130px !important;
}
@media Screen and (max-width: 1375px){
  .diff-shadow{
    // width: 62vw;
    width: 70vw;
  }
  #expense {
    padding: 1.65% 16%;
}
}
@media Screen and (max-width: 1164px){
  .diff-shadow{
    width: 75vw;
  }
  #expense {
    padding: 1.65% 13%;
}
}
</style>
