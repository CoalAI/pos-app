<template>
  <div id="editOrder">
    <Header />
    <div class="diff-shadow page-mr">
      <div class="pad-1">
        <p>
          <strong>Order Number: </strong><span>#{{order.id}}</span>
          <strong style="margin-left: 20px;">Order Date: </strong><span>{{onlyDate(order.created)}}</span>
        </p>
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
          <h3>Following functionalities to be Implemented</h3>
          <div class="flex-box">
            <a class="btn btn-orange btn-mr">Edit Order</a>
            <a class="btn btn-orange btn-mr">Cancel</a>
            <a id="delete-btn" class="btn btn-orange btn-mr">Delete Order</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapActions } from 'vuex';
import { defineComponent } from 'vue';

import Header from '@/components/common-components/Header.vue';
import { Order } from '@/store/models/order';
import { ActionTypes } from '@/store/modules/order/actions';

export default defineComponent({
  name: 'EditOrder',
  props: ['orderId'],
  components: {
    Header
  },
  data () {
    const orderObject: Order = {};
    return {
      order: orderObject
    }
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
    }
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
      fetchOrders: ActionTypes.FETCH_ORDERS,
    })
  },
  async created () {
    if (this.orderId) {
      await this.fetchOrders();
      const order_id = parseInt(this.orderId);
      const order = isNaN(order_id) ? undefined : this.$store.getters.getSignleOrder(order_id);
      if (order) {
        this.order = order;
      }
      else {
        // Show 404 page on screen
        this.$router.push({name: 'notFound'});
      }
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
