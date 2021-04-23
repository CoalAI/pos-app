<template>
    <div id="AddEditVendor">
      <div class="diff-shadow">
        <h2>
          <span v-if="vendorId">Update</span>
          <span v-else>Add New</span>
          <span> Vendor</span>
        </h2>
        <div class="flex-box">
          <label class="pad-label w100" for="firstname">
            <strong>First Name:</strong>
          </label>
          <input
            name="firstname"
            type="text"
            placeholder="Enter first name"
            v-model="vendor.firstName"
          />
        </div>
        <div class="flex-box">
          <label class="pad-label w100" for="lastname">
            <strong>Last Name:</strong>
          </label>
          <input
            name="lastname"
            type="text"
            placeholder="Enter last name"
            v-model="vendor.lastName"
          />
        </div>
        <div class="flex-box">
          <label class="pad-label w100" for="contact_number">
            <strong>Contact Number:</strong>
          </label>
          <div class="full-width">
            <input
              name="contact_number"
              type="text"
              placeholder="Enter contact"
              v-model="vendor.contact"
            />
            <span v-if="contactNumberValidation" class="form-error">{{contactNumberValidation}}</span>
          </div>
        </div>

        <div v-if="!vendorId" class="flex-box">
          <label class="pad-label w100" for="companies">
            <strong>Company:</strong>
          </label>
          <div class="full-width">
            <select name="companies" class="custom-select" id="companies" v-model="vendor.company">
              <option v-for="company in companies" v-bind:key="company.id" v-bind:value="company.id">
                {{ company.company_name }}
              </option>
            </select>
            <span v-if="companyValidation" class="form-error">{{companyValidation}}</span>
          </div>
        </div>

        <div style="text-align: right; padding-bottom: 50px">
          <router-link
            to="/Vendors"
            style="margin-right: 20px"
            class="btn btn-orange btn-mr btn-link"
          >Cancel</router-link>
          <button
            class="btn btn-orange btn-mr"
            style="width: 150px"
            :disabled="addEditBtn"
            @click="addUpdateVendor"
          >
            <span v-if="vendorId">Update</span>
            <span v-else>Add</span>
            <span> Vendor</span>
          </button>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

import { User } from '@/store/models/user';
import { ActionTypes } from '@/store/modules/auth/actions';

export default defineComponent({
  name: 'VendorAddEdit',
  props: ['vendorId'],
  data () {
    return {
      vendor: {
        contact: '',
        firstName: '',
        lastName: '',
        company: 0
      }
    }
  },
  computed: {
    contactNumberValidation: function () {
      let errorMessage = null;
      if (this.vendor.contact.length <= 0) {
        errorMessage = "Number is required"
      }
      return errorMessage;
    },

    addEditBtn:  function () {
      let disable = true;
      if (this.contactNumberValidation === null) {
        disable = false
      }
      return disable;
    },

    companyValidation: function () {
      let errorMessage = null;
      if (this.companies.length <= 0) {
        errorMessage = "Comapny is required. Add vendor comapany to system"
      }
      return errorMessage;
    },

    ...mapGetters({
      companies: 'getCompanies'
    })
  },
  methods: {
    addUpdateVendor: async function () {
      let vendorIdNumber = 0;
      if (this.vendorId) {
        vendorIdNumber = parseFloat(this.vendorId);
        if (isNaN(vendorIdNumber)) return;
      }

      const user: User = {
        first_name: this.vendor.firstName,
        last_name: this.vendor.lastName,
        username: this.vendor.contact,
        contact_number: this.vendor.contact,
        company: this.vendor.company,
        is_active: true
      };

      if (this.vendorId) {
        user.id = vendorIdNumber;
        await this.updateUser(user);
      } else {
        user.user_type = 'VENDOR';
        await this.registerUser(user);
      }
      this.$router.push({name: 'Vendor'});
    },

    loadData: function (vendor: User) {
      this.vendor.contact = vendor.contact_number ? vendor.contact_number : '';
      this.vendor.firstName = vendor.first_name ? vendor.first_name : '';
      this.vendor.lastName = vendor.last_name ? vendor.last_name : '';
      this.vendor.company = vendor.company && typeof vendor.company === 'number' ? vendor.company : 0;
    },

    ...mapActions({
      registerUser: ActionTypes.REGISTER_USER,
      updateUser: ActionTypes.UPDATE_USER,
      fetchCompanies: ActionTypes.FETCH_COMPANIES,
      getVendorsList: ActionTypes.FETCH_VENDORS
    })
  },
  async beforeMount () {
    await this.fetchCompanies('VENDOR');

    if (this.companies && this.companies.length > 0) {
      this.vendor.company = this.companies[0].id;
    }

    if (this.vendorId) {
      await this.getVendorsList('');
      const vendor_id = parseInt(this.vendorId);
      const vendor = isNaN(vendor_id) ? undefined : this.$store.getters.getSignleVendor(vendor_id);
      if (vendor) {
        this.loadData(vendor);
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
  #AddEditVendor {
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