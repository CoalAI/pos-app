<template>
  <div class="diff-shadow">
    <h2>Requests</h2>
    <div class="search-grid-list-pages">
        <router-link to="/request/create" class="btn btn-orange add-btn-width">Create Request</router-link>
        <div class="float-right">
          <form class="flex-box">
            <input
              label="Username"
              name="username"
              type="text"
              placeholder="Enter Request number to search"
              class="search-input"
            />
            <button class="btn btn-orange search-btn">Search Request</button>
          </form>
        </div>
    </div>
    <div class="mr-2">
      <table>
        <colgroup>
          <col span="1" style="width: 5%;">
          <col span="1" style="width: 20%;">
          <col span="1" style="width: 10%;">
          <col span="1" style="width: 40%;">
          <col span="1" style="width: 25%;">
        </colgroup>

        <tr>
          <th>Sr No.</th>
          <th>Branch</th>
          <th>Date</th>
          <th>Out of stock Products</th>
          <th></th>
        </tr>
        <tr>
          <td>1</td>
          <td>Bakery 1</td>
          <td>12-02-2021</td>
          <td>-</td>
          <td style="width: 150px">
            <div class="flex-box">
              <a class="btn btn-orange btn-mr-inner" @click="deleteRequestModal = true">Cancel</a>
              <a class="btn btn-orange btn-mr-inner">Details</a>
              <a class="btn btn-orange btn-mr-inner">Accept</a>
            </div>
          </td>
        </tr>
        <tr>
          <td>1</td>
          <td>Bakery 2</td>
          <td>12-02-2021</td>
          <td>Sugar, Strawberry Cake</td>
          <td style="width: 150px">
            <div class="flex-box">
              <a class="btn btn-orange btn-mr-inner" @click="deleteRequestModal = true">Cancel</a>
              <a class="btn btn-orange btn-mr-inner">Details</a>
              <a class="btn btn-orange btn-mr-inner">Accept</a>
            </div>
          </td>
        </tr>
      </table>
    </div>

    <!-- The deletion Modal -->
    <Modal v-if="deleteRequestModal">
      <template v-slot:header>
        <h2>Confirm Deletion</h2>
      </template>

      <template v-slot:body>
        <p>Are you sure you want to delete this Request?</p>
      </template>

      <template v-slot:footer>
        <div class="flex-box">
          <button class="btn btn-orange btn-mr" @click="deleteRequestModal = false">Cancel</button>
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
  name: 'Request',
  components: {
    Modal,
  },
  data() {
    return {
      deleteRequestModal: false
    }
  },
  // define methods under the `methods` object
  methods: {
    closeDeleteRequestModal: function(id: string) {
      this.deleteRequestModal = false;
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
