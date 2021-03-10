<template>
  <div>
    <div class="pad-2" style="padding-left: 10px">
        <router-link to="/product/create" class="btn btn-orange btn-mr">Add New Product</router-link>
        <div class="float-right">
          <form class="flex-box">
            <input
              label="Username"
              name="username"
              type="text"
              placeholder="Enter product name to search"
              class="search-input"
            />
            <button class="btn btn-orange search-btn">Search product</button>
          </form>
        </div>
    </div>
    <div class="mr-2 pad-2">
      <table>
        <tr>
          <th>Sr No.</th>
          <th>Bar code</th>
          <th>Name</th>
          <th></th>
        </tr>
        <tr>
          <td>1</td>
          <td>1294u9312</td>
          <td>Sugar</td>
          <td style="width: 150px">
            <div class="flex-box">
              <a class="btn btn-orange btn-mr-inner" @click="deleteProductModal = true">delete</a>
              <a class="btn btn-orange btn-mr-inner">edit</a>
            </div>
          </td>
        </tr>
        <tr>
          <td>1</td>
          <td>1294u9312</td>
          <td>Sugar</td>
          <td style="width: 150px">
            <div class="flex-box">
              <a class="btn btn-orange btn-mr-inner" @click="deleteProductModal = true">delete</a>
              <a class="btn btn-orange btn-mr-inner">edit</a>
            </div>
          </td>
        </tr>
      </table>
    </div>

    <!-- The deletion Modal -->
    <Modal v-if="deleteProductModal">
      <template v-slot:header>
        <h2>Confirm Deletion</h2>
      </template>

      <template v-slot:body>
        <p>Are you sure you want to delete this product?</p>
      </template>

      <template v-slot:footer>
        <div class="flex-box">
          <button class="btn btn-orange btn-mr" @click="deleteProductModal = false">Cancel</button>
          <button class="btn btn-orange btn-mr">Yes</button>
        </div>
      </template>
    </Modal>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Modal from '@/components/common-components/Modal.vue';

export default defineComponent({
  name: 'Product',
  components: {
    Modal,
  },
  data() {
    return {
      deleteProductModal: false
    }
  },
  // define methods under the `methods` object
  methods: {
    closeDeleteProductModal: function(id: string) {
      this.deleteProductModal = false;
      // perform delete logic
    },
  },
});
</script>

<style lang="scss" scoped>
  .btn-mr{
    margin: 10px;
    text-align: center;
  }

  .pad-2 {
    padding: 20px;
  }

  .btn-mr-inner{
    margin: 1px 1px 1px 5px;
    text-align: center;
  }

  .pad-label {
    padding:20px;
  }

  .pr-var-mr {
    margin: 10px;
  }
</style>
