<template>
    <div class="editorder-container">
      <div class="diff-shadow">
        <div class="upper-line">
          <div>
            <strong>Order Number: </strong><span>#{{order.id}}</span>
          </div>
          <div>
            <strong style="">Invoice ID: </strong><span>#{{order.invoice_id}}</span>
          </div>
          <div>
            <strong style="">Order Date: </strong><span>{{onlyDate(order.created)}}</span>
          </div>
        </div>
        <div class="main-container"> 
          <div class="table-box">
            <table>
              <tr class="fr-row header">
                <th>Sr No.</th>
                <th>Bar Code</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Disc</th>
                <th>Total Price</th>
              </tr>
              <tr class="fr-row content" v-for="(orderItem, index) in order.order_item" v-bind:key="orderItem.id">
                <td>{{ index + 1 }}</td>
                <td>{{orderItem.batch.product_variant.product.bar_code}}</td>
                <td>{{orderItem.batch.product_variant.product.name}}</td>
                <td>{{orderItem.quantity}}</td>
                <td>{{orderItem.price}}</td>
                <td>{{orderItem.discount}}</td>
                <td>{{orderItemTotal(orderItem.quantity, orderItem.price)}}</td>
              </tr>
            </table>
          </div>
          <div class="stats-container">
            <div class="box1">
              <div class="flex-box">
                <label class="" for="barcode">
                  <strong>Total Amount:</strong>
                </label>
                <input 
                  type="text"
                  placeholder="Enter total Amount"
                  name="total_price"
                  v-model="order.total"
                  :readonly="readonlyData"
                />
              </div>
              <div class="flex-box">
                <label class="" for="barcode">
                  <strong>Discount:</strong>
                </label>
                <input
                  type="text"
                  placeholder="Discount on total bill"
                  name="total_discount"
                  v-model="order.total_discount"
                  :readonly="readonlyData"
                />
              </div>
              <div class="flex-box">
                <label class="" for="barcode">
                  <strong>Cash Received:</strong>
                </label>
                <input 
                  type="text"
                  placeholder="Enter received cash"
                  name="amount_received"
                  v-model="order.amount_received"
                  :readonly="readonlyData"
                />
              </div>
              <div class="flex-box">
                <label class="" for="barcode">
                  <strong>Cash Returned:</strong>
                </label>
                
                <input
                  type="text"
                  name="amount_received"
                  v-model="cashRetured"
                  readonly
                />
              </div>
            </div>
            <div class="box2">
              <!-- <h3>Following functionalities to be Implemented</h3>
              <div class="flex-box">
                <a class="btn btn-orange btn-mr">Edit Order</a>
                <a class="btn btn-orange btn-mr">Cancel</a>
                <a id="delete-btn" class="btn btn-orange btn-mr">Delete Order</a>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex';
import { defineComponent } from 'vue';

import { ActionTypes } from '@/store/modules/order/actions';

export default defineComponent({
  name: 'EditOrder',
  props: ['orderId'],
  watch: {
    $route(to, from) {
      this.emptyOrder();
    },
  },
  computed: {
    cashRetured: function(): number {
      let cash = 0;
      if (this.order && this.order.amount_received && this.order.total) {
        cash = parseFloat(this.order.amount_received) - parseFloat(this.order.total)
      }
      return cash;
    },

    readonlyData: function() {
      if (this.orderId) {
        return true;
      } else {
        return false;
      }
    },

    ...mapGetters({
      order: 'getOrder'
    })
  },
  methods: {
    orderItemTotal: function (quantity: string, price: string) {
      return parseFloat(quantity) * parseFloat(price);
    },

    onlyDate: function (value: string) {
      const givenDate = new Date(value)
      return givenDate.toDateString()
    },

    ...mapActions({
      fetchOrder: ActionTypes.FETCH_ORDER,
      emptyOrder: ActionTypes.EMPTY_ORDER,
    })
  },
  async created () {
    if (this.orderId) {
      const order_id = parseInt(this.orderId);
      await this.fetchOrder(order_id);
    }
  },
});
</script>

<style lang="scss" scoped>

  // .container-edit-order {
  //   display: grid;
  //   grid-template-columns: 1fr 2fr;
  //   grid-template-rows: 1fr;
  //   gap: 0.1em 0.1em;
  // }

  // .btn-mr{
  //   margin: 60px 36px;
  //   padding: 14px;
  // }

  // .w100 {
  //   width: $w200;
  // }

  // .table-box {
  //   margin-top: 2%;
  //   height: $order-item-table-height;
  //   overflow-y: auto;
  // }

  // ab css

  .editorder-container{
    // padding: 2.65% 16%;
    max-width: 1140px;
    margin: 0 auto;
  }
  .diff-shadow{
    padding: 1.6% 5.5% 5.5% 5.5%;
  }
  // upper line
  .upper-line{
    display: flex;
    justify-content: space-between;
    width: 65%;
  }
  .upper-line > div > strong{
    font-size: 13px;
  }
  .upper-line > div > span{
    color: $primary-color;
    font-size: 13px;
  }
  // main-container designs
  .main-container{
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
  }


  // table box css
  .table-box{
    width: 65%;
  }
  .stats-container{
    width: 30%;
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

  // .box1 css
  .box1{
    padding: 20px 30px;
    border: 1px solid #ffffff;
    border-radius: 10px;
    box-shadow: 1px 1px 5px -1px rgba(0, 0, 0, 0.75)
  }
  // flex box css
  .box1 > .flex-box{
    margin: 20px 0;
    justify-content: space-between;
    align-items: baseline;
  }
  // input css
  .box1 > .flex-box > input[type=text]{
    width: 40%;
    padding: 10px 18px;
    border-radius: 10px;
    font-size: 0.75em;
  }
</style>
