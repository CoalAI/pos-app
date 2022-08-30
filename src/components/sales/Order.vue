<template>
  <div id="order-page">
    <div class="row">
      <div class="split-container diff-shadow col-3">
        <label class="td-head"
          ><strong>Date:</strong>
          <label class="td-cont"> {{ date }} </label>
        </label>
        <label class="td-head float-right"
          ><strong>Invoice: </strong>
          <label class="td-cont"> {{ invoiceID }} </label>
        </label>

        <div class="box1">
          <div class="form-container">
            <label class="bc pd-t" for="barcode">
              <strong>Bar Code:</strong>
            </label>
            <div class="bc-i">
              <input
                class="text-box"
                type="text"
                tabindex="1"
                placeholder="Bar Code:"
                name="barcode"
                :maxlength="BarCodeMaxLength"
                v-model="product.barCode"
                autocomplete="off"
                v-debounce:250="searchByBarcode"
                @keydown="checkkey"
                ref="barcode"
                v-focus
              />
              <span v-if="productBarCodeValidation" class="form-error">{{
                productBarCodeValidation
              }}</span>
            </div>

            <label class="q pd-t" for="quantity">
              <strong>Quantity:</strong>
            </label>
            <div class="q-i">
              <input
                class="text-box"
                type="number"
                tabindex="4"
                placeholder="Quantity:"
                name="quantity"
                :max="24"
                :min="0"
                v-model="product.quantity"
                @input="changeProductQuantity"
                ref="quantity"
                @keydown="shiftfocusTo($event, 'discount')"
              />
              <span v-if="productQuantityValidation" class="form-error">{{
                productQuantityValidation
              }}</span>
            </div>

            <label class="pn pd-t" for="productname">
              <strong>Product Name:</strong>
            </label>
            <div class="pn-i">
              <input
                class="text-box"
                type="text"
                tabindex="2"
                placeholder="Product Name:"
                name="productname"
                :maxlength="ProductNameMaxLength"
                v-model="product.name"
                @input="searchByName"
                @keydown="checkkey"
                autocomplete="off"
              />
              <span v-if="productNameValidation" class="form-error">{{
                productNameValidation
              }}</span>
            </div>

            <label class="d pd-t" for="discount">
              <strong>Price:</strong>
            </label>
            <div class="d-i">
              <input
                class="text-box"
                type="number"
                tabindex="5"
                placeholder="Price:"
                name="discount"
                v-model="product.buyPrice"
                @input="changeProductPrice"
              />
            </div>

            <label class="bt pd-t" for="barcode">
              <strong>Batches:</strong>
            </label>
            <div class="bt-i">
              <select
                tabindex="3"
                name="productBatch"
                class="custom-select text-box-long"
                v-model="product.batch"
                ref="batches"
              >
                <option
                  class="batches-op"
                  v-for="batch in filteredBatches"
                  v-bind:key="batch.id"
                  v-bind:value="batch.id"
                >
                  #{{ batch.id }} Exp: {{ batch.expiry_date }} Quan:
                  {{ batch.inventory_quantity }}
                </option>
              </select>
              <span v-if="productBatchValidation" class="form-error">{{
                productBatchValidation
              }}</span>
            </div>

            <label class="e pd-t " for="discount">
              <strong>Discount(%):</strong>
            </label>
            <div class="e-i">
              <input
                class="text-box"
                type="number"
                tabindex="6"
                placeholder="Discount"
                name="discount"
                v-model="product.discount"
                ref="discount"
                @keydown="shiftfocusTo($event, 'addproduct')"
              />
              <span v-if="productDiscountValidation" class="form-error">{{
                productDiscountValidation
              }}</span>
            </div>

            <div class="e-ap">
              <span class="form-error">{{ duplicateMessage }}</span>
            </div>
          </div>
        </div>

        <div>
          <div class="mr-1">
            <input
              class="q-i"
              type="checkbox"
              id="return_order"
              name="return_order"
              v-bind:checked="return_order"
              @change="return_order = !return_order"
            />
            <span
              ><label class="pd-t-ex"><strong>Return Order</strong></label></span
            >
          </div>
          <span v-if="validateReturnOrder" class="form-error">{{
            validateReturnOrder
          }}</span>
        </div>
        <div class="ap-e mr-2">
          <button class="btn-blue ap" @click="clearProduct">Clear Product</button>
          <button
            class="btn-red float-right ap"
            tabindex="7"
            @click="addOrderItem"
            :disabled="addProductButton"
            ref="addproduct"
            @keydown="shiftfocusTo('cashreceived')"
          >
            Add Product
          </button>
        </div>
      </div>

      <div class="split-container diff-shadow col-6">
        <div class="table-container-left">
          <p><strong>Product Results</strong></p>
          <p style="margin-left:2%"><strong>Order Items</strong></p>
        </div>

        <!-- Order Items table -->
        <div class="table-container">
          <div class="box2 box1-tab" ref="scrollContainer">
            <ul
              class="pr-s-r-ul"
              v-for="item in productResult"
              v-bind:key="item.id"
              ref="options"
            >
              <li
                class="li-item"
                v-for="itemVariant in item.product_variant"
                v-bind:key="itemVariant.id"
                :class="
                  item.id + '_' + itemVariant.id === focusedID
                    ? 'focuschange'
                    : ''
                "
              >
                <div
                  class="shadow-box mr-all"
                  @click="selectProduct(item.id, itemVariant.id)"
                >
                  <div>
                     <div class="ab-flex">
                       <p><b>Name:</b></p>
                       <p><b>{{ item.name }}</b></p>
                     </div>
                     <div class="ab-flex">
                       <p><b>Bar Code:</b></p>
                       <p><b>{{ item.bar_code }}</b></p>
                     </div>
                     <div class="ab-flex">
                       <p><b>Color:</b></p>
                       <p><b>{{ itemVariant.color }}</b></p>
                     </div>

                     <div class="ab-flex">
                       <p><b>Sale Price:</b></p>
                       <p><b>{{ itemVariant.sale_price }}</b></p>
                     </div>
                     <div class="ab-flex" v-show="sumQuantity(itemVariant) > 0">
                       <p><b>Quantity</b></p>
                       <p v-show="sumQuantity(itemVariant) > 0"><b>{{ sumQuantity(itemVariant) }}</b></p>
                     </div>
                     <div class="ab-flex">
                       <p><b>Size:</b></p>
                       <p><b>{{ itemVariant.size }}</b></p>
                     </div>
                     <div v-show="sumQuantity(itemVariant) <= 0" class="out-of-stock">
                       <p>Out of Stock</p>
                     </div>
                   </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="box1-tab">
            <table class="orderTable">
              <colgroup>
                <col span="1" style="width: 1%" />
                <col span="1" style="width: 1%" />
                <col span="1" style="width: 10%" />
                <col span="1" style="width: 5%" />
                <col span="1" style="width: 1%" />
                <col span="1" style="width: 1%" />
                <col span="1" style="width: 1%" />
                <col span="1" style="width: 10%" />
                <col span="1" style="width: 1%" />
              </colgroup>

              <tr>
                <th style="border-radius: 8px 0px 0px 8px">Sr No.</th>
                <th>Bar Code</th>
                <th>Name</th>
                <th>Size</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Disc</th>
                <th>Total Price</th>
                <th style="border-radius: 0px 8px 8px 0px"></th>
              </tr>
              <tr
                v-for="(orderItem, index) in orderItems"
                v-bind:key="orderItem.product.bar_code"
              >
                <td>{{ index + 1 }}</td>
                <td>{{ orderItem.product.bar_code }}</td>
                <td>{{ orderItem.product.name }}</td>
                <td>{{ orderItem.productVariant.size }}</td>
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
                <td>
                  <input
                    class="order_item_input"
                    type="number"
                    placeholder="total price"
                    v-model="orderItem.totalPrice"
                    @input="changePrice(index)"
                  />
                </td>
                <td style="cursor: pointer" @click="removeItem(index)">
                  <hr style="border: 1px solid red" />
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      <div class="split-container diff-shadow col-2">
        <!-- Payment Process -->
        <div class="payment-container">
          <div id="pay-box1">
            <div
              v-if="paymentMethod === 'credit'"
              @mouseout="showCustDropdown = false"
              @mouseover="showCustDropdown = true"
            >
              <input
                type="text"
                class="search-bar"
                tabindex="1"
                placeholder="Search Walk-In Customer"
                name="barcode"
                v-model="customersearch"
                @mouseover="showCustDropdown = true"
                @input="searchCustomer"
                autocomplete="off"
              />
              <div v-show="showCustDropdown" class="search-result-upper">
                <ul class="search-result">
                  <li
                    class="single-search-item"
                    v-for="customer in customers"
                    v-bind:key="customer.id"
                    @click="selectCustomer(customer)"
                  >
                    <span>
                    <strong>{{
                        customer.contact_number
                          ? customer.contact_number
                          : customer.username
                      }}</strong></span
                    >
                    <span>{{ customer.first_name }}</span>
                    
                    <!--<span>{{ customer.first_name + " " + customer.last_name}}</span>-->
                  </li>
                </ul>
              </div>
            </div>
            <div class="form-container-3">
              <template v-if="paymentMethod === 'credit'">
                  <label class="pd-t-3 bs" for="return">
                    <strong>Customer Name:</strong>
                  </label>
                  <div class="bs-i">
                    <input
                      class="text-box-full"
                      type="text"
                      name="customername"
                      placeholder="Name"
                      readonly
                      v-bind:value="getFullName"
                    />
                    <span v-if="validateRegularCustomer" class="form-error-msg">{{
                      validateRegularCustomer
                    }}</span>
                  </div>
              </template>
              <label class="pd-t-3 bc" for="barcode">
                <strong>Total Amount:</strong>
              </label>
              <div class="bc-i">
                <input
                  class="text-box-full"
                  type="text"
                  placeholder="0"
                  name="total_amount"
                  v-bind:value="totalAmount.toFixed(4)"
                  readonly
                />
                <span v-if="field_errors.total" class="form-error">{{
                  field_errors.total[0]
                }}</span>
              </div>

              <label class="pd-t-3 pn" for="barcode">
                <strong>Cash Received:</strong>
              </label>
              <div class="pn-i">
                <input
                  class="text-box-full"
                  type="number"
                  placeholder="0"
                  name="cash_received"
                  v-model="cashReceived"
                  ref="cashreceived"
                  @keydown="shiftfocusTo($event, 'totaldisc')"
                />
                <div v-if="field_errors.amount_received" class="form-error">
                  {{ field_errors.amount_received[0] }}
                </div>
                <span v-else class="form-error">{{
                  orderCashReceivedValidation
                }}</span>
              </div>

              <label class="pd-t-3 d" for="return">
                <strong>Cash Returned:</strong>
              </label>
              <div class="d-i">
                <input
                  class="text-box-full"
                  type="text"
                  name="return"
                  v-bind:value="cashReturned"
                  readonly
                />
              </div>

              <label class="pd-t-3 q" for="total_discount">
                <strong>Total Discount:</strong>
              </label>
              <div class="q-i">
                <div class="flex-box">
                  <input
                    class="text-box-med"
                    type="number"
                    placeholder="0"
                    name="total_discount"
                    v-model="totalDiscount"
                    ref="totaldisc"
                    @keydown="shiftfocusTo($event, 'submitandprint')"
                  />
                  <select
                    required
                    class="select-box-ex"
                    name="discountMethod"
                    v-model="discountMethod"
                  >
                    <option value="amount">Amt</option>
                    <option value="percentage">Perc (%)</option>
                  </select>
                </div>
                <span v-if="orderTotalDiscountValidation" class="form-error">{{
                  orderTotalDiscountValidation
                }}</span>
                <div v-if="field_errors.total_discount" class="form-error">
                  {{ field_errors.total_discount[0] }}
                </div>
              </div>

              

                <!--<template v-if="creditPaymentMethod === 'card'">
                <label class="pad-label pn" for="return">
                  <strong>Payment Service:</strong>
                </label>
                <div class="pn-i">
                  <select type="text" name="return" v-model="paymentService" class="select-box">
                    <option value="BANK">Bank</option>
                    <option value="JAZZ_CASH">Jazzcash</option>
                    <option value="EASY_PAISA">Easypaisa</option>
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
                    v-model="transactionId"
                  />
                </div>
              </template>-->
            </div>
            <div class="form-container-4">
                <template v-if="paymentMethod === 'card'">
                  <label class="pd-t-3 bt" for="return">
                    <strong>Payment Service:</strong>
                  </label>
                  <div class="bt-i">
                    <select
                      name="return"
                      v-model="paymentService"
                      class="select-box"
                    >
                      <option value="BANK">Bank</option>
                      <option value="JAZZ_CASH">Jazzcash</option>
                      <option value="EASY_PAISA">Easypaisa</option>
                    </select>
                  </div>
                  <label class="pd-t-3 e" for="return">
                    <strong>Reference Number:</strong>
                  </label>
                  <div class="e-i">
                    <input
                      class="text-box-sm"
                      type="text"
                      name="reference"
                      placeholder="Id"
                      v-model="transactionId"
                    />
                  </div>
                </template>
            </div>
            <div class="form-container-5">
              <template v-if="paymentMethod === 'credit'">
                  <label class="pd-t-3 bt" for="return">
                    <strong>Balance:</strong>
                  </label>
                  <div class="bt-i">
                    <input
                      class="text-box-sm"
                      type="text"
                      name="balance"
                      placeholder="0"
                      readonly
                      v-bind:value="regularCustomer.credit"
                    />
                  </div>
                  <label class="pd-t-3 w100 e" for="deduct">
                  <strong>Deduct Balance:</strong>
                </label>
                <div>
                  <input
                    style="margin-top: 21px"
                    class="e-i"
                    type="checkbox"
                    id="deduct"
                    name="deduct"
                    v-bind:checked="deduct_balance"
                    @change="deduct_balance = !deduct_balance"
                  />
                  <div v-if="validateDeductBalance" class="form-error">
                    {{ validateDeductBalance }}
                  </div>
                </div>
                <label class="pd-t-3 pn" for="total_discount">
                  <strong>Payment Type:</strong>
                </label>
                <div class="pn-i">
                  <select
                    name="creditPaymentMethod"
                    v-model="creditPaymentMethod"
                    class="select-box"
                  >
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                  </select>
                </div>
                </template>
                
              
              </div>
              </div>
        </div>
        <div id="payment-selection" class="payment-method-container">
          <!--<div class="flex-box mr-2">-->
            <label class="custom-radio inline" style="font-size: 12px; padding-top: 2px"
              >Cash
              <input
                type="radio"
                name="payment_method"
                value="cash"
                v-model="paymentMethod"
                @change="clearTransaction"
              />
              <span class="checkmark"></span>
            </label>
            <label class="custom-radio inline" style="font-size: 12px; padding-top: 2px"
              >Card
              <input
                type="radio"
                name="payment_method"
                value="card"
                v-model="paymentMethod"
                @change="clearTransaction"
              />
              <span class="checkmark"></span>
            </label>
            <label class="custom-radio inline" style="font-size: 12px; padding-top: 2px"
              >Credit
              <input
                type="radio"
                name="payment_method"
                value="credit"
                v-model="paymentMethod"
                @change="clearTransaction"
              />
              <span class="checkmark"></span>
            </label>
          <!--</div>-->
        </div>
        <div class="boxbtn mr-2 mr-l8">
          <button
            v-if="paymentMethod === 'credit'"
            class="btn-red block"
            @click="addCustModal = true"
          >
            Add New Customer</button
          ><br />
          <button
            class="btn-red block"
            @click="submitOrder(true)"
            :disabled="submitOrderButton"
            ref="submitandprint"
          >
            Submit and Print</button
          ><br />
          <button
            class="btn-red block"
            @click="submitOrder(false)"
            :disabled="submitOrderButton"
          >
            Submit</button
          ><br />
          <button class="btn-blue-3" @click="cancelModal = true">
            Cancel Order
          </button>
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
          <button class="btn btn-orange btn-mr" @click="cancelModal = false">
            Cancel
          </button>
          <button class="btn btn-orange btn-mr" @click="handleOrderStatus()">
            Yes
          </button>
        </div>
      </template>
    </Modal>

    <Modal v-if="addCustModal">
      <template v-slot:header>
        <h2>Add Customer</h2>
      </template>

      <template v-slot:body>
        <input
          type="text"
          placeholder="First Name"
          required
          v-model="user.firstName"
        />
        <input type="text" placeholder="Last Name" v-model="user.lastName" />
        <span v-if="nameValidation" class="form-error">{{
          nameValidation
        }}</span>
        <input
          type="text"
          placeholder="Contact Number"
          required
          v-model="user.userName"
        />
        <span v-if="contactnoValidation" class="form-error">{{
          contactnoValidation
        }}</span>
        <ErrorField
          v-if="authFieldErrors.contact_number"
          :errorField="authFieldErrors.contact_number"
        ></ErrorField>
        <input
          type="text"
          placeholder="Description"
          required
          v-model="user.description"
        />
      </template>

      <template v-slot:footer>
        <div class="flex-box">
          <button class="btn btn-orange btn-mr" @click="addCustModal = false">
            Cancel
          </button>
          <button
            class="btn btn-orange btn-mr"
            :disabled="addCustButton"
            @click="addNewCustomer"
          >
            Submit
          </button>
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
          <button
            @click="handleOrderStatus()"
            class="btn btn-orange btn-mr"
            v-focus
          >
            New Order
          </button>
        </div>
      </template>
    </Modal>
    
    <Modal v-if="order_response.id" type="scrollable">
      <template v-slot:header>
        <h2>Order Status</h2>
      </template>

      <template v-slot:body>
        <OrderBill
          :orderId="order_response.id"
          :customer="customer"
          :print="print"
        />
      </template>

      <template v-slot:footer>
        <div class="flex-box">
          <button
            @click="handleOrderStatus()"
            class="btn btn-orange btn-mr"
            v-focus
          >
            New Order
          </button>
        </div>
      </template>
    </Modal>
    <Modal v-else-if="orderoffline" type="scrollable">
      <template v-slot:header>
        <h2>Order Status</h2>
      </template>

      <template v-slot:body>
        <OfflineOrderBill :product_name="productName" :user="userdata"/>
      </template>

      <template v-slot:footer>
        <div class="flex-box">
          <button
            @click="handleOrderStatus()"
            class="btn btn-orange btn-mr"
            v-focus
          >
            New Order
          </button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Modal from "@/components/common-components/Modal.vue";
