<template>
  <div id="zero-order">
    <div class="diff-shadow">
      <h2>Zero Order</h2>
      <div id="container-zero-order">
        <div id="box1" class="form-container">
          <div class="flex-box">
            <label class="pad-label w100" for="products">
              <strong>Seller:</strong>
            </label>

            <select name="products" class="custom-select" id="products">
              <option>Store</option>
              <option>Factory</option>
              <option>Retail</option>
            </select>
          </div>

          <div class="flex-box">
            <label class="pad-label w100 mr-l" for="products">
              <strong>Buyer:</strong>
            </label>

            <select name="products" class="custom-select" id="products">
              <option>Store</option>
              <option>Factory</option>
              <option>Retail</option>
            </select>
          </div>

          <div class="flex-box">
            <label class="pad-label w100 mr-l" for="products">
              <strong>Company Balance:</strong>
            </label>

            <input
              type="text"
              placeholder="Companies balance"
            >
          </div>

          <div class="flex-box">
            <label class="pad-label w100 mr-l" for="products">
              <strong>Cash given:</strong>
            </label>

            <input
              type="text"
              placeholder="Cash given to vendor"
            >
          </div>
        </div>
        <div id="box2"></div>
        <div id="box3">
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
import Modal from '@/components/common-components/Modal.vue';

export default defineComponent({
    name: 'ZeroOrder',
    components: {
      Modal
    },
    data() {
      return {
        addVendorModal: false
      }
    },
    methods: {
      cancelOrderModal: function () {
        this.$emit('cancelModal')
      }
    }
})
</script>

<style lang="scss" scoped>
  #container-zero-order {
    display: grid;
    grid-template-columns: 2.6fr 0.4fr 1fr;
    gap: 0.1em 0.1em;
  }

  .form-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 0.1em 0.1em;
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
</style>