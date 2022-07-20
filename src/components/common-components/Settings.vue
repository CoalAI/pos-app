<template>
  <div id="Settings">
    <div class="diff-shadow">
      <!-- <h2>Settings (To Be Implemented)</h2> -->
      <ul class="nav nav-tabs">
        <li :class="tab === 'changeLogo' ? 'active-li' : ''" @click="tab = 'changeLogo'">
          <span>
            <strong>Update Logo</strong>
          </span>
        </li>
        <li :class="tab === 'changeHeaderColor' ? 'active-li' : ''" @click="tab = 'changeHeaderColor'">
          <span>
            <strong>Change Header Color</strong>
          </span>
        </li>
        <li :class="tab === 'companySetting' ? 'active-li' : ''" @click="tab = 'companySetting'">
          <span>
            <strong>Company settings</strong>
          </span>
        </li>
      </ul>
      <div class="cl-container" v-if="tab ==='changeLogo'">
        <div class="logo-img-container">
          <img id="logo_img" :src="logoimg && f_time ? logoimg : img_file" alt="">
        </div>
        <form class="changelogo-form" enctype="multipart/form-data">
          <label for="logo-input">Upload Image</label>
          <input type="file" name="image_url" id="logo-input" @change="loadImage">
        </form>
          <div class="ab_btn_container">
            <div>
              <button class="btn ab_orange_hover btn-orange" @click="sendFormData">
                <span>Set as Logo Image</span>
              </button>
            </div>
            <div>
              <router-link 
                to="/departments"
                class="btn ab_blue_hover btn-blue"
              >Cancel</router-link>
            </div>
          </div>
      </div> 
      <div v-else-if="tab === 'changeHeaderColor'">
        <div class="flex-box">
          <label class="pad-label w100" for="primary-color">
            <strong>Primary Color:</strong>
          </label>
          <input
            id="primary-color"
            name="primary-color"
            type="color"
            value="#e73b2a"
          />
        </div>
        <div class="flex-box">
          <label class="pad-label w100" for="header-color">
            <strong>Header Color:</strong>
          </label>
          <input
            id="header-color"
            name="header-color"
            type="color"
            value="#423144"
          />
        </div>
        <div class="ab_btn_container">
          <div>
            <button class="btn ab_orange_hover btn-orange">
              <span>Change Header Color</span>
            </button>
          </div>
          <div>
            <router-link 
              to="/settings"
              class="btn ab_blue_hover btn-blue"
            >Cancel</router-link>
          </div>
        </div>
      </div>
      <div v-else-if="tab === 'companySetting'">
        <div class="flex-box">
          <label class="pad-label" for="comp_name">
            <strong>Company name:</strong>
          </label>
          <input
            v-if="user_type=='SUPER_ADMIN'"
            name="comp_name"
            type="text"
            placeholder="Enter Name"
            v-model="company.name"
            style = "width:35%"
          />
          <input
            v-else
            name="comp_name"
            type="text"
            placeholder="Enter Name"
            v-model="company.name"
            style = "width:35%"
            readonly
          />
        </div>
        <div class="flex-box">
          <label class="pad-label " for="comp_address">
            <strong>Company address:</strong>
          </label>
          <input
            name="comp_address"
            type="text"
            placeholder="Enter address"
            v-model="company.address"
            style = "width:35%"
          />
        </div>
        <div class="flex-box">
          <label class="pad-label " for="comp_contact">
            <strong>Company contact:</strong>
          </label>
           <input
            name="comp_contact"
            type="text"
            placeholder="Enter contact"
            v-model="company.contactNumber"
            style = "width:35%"
          />
        </div>
        <div class="ab_btn_container">
          <div>
            <button class="btn ab_orange_hover btn-orange"
              :disabled="addEditBtn"
              @click="addUpdateDepartment"
            >
              <span v-if="companyId">Update</span>
              <span v-else>Add</span>
            </button>
          </div>
          <div>
            <router-link 
              to="/settings"
              class="btn ab_blue_hover btn-blue"
            >Cancel</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { ActionTypes as OrderActionTypes } from '@/store/modules/order/actions';
import { ActionTypes as AuthActionTypes} from '@/store/modules/auth/actions';
import { Company } from '@/store/models/company';
import axios from 'axios'

