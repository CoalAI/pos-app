<template>
  <div id="order-page">
    <div class="product-container diff-shadow">
      <div class="box1">
        <div class="form-container">
          <label class="bc pad-label" for="barcode">
            <strong>Bar Code:</strong>
          </label>
          <div class="bc-i">
            <input
              type="text"
              tabindex="1"
              placeholder="Bar code"
              name="barcode"
              :maxlength="BarCodeMaxLength"
              v-model="product.barCode"
              @input="searchByBarcode"
              ref="barcode"
              v-focus
            />
            <span v-if="productBarCodeValidation" class="form-error">{{ productBarCodeValidation }}</span>
          </div>

          <label class="q pad-label mr-l" for="quantity">
            <strong>Quantity:</strong>
          </label>
          <div class="q-i">
            <input
              type="number"
              tabindex="4"
              placeholder="quantity"
              name="quantity" 
              :max="24"
              :min="0"
              v-model="product.quantity"
              @input="changeProductQuantity"
            />
            <span v-if="productQuantityValidation" class="form-error">{{ productQuantityValidation }}</span>
          </div>
          

          <div class="ap-e">
            <button class="btn btn-orange ap" @click="clearProduct">Clear Product</button>
          </div>

          <label class="pn pad-label" for="productname">
            <strong>Product Name:</strong>
          </label>
          <div class="pn-i">
            <input
              type="text"
              tabindex="2"
              placeholder="Product Name"
              name="productname"
              :maxlength="ProductNameMaxLength"
              v-model="product.name"
              @input="searchByName"
            />
            <span v-if="productNameValidation" class="form-error">{{ productNameValidation }}</span>
          </div>
          

          <label class="d pad-label mr-l" for="discount">
            <strong>Price:</strong>
          </label>
          <div class="d-i">
            <input
              type="number"
              tabindex="5"
              placeholder="discount percentage"
              name="discount"
              v-model="product.buyPrice"
              @input="changeProductPrice"
            />
            <!-- <span v-if="productDiscountValidation" class="form-error">{{ productDiscountValidation }}</span> -->
          </div>
          
          
          <div class="ap">
            <button class="btn btn-orange ap"
              tabindex="7"
              @click="addOrderItem"
              :disabled="addProductButton"
            >Add Product</button>
          </div>

          <label class="bt pad-label" for="barcode">
            <strong>Batches:</strong>
          </label>
          <div class="bt-i">
            <select
              tabindex="3"
              name="productBatch"
              class="custom-select"
              v-model="product.batch"
              ref="batches"
            >
              <option v-for="batch in productBatchSelect" v-bind:key="batch.id" v-bind:value="batch.id">
                {{ batch.id }} {{ batch.expiry_date }}
              </option>
            </select>
            <span v-if="productBatchValidation" class="form-error">{{ productBatchValidation }}</span>
          </div>

          <label class="e pad-label mr-l" for="discount">
            <strong>Discount (%):</strong>
          </label>
          <div class="e-i">
            <input
              type="number"
              tabindex="6"
              placeholder="discount percentage"
              name="discount"
              v-model="product.discount"
            />
            <span v-if="productDiscountValidation" class="form-error">{{ productDiscountValidation }}</span>
          </div>

          <div class="e-ap"><span class="form-error">{{ duplicateMessage }}</span></div>
        </div>
      </div>
      <div class="box-22">
        <table class="pr-s-r-table">
          <tr>
            <td><strong>Date:</strong></td>
            <td>{{ date }}</td>
          </tr>
          <tr>
            <td><strong>Invoice no:</strong></td>
            <td>00000111</td>
          </tr>
        </table>
      </div>
    </div>

    <div class="diff-shadow">
      <div class="table-container" style="margin-top: 0;">
        <p><strong>Product Results</strong></p>
        <p style="margin-left: 15px"><strong>Order Items</strong></p>
      </div>

      <!-- Order Items table -->
      <div class="table-container">
        <div class="box2 box1-tab">
          <ul class="pr-s-r-ul" v-for="item in productResult" v-bind:key="item.id">
            <li class="li-item" v-for="itemVariant in item.product_variant" v-bind:key="itemVariant.id">
              <div class="shadow-box mr-all" @click="selectProduct(item.id, itemVariant.id)">
                <table class="pr-s-r-table">
                  <tr>
                    <td>{{ item.name }}</td>
                    <td>{{ item.bar_code }}</td>
                    <td>{{ itemVariant.color }}</td>
                  </tr>
                  <tr>
                    <td>{{ itemVariant.price }}</td>
                    <td v-if="sumQuantity(itemVariant) > 0">{{ sumQuantity(itemVariant) }}</td>
                    <td v-else class="out-of-stock">Out of Stock</td>
                    <td>{{ itemVariant.size }}</td>
                  </tr>
                </table>
              </div>
            </li>
          </ul>
        </div>
        <div class="box1-tab" style="margin-left: 15px">
          <table style="width: 100%">
            <colgroup>
              <col span="1" style="width: 5%;">
              <col span="1" style="width: 20%;">
              <col span="1" style="width: 35%;">
              <col span="1" style="width: 10%;">
              <col span="1" style="width: 10%;">
              <col span="1" style="width: 6%;">
              <col span="1" style="width: 10%;">
              <col span="1" style="width: 4%;">
            </colgroup>

            <tr>
              <th>Sr No.</th>
              <th>Bar Code</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Disc</th>
              <th>Total Price</th>
              <th></th>
            </tr>
            <tr v-for="(orderItem, index) in orderItems" v-bind:key="orderItem.product.bar_code">
              <td>{{ index+1 }}</td>
              <td>{{ orderItem.product.bar_code }}</td>
              <td>{{ orderItem.product.name }}</td>
              <td>
                <input
                  class="order_item_input"
                  type="number"
                  placeholder="quantity"
                  v-model="orderItem.quantity"
                  @input="changeQuantity(index)"
                />
              </td>
              <td>{{ orderItem.price }}</td>
              <td>
                <input
                  class="order_item_input"
                  type="number"
                  placeholder="discount"
                  v-model="orderItem.discount"
                  @input="changeDiscount(index)"
                />
              </td>
              <td>{{orderItem.totalPrice}}</td>
              <td style="cursor: pointer;" @click="removeItem(index)">
                <hr style="border: 1px solid red">
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    

    <div class="diff-shadow">

      <div id="payment-selection" class="payment-method-container">
        <div class="flex-box mr-2">
          <p class="labl-txt"><strong>Payment method:</strong></p>
          <label class="custom-radio" style="margin-right: 10px">Cash
            <input type="radio" name="payment_method" value="cash" v-model="paymentMethod">
            <span class="checkmark"></span>
          </label>
          <label class="custom-radio" style="margin-right: 10px">Card
            <input type="radio" name="payment_method" value="card" v-model="paymentMethod">
            <span class="checkmark"></span>
          </label>
          <label class="custom-radio">Credit
            <input type="radio" name="payment_method" value="credit" v-model="paymentMethod">
            <span class="checkmark"></span>
          </label>
        </div>
        <div>
          <input
              v-if="paymentMethod === 'credit'"
              type="text"
              tabindex="1"
              placeholder="Search Walk-In Customer"
              name="barcode"
              v-focus
            />
        </div>
      </div>

      <!-- Payment Process -->
      <div class="payment-container">

        <div id="pay-box1">
          <div class="form-container">
            
            <label class="pad-label bc" for="barcode">
              <strong>Total Amount:</strong>
            </label>
            <div class="bc-i">
              <input
                type="text"
                name="total_amount"
                v-bind:value="totalAmount"
                readonly
              />
            </div>

            <label class="pad-label q mr-l" for="total_discount">
              <strong>Total Discount:</strong>
            </label>
            <div class="q-i">
              <div class="flex-box">
                <input
                  style="width: 60%"
                  type="number"
                  placeholder="Discount"
                  name="total_discount"
                  v-model="totalDiscount"
                />
                <select
                  style="width: 40%; margin-left: 5px;"
                  name="discountMethod"
                  v-model="discountMethod"
                >
                  <option value="amount">Amount</option>
                  <option value="percentage">Perc (%)</option>
                </select>
              </div>
              <span v-if="orderTotalDiscountValidation" class="form-error">{{ orderTotalDiscountValidation }}</span>
            </div>

            <label class="pad-label pn" for="barcode">
              <strong>Cash Received:</strong>
            </label>
            <div class="pn-i">
              <input
                type="number"
                placeholder="Enter Cash Received"
                name="cash_received"
                v-model="cashReceived"
              />
              <span v-if="orderCashReceivedValidation" class="form-error">{{ orderCashReceivedValidation }}</span>
            </div>
            

            <label class="pad-label mr-l d" for="return">
              <strong>Cash Returned:</strong>
            </label>
            <div class="d-i">
              <input
                type="text"
                name="return"
                v-bind:value="cashReturned"
                readonly
              />
            </div>

            <template v-if="paymentMethod === 'card'">
              <label class="pad-label bt" for="return">
                <strong>Payment Service:</strong>
              </label>
              <div class="bt-i">
                <select
                  name="return"
                >
                  <option>Bank</option>
                </select>
              </div>

              <label class="pad-label mr-l e" for="return">
                <strong>Reference Number:</strong>
              </label>
              <div class="e-i">
                <input
                  type="text"
                  name="reference"
                  placeholder="Transaction ID"
                />
              </div>
            </template>

            <template v-if="paymentMethod === 'credit'">
              <label class="pad-label bt" for="return">
                <strong>Customer Name:</strong>
              </label>
              <div class="bt-i">
                <input
                  type="text"
                  name="customername"
                  placeholder="Customer Name"
                  readonly
                />
              </div>

              <label class="pad-label mr-l e" for="return">
                <strong>Balance:</strong>
              </label>
              <div class="e-i">
                <input
                  type="text"
                  name="balance"
                  placeholder="Balance"
                  readonly
                />
              </div>
            </template>
          </div>
          <div v-if="paymentMethod === 'credit'" class="form-container">
            <label class="pad-label bc" for="total_discount">
              <strong>Payment Type:</strong>
            </label>
            <div class="bc-i">
              <select
                name="creditPaymentMethod"
                v-model="creditPaymentMethod"
              >
                <option value="cash">Cash</option>
                <option value="card">Card</option>
              </select>
            </div>

            <label class="pad-label w100 mr-l q" for="deduct">
              <strong>Deduct Balance:</strong>
            </label>
            <input style="margin-top: 21px" class="q-i" type="checkbox" id="deduct" name="deduct">

            <template v-if="creditPaymentMethod === 'card'">
              <label class="pad-label pn" for="return">
                <strong>Payment Service:</strong>
              </label>
              <div class="pn-i">
                <select
                  type="text"
                  name="return"
                >
                  <option>Bank</option>
                </select>
              </div>

              <label class="pad-label mr-l d" for="return">
                <strong>Reference Number:</strong>
              </label>
              <div class="d-i">
                <input
                  type="text"
                  name="reference"
                  placeholder="Transaction ID"
                />
              </div>
            </template>
          </div>
        </div>
        <div id="pay-box2">
            <button v-if="paymentMethod === 'credit'" class="btn btn-orange">Add New Customer</button>
            <button
              class="btn btn-orange"
              @click="submitOrder"
              :disabled="submitOrderButton"
            >Submit and Print</button>
            <button class="btn btn-orange">Submit</button>
            <button class="btn btn-orange" @click="cancelModal = true">Cancel Order</button>
        </div>
      </div>

    </div>

    <Modal v-if="cancelModal">
      <template v-slot:header>
        <h2>Confirm Cancellation</h2>
      </template>

      <template v-slot:body>
        <p>Are you sure you want to cancel this order?</p>
      </template>

      <template v-slot:footer>
        <div class="flex-box">
          <button class="btn btn-orange btn-mr" @click="cancelModal = false">Cancel</button>
          <button class="btn btn-orange btn-mr" @click="handleOrderStatus">Yes</button>
        </div>
      </template>
    </Modal>

    <Modal v-if="orderStatus">
      <template v-slot:header>
        <h2>Order Status</h2>
      </template>

      <template v-slot:body>
        <p>{{ orderStatus }}</p>
      </template>

      <template v-slot:footer>
        <div class="flex-box">
          <button @click="handleOrderStatus()" class="btn btn-orange btn-mr" v-focus>New Order</button>
        </div>
      </template>
    </Modal>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Modal from '@/components/common-components/Modal.vue';
