<template>
  <div id="zero-order">

    <div class="split-container diff-shadow">
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

          <template v-if="orderType === 'from'">
            <label class="bt pad-label" for="barcode">
              <strong>Manufactured Date:</strong>
            </label>
            <div class="bt-i">
              <input
                tabindex="3"
                type="date"
                v-model="product.manufacturedDate"
              >
              <span v-if="productManufacturedValidation" class="form-error">{{ productManufacturedValidation }}</span>
            </div>

            <label class="e pad-label mr-l" for="discount">
              <strong>Expiry Date:</strong>
            </label>
            <div class="e-i">
              <input
                tabindex="6"
                type="date"
                v-model="product.expiryDate"
              >
              <span v-if="productExpiryValidation" class="form-error">{{ productExpiryValidation }}</span>
            </div>
          </template>

          <template v-if="orderType === 'to'">
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
                  #{{ batch.id }}   Exp: {{ batch.expiry_date }} Quan: {{trimNumber(batch.quantity)}}
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
          </template>

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
            <td>{{ invoiceID }}</td>
          </tr>
        </table>
        <div id="orderTypes" class="mr-2">
          <label class="custom-radio" style="margin-right: 10px">From Vendor or Department
            <input type="radio" name="order_type" value="from"
            :disabled="orderTypeValidation" v-model="orderType" @change="orderTypeChange">
            <span class="checkmark"></span>
          </label>
          <label class="custom-radio" style="margin-right: 10px">To Department
            <input type="radio" name="order_type" value="to"
            :disabled="orderTypeValidation" v-model="orderType" @change="orderTypeChange">
            <span class="checkmark"></span>
          </label>
        </div>
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
                  </tr>
                  <tr>
                    <td>{{ itemVariant.price }}</td>
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
              <col span="1" style="width: 3%;">
              <col span="1" style="width: 10%;">
              <col span="1" style="width: 25%;">
              <col span="1" style="width: 8%;">
              <col span="1" style="width: 8%;">
              <col span="1" style="width: 6%;">
              <col span="1" style="width: 10%;">
              <col span="1" style="width: 10%;">
              <col span="1" style="width: 8%;">
              <col span="1" style="width: 8%;">
              <col span="1" style="width: 4%;">
            </colgroup>

            <tr>
              <th>Sr No.</th>
              <th>Bar Code</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Disc</th>
              <th>Manu Date</th>
              <th>Expiry Date</th>
              <th>Batch Qty</th>
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
              <td>{{ trimNumber(orderItem.batch.quantity) }}</td>
              <td>{{ orderItem.totalPrice }}</td>
              <td style="cursor: pointer;" @click="removeItem(index)">
                <hr style="border: 1px solid red">
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <div class="diff-shadow">
      <div id="container-zero-order">
        <div id="box1" class="form-container">
          <label class="pad-label w100 bc" for="sellerID">
            <strong>Seller:</strong>
          </label>

          <div class="bc-i">
            <input
              v-if="orderType === 'to'"
              type="text"
              name="sellerID"
              :value="userdata.username"
              readonly
            >
            <select
              v-else
              name="sellerID"
              class="custom-select"
              id="sellerID"
              v-model="seller"
              @change="sellerVendorCheck"
            >
              <option disabled value="0">select a seller</option>
              <option v-for="user in users" v-bind:key="user.id" v-bind:value="user.id">
                <span v-if="user.first_name && user.last_name">{{user.first_name}} {{user.last_name}}</span>
                <span v-else>{{user.username}}</span>
                <span v-if="user.company && user.company.company_name">- {{user.company.company_name}}</span>
              </option>
              <option disabled>----VENDORS----</option>
              <option v-for="vendor in vendors" v-bind:key="vendor.id" v-bind:value="vendor.id">
                <span v-if="vendor.first_name && vendor.last_name">{{vendor.first_name}} {{vendor.last_name}}</span>
                <span v-else>{{vendor.username}}</span>
                <span v-if="vendor.company && vendor.company.company_name">- {{vendor.company.company_name}}</span>
              </option>
            </select>
          </div>

          <label class="pad-label w100 mr-l q" for="BuyerID">
            <strong>Buyer:</strong>
          </label>

          <div class="q-i">
            <input
              v-if="orderType === 'from'"
              type="text"
              name="BuyerID"
              :value="userdata.username"
              readonly
            >
            <select
              v-else
              name="BuyerID"
              class="custom-select"
              id="BuyerID"
              v-model="buyer"
            >
              <option disabled value="0">select a buyer</option>
              <option v-for="user in users" v-bind:key="user.id" v-bind:value="user.id">
                <span v-if="user.first_name && user.last_name">{{user.first_name}} {{user.last_name}}</span>
                <span v-else>{{user.username}}</span>
                <span v-if="user.company && user.company.company_name">- {{user.company.company_name}}</span>
              </option>
            </select>
          </div>

          <label class="pad-label w100 pn" for="totalAmount">
            <strong>Total Amount:</strong>
          </label>

          <div class="pn-i">
            <input
              name="totalAmount"
              type="text"
              placeholder="Companies balance"
              v-bind:value="totalAmount"
              readonly
            >
          </div>

          <label class="pad-label d mr-l" for="total_discount">
            <strong>Total Discount:</strong>
          </label>
          <div class="d-i">
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
          
          <template v-if="vendorUser && vendorUser.user_type === 'VENDOR'">
            <label class="pad-label w100 bt" for="balance">
              <strong>Company Balance:</strong>
            </label>

            <div class="bt-i">
              <input
                name="balance"
                type="text"
                placeholder="Companies balance"
                v-bind:value="vendorUser.company.credit"
                :style="[vendorUser.company.credit > 0 ? {'color': 'green'} : {'color': 'red'}]"
                readonly
              >
            </div>

            <label class="pad-label w100 mr-l e" for="products">
              <strong>Cash Given:</strong>
            </label>

            <div class="e-i">
              <input
                type="number"
                placeholder="Cash given to vendor"
                v-model="cashReceived"
              >
              <span v-if="orderCashReceivedValidation" class="form-error">{{ orderCashReceivedValidation }}</span>
            </div>
          </template>
        </div>
        <div id="box2">
          <button class="btn btn-orange" @click="submitOrder" :disabled="submitOrderButton">Submit and Print</button>
          <button class="btn btn-orange" @click="openAddVendorModal">Add New Vendor</button>
          <button class="btn btn-orange" @click="cancelModal = true">Cancel Order</button>
        </div>
      </div>
    </div>

    <Modal v-if="addVendorModal">
      <template v-slot:header>
        <h2>Add New Vendor</h2>
      </template>

      <template v-slot:body>
        <div class="flex-box">
          <label class="pad-label w100" for="firstname">
            <strong>First Name:</strong>
          </label>
          <input
            name="firstname"
            type="text"
            placeholder="Enter first name"
            v-model="vendor.firstName"
          />
        </div>
        <div class="flex-box">
          <label class="pad-label w100" for="lastname">
            <strong>Last Name:</strong>
          </label>
          <input
            name="lastname"
            type="text"
            placeholder="Enter last name"
            v-model="vendor.lastName"
          />
        </div>
        <div class="flex-box">
          <label class="pad-label w100" for="contact_number">
            <strong>Contact Number:</strong>
          </label>
          <div class="full-width">
            <input
              name="contact_number"
              type="text"
              placeholder="Enter contact"
              v-model="vendor.contact"
            />
            <span v-if="contactNumberValidation" class="form-error">{{contactNumberValidation}}</span>
          </div>
        </div>

        <div class="flex-box">
          <label class="pad-label w100" for="companies">
            <strong>Company:</strong>
          </label>
          <div class="full-width">
            <select name="companies" class="custom-select" id="companies" v-model="vendor.company">
              <option v-for="company in companies" v-bind:key="company.id" v-bind:value="company.id">
                {{ company.company_name }}
              </option>
            </select>
            <span v-if="companyValidation" class="form-error">{{companyValidation}}</span>
          </div>
        </div>
      </template>

      <template v-slot:footer>
        <div class="flex-box">
          <button class="btn btn-orange btn-mr" @click="addVendorModal = false">Cancel</button>
          <button class="btn btn-orange btn-mr" @click="addVendor" >Add</button>
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
import { mapActions, mapGetters } from 'vuex';