import { mapActions, mapGetters } from "vuex";
import { ActionTypes } from "@/store/modules/order/actions";
import { ActionTypes as AuthActionTypes } from "@/store/modules/auth/actions";
import { Order } from "@/store/models/order";
import { Batch } from "@/store/models/batch";
import { OrderItem } from "@/store/models/orderItem";
import { Product, ProductVariant } from "@/store/models/product";
import { User, UserExtra } from "@/store/models/user";
import ErrorField from "@/components/common-components/ErrorField.vue";
import OrderBill from "@/components/sales/OrderBill.vue";
import { Inventory } from "@/store/models/company";
import offlineStoreService from "@/utils/offline-store/index";
import OfflineOrderBill from "../sales/OfflineOrderBill.vue";

export default defineComponent({
  name: "Order",
  components: {
    Modal,
    ErrorField,
    OrderBill,
    OfflineOrderBill,
  },

  data() {
    const today = new Date().toDateString();
    const orderItems: OrderItem[] = [];
    const batches: Batch[] = [];
    const productName: string[] = [];
    return {
      orderoffline: false,
      submitOrderBtnDisable: false,
      focusedTile: -1,
      focusedID: "",
      cancelModal: false,
      addCustModal: false,
      product: {
        name: "",
        barCode: "",
        quantity: "",
        quantityUpperLimit: 0,
        discount: "",
        batch: "",
        buyPrice: "",
        actualPrice: 0,
      },
      user: {
        userName: "",
        firstName: "",
        lastName: "",
        company: "",
        description: "",
      },
      date: today,
      orderItems: orderItems,
      productId: 0,
      productVariantId: 0,
      productBatchSelect: batches,
      cashReceived: "0",
      totalDiscount: "",
      paymentMethod: "cash",
      errorIndication: true,
      buyer: 2,
      balance: 0,
      customerName: "",
      BarCodeMaxLength: 48,
      ProductNameMaxLength: 60,
      duplicateMessage: "",
      creditPaymentMethod: "cash",
      discountMethod: "amount",
      customersearch: "",
      paymentService: "",
      transactionId: "",
      selectedCutomer: "",
      showCustDropdown: false,
      walkinCustomer: {},
      regularCustomer: {},
      customer: {},
      deduct_balance: false,
      return_order: false,
      print: true,
      productName: productName,
    };
  },
  computed: {
    totalAmount: function (): number {
      let total = this.orderItems
        // eslint-disable-next-line
        .map((item: any) => {
          if (typeof item.totalPrice === "string") {
            return parseFloat(item.totalPrice);
          }
          return item.totalPrice;
        })
        .reduce((a: number, b: number) => a + b, 0);

      const totalDiscount = parseFloat(this.totalDiscount);
      if (this.discountMethod === "amount") {
        if (!isNaN(totalDiscount) && totalDiscount > 0) {
          total = total - totalDiscount;
        }
      } else if (this.discountMethod === "percentage") {
        if (
          !isNaN(totalDiscount) &&
          totalDiscount > 0 &&
          totalDiscount <= 100
        ) {
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
        if (this.product.name === undefined || this.product.name === "") {
          errorMessage = "Name is required";
        }
      }
      return errorMessage;
    },

    productBarCodeValidation: function () {
      let errorMessage = null;
      if (!this.errorIndication) {
        // CheckIF product exist on the backend
        if (this.product.barCode === undefined || this.product.barCode === "") {
          errorMessage = "Barcode is required";
        }
      }
      return errorMessage;
    },

    productBatchValidation: function () {
      let errorMessage = null;
      if (!this.errorIndication) {
        // CheckIF product exist on the backend
        if (this.product.batch === undefined || this.product.batch === "") {
          errorMessage = "Batch is required";
        }
      }
      return errorMessage;
    },

    productQuantityValidation: function () {
      let errorMessage = null;
      if (!this.errorIndication) {
        // CheckIF product exist on the backend
        if (
          this.product.quantity === undefined ||
          this.product.quantity === ""
        ) {
          errorMessage = "Quantity is required";
        } else {
          const value = parseFloat(this.product.quantity);
          if (isNaN(value)) {
            errorMessage = "Only numbers are allowed";
          } else {
            if (value > this.cummBatchQuantity) {
              errorMessage = "Stock is less than this quantity.";
            }
          }
        }
      }
      return errorMessage;
    },
    filteredBatches: function () {
      let batches: Batch[] = this.productBatchSelect;
      if (!this.return_order) {
        batches = batches.filter(
          (batch: Batch) =>
            batch.inventory_quantity && batch.inventory_quantity > 0
        );
      }
      return batches;
    },
    cummBatchQuantity: function (): number {
      return this.filteredBatches
        .map((batch: Batch) =>
          batch && batch.inventory_quantity ? batch.inventory_quantity : 0
        )
        .reduce((a: number, b: number) => a + b, 0);
    },

    validateDeductBalance: function () {
      let error_message = null;
      if (this.paymentMethod === "credit") {
        if (
          parseFloat(this.cashReceived) < this.totalAmount &&
          this.deduct_balance === false
        ) {
          error_message =
            "Cash Received is less than total so check Deduct Balance!";
        }
      }
      return error_message;
    },
    validateRegularCustomer: function () {
      let error_message = null;
      if (this.paymentMethod === "credit") {
        const regular_cust = this.regularCustomer as User;
        if (regular_cust === undefined || regular_cust.id === undefined) {
          error_message = "select regular customer!";
        }
      }
      return error_message;
    },
    validateReturnOrder: function () {
      let error_message = null;
      if (this.return_order && parseFloat(this.product.quantity) >= 0) {
        error_message = "quantity should be in negative for return order!";
      }

      return error_message;
    },
    returnOrderDisable: function (): boolean {
      // disables the return_order radio after any order item is added.
      return this.orderItems.length > 0;
    },
    selectedBatchQuantity: function (): number {
      let selectedBatchQuantity = 0.0;
      const batchID = parseInt(this.product.batch);
      if (!isNaN(batchID) && batchID > 0 && this.filteredBatches.length > 0) {
        const selectedBatch = this.filteredBatches.find(
          (item: Batch) => item.id === batchID
        );
        selectedBatchQuantity =
          selectedBatch && selectedBatch.inventory_quantity
            ? selectedBatch.inventory_quantity
            : 0;
      }
      return selectedBatchQuantity;
    },

    addProductButton: function (): boolean {
      let disable = true;
      if (
        this.productNameValidation === null &&
        this.productBarCodeValidation === null &&
        this.productBatchValidation === null &&
        this.productQuantityValidation === null &&
        this.productDiscountValidation === null &&
        this.validateReturnOrder === null
      ) {
        disable = false;
      }
      return disable;
    },

    addCustButton: function () {
      if (this.nameValidation === null && this.contactnoValidation === null) {
        return false;
      }
      return true;
    },

    productDiscountValidation: function () {
      let errorMessage = null;
      if (!this.errorIndication) {
        // CheckIF product exist on the backend
        if (
          this.product.discount !== undefined &&
          this.product.discount !== ""
        ) {
          const value = parseFloat(this.product.discount);
          if (isNaN(value)) {
            errorMessage = "Only numbers are allowed";
          } else {
            if (value < 0 || value > 100) {
              errorMessage = "Discount value should be b/w 0 to 100";
            }
          }
        }
      }
      return errorMessage;
    },

    orderTotalDiscountValidation: function () {
      let errorMessage = null;
      if (this.totalDiscount !== undefined && this.totalDiscount !== "") {
        const value = parseFloat(this.totalDiscount);
        if (isNaN(value)) {
          errorMessage = "Only numbers are allowed";
        } else {
          if (this.discountMethod === "amount" && value < 0) {
            errorMessage = "Discount should be greater than zero";
          } else if (
            this.discountMethod === "percentage" &&
            (value < 0 || value > 100)
          ) {
            errorMessage = "Discount value should be b/w 0 to 100";
          }
        }
      }
      return errorMessage;
    },

    orderCashReceivedValidation: function () {
      let errorMessage = null;
      if (
        this.return_order &&
        this.cashReceived &&
        parseFloat(this.cashReceived) !== 0
      ) {
        errorMessage = "Cash Received must be 0 for Return Order.";
      } else if (this.paymentMethod !== "credit") {
        if (this.cashReceived !== undefined && this.cashReceived === "") {
          errorMessage = "Cash is required";
        }
        if (this.cashReceived !== undefined && this.cashReceived !== "") {
          const value = parseFloat(this.cashReceived);
          if (isNaN(value)) {
            errorMessage = "Only numbers are allowed";
          } else {
            if (value < this.totalAmount) {
              errorMessage = "Cash is less than total amount";
            }
          }
        }
      }
      return errorMessage;
    },

    contactnoValidation: function () {
      if (this.user.userName === "") {
        return "contact number is required!";
      }
      return null;
    },

    nameValidation: function () {
      if (this.user.firstName === "" && this.user.lastName === "") {
        return "name can not be empty!";
      }
      return null;
    },

    submitOrderButton: function () {
      let disable = true;
      if (
        this.orderItems.length > 0 &&
        this.orderTotalDiscountValidation === null &&
        this.orderCashReceivedValidation === null &&
        this.validateDeductBalance === null &&
        this.validateRegularCustomer === null &&
        this.submitOrderBtnDisable == false
      ) {
        disable = false;
      }
      return disable;
    },

    getFullName: function (): string {
      const cust: User = this.regularCustomer as User;
      const firstname: string =
        cust.first_name !== undefined ? cust.first_name : "";
      const lastname: string =
        cust.last_name !== undefined ? cust.last_name : "";
      const fullname: string = firstname + " " + lastname;

      return fullname;
    },

    showDeductBalance: function (): boolean {
      return false;
    },

    variantsflatList: function () {
      const variants: { ProductId: any; VariantId: any }[] = [];
      this.productResult.map((item: Product) => {
        if (item) {
          const listofvariants = item.product_variant as ProductVariant[];
          listofvariants.map((variant: ProductVariant) => {
            variants.push({ ProductId: item.id, VariantId: variant.id });
          });
        }
      });
      return variants;
    },

    ...mapGetters({
      productResult: "getProductResults",
      userdata: "getUser",
      orderStatus: "getOrderStatus",
      customers: "getListOfUsers",
      invoiceID: "getInvoiceID",
      field_errors: "getFieldError",
      authFieldErrors: "getAuthFieldError",
      order_response: "getOrder",
      inventory: "getInventory",
    }),
  },
  methods: {
    clearProduct: function () {
      this.productId = 0;
      this.productVariantId = 0;
      this.product.barCode = "";
      this.product.name = "";
      this.product.quantity = "";
      this.product.discount = "";
      this.product.batch = "";
      this.product.quantityUpperLimit = 0;
      const batches: Batch[] = [];
      this.productBatchSelect = batches;
      this.errorIndication = true;
      this.duplicateMessage = "";
      this.product.buyPrice = "";
      this.product.actualPrice = 0;
      (this.$refs.barcode as any)?.focus();
    },

    clearTransaction: function () {
      this.transactionId = "";
      this.paymentService = "BANK";
      this.user.userName = "";
      this.user.firstName = "";
      this.user.lastName = "";
      this.user.company = "";
      this.regularCustomer = {};
    },

    selectProduct: async function (productId: number, VariantId: number) {
      this.duplicateMessage = "";
      const currentProduct = await this.productResult.find(
        (item: Product) => item.id === productId
      );
      const currentVariant = await currentProduct.product_variant.find(
        (item: ProductVariant) => item.id === VariantId
      );
      if (this.sumQuantity(currentVariant) <= 0) return;

      // Check If the product is already in Order Items
      const duplicate = await this.orderItems.find(
        (item: OrderItem) =>
          item.product &&
          item.product === currentProduct &&
          item.productVariant &&
          item.productVariant === currentVariant
      );

      if (duplicate) {
        this.duplicateMessage =
          "The product is already added to the order items.";
        return;
      }

      this.duplicateMessage = "";
      this.productId = productId;
      this.productVariantId = VariantId;
      this.product.barCode = currentProduct.bar_code;
      this.product.name = currentProduct.name;
      this.product.actualPrice = parseFloat(currentVariant.sale_price);
      this.product.quantityUpperLimit = this.sumQuantity(currentVariant);
      this.productBatchSelect = currentVariant.batch
        .filter(
          (batch: Batch) =>
            batch.inventory_quantity && batch.inventory_quantity > 0
        )
        // eslint-disable-next-line
        .sort((x: any, y: any) => +new Date(x.created) - +new Date(y.created));
        this.productBatchSelect = this.productBatchSelect.sort((a, b) => a > b?1:-1);
      const batchId =
        this.filteredBatches.length > 0
          ? (this.filteredBatches[0] as Batch).id
          : undefined;
      this.product.batch = batchId !== undefined ? batchId.toString() : "";
      (
        this.$refs.quantity as HTMLSelectElement & { focus: () => void }
      ).focus();
    },

    selectCustomer: function (customer: User) {
      if (customer.credit === undefined) {
        customer.credit = 0;
      }

      this.regularCustomer = customer;
      this.showCustDropdown = false;
      // this.customersearch = customer.contact_number === undefined ? "" : customer.first_name  + "" + customer.last_name;
      this.customersearch = customer.contact_number === undefined ? "" :  customer.contact_number;
    },

    addNewCustomer: async function () {
      const companyId = this.userdata.company.id;

      const user_extra: UserExtra = {
        description: this.user.description,
      };

      const user: User = {
        username: this.user.userName,
        contact_number: this.user.userName,
        first_name: this.user.firstName,
        last_name: this.user.lastName,
        company: companyId,
        user_extra: user_extra,
      };

      await this.registerUser(user);

      if (Object.keys(this.authFieldErrors).length === 0) {
        this.addCustModal = false;
        this.getUsersByType({ user_type: "REGULAR_CUSTOMER" });
      }
    },

    addOrderItem: async function () {
      this.errorIndication = false;
      let quantity = parseFloat(this.product.quantity);
      quantity = isNaN(quantity) ? 0 : quantity;
      let price = parseFloat(this.product.buyPrice);
      price = isNaN(price) ? 0 : price;

      if (this.product.name === "") return;
      if (this.product.barCode === "") return;
      if (this.product.quantity === "") return;
      if (this.product.batch === "") return;
      if (this.product.buyPrice === "") return;
      if (quantity > this.cummBatchQuantity) return;

      const discount = isNaN(parseFloat(this.product.discount))
        ? 0
        : parseFloat(this.product.discount);
      const batch = parseFloat(this.product.batch);

      if (
        (!this.productId || this.productId === 0) &&
        (!this.productVariantId || this.productVariantId === 0)
      ) {
        this.duplicateMessage =
          "Please select product from product results or add desired product to system";
        return;
      }

      this.duplicateMessage = "";
      const currentProduct = await this.productResult.find(
        (item: Product) => item.id === this.productId
      );
      const currentVariant = await currentProduct.product_variant.find(
        (item: ProductVariant) => item.id === this.productVariantId
      );

      price = currentVariant.sale_price;
      let totalPrice = price * quantity;
      if (this.product.discount && discount > 0 && discount < 100) {
        totalPrice = totalPrice * ((100 - discount) / 100);
      }

      const listOfBatches: {}[] = [];
      if (
        this.selectedBatchQuantity < quantity &&
        this.cummBatchQuantity >= quantity
      ) {
        let totalQuant = quantity;
        let i = 0;
        while (totalQuant > 0 && i < this.filteredBatches.length) {
          const b: Batch = this.filteredBatches[i++];
          const batchQuant = b.quantity ? parseFloat(b.quantity) : 0;
          const unproxiedBatchItem = {
            batchid: b.id ? b.id : 0,
            quantity: 0,
          };
          unproxiedBatchItem.quantity =
            batchQuant < totalQuant ? batchQuant : totalQuant;
          totalQuant -= unproxiedBatchItem.quantity;
          listOfBatches.push(unproxiedBatchItem);
        }
      } else {
        listOfBatches.push({
          batchid: this.product.batch,
          quantity: quantity,
        });
      }

      listOfBatches.map((unproxiedBatchItem: any) => {
        const SingleOrderItem: OrderItem = {
          batch: isNaN(batch)
            ? 0
            : currentVariant.batch
                .map((item: Batch) => {
                  return {
                    id: item.id,
                    quantity: item.quantity,
                  } as Batch;
                })
                .find(
                  (item: Batch) =>
                    item &&
                    item.id &&
                    item.id.toString() == unproxiedBatchItem.batchid
                ),
          product: currentProduct,
          productVariant: currentVariant,
          price: price.toString(),
          quantity: unproxiedBatchItem.quantity.toString(),
          discount: discount.toString(),
          totalPrice: parseFloat(
            (
              unproxiedBatchItem.quantity *
              price *
              ((100 - discount) / 100)
            ).toFixed(0)
          ),
        };
        if(!navigator.onLine){
          this.productName.push(this.product.name);
        }
        this.orderItems.push(SingleOrderItem);
      });

      this.clearProduct();
      (this.$refs.barcode as HTMLInputElement & { focus: () => void }).focus();
    },

    submitOrder: async function (print: boolean) {
      this.submitOrderBtnDisable = true;
      if (this.orderItems.length < 0) return;
      if (this.cashReceived === "") return;
      this.print = print;

      const unproxiedOrderItem = await this.orderItems.map(
        (singleOrderItem: OrderItem) => {
          return {
            batch:
              singleOrderItem.batch &&
              typeof singleOrderItem.batch !== "number" &&
              singleOrderItem.batch.id
                ? singleOrderItem.batch.id
                : 0,
            price: singleOrderItem.price?.toString(),
            discount: singleOrderItem.discount?.toString(),
            quantity: singleOrderItem.quantity?.toString(),
          } as OrderItem;
        }
      );

      const cash = parseFloat(this.cashReceived);
      const discount = parseFloat(this.totalDiscount);
      const buyer: User =
        this.paymentMethod === "credit"
          ? this.regularCustomer
          : this.walkinCustomer;
      this.customer = buyer;
      const singleOrder: Order = {
        order_item: unproxiedOrderItem,
        buyer: buyer && buyer.id ? buyer.id : this.userdata.id,
        seller: this.userdata.id,
        total_discount: isNaN(discount) ? "0" : discount.toString(),
        total: this.totalAmount.toString(),
        cash_payment:
          this.paymentMethod === "cash"
            ? true
            : this.creditPaymentMethod === "cash",
        amount_received: isNaN(cash) ? "0" : cash.toString(),
        amount_discount: this.discountMethod === "amount" ? true : false,
        payment_service:
          this.paymentMethod === "cash" ? "BANK" : this.paymentService,
        transaction_id: this.transactionId,
        invoice_id: this.invoiceID,
        deduct_balance: this.deduct_balance,
      };

      if (this.return_order) {
        singleOrder.status = "RETURNED";
      }

      if(!navigator.onLine){
        offlineStoreService.setsyncOrder(true);
        this.orderoffline = true;
      }
      await this.createOrder(singleOrder);
      this.submitOrderBtnDisable = false;
      await this.getUsersByType({ user_type: "REGULAR_CUSTOMER" });
    },

    changeQuantity: function (index: number) {
      const currentVariant = this.orderItems[index].productVariant;
      if (currentVariant !== undefined) {
        const currentOrderItemQuantity = this.orderItems[index].quantity;
        const currentOrderItemPrice = this.orderItems[index].price;
        const currentDiscount = this.orderItems[index].discount;
        const currentBatch = this.orderItems[index].batch;

        if (
          currentOrderItemQuantity !== undefined &&
          currentOrderItemPrice !== undefined &&
          currentBatch !== undefined &&
          typeof currentBatch !== "number"
        ) {
          const quantity = parseFloat(currentOrderItemQuantity);
          const price = parseFloat(currentOrderItemPrice);
          const discount = currentDiscount ? parseFloat(currentDiscount) : 0;
          const upperLimit = currentBatch.inventory_quantity
            ? currentBatch.inventory_quantity
            : 0;

          if (isNaN(price)) return;
          if (isNaN(quantity)) return;
          if (quantity > upperLimit) return;
          let total = quantity * price;
          if (!((isNaN(discount) && discount <= 0) || discount > 100)) {
            total = total * ((100 - discount) / 100);
          }
          this.orderItems[index].totalPrice = parseInt(total.toFixed(0));
        }
      }
    },

    changeDiscount: function (index: number) {
      const currentOrderItemDiscount = this.orderItems[index].discount;
      const currentOrderItemPrice = this.orderItems[index].price;
      const currentOrderItemQuantity = this.orderItems[index].quantity;
      if (
        currentOrderItemDiscount !== undefined &&
        currentOrderItemPrice !== undefined &&
        currentOrderItemQuantity !== undefined
      ) {
        const quantity = parseFloat(currentOrderItemQuantity);
        const price = parseFloat(currentOrderItemPrice);
        const discount = parseFloat(currentOrderItemDiscount);

        if ((isNaN(discount) && discount <= 0) || discount > 100) return;
        this.orderItems[index].totalPrice = parseInt(
          (price * quantity * ((100 - discount) / 100)).toFixed(4)
        );
      }
    },

    changePrice: function (index: number) {
      const currentOrderItemPrice = this.orderItems[index].price;
      const totalPrice = this.orderItems[index].totalPrice;
      if (totalPrice !== undefined && currentOrderItemPrice !== undefined) {
        const price = parseFloat(currentOrderItemPrice);

        if (isNaN(price)) return;
        if (totalPrice < 0) return;

        this.orderItems[index].quantity = (totalPrice / price)
          .toFixed(4)
          .toString();
        this.orderItems[index].discount = (0.0).toString();
      }
    },

    removeItem: function (index: number) {
      this.orderItems.splice(index, 1);
    },

    searchCustomer: function (event: Event) {
      if (event) event.preventDefault();

      this.getUsersByType({
        search: this.customersearch,
        user_type: "REGULAR_CUSTOMER",
      });
    },

    searchByName: async function (event: Event) {
      if (event) {
        event.preventDefault();
      }
      await this.searchProductByName(this.product.name);
    },

    checkkey: function (event: KeyboardEvent) {
      const variantslist = this.variantsflatList;
      if (event.key === "ArrowDown") {
        this.focusedTile++;
        if (variantslist.length <= this.focusedTile) {
          this.focusedTile = 0;
        }
        if (variantslist.length > 0) {
          const focused = variantslist[this.focusedTile];
          const refid = focused.ProductId + "_" + focused.VariantId;
          this.focusedID = refid;
          this.fixScrolling();
          (
            this.$refs[refid] as HTMLSelectElement & { focus: () => void }
          )?.focus();
        }
      } else if (event.key === "Enter") {
        if (this.focusedTile < variantslist.length) {
          const focused = variantslist[this.focusedTile];
          this.selectProduct(focused.ProductId, focused.VariantId);
        }
      } else if (event.key === "ArrowUp") {
        this.focusedTile--;
        if (0 > this.focusedTile) {
          this.focusedTile = 0;
        }
        if (variantslist.length > 0) {
          const focused = variantslist[this.focusedTile];
          const refid = focused.ProductId + "_" + focused.VariantId;
          this.focusedID = refid;
          this.fixScrolling();
          (
            this.$refs[refid] as HTMLSelectElement & { focus: () => void }
          )?.focus();
        }
      }
    },
    shiftfocusTo: function (event: KeyboardEvent, to: string, key = "Enter") {
      if (event.key === key) {
        (this.$refs[to] as HTMLSelectElement & { focus: () => void })?.focus();
      }
    },
    fixScrolling() {
      const liH = (this.$refs.options as HTMLElement).clientHeight;
      (this.$refs.scrollContainer as any).scrollTop = liH * this.focusedTile;
    },
    searchByBarcode: async function (event: Event) {
      await this.searchProductByBarcode(this.product.barCode);

      // if(this.productResult.length === 1){
      // const searchedProduct: Product = this.productResult[0];
      // if(searchedProduct.id && searchedProduct.product_variant && searchedProduct.product_variant.length>0 && searchedProduct.product_variant[0].id)
      //     await this.selectProduct(searchedProduct.id, searchedProduct.product_variant[0].id);
      // }
    },

    sumQuantity: function (item: ProductVariant): number {
      let sum = 0;
      if (item.batch !== undefined && typeof item.batch !== "number") {
        item.batch
          .filter(
            (batch: Batch) =>
              batch.inventory_quantity && batch.inventory_quantity > 0
          )
          .forEach((batch: Batch) => {
            if (batch.inventory_quantity !== undefined) {
              sum = sum + batch.inventory_quantity;
            }
          });
      }
      return sum;
    },

    handleOrderStatus: async function () {
      this.changeOrderStatus("");
      this.clearProduct();
      await this.searchProductByBarcode(""); //this statement will clear the search results from action
      this.orderItems = [];
      this.cashReceived = "";
      this.totalDiscount = "";
      this.paymentMethod = "cash";
      this.cancelModal = false;
      await this.fetchInvoiceID();
      if(!navigator.onLine){
        this.orderoffline = false;
      }
    },

    changeProductPrice: function () {
      let quantity = 0;
      if (this.product.actualPrice > 0 && this.product.buyPrice) {
        const price = parseFloat(this.product.buyPrice);

        if (!isNaN(price)) {
          quantity = price / this.product.actualPrice;
        }
      }
      this.product.quantity = quantity.toFixed(4).toString();
    },

    changeProductQuantity: function () {
      let buyPrice = 0;
      if (this.product.actualPrice > 0 && this.product.quantity) {
        const quantity = parseFloat(this.product.quantity);

        if (!isNaN(quantity)) {
          buyPrice = quantity * this.product.actualPrice;
        }
      }
      this.product.buyPrice = buyPrice.toFixed(4).toString();
    },

    trimQuantity: function (quan: string): string {
      return parseFloat(quan !== undefined ? quan : "0.0").toFixed(4);
    },

    async syncOrder() {
      const check = await offlineStoreService.getsyncOrder();
      if(check == true){
        offlineStoreService.Order();
        offlineStoreService.setsyncOrder(false);
      }
    },

    ...mapActions({
      searchProductByName: ActionTypes.SEARCH_PRODUCT_BY_NAME,
      searchProductByBarcode: ActionTypes.SEARCH_PRODUCT_BY_BARCODE,
      createOrder: ActionTypes.CREATE_ORDER,
      changeOrderStatus: ActionTypes.CHANGE_ORDER_STATUS,
      getUsers: AuthActionTypes.GET_USERS,
      getUsersByType: AuthActionTypes.GET_CUSTOMER_USERS,
      registerUser: AuthActionTypes.REGISTER_USER,
      fetchInvoiceID: ActionTypes.FETCH_INVOICE_ID,
      setFieldError: ActionTypes.SET_FIELD_ERROR,
      fetchOrder: ActionTypes.FETCH_ORDER,
      fetchInventory: ActionTypes.FETCH_INVENTORY,
    }),
  },
  async beforeMount() {
    this.syncOrder();
    await this.fetchInvoiceID();
    await this.getUsersByType({ user_type: "WALK_IN_CUSTOMER" });
    this.walkinCustomer = this.customers.find(
      (item: User) =>
        item.username &&
        item.username === `WALK_IN_CUSTOMER_${this.userdata.company.id}`
    );
    await this.getUsersByType({ user_type: "REGULAR_CUSTOMER" });
    await offlineStoreService.initialize();
  },
  async unmounted() {
    await this.setFieldError({});
  },
});
</script>

<style lang="scss" scoped>
//ab css
 .ab-flex{
   display:flex;
   justify-content: space-between;
   font-size: 12px;
 }
 //ab end css

.focuschange {
  outline: none !important;
  border-left: 5px solid red;
  box-shadow: 0 0 10px #719ece;
}
#order-page {
  display: grid;
  grid-template-columns: 2fr;
  gap: 0.1em 0.1em;
  // margin-left: 1rem;
}
/*.product-container {
    margin-top:20px;
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 0.1em 0.1em;
  }*/
