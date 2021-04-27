<template>
  <div class="diff-shadow">
    <h2>Vendors</h2>
    <div class="search-grid-list-pages">
        <router-link to="/vendor/create" class="btn btn-orange add-btn-width">Add New Vendor</router-link>
        <div class="float-right">
          <form class="flex-box">
            <input
              type="text"
              placeholder="Enter vendor contact to search"
              class="search-input"
              v-model="search"
              @input="searchVendors"
            />
            <button class="btn btn-orange search-btn" @click="searchVendors">Search Vendor</button>
          </form>
        </div>
    </div>
    <div class="mr-2">
      <table>
        <colgroup>
          <col span="1" style="width: 10%;">
          <col span="1" style="width: 50%;">
          <col span="1" style="width: 20%;">
          <col span="1" style="width: 30%;">
        </colgroup>

        <tr>
          <th>Sr No.</th>
          <th>Vendor Name</th>
          <th>Contact</th>
          <th></th>
        </tr>
        <tr v-for="(vendor, index) in vendors" v-bind:key="vendor.id">
          <td>{{index + 1}}</td>
          <td>{{vendor.first_name}} {{vendor.last_name}}</td>
          <td>{{vendor.contact_number}}</td>
          <td style="width: 150px">
            <div class="flex-box">
              <a class="btn btn-orange btn-mr-inner" @click="openDeleteVendorModal(vendor)">delete</a>
              <router-link
                :to="{name: 'EditVendor', params: {vendorId: vendor.id}}" 
                class="btn btn-orange btn-mr-inner"
              >edit</router-link>
            </div>
          </td>
        </tr>
      </table>
    </div>

    <!-- The deletion Modal -->
    <Modal v-if="deleteVendorModal">
      <template v-slot:header>
        <h2>Confirm Deletion</h2>
      </template>

      <template v-slot:body>
        <p>Are you sure you want to delete this Vendor?</p>
        <template v-if="vendor">
          <table id="delete-table" class="mr-2">
            <tr>
              <td><strong>Name:</strong></td>
              <td>{{vendor.firstName}} {{vendor.lastName}}</td>
            </tr>
            <tr>
              <td><strong>Contact:</strong></td>
              <td>{{vendor.contact}}</td>
            </tr>
          </table>
        </template>
      </template>

      <template v-slot:footer>
        <div class="flex-box">
          <button class="btn btn-orange btn-mr" @click="closeDeleteVendorModal">Cancel</button>
          <button class="btn btn-orange btn-mr" @click="deleteVendor">Yes</button>
        </div>
      </template>
    </Modal>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';

import Modal from '@/components/common-components/Modal.vue';
import { ActionTypes } from '@/store/modules/auth/actions';
import { User } from '@/store/models/user';

export default defineComponent({
  name: 'Vendor',
  components: {
    Modal,
  },
  data() {
    return {
      deleteVendorModal: false,
      search: '',
      vendor: {
        id: 0,
        contact: '',
        firstName: '',
        lastName: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      vendors: 'getListOfVendors'
    })
  },
  // define methods under the `methods` object
  methods: {
    clearVendor: function () {
      this.vendor.id = 0;
      this.vendor.contact = '';
      this.vendor.firstName = '';
      this.vendor.lastName = '';
    },

    openDeleteVendorModal: function(vendor: User) {
      this.vendor.id = vendor.id ? vendor.id : 0;
      this.vendor.contact = vendor.contact_number ? vendor.contact_number : '';
      this.vendor.firstName = vendor.first_name ? vendor.first_name : '';
      this.vendor.lastName = vendor.last_name ? vendor.last_name : '';
      this.deleteVendorModal = true;
    },

    closeDeleteVendorModal: function() {
      this.deleteVendorModal = false;
      this.clearVendor();
    },

    deleteVendor: async function() {
      const user: User = {
        id: this.vendor.id,
        is_active: false
      };
      await this.updateVendor(user);
      await this.getVendors('');
      this.clearVendor();
      this.deleteVendorModal = false;
    },

    searchVendors: function (event: Event) {
      if (event) {
        event.preventDefault()
      }
      this.getVendors(this.search)
    },

    ...mapActions({
      getVendors: ActionTypes.FETCH_VENDORS,
      updateVendor: ActionTypes.UPDATE_USER 
    })
  },
  async beforeMount () {
    await this.getVendors('');
  }
});
</script>

<style lang="scss" scoped>
  .btn-mr{
    margin: 10px;
  }

  .btn-mr-inner{
    margin: 1px 1px 1px 5px;
  }

  .pr-var-mr {
    margin: 10px;
  }

  #company-type {
    width: $w200;
    margin-left: 5%;
  }

  #delete-table td {
    border: none;
  }

  #delete-table tr:nth-child(even) {
    background-color: $white-color;
  }
</style>
