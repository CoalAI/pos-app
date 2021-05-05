<template>
  <div id="zero-order">
    <div class="diff-shadow">
      <h2>Zero Order</h2>
      <div id="container-zero-order">
        <div id="box1" class="form-container">
          <label class="pad-label w100 bc" for="sellerID">
            <strong>Seller:</strong>
          </label>

          <div class="bc-i">
            <select
              name="sellerID"
              class="custom-select"
              id="sellerID"
              v-model="seller"
            >
              <option disabled :value="{}">select a seller</option>
              <option v-for="user in users" v-bind:key="user.id" v-bind:value="user">
                <span v-if="user.first_name && user.last_name">{{user.first_name}} {{user.last_name}}</span>
                <span v-else>{{user.username}}</span>
                <span v-if="user.company && user.company.company_name">- {{user.company.company_name}}</span>
              </option>
              <option disabled>----VENDORS----</option>
              <option v-for="vendor in vendors" v-bind:key="vendor.id" v-bind:value="vendor">
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
            <select
              name="BuyerID"
              class="custom-select"
              id="BuyerID"
              v-model="buyer"
            >
              <option disabled :value="{}">select a buyer</option>
              <option v-for="user in users" v-bind:key="user.id" v-bind:value="user">
                <span v-if="user.first_name && user.last_name">{{user.first_name}} {{user.last_name}}</span>
                <span v-else>{{user.username}}</span>
                <span v-if="user.company && user.company.company_name">- {{user.company.company_name}}</span>
              </option>
              <option>

              </option>
            </select>
          </div>
          
          <template v-if="seller.user_type === 'VENDOR'">
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

            <label class="pad-label w100 mr-l d" for="products">
              <strong>Cash given:</strong>
            </label>

            <div class="d-i">
              <input
                type="text"
                placeholder="Cash given to vendor"
              >
            </div>

            <label class="pad-label w100 bt" for="balance">
              <strong>Company Balance:</strong>
            </label>

            <div class="bt-i">
              <input
                name="balance"
                type="text"
                placeholder="Companies balance"
                v-bind:value="seller.company.credit"
                readonly
              >
            </div>
          </template>
        </div>
        <div id="box2">
          <button class="btn btn-orange">Make Request</button>
          <button class="btn btn-orange">Submit and Print</button>
          <button class="btn btn-orange" @click="addVendorModal = true">Add New Vendor</button>
          <button class="btn btn-orange" @click="cancelOrderModal">Cancel Order</button>
        </div>
      </div>
    </div>

    <Modal v-if="addVendorModal">
      <template v-slot:header>
        <h2>Add New Vendor</h2>
      </template>

      <template v-slot:body>
        <div class="flex-box">
          <label class="pad-label w100" for="quantity">
            <strong>Name:</strong>
          </label>
          <input
            name="quantity"
            type="text"
            placeholder="Enter Name"
          />
        </div>
        <div class="flex-box">
          <label class="pad-label w100" for="quantity">
            <strong>Contact Number:</strong>
          </label>
          <input
            name="quantity"
            type="text"
            placeholder="Enter contact"
          />
        </div>
      </template>

      <template v-slot:footer>
        <div class="flex-box">
          <button class="btn btn-orange btn-mr" @click="addVendorModal = false">Cancel</button>
          <button class="btn btn-orange btn-mr">Yes</button>
        </div>
      </template>
    </Modal>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

import Modal from '@/components/common-components/Modal.vue';
import { ActionTypes } from '@/store/modules/auth/actions';

export default defineComponent({
  name: 'ZeroOrder',
  props: ['totalAmount'],
  components: {
    Modal
  },
  data() {
    return {
      addVendorModal: false,
      seller: {},
      buyer: {},
    }
  },
  computed: {
    ...mapGetters({
      users: 'getListOfUsers',
      vendors: 'getListOfVendors'
    })
  },
  methods: {
    cancelOrderModal: function () {
      this.$emit('cancelModal')
    },

    ...mapActions({
      getUsers: ActionTypes.GET_USERS_BY_TYPES,
      getVendors: ActionTypes.FETCH_VENDORS,
    })
  },
  async beforeMount () {
    await this.getUsers(['SUPER_ADMIN', 'ADMIN', 'SALES_STAFF']);
    await this.getVendors('');
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

  .pad-label {
    padding: 20px 20px 20px 0px;
  }

  .btn-mr{
    margin: 10px;
  }

  .mr-l {
    margin-left: 10px;
  }
</style>