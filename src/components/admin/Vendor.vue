<template>
  <!--<div class="diff-shadow">-->
  <div class="diff-shadow-box">
    <!--<h2>Vendors</h2>-->
    <div class="search-grid-list-pages">
        <!--<router-link to="/vendor/create" class="btn btn-orange add-btn-width">Add Vendor</router-link>-->
        <router-link to="/vendor/create" class="btn-red btn-orange add-btn-width">Add Vendor</router-link>
        <div class="float-right">
          <label class="search-lbl">Search by: Product Name</label>
          <form class="flex-box">  
            <input
              type="text"
              placeholder="Search"
              class="search-input search-box"
              v-model="search"
              @input="searchVendors"
            />
            <button class="btn-search search-btn" @click="searchVendors"><img :src="searchbar" alt="Search"></button>
          </form>
        </div>
    </div>
    <div class="mr-2">
      <table>
        <colgroup>
          <col span="1" style="width: 5%;">
          <col span="1" style="width: 35%;">
          <col span="1" style="width: 20%;">
          <col span="1" style="width: 50%;">
        </colgroup>

        <tr class="fr-row header">
          <th style="border-radius: 10px 0px 0px 10px">Sr No.</th>
          <th>Vendor Name</th>
          <th>Contact</th>
          <th style="border-radius: 0px 10px 10px 0px">Delete / Edit</th>
        </tr>
        <tr class="fr-row content" v-for="(vendor, index) in vendors" v-bind:key="vendor.id">
          <td>{{index + 1}}</td>
          <td>{{vendor.first_name}} {{vendor.last_name}}</td>
          <td>{{vendor.contact_number}}</td>
          <td style="width: 150px">
            <div class="flex-box">
              <a class="btn-tab btn-orange btn-mr-inner" @click="openDeleteVendorModal(vendor)">Delete</a>
              <router-link
                :to="{name: 'EditVendor', params: {vendorId: vendor.id}}" 
                class="btn-blue btn-tab btn-orange btn-mr-inner"
              >Edit</router-link>
            </div>
          </td>
        </tr>
      </table>
      <Paginator class="mr-2" :count="counts.vendors" @pageChange="changePage"/>
    </div>

    <!-- The deletion Modal -->
    <Modal v-if="deleteVendorModal">
      <template v-slot:header >
        <h2 class="head-modal">Confirm Delete</h2>
      </template>

      <template v-slot:body>
        <p style="font-size:19px">Are you sure you want to delete this Vendor?</p>
        <template v-if="vendor">
          <table id="delete-table" class="mr-1">
            <tr>
              <td style="color:#e43d2a; padding-right:0px"><strong>Name:</strong></td>
              <td>{{vendor.firstName}} {{vendor.lastName}}</td>
              <td style="color:#e43d2a; padding-right:0px "><strong>Contact:</strong></td>
              <td>{{vendor.contact}}</td>
            </tr>
          </table>
        </template>
      </template>

      <template v-slot:footer>
        <div class="flex-box">
          <button class="btn-b btn-mr" @click="deleteVendor">Yes</button>
          <button class="btn-b btn-blue btn-orange btn-mr" @click="closeDeleteVendorModal">Cancel</button>
        </div>
      </template>
    </Modal>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';

import Modal from '@/components/common-components/Modal.vue';
import Paginator from '@/components/common-components/Paginator.vue';
import { ActionTypes } from '@/store/modules/auth/actions';
import { User } from '@/store/models/user';

export default defineComponent({
  name: 'Vendor',
  components: {
    Modal,
    Paginator,
  },
  data() {
    return {
      searchbar: require('../../assets/search_icon.svg'),
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
      vendors: 'getListOfVendors',
      counts: 'getTotalCounts',
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

    changePage: async function (pageNo: number) {
      await this.getVendors({
        search: this.search,
        page: pageNo
      });
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
  .diff-shadow-box {
    border: 1px solid $white-color;
    border-radius: 10px;
    padding: 1em 13em;
    margin: 15px 141px 0px 194px;

    -webkit-box-shadow: 1px 1px 5px -1px $login-shodow-color;
    -moz-box-shadow: 1px 1px 5px -1px $login-shodow-color;
    box-shadow: 1px 1px 5px -1px $login-shodow-color;
  }
  .btn-red{
    text-decoration:none;
  background-color: #e43d2a;
    font-family: seg;
    font-size: 12px;
    border-radius: 20px;
    width: 100px;
    cursor: pointer;
    color: #ffffff;
    border: none;
    padding: 12px 6px;
    font-weight: bold;
    text-align: center;
    height: 40px;
    margin-top: 12px;
}
.btn-tab{
  background-color: #e43d2a;
    font-family: seg;
    font-size: 12px;
    border-radius: 20px;
    width: 100px;
    cursor: pointer;
    color: #ffffff !important;
    border: none;
    padding: 5px;
    font-weight: bold;
    text-align: center;
    height: 25px;
}
.btn-blue{
  background-color:#0f2634 !important;
  text-decoration:none;
}
.search-box{
  border-radius:20px 0px 0px 20px;
  padding:0px 0px 0px 10px;
  margin:8px 0px 8px 20px;
  font-size:14px;
  color:#9ea3a6;
  font-family:seg;
  border: 1px solid #dfe0e1;
  border-right-style:none !important;
}

.search-box:focus{
  outline:none;
}
.btn-search {
    border-radius:0px 20px 20px 0px;
    color: $white-color;
    //padding: $normal-btn-pad;
    margin: 8px 8px 8px 0px;
    cursor: pointer;
    font-family:seg;
    font-size: 10px;
    border: 1px solid #e43d2a;
    border-right-style:none!important;
    text-align: center;
    width:30%;
    background: #e43d2a; 
  }
.btn-search:focus{
  outline:none;
}
.search-lbl{
  font-size:11px;
  font-style:italic;
  margin:0px 0px 0px 25px;
  color:#9ea3a6;
}
.fr-row {
  font-size: 12px;
  font-family: seg;
  vertical-align:text-bottom;
}
.header {
  border-radius: 5px;
  background-color: #0f2634; 
  color: white;
  
}

.content{
  background-color: white; 
  color: #0f2634;
}
.btn-box{
  text-align:center;
}
.modal-footer{
  justify-content: center !important;
}
.head-modal{
  font-size:25px;
  font-weight:bold;
}
.pad-b{
  padding-bottom:0 !important;
}
.btn-b{
  text-decoration: none;
    background-color: #e43d2a;
    font-family: seg;
    font-size: 12px;
    border-radius: 20px;
    width: 140px;
    cursor: pointer;
    color: #ffffff;
    border: none;
    padding: 4px;
    font-weight: bold;
    text-align: center;
    height: 25px;
}
.btn-b:focus{
  outline:none;
}
</style>