.product-container {
  margin: 20px 8px 8px 0px;
  display: inline-block;
  grid-template-columns: 2fr;
}
.form-container {
  display: grid;
  grid-template-columns: 0.3fr 0.3fr 0.5fr;
  grid-gap: 1.2rem 0.4rem;
  grid-template-areas:
    "bc bc-i q q-i ap-e"
    "pn pn-i d d-i ap"
    "bt bt-i e e-i e-ap";
}
.form-container-3 {
  display: grid;
  grid-template-columns: 0.4fr 1fr 0.4 1fr;
  grid-template-areas:
    "bs bs-i"
    "bc bc-i"
    "pn pn-i"
    "d d-i"
    "q q-i";
}

.form-container-4 {
  display: grid;
  grid-template-columns: 0.4fr 1fr 0.4fr 1fr;
  grid-template-areas: "bt bt-i e e-i";
}
.form-container-5 {
  display: grid;
  grid-template-columns: 0.5fr 1fr 0.5fr 0.3fr 0.5fr 1fr;
  grid-template-areas: "bt bt-i e e-i pn pn-i";
  // grid-template-columns: 0.6fr;
  // grid-template-areas: 
  //   "bt bt-i bt-i bt-i"
  //   "e e-i pn pn-i";
}
.bc {
  grid-area: bc;
}
.bc-i {
  grid-area: bc-i;
  display: inline-block;
}
.q {
  grid-area: q;
}
.q-i {
  grid-area: q-i;
  display: inline-block;
}
.pn {
  grid-area: pn;
}
.pn-i {
  grid-area: pn-i;
  display: inline-block;
}
.d {
  grid-area: d;
}
.d-i {
  grid-area: d-i;
  display: inline-block;
}
.ap-e {
  display: flex;
}
.ap {
  display: inline-block;
}
.bt {
  grid-area: bt;
}
.bt-i {
  grid-area: bt-i;
}
.e-ap {
  grid-area: e-ap;
}
.e {
  grid-area: e;
}
.e-i {
  grid-area: e-i;
}

