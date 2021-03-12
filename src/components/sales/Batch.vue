<template>
  <div class="diff-shadow">
    <h2>Batches</h2>
    <div class="search-grid-list-pages">
        <router-link to="/batch/create" class="btn btn-orange add-btn-width">Add New Batch</router-link>
        <div class="float-right">
          <form class="flex-box">
            <input
              label="Username"
              name="username"
              type="text"
              placeholder="Enter batch number to search"
              class="search-input"
            />
            <button class="btn btn-orange search-btn">Search batch</button>
          </form>
        </div>
    </div>
    <div class="mr-2">
      <table>
        <tr>
          <th>Sr No.</th>
          <th>Product Name</th>
          <th>Quantity</th>
          <th>Manufactured Date</th>
          <th>Expiry Date</th>
          <th>In stock</th>
          <th></th>
        </tr>
        <tr>
          <td>1</td>
          <td>Sugar</td>
          <td>25</td>
          <td>12-02-2021</td>
          <td>12-02-2021</td>
          <td>Yes</td>
          <td style="width: 150px">
            <div class="flex-box">
              <a class="btn btn-orange btn-mr-inner" @click="deleteBatchModal = true">delete</a>
              <a class="btn btn-orange btn-mr-inner">edit</a>
            </div>
          </td>
        </tr>
        <tr>
          <td>1</td>
          <td>Sugar</td>
          <td>25</td>
          <td>12-02-2021</td>
          <td>12-02-2021</td>
          <td>Yes</td>
          <td style="width: 150px">
            <div class="flex-box">
              <a class="btn btn-orange btn-mr-inner" @click="deleteBatchModal = true">delete</a>
              <a class="btn btn-orange btn-mr-inner">edit</a>
            </div>
          </td>
        </tr>
      </table>
    </div>

    <!-- The deletion Modal -->
    <Modal v-if="deleteBatchModal">
      <template v-slot:header>
        <h2>Confirm Deletion</h2>
      </template>

      <template v-slot:body>
        <p>Are you sure you want to delete this batch?</p>
      </template>

      <template v-slot:footer>
        <div class="flex-box">
          <button class="btn btn-orange btn-mr" @click="deleteBatchModal = false">Cancel</button>
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
  name: 'Batch',
  components: {
    Modal,
  },
  data() {
    return {
      deleteBatchModal: false
    }
  },
  // define methods under the `methods` object
  methods: {
    closeDeleteBatchModal: function(id: string) {
      this.deleteBatchModal = false;
      // perform delete logic
    },
  },
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
</style>