export default defineComponent({
    name: 'Settings',
    data() {
      return {
        tab: 'changeLogo',
        img_file: require('@/assets/rohi_logo.png'),
        selected_file: '',
        f_time: true,
        company: {
          name: '',
          address: '',
          contactNumber: '',
          type: '',
        },
        companyId: "",
        showErrorName: false,
        user_type : "",
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
        logoimg: 'getLogoImg',
        companyTypes: 'getCompanyTypes',
        userdata: 'getUser',
        
      }),
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
          alert("Can not update company")
        }
        alert("Company is updated!!")
        }
      },
      
      loadData: function (company: Company) {
        this.company.name = company.company_name ? company.company_name : '';
        this.company.type = company.company_type ? company.company_type : '';
        this.company.address = company.address? company.address : '';
        this.company.contactNumber = company.contact_number? company.contact_number : '';
      },
      ...mapActions({
        updateLogo: OrderActionTypes.UPDATE_LOGO_IMAGE,
        fetchlogo: OrderActionTypes.FETCH_LOGO_IMAGE,
        updateCompany: AuthActionTypes.UPDATE_COMPANY,
        getCompaniesList: AuthActionTypes.FETCH_COMPANIES,
        fetchTypes: AuthActionTypes.FETCH_TYPES,
        getUserData: AuthActionTypes.USER_DATA,
      }),
      loadImage(event: any) {
        this.img_file = URL.createObjectURL(event.target.files[0])
        this.selected_file = event.target.files[0]
        this.f_time = false
      },
      sendFormData: async function() {
        const formData = new FormData();
        formData.append('image_url', this.selected_file);
        await this.updateLogo(formData)

        await this.fetchlogo()
      }
    },
  async beforeMount () {
    await this.fetchlogo();
    await this.fetchTypes();
    await this.getUserData();

    this.companyId = this.userdata['company'].id;
    this.user_type = this.userdata['user_type'];

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

  },
})
</script>

<style lang="scss" scoped>
  #Settings {
    padding-left: 15%;
    padding-right: 15%;
    margin-top: 3%;
  }

  .pad-label {
    padding: 20px 20px 20px 0px;
    width: 166px;
  }

  .w100 {
    width: $w150;
  }

  label {
    text-align: left;
  }

  // ab css
  .diff-shadow{
    padding: 1.65% 3.56%;
  }
  .nav-tabs{
    border: none;
    position: relative;
    margin-bottom: 50px;
  }
  .nav-tabs > li{
    // width: 135px;
    padding: 0.5rem 2.5rem;
    background-color: #f5f2f2;
    border-radius: 20px;
    // color: white;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
  }
  .nav-tabs > li:last-child{
    text-align: center;
    position: absolute;
    left: 315px;
  }
   .nav-tabs > li:nth-child(2){
    text-align: center;
    position: absolute;
    left: 132px;
  }
  .active-li{
    z-index: 10;
    background-color: $primary-color !important;
    color: white;
  }

  // cl-container
  .cl-container{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 90%;
  }

  // logo image
  #logo_img{
    width: 200px;
    height: 200px;  
    border-radius: 50%;
    object-fit: contain;
    border: 2px solid #0b2532;
    padding: 5px;
    box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.233);
  }

  // form styles
  .changelogo-form > label:first-child{
    border: 1px solid transparent;
    color: white;
    background: #0b2532;
    padding: 5px 15px;
    margin: 10px 30px 0 0;
    border-radius: 20px;
    cursor:pointer;
    
  }
  .changelogo-form > label:hover{
    border: 1px solid #0b2532;
    background-color: white;
    color: #0b2532;
  }
  .changelogo-form > input[type=file]{
    display: none;
  }
  // btn designs
  .ab_btn_container{
    width: 100%;
    margin-top: 50px;
    display: flex;
    justify-content: center;
  }
  .ab_btn_container > div:first-child{
    margin-right: 20px;
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
    padding: 6px 48px;
    border: 1.5px solid #0f2636 !important;
  }
  .ab_blue_hover:hover{
    color: #0f2636;
    background-color: white;
    border: 1.5px solid #0f2636;
  }
  .ab_btn_container a{
    color:white;
  }
</style>
