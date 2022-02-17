<template>
  <div class="department-container">
    <div class="diff-shadow">
      <div class="page-upper">
          <div id="filter-box">
            <div>
              <router-link to="/department/create" class="ab_btn btn-orange">Add Department</router-link>
            </div>
            <span><b>Company:</b></span>
            <select
              id="company-type"
              name="company-type"
              class="custom-select"
              v-model="companyType"
              @change="onChangeCompanyType"
            >
              <option value="">All</option>
              <option v-for="role in companyTypes" v-bind:key="role" v-bind:value="role">
                {{ role }}
              </option>
            </select>
          </div>
          <!-- <div class="float-right"> -->
          <div class="right-col">
            <form class="ab-form-pos">
              <input
                type="text"
                placeholder="Search"
                class=""
                v-model="search"
                @input="onSearchCompany"
              />
              <!-- <button class="btn btn-orange search-btn" @click="onSearchCompany">Search Department</button> -->
              <button class="btn ab-pos btn-orange" @click="onSearchCompany">
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
            <col span="1" style="width: 20%;">
            <col span="1" style="width: 15%;">
            <col span="1" style="width: 10%;">
            <col span="1" style="width: 10%;">
            <col span="1" style="width: 10%;">
            <col span="1" style="width: 10%;">
            <col span="1" style="width: 20%;">
          </colgroup>

          <tr class="fr-row header">
            <th>Sr No.</th>
            <th>Department Name</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Type</th>
            <th>Credit</th>
            <th>Balance</th>
            <th>Edit</th>
          </tr>
          <tr class="fr-row content" v-for="(company, index) in companies" v-bind:key="company.id">
            <td>{{index + 1}}</td>
            <td>{{company.company_name}}</td>
            <td>{{company.address}}</td>
            <td>{{company.contact_number}}</td>
            <td>{{company.company_type}}</td>
            <td v-if="company.credit">{{company.credit}}</td>
            <td v-else class="text-center">-</td>
            <td>
              <span v-if="company.company_type == 'VENDOR'">{{company.credit}}</span>
              <span v-else>{{company.balance}}</span>
            </td>
            <!-- <td style="width: 150px"> -->
            <td>
              <div class="flex-box">
                <!-- <a class="btn btn-orange btn-mr-inner" @click="openDeleteCompanyModal(company)">delete</a> -->
                <router-link
                  :to="{name: 'EditDepartment', params: {companyId: company.id}}" 
                  class="tble-btns btn-blue"
                >Edit</router-link>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <Paginator :count="counts.companies" @pageChange="changePage"/>

      <!-- The deletion Modal -->
      <Modal v-if="deleteCompanyModal">
        <template v-slot:header>
          <h2>Confirm Deletion</h2>
        </template>

        <template v-slot:body>
          <p>Are you sure you want to delete this department?</p>
          <template v-if="company">
            <table id="delete-table" class="mr-2">
              <tr>
                <td><strong>Name:</strong></td>
                <td>{{company.name}}</td>
              </tr>
            </table>
          </template>
        </template>

        <template v-slot:footer>
          <div class="flex-box">
            <button class="btn btn-orange btn-mr" @click="closeDeleteCompanyModal">Cancel</button>
            <button class="btn btn-orange btn-mr" @click="deletecompany">Yes</button>
          </div>
        </template>
      </Modal>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

import Modal from '@/components/common-components/Modal.vue';
import Paginator from '@/components/common-components/Paginator.vue';
import { ActionTypes } from '@/store/modules/auth/actions';
import { Company } from '@/store/models/company';

