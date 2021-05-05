<template>
    <div id="AddEditdepartment">
      <div class="diff-shadow">
        <h2>
          <span v-if="companyId">Update</span>
          <span v-else>Add New</span>
          <span> Department</span>
        </h2>
        <div class="flex-box">
          <label class="pad-label w100" for="company-name">
            <strong>Name:</strong>
          </label>
          <div class="full-width">
            <input
              name="company-name"
              type="text"
              placeholder="Enter Name"
              v-model="company.name"
            />
            <span v-if="comapanyNameValidation" class="form-error">{{comapanyNameValidation}}</span>
          </div>
        </div>
        <div class="flex-box">
          <label class="pad-label w100" for="products">
            <strong>Type:</strong>
          </label>

          <select
            id="company-type"
            name="company-type"
            class="custom-select"
            v-model="company.type"
          >
            <option value="FACTORY">Factory</option>
            <option value="STORE">Store</option>
            <option value="RETIAL">Retail</option>
            <option value="VENDOR">Vendor</option>
            <option value="PARENT">Parent Company</option>
          </select>
        </div>

        <div class="flex-box">
          <label class="pad-label w100" for="parent-company">
            <strong>Head Dept:</strong>
          </label>

          <select
            id="parent-company"
            name="parent-company"
            class="custom-select"
            v-model="company.parent"
          >
            <option value="0">No Department</option>
            <option v-for="company in companies" v-bind:key="company.id" v-bind:value="company.id">
              {{ company.company_name }}
            </option>
          </select>
        </div>

        <div style="text-align: right; padding-bottom: 50px">
          <router-link 
            to="/departments"
            style="margin-right: 20px"
            class="btn btn-orange btn-mr btn-link"
          >Cancel</router-link>
          <button 
            class="btn btn-orange btn-mr"
            style="width: 150px"
            :disabled="addEditBtn"
            @click="addUpdateDepartment"
          >
            <span v-if="companyId">Update</span>
            <span v-else>Add</span>
            <span> department</span>
          </button>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

import { Company } from '@/store/models/company';
import { ActionTypes } from '@/store/modules/auth/actions';

export default defineComponent({
  name: 'DepartmentAddEdit',
  props: ['companyId'],
  data () {
    return {
      company: {
        name: '',
        type: 'FACTORY',
        parent: 0
      }
    }
  },
  computed: {
    comapanyNameValidation: function () {
      let errorMessage = null;
      if (this.company.name.length <= 0) {
        errorMessage = "Name is required"
      }
      return errorMessage;
    },

    addEditBtn:  function () {
      let disable = true;
      if (this.comapanyNameValidation === null) {
        disable = false
      }
      return disable;
    },

    ...mapGetters({
      companies: 'getCompanies'
    })
  },
  methods: {
    addUpdateDepartment: async function () {
      let companyIdNumber = 0;
      if (this.companyId) {
        companyIdNumber = parseFloat(this.companyId);
        if (isNaN(companyIdNumber)) return;
      }

      const company: Company = {
        company_name: this.company.name,
        company_type: this.company.type,
        parent: this.company.parent !== 0 ? this.company.parent : null
      };

      if (this.companyId) {
        company.id = companyIdNumber;
        await this.updateCompany(company);
      } else {
        await this.createCompany(company);
      }
      this.$router.push({name: 'department'});
    },

    loadData: function (company: Company) {
      this.company.name = company.company_name ? company.company_name : '';
      this.company.type = company.company_type ? company.company_type : '';
      this.company.parent =company.parent ? company.parent : 0;
    },

    ...mapActions({
      createCompany: ActionTypes.CREATE_COMPANY,
      updateCompany: ActionTypes.UPDATE_COMPANY,
      getCompaniesList: ActionTypes.FETCH_COMPANIES
    })
  },
  async beforeMount () {

    if (this.companyId) {
      await this.getCompaniesList({
        company_type: '',
        search: ''
      });
      const company_id = parseInt(this.companyId);
      const company = isNaN(company_id) ? undefined : this.$store.getters.getSignleCompany(company_id);
      if (company) {
        this.loadData(company);
      }
      else {
        // Show 404 page on screen
        this.$router.push({name: 'notFound'});
      }
    }
    await this.getCompaniesList({company_type: 'PARENT', search: ''});
  }
});
</script>

<style lang="scss" scoped>
  #AddEditdepartment {
    padding-left: 15%;
    padding-right: 15%;
    margin-top: 3%;
  }

  .pad-label {
    padding: 20px 20px 20px 0px;
  }

  .w100 {
    width: $w150;
  }

  label {
    text-align: left;
  }

  
  .full-width {
    width: 100%;
  }
</style>