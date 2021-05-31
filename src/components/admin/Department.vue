<template>
  <div class="diff-shadow">
    <h2>Departments</h2>
    <div class="search-grid-list-pages">
        <div id="filter-box">
          <router-link to="/department/create" class="btn btn-orange add-btn-width">Add New Department</router-link>
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
        <div class="float-right">
          <form class="flex-box">
            <input
              type="text"
              placeholder="Enter department name to search"
              class="search-input"
              v-model="search"
              @input="onSearchCompany"
            />
            <button class="btn btn-orange search-btn" @click="onSearchCompany">Search Department by name</button>
          </form>
        </div>
    </div>
    <div class="mr-2">
      <table>
        <colgroup>
          <col span="1" style="width: 10%;">
          <col span="1" style="width: 40%;">
          <col span="1" style="width: 15%;">
          <col span="1" style="width: 15%;">
          <col span="1" style="width: 30%;">
        </colgroup>

        <tr>
          <th>Sr No.</th>
          <th>Department Name</th>
          <th>Type</th>
          <th>credit</th>
          <th></th>
        </tr>
        <tr v-for="(company, index) in companies" v-bind:key="company.id">
          <td>{{index + 1}}</td>
          <td>{{company.company_name}}</td>
          <td>{{company.company_type}}</td>
          <td v-if="company.credit">{{company.credit}}</td>
          <td v-else class="text-center">-</td>
          <td style="width: 150px">
            <div class="flex-box">
              <a class="btn btn-orange btn-mr-inner" @click="openDeleteCompanyModal(company)">delete</a>
              <router-link
                :to="{name: 'EditDepartment', params: {companyId: company.id}}" 
                class="btn btn-orange btn-mr-inner"
              >edit</router-link>
            </div>
          </td>
        </tr>
      </table>
    </div>

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
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

import Modal from '@/components/common-components/Modal.vue';
import { ActionTypes } from '@/store/modules/auth/actions';
import { Company } from '@/store/models/company';

export default defineComponent({
  name: 'Department',
  components: {
    Modal,
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
      companyTypes: 'getCompanyTypes'
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