import Modal from '@/components/common-components/Modal.vue';
import { ActionTypes as AuthActionTypes } from '@/store/modules/auth/actions';
import { ActionTypes as OrderActionTypes } from '@/store/modules/order/actions';
import { Order } from '@/store/models/order';
import { Batch } from '@/store/models/batch';
import { User } from '@/store/models/user';
import { OrderItem } from '@/store/models/orderItem';
import { Product, ProductVariant } from '@/store/models/product';

export default defineComponent({
  name: 'ZeroOrder',
  components: {
    Modal
  },
  data() {
    const today = new Date().toDateString();
    const orderItems: OrderItem[] = [];
    const batches: Batch[] = [];
    const vendor: User = {};

    return {
      cancelModal: false,
      product: {
        name: '',
        barCode: '',
        quantity: '',
        batch: '',
        quantityUpperLimit: 0,
        discount: '',
        buyPrice: '',
        actualPrice: 0,
        manufacturedDate: '',
        expiryDate: '',
      },
      date: today,
      orderItems: orderItems,
      productId: 0,
      productVariantId: 0,
      productBatchSelect: batches,
      cashReceived: '',
      totalDiscount: '',
      orderType: 'from',
      errorIndication: true,
      BarCodeMaxLength: 48,
      ProductNameMaxLength: 60,
      duplicateMessage: '',
      creditPaymentMethod: 'cash',
      discountMethod: 'amount',

      addVendorModal: false,
      seller: 0,
      buyer: 0,
      vendorUser: vendor,

      vendor: {
        firstName: '',
        lastName: '',
        contact: '',
        company: 0
      }
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
          } else if (this.orderType === 'to' && value > this.selectedBatchQuantity) {
            errorMessage = 'Stock in this batch is less than quantity.';
          }
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

    productManufacturedValidation: function () {
      let errorMessage = null;
      if (!this.errorIndication) {
        // CheckIF product exist on the backend
        if (this.product.manufacturedDate === undefined || this.product.manufacturedDate === '')
        {
          errorMessage = 'Manufactured date is required';
        }
      }
      return errorMessage;
    },

    productExpiryValidation: function () {
      let errorMessage = null;
      if (!this.errorIndication) {
        // CheckIF product exist on the backend
        if (this.product.expiryDate === undefined || this.product.expiryDate === '')
        {
          errorMessage = 'Expiry date is required';
        }
      }
      return errorMessage;
    },

    addProductButton: function (): boolean {
      let disable = true;
      if (this.productNameValidation === null &&
      this.productBarCodeValidation === null &&
      this.productQuantityValidation === null) {
        disable = false
      }
      return disable
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
      if (this.cashReceived !== undefined && this.cashReceived !== '') {
        const value = parseFloat(this.cashReceived);
        if (isNaN(value)) {
          errorMessage = 'Only numbers are allowed';
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

    selectedBatchQuantity: function(): number {
      let selectedBatchQuantity = 0.0;
      if (this.orderType === 'to') {
        const batchID = parseInt(this.product.batch);
        if(!isNaN(batchID) && batchID > 0 && this.productBatchSelect.length > 0){
          const selectedBatch = this.productBatchSelect.find((item: Batch) => item.id === batchID);
          const selectedBatchQuantityStr = selectedBatch && selectedBatch.quantity ? selectedBatch.quantity : '0';
          selectedBatchQuantity = parseFloat(selectedBatchQuantityStr);
        }
      }
      return selectedBatchQuantity;
    },

    orderTypeValidation: function() {
      let disable = false;
      if (this.orderItems.length > 0) {
        disable = true;
      }
      return disable;
    },

    contactNumberValidation: function () {
      let errorMessage = null;
      if (this.vendor.contact.length <= 0) {
        errorMessage = "Number is required"
      }
      return errorMessage;
    },

    companyValidation: function () {
      let errorMessage = null;
      if (this.companies.length <= 0) {
        errorMessage = "Comapny is required. Add vendor comapany to system"
      }
      return errorMessage;
    },

    ...mapGetters({
      productResult: 'getProductResults',
      userdata: 'getUser',
      orderStatus: 'getOrderStatus',
      users: 'getListOfUsers',
      vendors: 'getListOfVendors',
      newBatch: 'getBatch',
      companies: 'getCompanies',
      invoiceID: 'getInvoiceID',
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
      const batches: Batch[] = [];
      this.productBatchSelect = batches;
      this.errorIndication = true;
      this.duplicateMessage = '';
      this.product.buyPrice = '';
      this.product.actualPrice = 0;
      this.product.manufacturedDate = '';
      this.product.expiryDate = '';
    },

    trimNumber: function(value: string): string{
        return parseFloat(value !== undefined ? value : '0.0').toFixed(2);
    },

    orderTypeChange: function () {
      if (this.orderType === 'to') {
        this.buyer = 0;
        this.seller = this.userdata.id;
      } else if (this.orderType === 'from') {
        this.seller = 0;
        this.buyer = this.userdata.id;
      }
    },

    selectProduct: async function (productId: number, VariantId: number) {
      this.duplicateMessage = '';
      const currentProduct = await this.productResult.find((item: Product) => item.id === productId);
      const currentVariant = await currentProduct.product_variant.find((item: ProductVariant) => item.id === VariantId);

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
      this.productBatchSelect = currentVariant.batch
        .filter((batch: Batch) => batch.quantity && parseFloat(batch.quantity) > 0)
        // eslint-disable-next-line
        .sort((x: any, y: any) => +new Date(x.created) - +new Date(y.created));
      const batchId = this.productBatchSelect.length > 0 ? (this.productBatchSelect[0] as Batch).id : undefined;
      this.product.batch = batchId !== undefined ? batchId.toString() : '';
      if (this.orderType == 'to') {
        (this.$refs.batches as HTMLSelectElement & { focus: () => void }).focus();
      }
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
      if (this.product.buyPrice === '') return;
      if (this.orderType === 'to' && this.product.batch === '') return;
      if (this.orderType === 'to' && quantity > this.selectedBatchQuantity) return;
      if (this.orderType === 'from' && this.product.manufacturedDate === '') return;
      if (this.orderType === 'from' && this.product.expiryDate === '') return;

      const discount = isNaN(parseFloat(this.product.discount)) ? 0 : parseFloat(this.product.discount);

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
      
      let batch;
      if (this.orderType === 'to') {
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
        .find((item: Batch) => item && item.id && item.id.toString() == this.product.batch);
      } else {
        batch = {
          manufacturing_date: this.product.manufacturedDate,
          expiry_date: this.product.expiryDate,
          quantity: this.product.quantity,
          product_variant: this.productVariantId
        } as Batch;
      }

      const SingleOrderItem: OrderItem = {
        batch: batch,
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
      if (this.buyer === 0 || this.seller === 0) return;

      const unproxiedOrderItems = await this.orderItems.map((singleOrderItem: OrderItem) =>  {
        const unproxiedOrderItem = {
          batch: singleOrderItem.batch,
          price: singleOrderItem.price?.toString(),
          discount: singleOrderItem.discount?.toString(),
          quantity: singleOrderItem.quantity?.toString()
        } as OrderItem;
        return unproxiedOrderItem;
      });

      if (this.orderType == 'from') {
        for (const singleOrderItem of unproxiedOrderItems) {
          if (singleOrderItem.batch) {
            await this.createBatch(singleOrderItem.batch);
            singleOrderItem.batch = this.newBatch.id;
          }
        }
      }

      const cash = parseFloat(this.cashReceived);
      const discount = parseFloat(this.totalDiscount);

      const singleOrder: Order = {
        order_item: unproxiedOrderItems,
        buyer: this.buyer,
        seller: this.seller,
        total_discount: isNaN(discount) ? '0' : discount.toString(),
        total: this.totalAmount.toString(),
        amount_received: isNaN(cash) ? '0' : cash.toString(),
        amount_discount: this.discountMethod === 'amount' ? true : false,
        invoice_id: this.invoiceID,
        internal_order: true,
      }

      this.createOrder(singleOrder);
    },

    changeQuantity: function (index: number) {
      const currentVariant = this.orderItems[index].productVariant;
      if (currentVariant !== undefined) {

        const currentOrderItemQuantity = this.orderItems[index].quantity;
        const currentOrderItemPrice = this.orderItems[index].price;
        const currentDiscount = this.orderItems[index].discount;
        const currentBatch = this.orderItems[index].batch;

        if (currentOrderItemQuantity !== undefined && currentOrderItemPrice !== undefined
        && currentBatch !== undefined && typeof currentBatch !== 'number') {

          const quantity = parseFloat(currentOrderItemQuantity);
          const price = parseFloat(currentOrderItemPrice);
          const discount = currentDiscount ? parseFloat(currentDiscount) : 0;
          const upperLimit = currentBatch.quantity ? parseFloat(currentBatch.quantity) : 0;

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

    handleOrderStatus: async function () {
      this.changeOrderStatus('');
      this.clearProduct();
      this.orderItems = [];
      this.cashReceived = '';
      this.totalDiscount = '';
      this.orderType = 'from';
      this.seller = 0;
      this.buyer = this.userdata.id;
      const vendor: User = {};
      this.vendorUser = vendor;
      this.cancelModal = false;
      await this.getUsers(['ADMIN']);
      await this.getVendors('');
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
        this.vendorUser = this.vendors.find((item: User) => item.id === this.seller);
      }
    },

    addVendor: async function () {
      const user: User = {
        first_name: this.vendor.firstName,
        last_name: this.vendor.lastName,
        username: this.vendor.contact,
        contact_number: this.vendor.contact,
        company: this.vendor.company,
        is_active: true,
        user_type: 'VENDOR'
      };

      await this.registerUser(user);
      await this.getVendors('');
    },

    openAddVendorModal: async function () {
      this.addVendorModal = true;
      if (this.companies && this.companies.length > 0) {
        this.vendor.company = this.companies[0].id;
      }
    },

    ...mapActions({
      searchProductByName: OrderActionTypes.SEARCH_PRODUCT_BY_NAME,
      searchProductByBarcode: OrderActionTypes.SEARCH_PRODUCT_BY_BARCODE,
      createOrder: OrderActionTypes.CREATE_ORDER,
      changeOrderStatus: OrderActionTypes.CHANGE_ORDER_STATUS,
      getUsers: AuthActionTypes.GET_USERS_BY_TYPES,
      getVendors: AuthActionTypes.FETCH_VENDORS,
      createBatch: OrderActionTypes.CREATE_BATCH,
      registerUser: AuthActionTypes.REGISTER_USER,
      fetchCompanies: AuthActionTypes.FETCH_COMPANIES,
      fetchInvoiceID: OrderActionTypes.FETCH_INVOICE_ID,
    })
  },
  async beforeMount () {
    await this.fetchInvoiceID();
    await this.getUsers(['ADMIN']);
    await this.getVendors('');
    await this.fetchCompanies({
      company_type: 'VENDOR',
      search: ''
    });
    this.buyer = this.userdata.id;
  }
})
</script>

<style lang="scss" scoped>
  #container-zero-order {
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

  .split-container {
    display: grid;
    grid-template-columns: 3fr 1fr;
  }

  .table-container {
    display: grid;
    grid-template-columns: 1.2fr 5fr;
    gap: 0.1em 0.1em;
  }

  .box1-tab {
    overflow-y: auto;
    height: $order-item-table-height;
  }

  .pad-label {
    padding: 20px 20px 20px 0px;
  }

  .btn-mr{
    margin: 10px;
  }

  .mr-l {
    margin-left: 10px;
  }

  .pad-label {
    padding: 15px 5px 15px 0px;
  }

  .box2{
    padding: 0px 12px 0px 2px;
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

  #orderTypes .custom-radio {
    font-size: 15px;
  }
</style>