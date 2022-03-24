<template>
  <!--<div class="diff-shadow-box">-->
  <div class = "diff-shadow">
    <div class="inline">
      <div class="float-right">
        <div class="mr-1">
          <label class="search-lbl">Search by: Product Name or Barcode</label>
          <form class="flex-box brdr">
            <input
              label="orderIdSearch"
              name="orderIdSearch"
              type="text"
              placeholder="Search"
              class="search-input search-box"
              v-model="search"
              @input="searchInventory"
            />
            <button class="btn-search btn-orange" @click="searchInventory">
              <img :src="searchbar" alt="Search">
            </button>
          </form>
          <label class="search-lbl">Search by Name:</label>
          <form class="flex-box">
            <input
              label="orderIdSearch"
              name="orderIdSearch"
              type="text"
              placeholder="Search"
              class="search-input search-box"
              v-model="search"
              @input="searchInventory"
            />
            <button class="btn-search btn-orange" @click="searchInventory">
              <img :src="searchbar" alt="Search">
            </button>
          </form>
        </div>
        <div>
        <!--<div id="filter-box">
          <select
            v-if="admin"
            id="company-type"
            name="company-type"
            v-model="company"
            @change="onChangeCompany"
          >
            <option value="">All</option>
            <option 
              class="batches-op"
              v-for="company in companies"
              v-bind:key="company.id"
              v-bind:value="company.id"
            >
              {{ company.company_name }}
            </option>
          </select>
        </div>-->
          <div id="company-type">
            <form class="filter inline" v-if="admin">
              <div><input type ="checkbox" value="" @change="onCheckChange" name="company-type" id="company-type"> All</div>
              <div 
              class="batches-op"
              v-for="company in companies"
              v-bind:key="company.id">
              <input 
              type="checkbox" 
              @change="onCheckChange"                
              id="company-type" 
              :value="company.id"
              name="company-type" 
              :checked="checkedValue==company.id"/>
                {{ company.company_name }}
              </div>

              <!--<input type="checkbox" value="2" @change="onCheckChange" :checked="checkedValue==2"/>
              <label>Rohi Sweets</label><br> 
              <input type="checkbox" value="3" @change="onCheckChange" :checked="checkedValue==3"/>
              <label>Rohi Stores</label>-->
            </form>
          </div>
      </div>
      </div>
      
      <table class="float-left">
        <colgroup>
          <col span="1" style="width: 1%" />
          <col span="1" style="width: 7%" />
          <col span="1" style="width: 5%" />
          <col span="1" style="width: 5%" />
          <col span="1" style="width: 6%" />
          <col span="1" style="width: 7%" />
          <col span="1" style="width: 3%" />
          <col span="1" style="width: 4%" />
          <col span="1" style="width: 8%" />
        </colgroup>

        <tr
          class="fr-row header"
        >
          <th style="border-radius: 10px 0px 0px 10px">Sr No.</th>
          <th>Product Name</th>
          <th>Color</th>
          <th>Size</th>
          <th>Barcode</th>
          <th>Batch Expiry</th>
          <th>Active</th>
          <th>Price</th>
          <th style="border-radius: 0px 10px 10px 0px">Quantity in Stock</th>
        </tr>
        <tr
          class="fr-row content"
          v-for="(element, index) in inventory"
          v-bind:key="element.id"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ element.batch.product_variant.product.name }}</td>
          <td>{{ element.batch.product_variant.color }}</td>
          <td>{{ element.batch.product_variant.size }}</td>
          <td>{{ element.batch.product_variant.product.bar_code }}</td>
          <td>{{ element.batch.expiry_date }}</td>
          <td v-if="element.is_active">Yes</td>
          <td v-else>No</td>
          <td>{{ trimDecimalPlaces(element.batch.product_variant.price) }}</td>
          <td class="quantity-color">
            {{ trimDecimalPlaces(element.quantity) }}
          </td>
        </tr>
      </table>
      
    </div> 
    <Paginator
      class="mr-2 pager"
      :count="counts.inventory"
      @pageChange="changePage"
    />
  </div>  
  <!--</div>-->
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

import Paginator from "@/components/common-components/Paginator.vue";
import { ActionTypes } from "@/store/modules/order/actions";
import { ActionTypes as AuthActionTypes } from "@/store/modules/auth/actions";