import { mapActions, mapGetters } from 'vuex';
import { ActionTypes } from '@/store/modules/order/actions';
import { Order } from '@/store/models/order';
import { Batch } from '@/store/models/batch';
import { OrderItem } from '@/store/models/orderItem';
import { Product, ProductVariant } from '@/store/models/product';

export default defineComponent({
  name: 'Order',
  components: {
    Modal,
  },

  data() {
    const today = new Date().toDateString();
    const orderItems: OrderItem[] = [];

    return {
      cancelModal: false,
      product: {
        name: '',
        barCode: '',
        quantity: '',
        quantityUpperLimit: 0,
        discount: '',
        batch: '',
        buyPrice: '',
        actualPrice: 0
      },
      date: today,
      orderItems: orderItems,
      productId: 0,
      productVariantId: 0,
      productBatchSelect: '',
      cashReceived: '',
      totalDiscount: '',
      paymentMethod: 'cash',
      errorIndication: true,
      buyer: 2,
      BarCodeMaxLength: 48,
      ProductNameMaxLength: 60,
      duplicateMessage: '',
      creditPaymentMethod: 'cash',
      discountMethod: 'amount'
    }
  },
  computed: {
    totalAmount: function (): number {
      let total = this.orderItems
        // eslint-disable-next-line
        .map((item: any) =>  item.totalPrice)
        .reduce((a: number, b: number) => a + b, 0);
      
      const totalDiscount = parseFloat(this.totalDiscount);
      if (this.discountMethod === 'amount') {
        if (!isNaN(totalDiscount) && totalDiscount > 0) {
          total = total - totalDiscount;
        }
      } else if (this.discountMethod === 'percentage') {
        if (!isNaN(totalDiscount) && totalDiscount > 0 && totalDiscount <= 100) {
          total = total * ((100 - totalDiscount) / 100);
        }
      }
      return total;
    },

    cashReturned: function (): number | null {
      const value = parseFloat(this.cashReceived);
      return isNaN(value) ? null : value - this.totalAmount;
    },

    productNameValidation: function () {
      let errorMessage = null;
      if (!this.errorIndication) {
        // CheckIF product exist on the backend
        if (this.product.name === undefined || this.product.name === '')
        {
          errorMessage = 'Name is required';
        }
      }
      return errorMessage;
    },

    productBarCodeValidation: function () {
      let errorMessage = null;
      if (!this.errorIndication) {
        // CheckIF product exist on the backend
        if (this.product.barCode === undefined || this.product.barCode === '')
        {
          errorMessage = 'Barcode is required';
        }
      }
      return errorMessage;
    },

    productBatchValidation: function () {
      let errorMessage = null;
      if (!this.errorIndication) {
        // CheckIF product exist on the backend
        if (this.product.batch === undefined || this.product.batch === '')
        {
          errorMessage = 'Batch is required';
        }
      }
      return errorMessage;
    },

    productQuantityValidation: function () {
      let errorMessage = null;
      if (!this.errorIndication) {
        // CheckIF product exist on the backend
        if (this.product.quantity === undefined || this.product.quantity === '')
        {
          errorMessage = 'Quantity is required';
        } else {
          const value = parseFloat(this.product.quantity);
          if (isNaN(value)) {
            errorMessage = 'Only numbers are allowed';
          } else {
            if ( value > this.product.quantityUpperLimit) {
              errorMessage = 'Stock is less than this quantity.';
            }
          }
        }
      }
      return errorMessage;
    },

    addProductButton: function (): boolean {
      let disable = true;
      if (this.productNameValidation === null &&
      this.productBarCodeValidation === null &&
      this.productBatchValidation === null &&
      this.productQuantityValidation === null &&
      this.productDiscountValidation === null) {
        disable = false
      }
      return disable
    },

    productDiscountValidation: function () {
      let errorMessage = null;
      if (!this.errorIndication) {
        // CheckIF product exist on the backend
        if (this.product.discount !== undefined && this.product.discount !== '') {
          const value = parseFloat(this.product.discount);
          if (isNaN(value)) {
            errorMessage = 'Only numbers are allowed';
          } else {
            if (value < 0 || value > 100) {
              errorMessage = 'Discount value should be b/w 0 to 100'
            }
          }
        }
      }
      return errorMessage;
    },

    orderTotalDiscountValidation: function () {
      let errorMessage = null;
      if (this.totalDiscount !== undefined && this.totalDiscount !== '') {
        const value = parseFloat(this.totalDiscount);
        if (isNaN(value)) 
        {
          errorMessage = 'Only numbers are allowed';
        }
        else 
        {
          if (this.discountMethod === 'amount' && value < 0) {
            errorMessage = "Discount should be greater than zero";
          } else if (this.discountMethod === 'percentage' && (value < 0 || value > 100)) {
            errorMessage = 'Discount value should be b/w 0 to 100';
          }
        }
      }
      return errorMessage
    },

    orderCashReceivedValidation: function () {
      let errorMessage = null;
      if (this.cashReceived !== undefined && this.cashReceived === '') {
        errorMessage = "Cash is required"
      }
      if (this.cashReceived !== undefined && this.cashReceived !== '') {
        const value = parseFloat(this.cashReceived);
        if (isNaN(value)) {
          errorMessage = 'Only numbers are allowed';
        } else {
          if (value < this.totalAmount) {
            errorMessage = 'Cash is less than total amount';
          }
        }
      }
      return errorMessage
    },

    submitOrderButton: function () {
      let disable = true;
      if ( this.orderItems.length > 0 &&
      this.orderTotalDiscountValidation === null &&
      this.orderCashReceivedValidation === null) {
        disable = false;
      }
      return disable
    },

    ...mapGetters({
      productResult: 'getProductResults',
      userdata: 'getUser',
      orderStatus: 'getOrderStatus'
    })
  },
  methods: {
    clearProduct: function () {
      this.productId = 0;
      this.productVariantId = 0;
      this.product.barCode = '';
      this.product.name = '';
      this.product.quantity = '';
      this.product.discount = '';
      this.product.batch = '';
      this.product.quantityUpperLimit = 0;
      this.productBatchSelect = '';
      this.errorIndication = true;
      this.duplicateMessage = '';
      this.product.buyPrice = '';
      this.product.actualPrice = 0;
    },

    selectProduct: async function (productId: number, VariantId: number) {
      this.duplicateMessage = '';
      const currentProduct = await this.productResult.find((item: Product) => item.id === productId);
      const currentVariant = await currentProduct.product_variant.find((item: ProductVariant) => item.id === VariantId);
      if (this.sumQuantity(currentVariant) <= 0) return;

      // Check If the product is already in Order Items
      const duplicate = await this.orderItems
        .find((item: OrderItem) => item.product && item.product === currentProduct);
      
      if (duplicate) {
        this.duplicateMessage = 'The product is already added to the order items.';
        return;
      }

      this.duplicateMessage = '';
      this.productId = productId;
      this.productVariantId = VariantId;
      this.product.barCode = currentProduct.bar_code;
      this.product.name = currentProduct.name;
      this.product.actualPrice = parseFloat(currentVariant.price);
      this.product.quantityUpperLimit = this.sumQuantity(currentVariant);
      this.productBatchSelect = currentVariant.batch
        .filter((batch: Batch) => batch.quantity && parseFloat(batch.quantity) > 0)
        // eslint-disable-next-line
        .sort((x: any, y: any) => +new Date(x.created) - +new Date(y.created));
      const batchId = (this.productBatchSelect[0] as Batch).id
      this.product.batch = batchId !== undefined ? batchId.toString() : '';
      (this.$refs.batches as HTMLSelectElement & { focus: () => void }).focus();
    },

    addOrderItem: async function () {
      this.errorIndication = false;
      let quantity = parseFloat(this.product.quantity);
      quantity = isNaN(quantity) ? 0 : quantity;
      let price = parseFloat(this.product.buyPrice);
      price = isNaN(price) ? 0 : price;

      if (this.product.name === '') return;
      if (this.product.barCode === '') return;
      if (this.product.quantity === '') return;
      if (this.product.batch === '') return;
      if (this.product.buyPrice === '') return;
      if (quantity > this.product.quantityUpperLimit) return;

      const discount = isNaN(parseFloat(this.product.discount)) ? 0 : parseFloat(this.product.discount);
      const batch = parseFloat(this.product.batch);

      if ( (!this.productId || this.productId === 0) && (!this.productVariantId || this.productVariantId === 0) ) {
        this.duplicateMessage = 'Please select product from product results or add desired product to system';
        return;
      }

      this.duplicateMessage = '';
      const currentProduct = await this.productResult
        .find((item: Product) => item.id === this.productId);
      const currentVariant = await currentProduct.product_variant
        .find((item: ProductVariant) => item.id === this.productVariantId);

      price = currentVariant.price;
      let totalPrice = price * quantity;
      if (this.product.discount
        && discount > 0
        && discount < 100
      ) {
        totalPrice = totalPrice * ((100 - discount) / 100)
      }

      const SingleOrderItem: OrderItem = {
        batch: isNaN(batch) ? 0 : batch,
        product: currentProduct,
        productVariant: currentVariant,
        price: price.toString(),
        quantity: quantity.toString(),
        discount: discount.toString(),
        totalPrice
      }
      this.orderItems.push(SingleOrderItem);
      this.clearProduct();
      (this.$refs.barcode as HTMLInputElement & { focus: () => void }).focus();
    },

    submitOrder: async function () {
      if (this.orderItems.length < 0) return;
      if (this.cashReceived === '') return;

      const unproxiedOrderItem = await this.orderItems.map((singleOrderItem: OrderItem) =>  {
        return {
          batch: singleOrderItem.batch,
          price: singleOrderItem.price?.toString(),
          discount: singleOrderItem.discount?.toString(),
          quantity: singleOrderItem.quantity?.toString()
        } as OrderItem
      });

      const cash = parseFloat(this.cashReceived);
      const discount = parseFloat(this.totalDiscount);

      const singleOrder: Order = {
        order_item: unproxiedOrderItem,
        buyer: this.buyer,
        seller: this.userdata.id,
        total_discount: isNaN(discount) ? '0' : discount.toString(),
        total: this.totalAmount.toString(),
        payment_method: this.paymentMethod === 'cash' ? true : false,
        amount_received: isNaN(cash) ? '0' : cash.toString(),
        amount_discount: this.discountMethod === 'amount' ? true : false,
      }

      this.createOrder(singleOrder);
    },

    changeQuantity: function (index: number) {
      const currentVariant = this.orderItems[index].productVariant;
      if (currentVariant !== undefined) {

        const upperLimit = this.sumQuantity(currentVariant);
        const currentOrderItemQuantity = this.orderItems[index].quantity;
        const currentOrderItemPrice = this.orderItems[index].price;
        const currentDiscount = this.orderItems[index].discount;

        if (currentOrderItemQuantity !== undefined && currentOrderItemPrice !== undefined) {

          const quantity = parseFloat(currentOrderItemQuantity);
          const price = parseFloat(currentOrderItemPrice);
          const discount = currentDiscount ? parseFloat(currentDiscount) : 0;

          if (isNaN(price)) return;
          if (isNaN(quantity)) return;
          if (quantity > upperLimit) return;
          let total = quantity * price;
          if (!(isNaN(discount) && discount <= 0 || discount > 100)) {
            total = total * ((100 - discount) / 100);
          }
          this.orderItems[index].totalPrice = total;
        }
      }
    },

    changeDiscount: function (index: number) {
      const currentOrderItemDiscount = this.orderItems[index].discount;
      const currentOrderItemPrice = this.orderItems[index].price;
      const currentOrderItemQuantity = this.orderItems[index].quantity;
      if (currentOrderItemDiscount !== undefined &&
      currentOrderItemPrice !== undefined &&
      currentOrderItemQuantity !== undefined) {

        const quantity = parseFloat(currentOrderItemQuantity);
        const price = parseFloat(currentOrderItemPrice);
        const discount = parseFloat(currentOrderItemDiscount);

        if (isNaN(discount) && discount <= 0 || discount > 100) return;
        this.orderItems[index].totalPrice = price * quantity
          * ((100 - discount) / 100);
      }
    },

    removeItem: function (index: number) {
      this.orderItems.splice(index, 1)
    },

    searchByName: function (event: Event) {
      if (event) {
        event.preventDefault()
      }
      this.searchProductByName(this.product.name);
    },

    searchByBarcode: function (event: Event) {
      if (event) {
        event.preventDefault()
      }
      this.searchProductByBarcode(this.product.barCode);
    },

    sumQuantity: function (item: ProductVariant): number {
      let sum = 0;
      if (item.batch !== undefined && typeof item.batch !== 'number') {
        item.batch.filter((batch: Batch) => batch.quantity && parseFloat(batch.quantity) > 0).forEach((batch: Batch) => {
          if (batch.quantity !== undefined) {
            sum = sum + +batch.quantity
          }
        });
      }
      return sum
    },

    handleOrderStatus: function () {
      this.changeOrderStatus('');
      this.clearProduct();
      this.orderItems = [];
      this.cashReceived = '';
      this.totalDiscount = '';
      this.paymentMethod = 'cash';
    },

    changeProductPrice: function () {
      let quantity = 0;
      if (this.product.actualPrice > 0 && this.product.buyPrice) {
        const price = parseFloat(this.product.buyPrice);

        if (!isNaN(price)) {
          quantity = price / this.product.actualPrice;
        }
      }
      this.product.quantity = quantity.toString();
    },

    changeProductQuantity: function () {
      let buyPrice = 0;
      if (this.product.actualPrice > 0 && this.product.quantity) {
        const quantity = parseFloat(this.product.quantity);

        if (!isNaN(quantity)) {
          buyPrice = quantity * this.product.actualPrice;
        }
      }
      this.product.buyPrice = buyPrice.toString();
    },

    ...mapActions({
      searchProductByName: ActionTypes.SEARCH_PRODUCT_BY_NAME,
      searchProductByBarcode: ActionTypes.SEARCH_PRODUCT_BY_BARCODE,
      createOrder: ActionTypes.CREATE_ORDER,
      changeOrderStatus: ActionTypes.CHANGE_ORDER_STATUS
    })
  },
});
</script>

