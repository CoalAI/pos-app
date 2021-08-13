<template>
  <div class="diff-shadow">
    <h2>Inventory</h2>
    <div class="search-grid-list-pages">
      <div id="filter-box">
        <select
          v-if="admin"
          id="company-type"
          name="company-type"
          class="custom-select"
          v-model="company"
          @change="onChangeCompany"
          size="3"
        >
          <option value="">All</option>
          <option class="batches-op" v-for="company in companies" v-bind:key="company.id" v-bind:value="company.id">
            {{company.company_name}}
          </option>
        </select>
      </div>
      <div class="float-right">
        <form class="flex-box">
          <input
            label="orderIdSearch"
            name="orderIdSearch"
            type="text"
            placeholder="Enter product name or barcode"
            class="search-input"
            v-model="search"
            @input="searchInventory"
          />
          <button class="btn btn-orange search-btn" @click="searchInventory">Search Inventory</button>
        </form>
      </div>
    </div>
    <div class="mr-2">
      <table>
        <colgroup>
          <col span="1" style="width: 3%;">
          <col span="1" style="width: 20%;">
          <col span="1" style="width: 7%;">
          <col span="1" style="width: 10%;">
          <col span="1" style="width: 15%;">
          <col span="1" style="width: 15%;">
          <col span="1" style="width: 5%;">
          <col span="1" style="width: 10%;">
          <col span="1" style="width: 15%;">
        </colgroup>

        <tr>
          <th>Sr No.</th>
          <th>Product Name</th>
          <th>Color</th>
          <th>Size</th>
          <th>Barcode</th>
          <th>Batch Expiry</th>
          <th>Active</th>
          <th>Price</th>
          <th>Quantity in Stock</th>
        </tr>
        <tr v-for="(element, index) in inventory" v-bind:key="element.id">
          <td>{{ index + 1 }}</td>
          <td>{{element.batch.product_variant.product.name}}</td>
          <td>{{element.batch.product_variant.color}}</td>
          <td>{{element.batch.product_variant.size}}</td>
          <td>{{element.batch.product_variant.product.bar_code}}</td>
          <td>{{element.batch.expiry_date}}</td>
          <td v-if="element.is_active">Yes</td><td v-else>No</td>
          <td>{{trimDecimalPlaces(element.batch.product_variant.price)}}</td>
          <td class="quantity-color">{{trimDecimalPlaces(element.quantity)}}</td>
        </tr>
      </table>
      <Paginator :count="counts.inventory" @pageChange="changePage"/>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

import Paginator from '@/components/common-components/Paginator.vue';
import { ActionTypes } from '@/store/modules/order/actions';
import { ActionTypes as AuthActionTypes } from '@/store/modules/auth/actions';

export default defineComponent({
  name: 'Inventory',
  components: {
    Paginator
  },
  data () {
    return {
      search: '',
      company: ''
    }
  },
  computed: {
    admin(){
      const allowedRoles = ['SUPER_ADMIN', 'ADMIN'];
      const allowedCompanies = ['PARENT', 'STORE'];
      if(this.userdata != null && allowedRoles.includes(this.userdata.user_type)
        && allowedCompanies.includes(this.userdata.company.company_type) 
      ){
        return true;
      }
      return false;
    },

    ...mapGetters({
      inventory: 'getInventory',
      companies: 'getInventoryCompanies',
      counts: 'getTotalCountsOrderModule',
      userdata: 'getUser'
    })
  },
  methods: {

    onChangeCompany: async function () {
      await this.fetchInventory({
        company: this.company,
        search: this.search
      });
    },

    searchInventory: async function (event: Event) {
      if (event) {
        event.preventDefault()
      }
      await this.fetchInventory({
        company: this.company,
        search: this.search
      });
    },

    changePage: async function (pageNo: number) {
      await this.fetchInventory({
        company: this.company,
        search: this.search,
        page: pageNo,
      })
    },

    trimDecimalPlaces: function (value: string) {
      return parseFloat(value !== undefined ? value : '0.0').toFixed(2);
    },

    ...mapActions({
      fetchInventory: ActionTypes.FETCH_INVENTORY,
      fetchCompanies: AuthActionTypes.FETCH_ALL_COMPANIES,
      fetchUser: AuthActionTypes.USER_DATA,
    })
  },
  async beforeMount () {
    await this.fetchInventory();
    await this.fetchCompanies();
    await this.fetchUser();
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

  .pad-label {
    padding: 20px 20px 20px 0px;
  }

  .quantity-color {
    color: $green-color;
    text-align: right;
    font-weight: $stock-quantity-weight;
  }

  #company-type {
    width: $w200;
    margin-left: 5%;
  }
</style>