export default defineComponent({
  name: 'Department',
  components: {
    Modal,
    Paginator,
  },
  data() {
    return {
      deleteCompanyModal: false,
      companyType: '',
      search: '',
      company: {
        id: 0,
        name: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      companies: 'getCompanies',
      companyTypes: 'getCompanyTypes',
      counts: 'getTotalCounts',
    })
  },
  // define methods under the `methods` object
  methods: {
    clearCompany: function () {
      this.company.id = 0;
      this.company.name = '';
    },

    openDeleteCompanyModal: function(company: Company) {
      this.company.id = company.id ? company.id : 0;
      this.company.name = company.company_name ? company.company_name : '';
      this.deleteCompanyModal = true;
    },

    closeDeleteCompanyModal: function() {
      this.deleteCompanyModal = false;
      this.clearCompany();
    },

    deletecompany: async function() {
      await this.deleteCompany(this.company.id);
      await this.fetchCompanies({
      company_type: '',
      search: ''
    });
      this.clearCompany();
      this.deleteCompanyModal = false;
    },

    onChangeCompanyType: async function () {
      await this.fetchCompanies({
        company_type: this.companyType,
        search: this.search
      });
    },

    onSearchCompany: async function (event: Event) {
      if (event) {
        event.preventDefault()
      }
      await this.fetchCompanies({
        company_type: this.companyType,
        search: this.search
      });
    },

    changePage: async function (pageNo: number) {
      await this.fetchCompanies({
        company_type: this.companyType,
        search: this.search,
        page: pageNo
      });
    },

    ...mapActions({
      fetchCompanies: ActionTypes.FETCH_COMPANIES,
      deleteCompany: ActionTypes.DELETE_COMPANY,
      fetchTypes: ActionTypes.FETCH_TYPES,
    })
  },
  async beforeMount () {
    await this.fetchTypes();
    await this.fetchCompanies({
      company_type: '',
      search: ''
    });
  }
});
</script>

<style lang="scss" scoped>
  .btn-mr{
    margin: 10px;
  }
  .department-container{
    max-width: 1140px;
    margin: 0 auto;
  }
  .diff-shadow{
    padding: 1.6% 5.5% 5.5% 5.5%;
  }

  .btn-mr-inner{
    margin: 1px 1px 1px 5px;
  }

  .pr-var-mr {
    margin: 10px;
  }

  #company-type {
    width: $w200;
    // margin-left: 5%;
    margin-left: 10px;
  }
  .fr-row {
    font-size: 12px;
    font-family: seg;
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
  .header {
    border-radius: 5px;
    background-color: #0f2634; 
    color: white;
  }
  td > .flex-box{
    justify-content: center;
  }
  .content{
    background-color: white; 
    color: #0f2634;
  }
  .content > td{
    text-align: center;
  }
  #delete-table td {
    border: none;
  }

  #delete-table tr:nth-child(even) {
    background-color: $white-color;
  }
  .btn{
    border-radius: 0;
    margin: 0;
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
  // hover blue
  .btn-blue:hover{
    color: #0f2636;
    background-color: white;
    border: 1.5px solid #0f2636;
  }
  // ar custom styles
  .ab-mb-7{
    margin-bottom: 70px;
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
  .search-grid-list-pages{
    align-items: center;
  }
  #filter-box{
    display: flex;
    align-items: center;
  }
  #filter-box > span{
    font-size: 12px;
    margin-left: 20px;
  }
  .ab-pos{
    position: relative;
    width: 70px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    top:0px; 
    right: 70px;
    height: 40px;
    border: none;
    cursor: pointer;
  }
  // #search-icon {
  //   fill: white;
  //   width: 24px;
  //   vertical-align: middle; 
  //   cursor: pointer;
  //   background-color: $primary-color;
  // }
  // .right-col > span{
  //   font-size: 0.8em;
  //   margin: 0 0 0 65px;
  // }
  // .right-col > form > input{
  //   border-radius: 20px;
  //   margin: 0px;
  //   padding: 0 70px 0 20px;
  //   height: 40px;
  // }
  .page-upper{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .ab_btn{
    color: $white-color;
    text-decoration: none;
    padding: 8px 22px;
    cursor: pointer;
    font-size: $btn-font-size;
    border:none;
    border-radius: 20px;
  }
  .ab-form-pos{
    position: relative;
    text-align: right;
    margin-right: 10px;
  }
  .ab-pos{
    position: absolute;
    width: 50px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    top:0px; 
    right: 0px;
    height: 40px;
    border: none;
    cursor: pointer;
  }
  .right-col{
    width: 50%;
  }
  #White_search_icon {
    fill: white;
    width: 24px;
    vertical-align: middle; 
    cursor: pointer;
    background-color: $primary-color;
  }
  .right-col > form > input{
    width: 80%;
    margin: 0;
    padding: 8px 70px 8px 20px;
    border-radius: 20px;
  }
  
</style>
