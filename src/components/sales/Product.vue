<template>
  <!--<div class="diff-shadow pad-2">-->
    <div class="product-container">
      <div class= "diff-shadow">
        <!--<h2>Products</h2>-->
        <div class="page-upper">
          <div>
            <router-link v-show="allowedAddProduct" to="/product/create" class="product-btn ab_btn btn-orange">Add New Product</router-link>
          </div>
          <div id="search-container">
            <form class="ab-form-pos">
              <input
                label="Username"
                name="username"
                type="text"
                placeholder="Search"
                class="input-search"
                v-model="search"
                @input="searchProducts"
              />
              <button class="btn ab-pos btn-orange" @click="searchProducts">
                <svg id="White_search_icon" data-name="White search icon" xmlns="http://www.w3.org/2000/svg" width="13.049" height="13.048" viewBox="0 0 13.049 13.048">
                    <path id="Path_99" data-name="Path 99" d="M23.076,23.074a.816.816,0,0,1,1.154,0l3.14,3.14a.816.816,0,0,1-1.153,1.154l-3.14-3.14a.816.816,0,0,1,0-1.154Z" transform="translate(-14.56 -14.558)" fill="#fff" fill-rule="evenodd"/>
                    <path id="Path_100" data-name="Path 100" d="M5.3,9.786A4.485,4.485,0,1,0,.816,5.3,4.485,4.485,0,0,0,5.3,9.786ZM10.6,5.3A5.3,5.3,0,1,1,5.3,0a5.3,5.3,0,0,1,5.3,5.3Z" fill="#fff" fill-rule="evenodd"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
        <div class="ab-mb-7">
          <table>
            <colgroup>
              <col span="1" style="width: 2%;">
              <col span="1" style="width: 15%;">
              <col span="1" style="width: 10%;">
              <col span="1" style="width: 12%;">
              <col span="1" style="width: 5%;">
              <col span="1" style="width: 30%;">
              <col span="1" style="width: 24%;">
            </colgroup>

            <tr class="fr-row header">
              <th style="border-radius: 10px 0px 0px 10px">Sr No.</th>
              <th>Product Name</th>
              <th>Bar code</th>
              <th>Category</th>
              <th>Token</th>
              <th>Product Variants</th>
              <th style="border-radius: 0px 10px 10px 0px">Delete / Edit</th>
            </tr>
            <template v-for="(product, index) in productsList" v-bind:key="product.id">
              <tr class="fr-row content"> 
                <td>{{ index + 1 }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.bar_code }}</td>
                <td v-if="product.category">{{ getCategoryName(product.category) }}</td><td v-else class="text-center">-</td>
                <td v-if="product.token">Yes</td><td v-else>No</td>
                <td>
                  <table class="nested-table ">
                    <colgroup>
                      <col span="1" style="width: 40%;">
                      <col span="1" style="width: 40%;">
                      <col span="1" style="width: 20%;">
                    </colgroup>

                    <tr class="fr-row header2">
                      <th style="border-radius: 10px 0px 0px 0px; text-align:center">Cost Price</th>
                      <th style="text-align:center">Price</th>
                      <th style="border-radius: 0px 10px 0px 0px; text-align:center">Size</th>
                    </tr>

                    <tr v-for="productVariant in product.product_variant" v-bind:key="productVariant.id" class="fr-row content2">
                      <td style="border-radius:0px 0px 0px 10px;">{{ productVariant.price }}</td>
                      <td>{{ productVariant.sale_price }}</td>
                      <td style="border-radius: 0px 0px 10px 0px;" v-if="productVariant.size">{{productVariant.size}}</td><td style="border-radius: 0px 0px 10px 0px;" v-else class="text-center">-</td>
                    </tr>
                  </table>
                </td>
                <td style="">
                  <div class="flex-box">
                    <div>
                      <button class="ab_btn btn-orange" @click="OpenDeleteProductModal(product)">Delete</button>
                    </div>
                    <div>
                      <router-link :to="{name: 'EditProduct', params: {productId: product.id}}" class="btn-blue">Edit</router-link>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
          </table>
        </div>
        <Paginator class="mr-2" :count="productsCount" @pageChange="changePage"/>

        <!-- The deletion Modal -->
        <Modal v-if="deleteProductModal">
          <template v-slot:header>
            <h2 class="head">Confirm Delete</h2>
          </template>

          <template v-slot:body>
            <p style="text-align:center"><strong>Are you sure you want to delete this product?</strong></p>
            <template v-if="deleteProduct">
              <table id="delete-table" class="mr-1">
                <tr>
                  <td><strong style="color:#e43d2a">Name:</strong></td>
                  <td>{{deleteProduct.name}}</td>
                  <td><strong style="color:#e43d2a">Barcode:</strong></td>
                  <td>{{deleteProduct.barcode}}</td>
                </tr>
              </table>
            </template>
          </template>

          <template v-slot:footer>
            <div class="flex-box">
              <button class="btn-tab btn-orange btn-mr" @click="deleteProductYes">Yes</button>
              <button class="btn-tab btn-blue btn-mr" @click="closeDeleteProductModal">Cancel</button>
              
            </div>
          </template>
        </Modal>

      </div>
    </div>
  
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Modal from '@/components/common-components/Modal.vue';
import Paginator from '@/components/common-components/Paginator.vue';
import { mapActions, mapGetters } from 'vuex';
import { ActionTypes } from '@/store/modules/order/actions';
import { Category, Product } from '@/store/models/product';

