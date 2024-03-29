<template>
    <div id="AddEditdepartment">
      <div class="diff-shadow">
        <h2>
          <span v-if="companyId">Update</span>
          <span v-else>Add New</span>
          <span> Department</span>
        </h2>
        <div class="upper">
          <div class="left">
            <span class="required">*</span>
            <label class="" for="company-name" style="margin-right: 20px;">
              <strong>Name:</strong>
            </label>
            <div class="ab-input-container">
              <input
                name="company-name"
                type="text"
                placeholder="Enter Name"
                v-model="company.name"
              />
              <span v-if="comapanyNameValidation" class="form-error">{{comapanyNameValidation}}</span>
            </div>
          </div>
          <div class="right">
            <label class="" for="products">
              <strong>Type:</strong>
            </label>
            <div class="ab-select-container">
              <select
                id="company-type"
                name="company-type"
                class=""
                v-model="company.type"
              >
                <option v-for="role in companyTypes" v-bind:key="role" v-bind:value="role">
                  {{ role }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="lower">
          <div class="left">
            <label class="" for="company-address">
              <strong>Address:</strong>
            </label>
            <div class="ab-input-container">
              <input
                name="company-address"
                type="text"
                placeholder="Enter address"
                v-model="company.address"
              />
            </div>
          </div>
          <div class="right">
            <label class="" for="company-number">
              <strong>Contact:</strong>
            </label>
            <div class="ab-input-container">
              <input
                name="company-number"
                type="text"
                placeholder="Enter phone number"
                v-model="company.contactNumber"
              />
              <span v-if="contactNumberValidation" class="form-error">{{contactNumberValidation}}</span>
            </div>
          </div>
        </div>

        <div class="ab_btn_container">
          <div>
            <button 
              class="btn ab_orange_hover btn-orange"
              :disabled="addEditBtn"
              @click="addUpdateDepartment"
            >
              <span v-if="companyId">Update</span>
              <span v-else>Add</span>
            </button>
          </div>
          <div>
            <router-link 
              to="/departments"
              style="margin-left: 20px"
              class="btn ab_blue_hover btn-blue"
            >Cancel</router-link>
          </div>
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
      }, 
      showErrorName: false,
    }
  },
  computed: {
    comapanyNameValidation: function () {
      let errorMessage = null;
      if (this.company.name.length <= 0 && this.showErrorName == true) {
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
      this.showErrorName = true;
      let companyIdNumber = 0;
      if(this.comapanyNameValidation === null){

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
      }
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
    padding: 1.65% 26%;
    // padding-left: 15%;
    // padding-right: 15%;
  }
  .diff-shadow{
    padding: 1.65% 6.56%;
  }
  .diff-shadow > h2{
    text-align: center;
    color: $primary-color;
    margin-bottom: 40px;
  }
  .upper{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .lower{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .left{
    width: 48%;
    display: flex;
    align-items: baseline;
  }
  .right{
    width: 48%;
    display: flex;
    align-items: baseline;
  }
  .ab-select-container > select{
    padding: 8px 18px;
    border-radius: 10px;
    font-size: 12px;
  }
  .ab-input-container > input[type=text]{
    padding: 8px 18px;
    border-radius: 10px;
    font-size: 0.75em;
  }
  .ab-input-container{
    flex-grow: 1
  }
  .ab-select-container{
    flex-grow: 1
  }
  .upper label{
    margin-right: 30px;
    font-size: 0.875em;
  }
  .form-error{
    font-size: 0.65em;
    margin-left: 6px;
  }
  .lower label{
    margin-right: 8px;
  }
  .ab_btn_container{
    margin-top: 50px;
    display: flex;
    justify-content: center;
  }
  .ab_btn_container > div:first-child button:first-child{
    border-radius: 20px;
    padding: 6px 48px;
    border: 1.5px solid $primary-color !important;

  }
  .ab_orange_hover:hover{
    border: 1.5px solid $primary-color;
    color: $primary-color;
    background-color: white;
  }
  .btn-blue{
    background-color:#0f2636;
    border-radius: 20px;
    padding: 6px 42px;
    border: 1.5px solid #0f2636 !important;
    width: 8rem;
  }
  .ab_blue_hover:hover{
    color: #0f2636;
    background-color: white;
    border: 1.5px solid #0f2636;
  }

  .ab_btn_container a{
    color:white;
  }
  .required{
    content:" *";
    color: red;
    font-size: 17px;
    margin-right: 3px;
}
</style>