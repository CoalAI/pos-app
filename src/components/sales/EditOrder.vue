<template>
    <div class="diff-shadow">
      <div class="pad-1">
          <div>
          <strong>Order Number: </strong><span>#{{order.id}}</span>
          <strong style="margin-left: 20px;">Invoice ID: </strong><span>#{{order.invoice_id}}</span>
          <strong style="margin-left: 20px;">Order Date: </strong><span>{{onlyDate(order.created)}}</span>
          </div>
        
        <div class="table-box">
           <table>
            <tr>
              <th>Sr No.</th>
              <th>Bar Code</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Disc</th>
              <th>Total Price</th>
            </tr>
            <tr v-for="(orderItem, index) in order.order_item" v-bind:key="orderItem.id">
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
      </div>
      <div class="container-edit-order">
        <div class="box1">
          <div class="flex-box">
            <label class="pad-label w100" for="barcode">
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
            <label class="pad-label w100" for="barcode">
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
            <label class="pad-label w100" for="barcode">
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
            <label class="pad-label w100" for="barcode">
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
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex';
import { defineComponent } from 'vue';

import { Order } from '@/store/models/order';
import { ActionTypes } from '@/store/modules/order/actions';

export default defineComponent({
  name: 'EditOrder',
  props: ['orderId'],
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
    })
  },
  async created () {
    if (this.orderId) {
      const order_id = parseInt(this.orderId);
      await this.fetchOrder(order_id);
    }
  }
});
</script>

<style lang="scss" scoped>

  .container-edit-order {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr;
    gap: 0.1em 0.1em;
  }

  .btn-mr{
    margin: 60px 36px;
    padding: 14px;
  }

  .w100 {
    width: $w200;
  }

  .table-box {
    margin-top: 2%;
    height: $order-item-table-height;
    overflow-y: auto;
  }
</style>
