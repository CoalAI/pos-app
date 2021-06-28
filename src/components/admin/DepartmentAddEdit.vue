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
            <option v-for="role in companyTypes" v-bind:key="role" v-bind:value="role">
              {{ role }}
            </option>
          </select>
        </div>
        <div class="flex-box">
          <label class="pad-label w100" for="company-address">
            <strong>Address:</strong>
          </label>
          <div class="full-width">
            <input
              name="company-address"
              type="text"
              placeholder="Enter address"
              v-model="company.address"
            />
          </div>
        </div>
        <div class="flex-box">
          <label class="pad-label w100" for="company-number">
            <strong>Phone Number:</strong>
          </label>
          <div class="full-width">
            <input
              name="company-number"
              type="text"
              placeholder="Enter phone number"
              v-model="company.contactNumber"
            />
            <span v-if="contactNumberValidation" class="form-error">{{contactNumberValidation}}</span>
          </div>
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
        address: '',
        contactNumber: '',
        type: 'FACTORY',
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

    contactNumberValidation: function () {
      let errorMessage = null;
      if (this.company.contactNumber !== '') {
        const regex = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{3,5}-{0,1}\d{7}$/;
        if (!regex.test(this.company.contactNumber)) {
          errorMessage = "Phone number is not valid"
        }
      }
      return errorMessage;
    },

    addEditBtn:  function () {
      let disable = true;
      if (this.comapanyNameValidation === null &&
      this.contactNumberValidation === null) {
        disable = false
      }
      return disable;
    },

    ...mapGetters({
      companyTypes: 'getCompanyTypes',
      userdata: 'getUser',
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
        address: this.company.address,
        contact_number: this.company.contactNumber,
      };

      if (this.companyId) {
        company.id = companyIdNumber;
        await this.updateCompany(company);
      } else {
        if (this.userdata && this.userdata.company) {
          if (this.userdata.company.company_type === 'PARENT') {
            company.parent = this.userdata.company.id;
          } else {
            company.parent = this.userdata.company.parent;
          }
          await this.createCompany(company);
        }
      }
      this.$router.push({name: 'department'});
    },

    loadData: function (company: Company) {
      this.company.name = company.company_name ? company.company_name : '';
      this.company.type = company.company_type ? company.company_type : '';
      this.company.address = company.address? company.address : '';
      this.company.contactNumber = company.contact_number? company.contact_number : '';
    },

    ...mapActions({
      createCompany: ActionTypes.CREATE_COMPANY,
      updateCompany: ActionTypes.UPDATE_COMPANY,
      getCompaniesList: ActionTypes.FETCH_COMPANIES,
      fetchTypes: ActionTypes.FETCH_TYPES,
      getUserData: ActionTypes.USER_DATA,
    })
  },
  async beforeMount () {
    await this.fetchTypes();
    await this.getUserData()

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