export default defineComponent({
  name: 'Product',
  components: {
    Modal,
    Paginator
  },
  data() {
    return {
      searchbar: require('../../assets/search_icon.svg'),
      search: '',
      deleteProductModal: false,
      deleteProduct: {
        id: '',
        name: '',
        barcode: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      productsList: 'getListOfProducts',
      userdata: 'getUser',
      productsCount: 'getProductsCount',
      categories: 'getCategories',
    }),
    allowedAddProduct(){
      const allowedRoles = ['ADMIN','SUPER_ADMIN'];
      const rol: string = this.userdata!=null ? this.userdata.user_type : '';
      return (rol!==null && allowedRoles.includes(rol));
    }
  },
  // define methods under the `methods` object
  methods: {
    clearDeleteProduct: function () {
      this.deleteProduct.id = '';
      this.deleteProduct.name = '';
      this.deleteProduct.barcode = '';
    },

    getCategoryName(id: number) {
      const cate = this.categories.find((cate: Category) => cate && cate.id && 
      typeof cate.id === 'number' && cate.id == id);
      return cate ? cate.name : '-';
    },

    closeDeleteProductModal: function () {
      this.deleteProductModal = false;
      this.clearDeleteProduct();
    },

    OpenDeleteProductModal: function (product: Product) {
      this.deleteProductModal = true;
      this.deleteProduct.id = product && product.id ? product.id.toString() : '';
      this.deleteProduct.name = product && product.name ? product.name.toString() : '';
      this.deleteProduct.barcode = product && product.bar_code ? product.bar_code.toString() : '';
    },

    searchProducts: function (event: Event) {
      if (event) {
        event.preventDefault()
      }
      this.getProducts(this.search)
    },

    deleteProductYes: async function () {
      if (this.deleteProduct && this.deleteProduct.id) {
        await this.deleteProductAction(this.deleteProduct.id?.toString());
        await this.getProducts();
        this.deleteProductModal = false;
        this.clearDeleteProduct();
      }
    },

    changePage(pageNo: number) {
      this.getProductsByPage(pageNo);
    },

    ...mapActions({
        getProducts: ActionTypes.GET_PRODUCTS,
        deleteProductAction: ActionTypes.DELETE_PRODUCT,
        getProductsByPage: ActionTypes.GET_PRODUCTS_BY_PAGE,
        fetchCategories: ActionTypes.FETCH_CATEGORIES,
    })
  },
  async beforeMount () {
    await this.getProducts('');
    await this.fetchCategories();
  }
});
</script>

<style lang="scss" scoped>
//   .btn-mr{
//     margin: 10px;
//   }

//   .btn-mr-inner{
//     margin: 1px 1px 1px 5px;
//   }

//   .pr-var-mr {
//     margin: 10px;
//   }