export default defineComponent({
  name: "Inventory",
  
  components: {
    Paginator,
  },
  data() {
    return {
      searchbar: require('../../assets/search_icon.svg'),
      checkedValue: -1,
      search: "",
      company: "",
    };
  },
  computed: {
    admin() {
      const allowedRoles = ["SUPER_ADMIN", "ADMIN"];
      const allowedCompanies = ["PARENT", "STORE"];
      if (
        this.userdata != null &&
        allowedRoles.includes(this.userdata.user_type) &&
        allowedCompanies.includes(this.userdata.company.company_type)
      ) {
        return true;
      }
      return false;
    },

    ...mapGetters({
      inventory: "getInventory",
      companies: "getInventoryCompanies",
      counts: "getTotalCountsOrderModule",
      userdata: "getUser",
    }),
  },
  methods: {
    onCheckChange: async function(e: any){
      this.checkedValue = e.target.value
      console.log(this.checkedValue)
      await this.fetchInventory({
        company: this.checkedValue,
        search: this.search,
      });
      
    
    },
    onChangeCompany: async function () {
      await this.fetchInventory({
        company: this.company,
        search: this.search,
      });
     
    },

    searchInventory: async function (event: Event) {
      if (event) {
        event.preventDefault();
      }
      await this.fetchInventory({
        company: this.company,
        search: this.search,
      });
    },

    changePage: async function (pageNo: number) {
      await this.fetchInventory({
        company: this.company,
        search: this.search,
        page: pageNo,
      });
    },

    trimDecimalPlaces: function (value: string) {
      return parseFloat(value !== undefined ? value : "0.0").toFixed(2);
    },

    ...mapActions({
      fetchInventory: ActionTypes.FETCH_INVENTORY,
      fetchCompanies: AuthActionTypes.FETCH_ALL_COMPANIES,
      fetchUser: AuthActionTypes.USER_DATA,
    }),
  },
  async beforeMount() {
    await this.fetchInventory();
    await this.fetchCompanies();
    await this.fetchUser();
  }
});
</script>

<style lang="scss" scoped>
.btn-mr {
  margin: 10px;
}

.btn-mr-inner {
  margin: 1px 1px 1px 5px;
}

.pr-var-mr {
  margin: 10px;
}

.pad-label {
  padding: 20px 20px 20px 0px;
}

.quantity-color {
  color: #0f2634;
  text-align: right;
  font-weight: $stock-quantity-weight;
}

#company-type {
  //width: 90%;
  margin-top: 4%;
  margin-left: 8%;
  border-radius:10px;
  padding:10px 0px 10px 12px;
  font-size:12px;
  font-family:seg;
  background-color:#0f2634;
  color:white;
  border:none !important;
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
.inline{
  display:inline-block;
}
.block{
  display:block;
}
.float-right{
  float: right;
  width: 20%;
}

.float-left{
  float: left; 
  width: 80%;
}

.search-box{
  border-radius:20px 0px 0px 20px;
  padding:0px 0px 0px 10px;
  margin: 0px 0px 15px 20px;
  font-size:14px;
  color:#9ea3a6;
  font-family:seg;
  border: 1px solid #dfe0e1;
  border-right-style:none !important;
}
.diff-shadow{
  border: 1px solid $white-color;
  border-radius: 10px;
  padding: 1em 2em;
  margin: 2% 10%;
  margin-left:10% !important;

  -webkit-box-shadow: 1px 1px 5px -1px rgb(0 0 0 / 40%);
  -moz-box-shadow: 1px 1px 5px -1px rgb(0 0 0 / 40%);
  box-shadow: 1px 1px 5px 1px rgb(0 0 0 / 40%);
}
.btn-search:focus{
  outline:none;
}
.search-lbl{
  font-size:9px;
  font-style:italic;
  margin:0px 0px 0px 25px;
  color:#9ea3a6;
}
.btn-search {
    border-radius:0px 20px 20px 0px;
    color: $white-color;
    //padding: $normal-btn-pad;
    margin: 0px 0px 15px;
    cursor: pointer;
    font-family:seg;
    font-size: 10px;
    border: 1px solid #e43d2a;
    border-right-style:none!important;
    text-align: center;
    width:20%; 
  }
  .btn-search:focus{
    outline:none;
  }
  .check {
    //position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    height: 15px;
    width: 15px;
    background-color: white;
    cursor:pointer;
  }

.filter label{
  font-size:14px;
  font-family:seg;
  margin-left:8px;
  margin-bottom:10px;
}
.checkradio{
   appearance: none;
   border: 1px solid #d3d3d3;
   width: 15px;
   height: 15px;
   content: none;
   outline: none;
   background-color:white;
   margin: 0;
   box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.checkradio:checked{
  appearance: none;
  outline: none;
  border: 1px solid #e43d2a;
}
.checkradio:checked::before{
  outline: none;
  border: 1px solid red;
  color:  #0f2634 !important;
  content: "\00A0\2713\00A0" !important;
  background-color: white;
}
</style>
