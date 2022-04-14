<template>
  <div class="vendor-container">
    <div class="diff-shadow">
      <div class="page-upper">
        <div id="filter-box">
          <div>
            <router-link to="/vendor/create" class="ab_btn btn-orange vendor-btn ">Add Vendor</router-link>
          </div>
        </div>
        <div class="right-col">
          <label class="search-lbl">Search by: Name</label>
          <form class="ab-form-pos">  
              <input
                label="Name"
                name="name"
                type="text"
                placeholder="Search"
                class=""
                v-model="search"
                @input="searchVendors"
              />
              <button class="btn ab-pos btn-orange" @click="searchVendors">
                <svg id="White_search_icon" data-name="White search icon" xmlns="http://www.w3.org/2000/svg" width="13.049" height="13.048" viewBox="0 0 13.049 13.048">
                  <path id="Path_99" data-name="Path 99" d="M23.076,23.074a.816.816,0,0,1,1.154,0l3.14,3.14a.816.816,0,0,1-1.153,1.154l-3.14-3.14a.816.816,0,0,1,0-1.154Z" transform="translate(-14.56 -14.558)" fill="#fff" fill-rule="evenodd"/>
                  <path id="Path_100" data-name="Path 100" d="M5.3,9.786A4.485,4.485,0,1,0,.816,5.3,4.485,4.485,0,0,0,5.3,9.786ZM10.6,5.3A5.3,5.3,0,1,1,5.3,0a5.3,5.3,0,0,1,5.3,5.3Z" fill="#fff" fill-rule="evenodd"/>
                </svg>
              </button>
            </form>
        </div>
      </div>
      <div class="ab-mb-7 mr-2">
        <table>
          <colgroup>
            <col span="1" style="width: 5%;">
            <col span="1" style="width: 35%;">
            <col span="1" style="width: 20%;">
            <col span="1" style="width: 50%;">
          </colgroup>

          <tr class="fr-row header">
            <th>Sr No.</th>
            <th>Vendor Name</th>
            <th>Contact</th>
            <th>Delete / Edit</th>
          </tr>
          <tr class="fr-row content" v-for="(vendor, index) in vendors" v-bind:key="vendor.id">
            <td>{{index + 1}}</td>
            <td>{{vendor.first_name}} {{vendor.last_name}}</td>
            <td>{{vendor.contact_number}}</td>
            <td>
              <div class="flex-box">
                <a class="btn-tab btn-orange btn-mr-inner" @click="openDeleteVendorModal(vendor)">Delete</a>
                <router-link
                  :to="{name: 'EditVendor', params: {vendorId: vendor.id}}" 
                  class="tble-btns btn-blue"
                >Edit</router-link>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <Paginator class="mr-2" :count="counts.vendors" @pageChange="changePage"/>
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
            <button class="btn-b btn-orange mx-1 btn-mr" @click="deleteVendor">Yes</button>
            <button class=" btn-blue btn-mr" @click="closeDeleteVendorModal">Cancel</button>
          </div>
        </template>
      </Modal>

    </div>
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
  .vendor-container{
    max-width: 1163px;
    margin: 0 auto;
  }
  .diff-shadow{
    padding: 1.6% 5.5% 1.5% 5.5%;
  }
  .page-upper{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
   .ab-mb-7{
    margin-bottom: 70px;
  }
  td > .flex-box{
    justify-content: center;
  }
  .btn-mr{
    margin: 10px;
  }
  .ab_btn{
    color: $white-color;
    text-decoration: none;
    padding: $normal-btn-pad;
    border: 1.5px solid $primary-color !important;
    cursor: pointer;
    font-size: $btn-font-size;
    border-radius: 20px;
    width: 135px;
  }
  // hover
  .ab_btn:hover{
    background-color: white;
    color: $primary-color;
    border: 1.5px solid $primary-color;
    // font-weight: bold;
  }
  #filter-box{
    display: flex;
    align-items: center;
  }
  #filter-box > span{
    font-size: 12px;
    margin-left: 20px;
  }
  .right-col{
    width: 50%;
  }
  .right-col > form > input{
    width: 80%;
    margin: 0;
    padding: 8px 70px 8px 20px;
    border-radius: 20px;
  }
  .search-lbl{
    font-size:11px;
    font-style:italic;
    margin:0px 0px 0px 121px;
    color:#9ea3a6;
  }
  .ab-form-pos{
    position: relative;
    text-align: right;
    margin-right: 10px;
  }
  .btn-tab{
    background-color: #e43d2a;
    // font-family: seg;
    font-size: 12px;
    border-radius: 20px;
    width: 135px;
    cursor: pointer;
    color: #ffffff !important;
    border: none;
    padding: 5px;
    font-weight: bold;
    text-align: center;
    height: 27px;
  }
  .btn-tab:hover{
  background-color: white;
  color: $primary-color !important;
  border: 1.5px solid $primary-color;
  // font-weight: bold;
}
  .btn-blue{
    text-decoration: none;
    text-align: center;
    background-color:#0f2636;
    font-family:seg;
    font-size: 12px;
    border-radius: 20px;
    width: 135px;
    padding: 3.5px 3.5px;
    border: 1.5px solid #0f2636 !important;
    cursor: pointer;
    color:$white-color;
    border:none;
    font-weight:bold;
  }
  .btn-blue:hover{
    color: #0f2636;
    background-color: white;
    border: 1.5px solid #0f2636;
  }
  .btn-mr-inner{
    margin: 1px 1px 1px 5px;
  }
  .pr-var-mr {
    margin: 10px;
  }
  #delete-table td {
    border: none;
  }
  #delete-table tr:nth-child(even) {
    background-color: $white-color;
  }

.fr-row {
  font-size: 12px;
  // font-family: seg;
  // vertical-align:text-bottom;
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
.content{
  background-color: white; 
  color: #0f2634;
}
.content > td{
  text-align: center;
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
.btn-b:hover{
 background-color: white;
  color: $primary-color;
  border: 1.5px solid $primary-color;
}
.vendor-btn {
    padding: 8px 22px !important;
}
// .btn-box{
//   text-align:center;
// }
// .modal-footer{
//   justify-content: center !important;
// }
// .head-modal{
//   font-size:25px;
//   font-weight:bold;
// }
// .pad-b{
//   padding-bottom:0 !important;
// }

// #search-container{
//     width: 50%;
// }
// #search-container > span{
//     font-size: 0.8em;
//     margin-left: 120px;
//     font-style: italic;
//   }
// #search-container > form > input{
//   width: 80%;
//   margin: 0;
//   padding: 8px 70px 8px 20px;
//   border-radius: 20px;
// }
.ab-pos{
  position: absolute;
  width: 50px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  top:-8px; 
  right: 0px;
  height: 40px;
  border: none;
  cursor: pointer;
}
</style>