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
          <li :class="tab === 'detail' ? 'active-li ab1 tab3' : 'ab1 tab3'" @click="onClickDetails()">
            <span>
              <strong>Operator Sales</strong>
            </span>
          </li>
          <li :class="tab === 'report' ? 'active-li ab1 tab4' : 'ab1 tab4'" @click="onClickReport()">
            <span>
              <strong>Profit/Loss Report</strong>
            </span>
          </li>
          <li :class="tab === 'StockStatement' ? 'active-li ab1 tab5' : 'ab1 tab5'" @click="onClickStockStatement()">
            <span>
              <strong>Stock Statement</strong>
            </span>
          </li>
          <li :class="tab === 'dayTotalPayable' ? 'active-li ab1 tab6' : 'ab1 tab6'" @click="onClickDayTotalPayable()">
            <span>
              <strong>Day Total Payable</strong>
            </span>
          </li>
          <li :class="tab === 'TotalReceivable' ? 'active-li ab1 tab8' : 'ab1 tab8'" @click="onClickTotalReceivable()">
            <span>
              <strong>Total Receivable</strong>
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

    }
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
    onClickTotalReceivable(){
      this.tab = 'TotalReceivable'
      this.$router.push({ name: "TotalReceivable" });
    },
    onClickDayTotalPayable(){
       this.tab = 'dayTotalPayable'
      this.$router.push({ name: "DayTotalPayable" });
    }

  },
  computed: {
    // dateValidation: function(): string | null {
    //   if(this.startDate !== undefined && this.endDate !== undefined && 
    //     this.startDate !=='' && this.endDate !== '' &&
    //     Date.parse(this.startDate) <= Date.parse(this.endDate)
    //   ){
    //     return null;
    //   }

    //   return 'invalid date range';
    // },
  },
  // methods: {
  //   ...mapActions({
  //     fetchAnalytics: ActionTypes.FETCH_ANALYTICS
  //   }),
  //   async fetchAnalyticsBtn() {
  //     await this.fetchAnalytics({
  //       start_date: this.startDate,
  //       end_date: this.endDate,
  //     });
  //   },
  // },
  // async mounted() {
  //   await this.fetchAnalytics({
  //     start_date: this.startDate,
  //     end_date: this.endDate,
  //   });
  // }
});
</script>

<style lang="scss" scoped>
#expense {
  padding: 1.65% 23%;
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
  // color: white;
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
  left: 440px;
  width: 156px !important;
}
.tab6{
  left: 575px;
  width: 173px !important;
}
.tab8{
  left: 680px;
  width: 173px !important;
}
@media Screen and (max-width: 1375px){
  .diff-shadow{
    width: 62vw;
  }
}
@media Screen and (max-width: 1164px){
  .diff-shadow{
    width: 72vw;
  }
}
</style>
