<template>
  <div id="zero-order">
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
              autocomplete="off"
              v-model="product.barCode"
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
              ref="quantity"
              v-model="product.quantity"
              @input="changeProductQuantity"
              @keydown="shiftfocusTo($event, 'expirydate')"
            />
            <br/>
            <span v-if="productQuantityValidation" class="form-error">{{
              productQuantityValidation
            }}</span>
          </div>

          <label class="pn pad-label" for="productname">
            <strong>Product Name:</strong>
          </label>
          <div class="pn-i">
            <input
              class="text-box"
              type="text"
              tabindex="2"
              placeholder="Product Name"
              name="productname"
              :maxlength="ProductNameMaxLength"
              v-model="product.name"
              @input="searchByName"
              @keydown="checkkey"
              autocomplete="off"
            />
            <br/>
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
            <!-- <span v-if="productDiscountValidation" class="form-error">{{ productDiscountValidation }}</span> -->
          </div>

          <template v-if="orderType === 'from'">
            <label class="bt pad-label" for="barcode">
              <strong>Manufactured Date:</strong>
            </label>
            <div class="bt-i">
              <input
                class="text-box"
                tabindex="3"
                type="date"
                v-model="product.manufacturedDate"
              />
              <br/>
              <span v-if="productManufacturedValidation" class="form-error">{{
                productManufacturedValidation
              }}</span>
            </div>

            <label class="e pd-t" for="discount">
              <strong>Expiry Date:</strong>
            </label>
            <div class="e-i">
              <input
                class="text-box"
                tabindex="6"
                type="date"
                v-model="product.expiryDate"
                ref="expirydate"
                @keydown="shiftfocusTo($event, 'addproduct')"
              />
              <br/>
              <span v-if="productExpiryValidation" class="form-error">{{
                productExpiryValidation
              }}</span>
            </div>
          </template>

          <template v-if="orderType === 'to'">
            <label class="bt pd-t" for="barcode">
              <strong>Batches:</strong>
            </label>
            <div class="bt-i">
              <select
                tabindex="3"
                name="productBatch"
                placeholder="Batches:"
                class="custom-select text-box-long"
                v-model="product.batch"
                ref="batches"
              >
                <option
                  v-for="batch in productBatchSelect"
                  v-bind:key="batch.id"
                  v-bind:value="batch.id"
                >
                  #{{ batch.id }} Exp: {{ batch.expiry_date }} Quan:
                  {{ batch.inventory_quantity }}
                </option>
              </select>
              <br/>
              <span v-if="productBatchValidation" class="form-error">{{
                productBatchValidation
              }}</span>
            </div>

            <label class="e pd-t" for="discount">
              <strong>Discount (%):</strong>
            </label>
            <div class="e-i">
              <input
                class="text-box"
                type="number"
                tabindex="6"
                placeholder="Discount"
                name="discount"
                v-model="product.discount"
              />
              <span v-if="productDiscountValidation" class="form-error">{{
                productDiscountValidation
              }}</span>
            </div>
          </template>
        </div>
      </div>

      <div id="orderTypes" class="mr-2">
        <label class="custom-radio"
          >From Vendor or Department
          <input
            type="radio"
            name="order_type"
            value="from"
            :disabled="orderTypeValidation"
            v-model="orderType"
            @change="orderTypeChange"
          />
          <span class="checkmark"></span>
        </label>
        <label
          class="custom-radio float-right"
          >To Department
          <input
            type="radio"
            name="order_type"
            value="to"
            :disabled="orderTypeValidation"
            v-model="orderType"
            @change="orderTypeChange"
          />
          <span class="checkmark"></span>
        </label>
      </div>
      <div>
        <div class="mr-1">
          <input
            class="q-i"
            type="checkbox"
            id="return_order"
            name="return_order"
            v-bind:checked="return_order"
          />
          <span><label class="pd-t-ex"><strong>Return Order</strong></label></span>
        </div>
        <span v-if="validateReturnOrder" class="form-error">{{
          validateReturnOrder
        }}</span>
      </div>
        <div class="ap-e mr-2 d-flex">
          <button class="btn-blue ap" @click="clearProduct">
            Clear Product
          </button>
          <button
            class="btn-red float-right ap"
            tabindex="7"
            @click="addOrderItem"
            :disabled="addProductButton"
            ref="addproduct"
          >
            Add Product
          </button>
        </div>
      
    </div>

    <div class="diff-shadow split-container col-6">
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
                     <p><b>Price</b></p>
                     <p><b>{{ itemVariant.price }}</b></p>
                   </div>
                   <div class="ab-flex">
                     <p><b>Size:</b></p>
                     <p><b>{{ itemVariant.size }}</b></p>
                   </div>
                 </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="box1-tab">
          <table style="" class="orderTable">
            <colgroup>
              <col span="1" style="width: 1%" />
              <col span="1" style="width: 1%" />
              <col span="1" style="width: 10%" />
              <col span="1" style="width: 5%" />
              <col span="1" style="width: 1%" />
              <col span="1" style="width: 1%" />
              <col span="1" style="width: 7%" />
              <col span="1" style="width: 7%" />
              <col span="1" style="width: 1%" />
              <col span="1" style="width: 5%" />
              <col span="1" style="width: 1%" />
            </colgroup>

            <tr>
              <th style=" border-radius:8px 0px 0px 8px">Sr No.</th>
              <th>Barcode</th>
              <th>Name</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Disc</th>
              <th>Manu Date</th>
              <th>Expiry Date</th>
              <th>Batch Qty</th>
              <th style="border-radius:0px 8px 8px 0px; border:none !important">Total Price</th>
            </tr>
            <tr
              v-for="(orderItem, index) in orderItems"
              v-bind:key="orderItem.product.bar_code"
            >
              <td>{{ index + 1 }}</td>
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
              <td>{{ trimNumber(orderItem.price) }}</td>
              <td>
                <input
                  class="order_item_input"
                  type="number"
                  placeholder="discount"
                  v-model="orderItem.discount"
                  @input="changeDiscount(index)"
                />
              </td>
              <td>{{ orderItem.batch.manufacturing_date }}</td>
              <td>{{ orderItem.batch.expiry_date }}</td>
              <td>{{ orderItem.batch.inventory_quantity }}</td>
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

    <div class="diff-shadow split-container col-2">
      <div id="container-zero-order">
        <div id="box1">
          <div class="box1Responsive">  
            <label class="pad-label bc mt-1" for="sellerID">
            <strong>Seller:</strong>
            </label>
            <div class="bc-i">
            <input
            class="text-box-long"
              v-if="orderType === 'to'"
              type="text"
              name="sellerID"
              :value="userdata.username"
              readonly
            />
            
            <select
              v-else
              name="sellerID"
              class="text-box-long custom-select"
              id="sellerID"
              v-model="seller"
              @change="sellerVendorCheck"
            >
              <option disabled value="0">Select a seller</option>
              <option
                v-for="user in users"
                v-bind:key="user.id"
                v-bind:value="user.id"
              >
                <span v-if="user.first_name && user.last_name"
                  >{{ user.first_name }} {{ user.last_name }}</span
                >
                <span v-else>{{ user.username }}</span>
                <span v-if="user.company && user.company.company_name"
                  >- {{ user.company.company_name }}</span
                >
              </option>
              <option disabled>----VENDORS----</option>
              <option
                v-for="vendor in vendors"
                v-bind:key="vendor.id"
                v-bind:value="vendor.id"
              >
                <span v-if="vendor.first_name && vendor.last_name"
                  >{{ vendor.first_name }} {{ vendor.last_name }}</span
                >
                <span v-else>{{ vendor.username }}</span>
                <span v-if="vendor.company && vendor.company.company_name"
                  >- {{ vendor.company.company_name }}</span
                >
              </option>
            </select>
            <br/>
            <span v-if="sellerValidation" class="form-error">{{sellerValidation}}</span>
            </div>
          </div>

          <div class="box1Responsive">
          <label class="pad-label q  mt-1" for="BuyerID">
            <strong>Buyer:</strong>
          </label>
          <div class="q-i">
            <input
            class="text-box-long"
              v-if="orderType === 'from'"
              type="text"
              name="BuyerID"
              :value="userdata.username"
              readonly
            />
            <select
            
              v-else
              name="BuyerID"
              class="custom-select text-box-long"
              id="BuyerID"
              v-model="buyer"
            >
              <option disabled value="0">Select a buyer</option>
              <option
                v-for="user in users"
                v-bind:key="user.id"
                v-bind:value="user.id"
              >
                <span v-if="user.first_name && user.last_name"
                  >{{ user.first_name }} {{ user.last_name }}</span
                >
                <span v-else>{{ user.username }}</span>
                <span v-if="user.company && user.company.company_name"
                  >- {{ user.company.company_name }}</span
                >
              </option>
            </select>
            <br/>
            <span v-if="buyerValidation" class="form-error">{{buyerValidation}}</span>
          </div>
          </div>

          <div style="display:inline-block">
          <label class="pad-label-ex pn" for="totalAmount">
            <strong>Total Amount:</strong>
          </label>

          <div class="pn-i">
            <input
              class="text-box-sm"
              name="totalAmount"
              type="text"
              placeholder="Companies balance"
              v-bind:value="totalAmount"
              readonly
            />
          </div>
          </div>
          
          <div>
          <label class="pad-label d" for="total_discount">
            <strong>Total Discount:</strong>
          </label>
          <div class="d-i">
            <div class="flex-box">
              <input
                class="text-box-sm"
                type="number"
                placeholder="Discount"
                name="total_discount"
                v-model="totalDiscount"
              />
            </div>
            <span v-if="orderTotalDiscountValidation" class="form-error">{{
              orderTotalDiscountValidation
            }}</span>
          </div>
          </div>
          
          <div>
            <label class="pad-label d" for="total_discount">
            <strong>Amount/Per(%):</strong>
            </label>
            <select
                
                name="discountMethod"
                v-model="discountMethod"
                class="text-box-med"
              >
                <option value="amount">Amount</option>
                <option value="percentage">Perc (%)</option>
              </select>
          </div>

          <template v-if="vendorUser && vendorUser.user_type === 'VENDOR'">
            <label class="pad-label w100 bt" for="balance">
              <strong>Company Balance:</strong>
            </label>

            <div class="bt-i">
              <input
              class="text-box"
                name="balance"
                type="text"
                placeholder="Companies balance"
                v-bind:value="vendorUser.company.credit"
                :style="[
                  vendorUser.company.credit > 0
                    ? { color: 'green' }
                    : { color: 'red' },
                ]"
                readonly
              />
            </div>

            <label class="pad-label w100 mr-l e" for="products">
              <strong>Cash Given:</strong>
            </label>

            <div class="e-i">
              <input
              class="text-box"
                type="number"
                placeholder="Cash given to vendor"
                v-model="cashReceived"
              />
              <span v-if="orderCashReceivedValidation" class="form-error">{{
                orderCashReceivedValidation
              }}</span>
            </div>
          </template>
        </div>

        
      </div>
      <div id="box2" class="mr-2">
          <button
            class="btn-red mr-l2"
            @click="submitOrder"
          >
            Submit and Print
          </button>
          <button class="btn-red mr-l2" @click="openAddVendorModal">
            Add New Vendor
          </button>
          <button class="btn-blue-3" @click="cancelModal = true">
            Cancel Order
          </button>
        </div>
    </div>
    </div>

    <Modal v-if="addVendorModal">
      <template v-slot:header>
        <h2>Add New Vendor</h2>
      </template>

      <template v-slot:body>
        <div class="flex-box">
          <div class="width-label">
            <label class="pad-label w100 " for="firstname" >
              <strong>First Name:</strong>
            </label>
          </div>
          <div>
            <input
              name="firstname"
              type="text"
              placeholder="Enter first name"
              v-model="vendor.firstName"
            />
          </div>
        </div>
        <div class="flex-box">
        <div class="width-label">
          <label class="pad-label w100" for="lastname">
            <strong>Last Name:</strong>
          </label>
        </div>
          <div>
            <input
              name="lastname"
              type="text"
              placeholder="Enter last name"
              v-model="vendor.lastName"
            />
          </div>
        </div>
        <div class="flex-box">
          <div class="width-label p-contact">
            <label class="pad-label w100" for="contact_number">
              <strong>Contact Number:</strong>
            </label>
          </div>
          <div style="width: 14.7rem;">
            <input
              name="contact_number"
              type="text"
              placeholder="Enter contact"
              v-model="vendor.contact"
            />
            <span v-if="contactNumberValidation" class="form-error ">{{
              contactNumberValidation
            }}</span>
          </div>
        </div>
        <div class="flex-box">
          <div class="width-label">
            <label class="pad-label w100"  for="companies">
              <strong>Company:</strong>
            </label>
          </div>
          <div style="width: 14.7rem;">
            <select
              name="companies"
              class="custom-select"
              id="companies"
              v-model="vendor.company"
            >
              <option
                v-for="company in companies"
                v-bind:key="company.id"
                v-bind:value="company.id"
              >
                {{ company.company_name }}
              </option>
            </select>
            <span v-if="companyValidation" class="form-error">{{
              companyValidation
            }}</span>
          </div>
        </div>
      </template>

      <template v-slot:footer>
        <div class="flex-box">
         <button class="btn btn-red btn-mr" @click="addVendor">Add</button>
          <button class="btn btn-blue btn-mr" @click="addVendorModal = false">
            Cancel
          </button>
        </div>
      </template>
    </Modal>

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
          <button class="btn btn-orange btn-mr" @click="handleOrderStatus">
            Yes
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
        <OrderBill :orderId="order_response.id" :customer="customer" :user="userdata" />
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
        <OfflineOrderBill :product_name="productName" :user="userdata" />
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
    <p class="coaldev-name ">Created by CoalDev</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import OrderBill from "@/components/sales/OrderBill.vue";