//   #delete-table td {
//     border: none;
//     padding:0  !important;
//     width:12%;
//   }
//   #delete-table tr:nth-child(even) {
//     background-color: $white-color;
//   }

  .nested-table td {
    background-color: #d4d1cf !important;
    padding: 3px;
    //border-radius:0px 0px 10px 10px;
  }

  .nested-table th {
    padding: 3px;
  }
  .btn-b{
    font-family:seg;
  font-size: 12px;
  margin:20px 0px 0px 0px;
  padding:8px;
  border-radius: 20px;
  width: 108px;
  padding:5px;
  cursor: pointer;
  color:$white-color;
  border:none;
  font-weight:bold;
  text-decoration: none;
  text-align: center;
  height:28px;
  }
  .btn-b:focus{
    outline:none;
  }
//   .input-search{
//     border-radius:30px 0px 0px 30px;
//     font-family:seg;
//     font-size:12px;
//     padding:8px 10px;
//     width:250px;
//     border:1px #cfd1d0 solid;
//     margin-top:0 !important;
//   }
//   .diff-box {
//     border: 1px solid $white-color;
//     border-radius: 10px;
//     padding: 1em 4em;
//     margin: 2% 10%;
//     margin-left:10% !important;

//     -webkit-box-shadow: 1px 1px 5px -1px $login-shodow-color;
//     -moz-box-shadow: 1px 1px 5px -1px $login-shodow-color;
//     box-shadow: 1px 1px 5px -1px $login-shodow-color;
//   }
//   .search-btn{
//     border-radius:0px 30px 30px 0px;
//     padding:5px;
//     text-decoration: none;
//     text-align: center;
//     height:36px;    
//     border:none;
    
//   }
//   .search-btn:focus{
//     outline:none;
//   }
//   .mr-l{
//     margin-left:100px;
//   }
//   .search-lbl{
//   font-size:11px;
//   font-style:italic;
//   color:#2f3437;
//   margin-bottom:0 !important;
//   margin-left:110px;
// }
.fr-row {
  font-size: 12px;
  font-family: seg;
  vertical-align:text-bottom;
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
.header2{
  border-radius: 5px;
  background-color: #e43d2a; 
  color: white;
  
}
.content{
  background-color: white; 
  color: #0f2634;
  text-align:center;
}
.content2{
  background-color: blue !important; 
  color: #0f2634;
  text-align:center;
}
td{
  text-align:center !important;
  
}
.modal-container{
  width:37% !important;
}

// ab csss
.btn{
  border-radius: 0;
  margin: 0;
}
.product-container{
  // padding: 2.65% 16%;
  max-width: 1140px;
  margin: 0 auto;
}
.diff-shadow{
  padding: 1.6% 5.5% 5.5% 5.5%;
  // border: 1px solid #ffffff;
  // border-radius: 10px;
  // margin-top: 15px;
  // box-shadow: 1px 1px 5px -1px rgba(0, 0, 0, 0.75);
}

.page-upper{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#search-container{
  width: 50%;
}
.product-btn{
  padding: 8px 22px !important;
}
.btn-blue{
  text-decoration: none;
  text-align: center;
  background-color:#0f2636;
  // font-family:seg;
  font-size: 12px;
  border-radius: 20px;
  // width: 135px;
  // padding:5px;
  padding: 6px 40px;
  cursor: pointer;
  color:$white-color;
  border: 1.5px solid #0f2636 !important;
  // font-weight:bold;
}
// hover blue
.btn-blue:hover{
  color: #0f2636;
  background-color: white;
  border: 1.5px solid #0f2636;
}
.ab_btn{
  color: $white-color;
  text-decoration: none;
  padding: 4px 22px;
  cursor: pointer;
  font-size: $btn-font-size;
  border: 1.5px solid $primary-color !important;
  border-radius: 20px;
  outline:none;
}
// hover
.ab_btn:hover{
  background-color: white;
  color: $primary-color;
  border: 1.5px solid $primary-color;
  // font-weight: bold;
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
.ab-mb-7{
  margin-top: 20px;
  margin-bottom: 70px;
}
#White_search_icon {
  fill: white;
  width: 24px;
  vertical-align: middle; 
  cursor: pointer;
  background-color: $primary-color;
}
#search-container > span{
  font-size: 0.8em;
  margin-left: 120px;
  font-style: italic;
}
#search-container > form > input{
  width: 80%;
  margin: 0;
  padding: 8px 70px 8px 20px;
  border-radius: 20px;
}
td > .flex-box{
  justify-content: space-around;
  align-items: center;
}
</style>