<style lang="scss" scoped>

  .product-container {
    margin-top:20px;
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 0.1em 0.1em;
  }

  .form-container {
    display: grid;
    grid-template-columns: 0.7fr 2.3fr 0.7fr 2.3fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 0.1em 0.1em;
    grid-template-areas:
    "bc bc-i q q-i ap-e"
    "pn pn-i d d-i ap"
    "bt bt-i e e-i e-ap"
  }
  .bc { grid-area: bc;}
  .bc-i {grid-area: bc-i;}
  .q {grid-area: q;}
  .q-i {grid-area: q-i;}
  .pn {grid-area: pn;}
  .pn-i {grid-area: pn-i;}
  .d {grid-area: d;}
  .d-i {grid-area: d-i;}
  .ap-e {
    grid-area: ap-e;
    padding: 8px 10px;
  }
  .ap {
    grid-area: ap;
    padding: 8px 10px;
  }
  .bt { grid-area: bt; }
  .bt-i { grid-area: bt-i; }
  .e-ap { grid-area: e-ap; }
  .e { grid-area: e; }
  .e-i { grid-area: e-i; }

  .payment-method-container {
    display: grid;
    grid-template-columns: 3fr 1fr;
  }

  .pad-label {
    padding: 15px 5px 15px 0px;
  }

  .box2{
    padding: 0px 12px 0px 2px;
  }

  .table-container {
    display: grid;
    grid-template-columns: 2fr 4.1fr;
    gap: 0.1em 0.1em;
  }

  .labl-txt{
    text-align: left;
    margin-top: 0px;
    margin-right: 25px;
    font-size: 20px;
  }

  .box-inner-right{
    float: right;
    padding: 20px 20px 0px 20px;
  }

  .btn-mr{
    margin: 10px;
  }

  .box1-tab {
    overflow-y: auto;
    height: $order-item-table-height;
  }

  .pad-label-side {
    padding: 15px 5px;
    text-align: right;
    width: 40%;
  }

  .payment-container {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 0.1em 0.1em;
  }

  // .payment-container-inner {
  //   display: grid;
  //   grid-template-columns: 0.7fr 2.3fr 0.7fr 2.3fr 1fr;
  //   grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  //   gap: 0.1em 0.1em;
  // }

  .pr-s-r-table {
    border: none;
  }

  .pr-s-r-table td {
    border: none;
  }

  .pr-s-r-table tr:nth-child(even) {
    background-color: $white-color;
  }

  .pr-s-r-ul {
    list-style-type: none;
    margin-block-start: 0px;
    margin-block-end: 0px;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0px;
  }

  .out-of-stock {
    color: $red-color;
  }

  .mr-all {
    margin: 2px 0px 13px 0px;
  }

  .mr-l {
    margin-left: 10px;
  }

  .box-22 {
    margin-left: 70px;
  }

  li > div:hover {
    border: 2px solid $primary-color;
  }

  .order_item_input {
    margin: 0 !important;
    padding: 0 !important;
  }
</style>