.payment-method-container {
  // display: inline;
  // margin-left:78px;
  margin: auto;
  width: 50%;
  margin-bottom: 9px;
}

.pad-label {
  padding: 15px 5px 15px 0px;
}
.pd-t {
  padding: 22px 0px 0px 0px;
  font-size: 11px;
  font-family: seg;
  color: #0f2636;
  width: 4vw;
}
.pd-t-3 {
  padding: 15px 0px 0px 0px;
  font-size: 11px;
  font-family: seg;
  color: #0f2636;
}
.pd-t-ex {
  padding: 0px 0px 0px 5px;
  font-size: 11px;
  font-family: seg;
  color: #0f2636;
}

.box2 {
  display: block;
}
.split-container:hover {
  border: 2px solid #e43d2a;
}

.split-container:active {
  border: 2px solid #e43d2a;
}
.product-container:hover {
  border: 2px solid #e43d2a;
}

.product-container:active {
  border: 2px solid #e43d2a;
}
.table-container {
  display: grid;
  grid-template-columns: 1.2fr 5fr;
  gap: 0.1em 0.1em;
  font-family: seg;
  margin-top: 5px;
}
.table-container-left {
  display: grid;
  grid-template-columns: 1.2fr 5fr;
  gap: 0.1em 0.1em;
  font-family: seg;
  margin-top: 0;
  background-color: #e43d2a;
  border-radius: 5px;
  color: white;
  font-size: 12px;
  padding: 4px;
}