import Modal from "@/components/common-components/Modal.vue";
import { ActionTypes as AuthActionTypes } from "@/store/modules/auth/actions";
import { ActionTypes as OrderActionTypes } from "@/store/modules/order/actions";
import { Order } from "@/store/models/order";
import { Batch } from "@/store/models/batch";
import { User } from "@/store/models/user";
import { OrderItem } from "@/store/models/orderItem";
import { Product, ProductVariant } from "@/store/models/product";
import offlineStoreService from "@/utils/offline-store/index";
import OfflineOrderBill from "../sales/OfflineOrderBill.vue";

export default defineComponent({
  name: "ZeroOrder",
  components: {
    Modal,
    OrderBill,
    OfflineOrderBill,
  },
  data() {
    const today = new Date().toDateString();
    const orderItems: OrderItem[] = [];
    const batches: Batch[] = [];
    const vendor: User = {};
    const productName: string[] = [];

    return {
      orderoffline: false,
      submitOrderBtnDisable: false,
      focusedTile: -1,
      focusedID: "",
      cancelModal: false,
      product: {
        name: "",
        barCode: "",
        quantity: "",
        batch: "",
        quantityUpperLimit: 0,
        discount: "",
        buyPrice: "",
        actualPrice: 0,
        manufacturedDate: new Date().toISOString().slice(0, 10),
        expiryDate: "",
      },
      date: today,
      orderItems: orderItems,
      productId: 0,
      productVariantId: 0,
      productBatchSelect: batches,
      cashReceived: "",
      totalDiscount: "",
      orderType: "from",
      errorIndication: true,
      BarCodeMaxLength: 48,
      ProductNameMaxLength: 60,
      duplicateMessage: "",
      creditPaymentMethod: "cash",
      discountMethod: "amount",

      addVendorModal: false,
      seller: 0,
      buyer: 0,
      vendorUser: vendor,

      vendor: {
        firstName: "",
        lastName: "",
        contact: "",
        company: 0,
      },
      showErrorSeller: false,
      showErrorBuyer: false,
      showErrorVenCont: false,
      showErrorVenComp: false,
      productName: productName,
      return_order: false,
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
          } else if (
            this.orderType === "to" &&
            value > this.selectedBatchQuantity
          ) {
            errorMessage = "Stock in this batch is less than quantity.";
          }
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

    productManufacturedValidation: function () {
      let errorMessage = null;
      if (!this.errorIndication) {
        // CheckIF product exist on the backend
        if (this.product.manufacturedDate === undefined) {
          errorMessage = "Manufactured date is required";
        }
      }
      return errorMessage;
    },

    productExpiryValidation: function () {
      let errorMessage = null;
      if (!this.errorIndication) {
        // CheckIF product exist on the backend
        if (
          this.product.expiryDate === undefined ||
          this.product.expiryDate === ""
        ) {
          errorMessage = "Expiry date is required";
        }
      }
      return errorMessage;
    },

    addProductButton: function (): boolean {
      let disable = true;
      if (
        this.productNameValidation === null &&
        this.productBarCodeValidation === null &&
        this.productQuantityValidation === null &&
        this.validateReturnOrder === null
      ) {
        disable = false;
      }
      return disable;
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
      if (this.return_order && this.cashReceived !== undefined && this.cashReceived !== "") {
        const value = parseFloat(this.cashReceived);
        if (isNaN(value)) {
          errorMessage = "Only numbers are allowed";
        }
      }
      return errorMessage;
    },

    submitOrderButton: function () {
      let disable = true;
      if (
        this.orderItems.length > 0 &&
        this.orderTotalDiscountValidation === null &&
        this.orderCashReceivedValidation === null &&
        this.submitOrderBtnDisable === false && 
        this.sellerValidation === null && this.buyerValidation === null
      ) {
        disable = false;
      }
      return disable;
    },

    selectedBatchQuantity: function (): number {
      let selectedBatchQuantity = 0.0;
      if (this.orderType === "to") {
        const batchID = parseInt(this.product.batch);
        if (
          !isNaN(batchID) &&
          batchID > 0 &&
          this.productBatchSelect.length > 0
        ) {
          const selectedBatch = this.productBatchSelect.find(
            (item: Batch) => item.id === batchID
          );
          selectedBatchQuantity =
            selectedBatch && selectedBatch.inventory_quantity
              ? selectedBatch.inventory_quantity
              : 0;
        }
      }
      return selectedBatchQuantity;
    },

    orderTypeValidation: function () {
      let disable = false;
      if (this.orderItems.length > 0) {
        disable = true;
      }
      return disable;
    },

    contactNumberValidation: function () {
      let errorMessage = null;
      if (this.vendor.contact.length <= 0 && this.showErrorVenCont===true) {
        errorMessage = "Number is required";
      }
      return errorMessage;
    },

    companyValidation: function () {
      let errorMessage = null;
      if (this.companies.length <= 0 && this.showErrorVenComp===true) {
        errorMessage = "Comapny is required. Add vendor comapany to system";
      }
      return errorMessage;
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
    sellerValidation: function () {
      let errorMessage = null;
      if (this.orderType === "from" && this.seller === 0 && this.showErrorSeller === true) {
          errorMessage = "Seller is required";
        }
      return errorMessage;
    },
    buyerValidation: function () {
      let errorMessage = null;
      if (this.orderType === "to" && this.buyer === 0 && this.showErrorBuyer === true) {
          errorMessage = "Buyer is required";
        }
      return errorMessage;
    },
    validateReturnOrder: function () {
      let error_message = null;
      if (this.return_order && parseFloat(this.product.quantity) >= 0) {
        error_message = "quantity should be in negative for return order!";
      }

      return error_message;
    },
    ...mapGetters({
      productResult: "getProductResults",
      userdata: "getUser",
      orderStatus: "getOrderStatus",
      users: "getListOfUsers",
      vendors: "getListOfVendors",
      newBatch: "getBatch",
      companies: "getCompanies",
      invoiceID: "getInvoiceID",
      order_response: "getOrder",
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
      this.product.manufacturedDate = new Date().toISOString().slice(0, 10);
    },

    trimNumber: function (value: string): string {
      return parseFloat(value !== undefined ? value : "0.0").toFixed(2);
    },

    orderTypeChange: function () {
      if (this.orderType === "to") {
        this.buyer = 0;
        this.seller = this.userdata.id;
      } else if (this.orderType === "from") {
        this.seller = 0;
        this.buyer = this.userdata.id;
      }
    },

    selectProduct: async function (productId: number, VariantId: number) {
      this.duplicateMessage = "";
      const currentProduct = await this.productResult.find(
        (item: Product) => item.id === productId
      );
      const currentVariant = await currentProduct.product_variant.find(
        (item: ProductVariant) => item.id === VariantId
      );

      // Check If the product is already in Order Items
      const duplicate = await this.orderItems.find(
        (item: OrderItem) => item.product && item.product === currentProduct
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
      this.product.actualPrice = parseFloat(currentVariant.price);
      this.productBatchSelect = currentVariant.batch
        .filter(
          (batch: Batch) =>
            batch.inventory_quantity && batch.inventory_quantity > 0
        )
        // eslint-disable-next-line
        .sort((x: any, y: any) => +new Date(x.created) - +new Date(y.created));
        this.productBatchSelect = this.productBatchSelect.sort((a, b) => a > b?1:-1);
      const batch =
        this.productBatchSelect.length > 0
          ? (this.productBatchSelect[0] as Batch).id
          : undefined;
      this.product.batch = batch !== undefined ? batch.toString() : "";
      if (this.orderType == "to") {
        (
          this.$refs.batches as HTMLSelectElement & { focus: () => void }
        ).focus();
      } else {
        (
          this.$refs.quantity as HTMLSelectElement & { focus: () => void }
        ).focus();
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
      if (this.product.buyPrice === "") return;
      if (this.orderType === "to" && this.product.batch === "") return;
      if (this.orderType === "to" && quantity > this.selectedBatchQuantity)
        return;
      if (
        this.orderType === "from" &&
        this.product.manufacturedDate === undefined
      )
        return;
      if (this.orderType === "from" && this.product.expiryDate === "") return;

      const discount = isNaN(parseFloat(this.product.discount))
        ? 0
        : parseFloat(this.product.discount);

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

      price = currentVariant.price;
      let totalPrice = price * quantity;
      if (this.product.discount && discount > 0 && discount < 100) {
        totalPrice = totalPrice * ((100 - discount) / 100);
      }

      let batch;
      if (this.orderType === "to") {
        batch = currentVariant.batch
          .map((item: Batch) => {
            return {
              id: item.id,
              manufacturing_date: item.manufacturing_date,
              expiry_date: item.expiry_date,
              quantity: item.quantity,
              in_stock: item.in_stock,
              product_variant: item.product_variant,
              created: item.created,
              last_modified: item.last_modified,
            } as Batch;
          })
          .find(
            (item: Batch) =>
              item && item.id && item.id.toString() == this.product.batch
          );
      } else {
        batch = {
          manufacturing_date: this.product.manufacturedDate.toString(),
          expiry_date: this.product.expiryDate,
          quantity: this.product.quantity,
          product_variant: this.productVariantId,
        } as Batch;
      }
      const SingleOrderItem: OrderItem = {
        batch: batch,
        product: currentProduct,
        productVariant: currentVariant,
        price: price.toString(),
        quantity: quantity.toString(),
        discount: discount.toString(),
        totalPrice,
      };
      if(!navigator.onLine){
        this.productName.push(this.product.name);
      }
      this.orderItems.push(SingleOrderItem);
      this.clearProduct();
      (this.$refs.barcode as HTMLInputElement & { focus: () => void }).focus();
    },

    submitOrder: async function () {
      this.submitOrderBtnDisable = true;
      this.showErrorSeller = true;
      if(this.orderType === "from"){
        this.showErrorSeller = true;
      }else{
        this.showErrorBuyer = true;
      }
      
      if (this.orderItems.length < 0) return;
      if (this.buyer === 0 || this.seller === 0) return;

      const unproxiedOrderItems = await this.orderItems.map(
        (singleOrderItem: OrderItem) => {
          const unproxiedOrderItem = {
            batch: singleOrderItem.batch,
            price: singleOrderItem.price?.toString(),
            discount: singleOrderItem.discount?.toString(),
            quantity: singleOrderItem.quantity?.toString(),
          } as OrderItem;
          return unproxiedOrderItem;
        }
      );

      if(navigator.onLine){
        for (const singleOrderItem of unproxiedOrderItems) {
        if (singleOrderItem.batch) {
          if (this.orderType == "from") {
            await this.createBatch(singleOrderItem.batch);
            singleOrderItem.batch = this.newBatch.id;
          } else if (
            this.orderType == "to" &&
            typeof singleOrderItem.batch !== "number"
          ) {
            singleOrderItem.batch = singleOrderItem.batch.id;
          }
        }
      }
      }
      else{
        for (const singleOrderItem of unproxiedOrderItems) {
          if (singleOrderItem.batch) {
            if (this.orderType == "from"){
              if (typeof singleOrderItem.batch !== "number"){
                  const batch = {
                  manufacturing_date: singleOrderItem.batch.manufacturing_date?.toString(),
                  expiry_date: singleOrderItem.batch.expiry_date?.toString(),
                  quantity: singleOrderItem.batch.quantity,
                  product_variant: singleOrderItem.batch.product_variant?.toString(),
                } as Batch;
                singleOrderItem.order_batch = batch;
                singleOrderItem.batch = undefined;
                
              }
            }
            else if (
            this.orderType == "to" &&
            typeof singleOrderItem.batch !== "number"
          ) {
            singleOrderItem.batch = singleOrderItem.batch.id;
          }
          }
        }
      }
      
      
      const cash = parseFloat(this.cashReceived);
      const discount = parseFloat(this.totalDiscount);

      const singleOrder: Order = {
        order_item: unproxiedOrderItems,
        buyer: this.buyer,
        seller: this.seller,
        total_discount: isNaN(discount) ? "0" : discount.toString(),
        total: this.totalAmount.toString(),
        amount_received: isNaN(cash) ? "0" : cash.toString(),
        amount_discount: this.discountMethod === "amount" ? true : false,
        invoice_id: this.invoiceID,
        internal_order: true,
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
      this.showErrorSeller = false;
      this.showErrorBuyer = false;
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
          (price * quantity * ((100 - discount) / 100)).toFixed(0)
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

    searchByName: function (event: Event) {
      if (event) {
        event.preventDefault();
      }
      this.searchProductByName(this.product.name);
    },

    searchByBarcode: async function (event: Event) {
      
      await this.searchProductByBarcode(this.product.barCode);

      if (this.productResult.length === 1) {
        const searchedProduct: Product = this.productResult[0];
        if (
          searchedProduct.id &&
          searchedProduct.product_variant &&
          searchedProduct.product_variant.length > 0 &&
          searchedProduct.product_variant[0].id
        )
          await this.selectProduct(
            searchedProduct.id,
            searchedProduct.product_variant[0].id
          );
      }
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
      this.orderType = "from";
      this.seller = 0;
      this.buyer = this.userdata.id;
      this.buyer = 0;
      const vendor: User = {};
      this.vendorUser = vendor;
      this.cancelModal = false;
      await this.fetchInvoiceID();
      await this.getUsers("ADMIN");
      await this.getVendors("");
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

    sellerVendorCheck: function () {
      if (this.seller) {
        this.vendorUser = this.vendors.find(
          (item: User) => item.id === this.seller
        );
      }
    },

    addVendor: async function () {
      this.showErrorVenCont = true;
      this.showErrorVenComp= true;
      if(this.contactNumberValidation == null && this.companyValidation == null){
        const user: User = {
          first_name: this.vendor.firstName,
          last_name: this.vendor.lastName,
          username: this.vendor.contact,
          contact_number: this.vendor.contact,
          company: this.vendor.company,
          is_active: true,
          user_type: "VENDOR",
        };

        await this.registerUser(user);
        await this.getVendors("");
      }
    },

    openAddVendorModal: async function () {
      this.addVendorModal = true;
      this.vendor.firstName = "";
      this.vendor.lastName = "";
      this.vendor.contact = "";
      this.vendor.company = 0;
      this.showErrorVenCont = false;
      this.showErrorVenComp = false;
      if (this.companies && this.companies.length > 0) {
        this.vendor.company = this.companies[0].id;
      }
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

    async syncOrder() {
      const check = await offlineStoreService.getsyncOrder();
      if(check == true){
        offlineStoreService.Order();
        offlineStoreService.setsyncOrder(false);
      }
    },

    ...mapActions({
      searchProductByName: OrderActionTypes.SEARCH_PRODUCT_BY_NAME,
      searchProductByBarcode: OrderActionTypes.SEARCH_PRODUCT_BY_BARCODE,
      createOrder: OrderActionTypes.CREATE_ORDER,
      changeOrderStatus: OrderActionTypes.CHANGE_ORDER_STATUS,
      getUsers: AuthActionTypes.GET_All_USERS,
      getVendors: AuthActionTypes.FETCH_VENDORS,
      createBatch: OrderActionTypes.CREATE_BATCH,
      registerUser: AuthActionTypes.REGISTER_USER,
      fetchCompanies: AuthActionTypes.FETCH_COMPANIES,
      fetchInvoiceID: OrderActionTypes.FETCH_INVOICE_ID,
    }),
  },
  async beforeMount() {
    this.syncOrder();
    await this.fetchInvoiceID();
    await this.getUsers("ADMIN");
    await this.getVendors("");
    await this.fetchCompanies({
      company_type: "VENDOR",
      search: "",
    });
    this.buyer = this.userdata.id;
    await offlineStoreService.initializeStore();
  },
});
</script>

<style lang="scss" scoped>
.coaldev-name {
  font-size: 15px;
  color: $coaldev-name-color;
  padding: 0px 0px 5px 20px;
  margin-block-start: 0px;
  margin-block-end: 0px;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
.focuschange {
  outline: none !important;
  border-left: 5px solid red;
  box-shadow: 0 0 10px #719ece;
}
#container-zero-order {
  display: grid;
  grid-template-columns: 2fr;
  gap: 0.1em 0.1em;
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
  grid-template-columns: 0.5fr 0.3fr 0.5fr;
  grid-gap: 1.2rem 0.5rem;
  grid-template-areas:
    "bc bc-i q q-i ap-e"
    "pn pn-i d d-i ap"
    "bt bt-i e e-i e-ap";
}
.bc {
  grid-area: bc;
}
.bc-i {
  grid-area: bc-i;
  display:inline-block;
}
.q {
  grid-area: q;
}
.q-i {
  grid-area: q-i;
  display:inline-block;
}
.pn {
  grid-area: pn;
}
.pn-i {
  grid-area: pn-i;
  display:inline-block;
}
.d {
  grid-area: d;
}
.d-i {
  grid-area: d-i;
  display:inline-block;
}
.ap-e {
  display: inline-block;
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

.split-container {
  display: inline-block;
  grid-template-columns: 2fr 1fr;
  margin: 20px 10px;

}
.split-container:hover{
  border:2px solid #e43d2a;
}

.split-container:active{
  border:2px solid #e43d2a;
}
.table-container {
  display: grid;
  grid-template-columns: 1.2fr 5fr;
  gap: 0.1em 0.1em;
  font-family:seg;
  margin-top: 5px;
}
.table-container-left {
  display: grid;
  grid-template-columns: 1.2fr 5fr;
  gap: 0.1em 0.1em;
  font-family:seg;
  margin-top: 0; 
  background-color:#e43d2a; 
  border-radius:5px ;
  color:white; 
  font-size:12px; 
  padding:4px
}

.box1, .box2{
  margin: 0 !important;;
  padding:0 !important;
}
.box1-tab {
  overflow-y: auto;
  height: $order-item-table-height;
}

.text-box {
  border-radius: 6px;
  font-family: seg;
  font-size: 11px;
  width: 7.375vw;
  height: 30px;
  margin-top: 15px;
  padding: 0px 0px 0px 5px;
}
.text-box-med{
  border-radius: 6px;
  font-family: seg;
  font-size: 11px;
  width: 71px;
  height: 30px;
  padding: 0px 0px 0px 5px;
}
.text-box-long {
  border-radius: 6px;
  font-family: seg;
  font-size: 11px;
  width: 119px;
  height: 30px;
  margin-top: 15px;
  padding: 0px 0px 0px 5px;
}

.text-box-sm {
  border-radius: 6px;
  font-family: seg;
  font-size: 11px;
  width: 79px;
  height: 30px;
  margin-top: 15px;
  padding: 0px 0px 0px 5px;
  display:inline-block;
}

.btn-mr {
  margin: 10px;
}

.mr-l {
  margin-left: 10px !important;
}
.mr-l2{
  margin-left:20px !important;
}

.pd-t {
  padding: 22px 0px 0px 0px;
  font-size: 11px;
  font-family: seg;
  color: #0f2636;
}

.pad-label {
  font-family: seg;
  font-size: 11px;
  padding: 16px 5px 0px 0px;
  color: #0f2636;
}
.pad-label-ex {
  font-family: seg;
  font-size: 11px;
  padding: 16px 9px 0px 0px;
  color: #0f2636;
}

.labl-txt {
  text-align: left;
  margin-top: 0px;
  margin-right: 25px;
  font-size: 20px;
}

.box-inner-right {
  float: right;
  padding: 20px 20px 0px 20px;
}

.btn-blue{
  background-color:#0f2636;
  font-family:seg;
  font-size: 12px;
  margin:0px 76px 2px 8px;
  padding:4px 2px 4px 2px;
  border-radius: 20px;
  width: 135px;
  padding:5px;
  cursor: pointer;
  color:$white-color;
  border:none;
  font-weight:bold;
}
.btn-blue-3{
  background-color:#0f2636;
  font-family:seg;
  font-size: 12px;
  margin:0px 0px 2px 20px;
  padding:4px 2px 4px 2px;
  border-radius: 20px;
  width: 135px;
  padding:5px;
  cursor: pointer;
  color:$white-color;
  border:none;
  font-weight:bold;
}

.btn-red{
  background-color:#e43d2a;
  font-family:seg;
  font-size: 12px;
  margin:0px 0px 2px 0px;
  border-radius: 20px;
  width: 135px;
  cursor: pointer;
  color:$white-color;
  border:none;
  padding:5px;
  font-weight:bold;
}
.btn-red:focus{
  outline: none;
}
btn-blue:focus{
  outline:none;
}

.btn-mr {
  margin: 10px;
}

.box1-tab {
  overflow-y: auto;
  height: $order-item-table-height;
}

.block{
  display:inline-block;
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
}

.mr-all {
  margin: 2px 0px 13px 0px;
}

.mr-l {
  margin-left: 10px;
}

.box-22 {
  display: inline;
  font-family: segi;
  font-size: 12px;
}

.td-head {
  font-family:seg;
  font-size: 12px;
  padding-top: 5px;
  color: #e43d2a;
}
td{
  font-family:seg;
  font-size:10px;
  text-align:center;
}
.td-cont {
  color: #0f2634;
  font-size: 11px;
  font-family: seg;
  font-weight: normal;
  padding-left: 2px;
}
li > div.shadow-box {
  border: 2px solid transparent;
}
li > div:hover {
  border: 2px solid $primary-color !important;
}

.order_item_input {
  margin: 0 !important;
  padding: 0 !important;
}

#orderTypes .custom-radio {
  font-size: 12px; 
  display:inline-block;
}
.custom-select:active{
  border:3px solid #e43d2a;
}

.custom-select:hover{
   border:3px solid #e43d2a;
}
float-right{
  float:right;
}
.col-2{
    -webkit-box-flex: 0;
    flex: 0 0 14% !important;
    max-width: 14% !important;
}
.col-3{
  -webkit-box-flex: 0;
      flex: 0 0 30% !important;
    max-width: 30% !important;
    margin-left: 23px !important;
}
.col-6{
  -webkit-box-flex: 0;
  flex: 0 0 50%;
  max-width: 50%;
}
.box1Responsive{
  display: flex;
}
.row{
  margin-left: 0vw !important;
  width: 100% !important;
}
.orderTable{
  width: 98%;
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
  border-color: #ddd !important;
}
.form-error{
  font-size: 9px;
}
.width-label{
  width: 6rem;
}
.p-contact{
  padding-right: 0px;
}
.btn-blue-vendor{
    background-color:#0f2636;
    border-radius: 20px;
    padding: 6px 30px;
    border: 1.5px solid #0f2636 !important;
    width:8rem;
  }
//ab-css
.ab-flex{
   display:flex;
   justify-content: space-between;
   font-size: 12px;
 }
 li > div.shadow-box{
   padding: 0 4px;
   border: 2px solid transparent;
 }
 div.ab-flex > p:last-child{
   margin-left: 3px;
 }
@media screen and (max-width:1216px ){
  .split-container{
    margin-left: 2vw;
  }
  .col-2{
    max-width: 25% !important;
  }
}
@media screen and (max-width:1029px ){
  .col-3{
    max-width: 35% !important;
  }
  .container-fluid{
    gap: 0rem 0rem !important;
        // width: 115% !important
  }
}
@media screen and (max-width: 1400px){
  .p-contact{
    padding-right: 46px;
  }
}
@media screen and (max-width: 1245px){
  .p-contact{
    padding-right: 38px;
  }
}
.pd-t-ex {
  padding: 0px 0px 0px 5px;
  font-size: 11px;
  font-family: seg;
  color: #0f2636;
}
</style>
