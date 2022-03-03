<template>
  <div id="expense">
    <div class="diff-shadow">
      <div class="flex-box nav-tabs">
        <button :class="tab === 'order' ? 'active-li ab1' : 'ab1'">
          <router-link @click="tab = 'order'" :to="{name: 'order-analytics'}">
            <strong>Orders</strong>
          </router-link>
        </button>
        <button :class="tab === 'inventory' ? 'active-li ab2' : 'ab2'">
          <router-link @click="tab = 'inventory'" :to="{name: 'inventory-analytics'}">
            <strong>Inventory</strong>
          </router-link>
        </button>
        <button :class="tab === 'detail' ? 'active-li ab3' : 'ab3'">
          <router-link @click="tab = 'detail'" :to="{name: 'operator-sales-detail'}">
            <strong>Operator Sales</strong>
          </router-link>
        </button>
        <button :class="tab === 'report' ? 'active-li ab4' : 'ab4'">
          <router-link @click="tab = 'report'" :to="{name: 'profit-loss-report'}">
            <strong>Profit/Loss Report</strong>
          </router-link>
        </button>
        <button :class="tab === 'StockStatement' ? 'active-li ab5' : 'ab5'">
            <router-link @click="tab = 'StockStatement'" :to="{name: 'StockStatement'}">
              <strong>Stock Statement</strong>
            </router-link>
        </button>
        <!-- <button :class="tab === 'order' ? 'nav-link active' : 'nav-link'" class="btn btn-grid">
          <router-link @click="tab = 'order'" :to="{name: 'order-analytics'}">
            <strong>Orders</strong>
          </router-link>
        </button>
        <button :class="tab === 'inventory' ? 'nav-link active' : 'nav-link'" class="btn btn-grid">
          <router-link @click="tab = 'inventory'" :to="{name: 'inventory-analytics'}">
            <strong>Inventory</strong>
          </router-link>
        </button>
        <button :class="tab === 'detail' ? 'nav-link active' : 'nav-link'" class="btn btn-grid">
          <router-link @click="tab = 'detail'" :to="{name: 'operator-sales-detail'}">
            <strong>Operator Sales</strong>
          </router-link>
        </button>
        <button :class="tab === 'report' ? 'nav-link active' : 'nav-link'" class="btn btn-grid">
          <router-link @click="tab = 'report'" :to="{name: 'profit-loss-report'}">
            <strong>Profit/Loss Report</strong>
          </router-link>
        </button>
        <button :class="tab === 'StockStatement' ? 'nav-link active' : 'nav-link'" class="btn btn-grid">
            <router-link @click="tab = 'StockStatement'" :to="{name: 'StockStatement'}">
              <strong>Stock Statement</strong>
            </router-link>
        </button> -->
      </div>
      <!-- <hr class="solid"> -->
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
    // padding: 2.65% 30%;
    padding: 2.65% 23%;
    // padding-left: 15%;
    // padding-right: 15%;
    margin-top: 3%;
    // padding-left: 15%;
    // padding-right: 15%;
    // margin-top: 3%;
  }
  .diff-shadow{
    padding: 1.65% 3.56%;
  }
  .route-con{
    margin: 60px 0 20px 0;
  }
  // #expense {
  //   padding-left: 15%;
  //   padding-right: 15%;
  //   margin-top: 3%;
  // }
//   .pad-label {
//     padding: 20px 20px 20px 0px;
//   }
//   .w100 {
//     width: $w150;
//   }
//   label {
//     text-align: left;
//   }
//   .full-width {
//     width: 100%;
//   }
//   .checkbox-label {
//     font-size: $label-font-size;
//   }
//   .nav-tabs .nav-link.active {
//     color: $primary-color;
//     background-color: #fff;
//     border-color: #dee2e6 #dee2e6 #fff;
//   }
//   .nav-link {
//     border: 1px solid transparent;
//     border-top-left-radius: .25rem;
//     border-top-right-radius: .25rem;
//   }
//   .nav-link {
//     color: #495057;
//     display: block;
//     padding: .5rem 1rem;
//   }
//   a:visited {
//     color: #495057;
//   }
//   .active a {
//     color: $primary-color;
//   }
//   .grid-container {
//   display: grid;
//   grid-template-columns: auto auto auto;
//   padding: 10px;
// }
// .grid-item {
//   background-color: rgba(255, 255, 255, 0.8);
//   padding: 20px;
// }
//   hr.solid {
//     border-top: 3px solid #bbb;
//   }
//   .btn-grid {
//     width: $w100;
//     margin: 2px;
//   }


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
.ab1{
}
.ab2{
  left: 138px;
}
.ab3{
  left: 290px;
}
.ab4{
  left: 443px;
}
.ab5{
  left: 599px;
}
</style>