.labl-txt {
  text-align: left;
  margin-top: 0px;
  margin-right: 25px;
  font-size: 20px;
}

.box1,
.box2 {
  margin: 0 !important;
  padding: 0 !important;
}
.box-inner-right {
  float: right;
  padding: 20px 20px 0px 20px;
}

.btn-mr {
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
  grid-template-columns: 3fr;
}

.pr-s-r-table {
  border: none;
  display: inline-block;
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
  padding-top: 0px !important;
  text-align: center;
  font-size: 10px;
}

.mr-all {
  margin: 2px 0px 13px 0px;
}

.mr-l {
  margin-left: 10px;
}

li > div.shadow-box{
  padding: 0 4px;
  border: 2px solid transparent;
}
li > div:hover {
  border: 2px solid $primary-color;
}
div.ab-flex > p:last-child{
  margin-left: 3px;
}

.order_item_input {
  margin: 0 !important;
  padding: 0 !important;
}

option.batches-op {
  font-weight: 600;
}

.search-result-upper {
  position: absolute;
  width: 40%;
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
.split-container {
  display: inline-block;
  grid-template-columns: 2fr 1fr;
  margin: 20px 10px;
}
.td-head {
  font-family: seg;
  font-size: 12px;
  padding-top: 5px;
  color: #e43d2a;
}
.td-cont {
  color: #0f2634;
  font-size: 11px;
  font-family: seg;
  font-weight: normal;
  padding-left: 2px;
}
.td-cont-rad {
  color: #0f2634;
  font-size: 11px;
  font-family: seg;
  font-weight: normal;
  padding-left: 2px;
  margin-left: 20px;
}

float-right {
  float: right;
}
.text-box {
  border-radius: 6px;
  font-family: seg;
  font-size: 11px;
  width: 6.375vw;
  height: 30px;
  margin-top: 15px;
  padding: 0px 0px 0px 5px;
}
.text-box-med {
  border-radius: 6px;
  font-family: seg;
  font-size: 11px;
  width: 8vw;
  height: 30px;
  padding: 0px 0px 0px 5px;
  margin-left:5px;
}
.text-box-long {
  border-radius: 6px;
  font-family: seg;
  font-size: 11px;
  width: 6.375vw;
  height: 30px;
  margin-top: 15px;
  padding: 0px 0px 0px 5px;
}
.text-box-full {
  border-radius: 6px;
  font-family: seg;
  font-size: 11px;
  width: 8vw;
  height: 30px;
  margin-top: 15px;
  padding: 0px 0px 0px 5px;
  margin-bottom: 0px !important;
  margin-left:5px;
}

.text-box-sm {
  border-radius: 6px;
  font-family: seg;
  font-size: 11px;
  width: 56px;
  height: 30px;
  margin-top: 15px;
  padding: 0px 0px 0px 5px;
  display: inline-block;
  margin-left:5px;
}
.select-box {
  border-radius: 6px;
  font-family: seg;
  font-size: 11px;
  width: 56px;
  height: 30px;
  margin-top: 15px;
  margin-left:5px;
  padding: 0px 0px 0px 5px;
  display: inline-block;
}
.select-box-full {
  border-radius: 6px;
  font-family: seg;
  font-size: 11px;
  width: 100%;
  height: 30px;
  margin-top: 15px;
  padding: 0px 0px 0px 5px;
  display: inline-block;
}
.select-box-ex {
  border-radius: 6px;
  font-family: seg;
  font-size: 11px;
  width: 48px;
  height: 30px;
  margin: 8px 0px 0px 5px;
  padding: 0px 0px 0px 5px;
  display: inline-block;
}
.custom-select:active {
  border: 3px solid #e43d2a;
}

.custom-select:hover {
  border: 3px solid #e43d2a;
}
.mr-l {
  margin-left: 10px !important;
}
.mr-l8 {
  width: 71%;
  margin: auto;
}
.mr-l50 {
  margin-left: 50% !important;
}

.col-2 {
  -webkit-box-flex: 0;
  flex: 0 0 23% !important;
  max-width: 23% !important;
}
.col-3 {
  -webkit-box-flex: 0;
  flex: 0 0 27% !important;
  max-width: 27% !important;
}
.col-6 {
  -webkit-box-flex: 0;
  flex: 0 0 47%;
  max-width: 47%;
}
.btn-blue {
  display: inline-block;
  background-color: #0f2636;
  font-family: seg;
  font-size: 12px;
  margin: 0px 70px 2px 8px;
  padding: 4px 2px 4px 2px;
  border-radius: 20px;
  width: 135px;
  padding: 5px;
  cursor: pointer;
  color: $white-color;
  border: none;
  font-weight: bold;
}
.btn-blue-3 {
  background-color: #0f2636;
  font-family: seg;
  font-size: 12px;
  margin: 0px 0px 2px 0px;
  padding: 4px 2px 4px 2px;
  border-radius: 20px;
  width: 135px;
  padding: 5px;
  cursor: pointer;
  color: $white-color;
  border: none;
  font-weight: bold;
}
.horizontal {
  left: 50%;
}
.block {
  display: block;
}
.inline{
  display:inline;
}
.btn-red {
  background-color: #e43d2a;
  font-family: seg;
  font-size: 12px;
  margin: 0px 8px 2px 0px;
  border-radius: 20px;
  width: 135px;
  cursor: pointer;
  color: $white-color;
  border: none;
  padding: 5px;
  font-weight: bold;
}
.btn-red:focus {
  outline: none;
}
btn-blue:focus {
  outline: none;
}
td {
  font-family: seg;
  font-size: 10px;
  text-align: center;
}
.checkmark1 {
  position: absolute;
  top: 151px;
  left: 65px;
  height: 7px;
  width: 7px;
  background-color: #e43d2a;
  border-radius: 50%;
}
.search-bar {
  font-size: 11px;
  font-family: seg;
  border-radius: 20px;
  padding: 7px 0px 7px 30px;
}
.form-error-msg {
  font-size: 9px;
  font-family: seg;
  padding: 0 !important;
  margin: 0px 0px 0px 5px !important;
}
.custom-radio .checkmark::after{
  top:4px !important;
  left:4px !important;
  width:7px !important;
  height:7px !important;
}

.row{
  margin-left: 0vw !important;
  width: 100% !important;
}
.col-2{
    -webkit-box-flex: 0;
    flex: 0 0 21% !important;
    max-width: 21% !important;
}
.col-3{
  -webkit-box-flex: 0;
      flex: 0 0 25% !important;
    max-width: 25% !important;
    margin-left: 23px !important;
}
.col-6{
  -webkit-box-flex: 0;
  flex: 0 0 47%;
  max-width: 47%;
}
.box1Responsive{
  display: flex;
}
.header {
  border-radius: 5px;
  background-color: #0f2634; 
  color: white;
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
.orderTable{
  width: 100%;
  float:right;
  border-collapse:collapse;
}
.orderTable th {
  background-color:#0f2636;
  color:white;
  font-size:12px;
  text-align: center;
  border: none !important;
  border-right: 1px solid !important;
}
@media screen and (max-width:1200px ){
  .col-3{
    max-width: 35% !important;
  }
  .col-2{
    max-width: 25% !important;
    flex: 0 0 25% !important;
  }
  .col-6{
    max-width: 56% !important;
    flex: 0 0 56% !important;
  }
  .split-container {
    margin-left: 2vw;
}
  .mr-l8 {
    width: 74%;
    margin: auto;
}
.form-container {
  grid-gap: 1.2rem 1.8rem;
}

.payment-method-container {
  width: 60%;
}
}
@media screen and (max-width:1029px ){
  .col-3{
    max-width: 35% !important;
  }
  .container-fluid{
    gap: 0rem 0rem !important;
  }
}
@media screen  and (max-width: 1416px){
  .form-container-5{
    grid-template-columns: 0.6fr;
    grid-template-areas: 
    "bt bt-i bt-i bt-i"
    "e e-i pn pn-i";
  }
  .text-box-sm{
    width: 8vw;
  }
}


</style>
