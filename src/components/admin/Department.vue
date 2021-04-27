<template>
  <div class="diff-shadow">
    <h2>Departments (To Be Implemented)</h2>
    <div class="search-grid-list-pages">
        <div id="filter-box">
          <router-link to="/department/create" class="btn btn-orange add-btn-width">Add New Department</router-link>
          <select
            id="company-type"
            name="productdepartment"
            class="custom-select"
          >
            <option>Store</option>
            <option>Factory</option>
            <option>Retail</option>
          </select>
        </div>
        <div class="float-right">
          <form class="flex-box">
            <input
              type="text"
              placeholder="Enter department name to search"
              class="search-input"
            />
            <button class="btn btn-orange search-btn">Search Department</button>
          </form>
        </div>
    </div>
    <div class="mr-2">
      <table>
        <colgroup>
          <col span="1" style="width: 10%;">
          <col span="1" style="width: 50%;">
          <col span="1" style="width: 20%;">
          <col span="1" style="width: 30%;">
        </colgroup>

        <tr>
          <th>Sr No.</th>
          <th>Department Name</th>
          <th>Type</th>
          <th></th>
        </tr>
        <tr>
          <td>1</td>
          <td>Godam</td>
          <td>Factory</td>
          <td style="width: 150px">
            <div class="flex-box">
              <a class="btn btn-orange btn-mr-inner" @click="deletedepartmentModal = true">delete</a>
              <a class="btn btn-orange btn-mr-inner">edit</a>
            </div>
          </td>
        </tr>
        <tr>
          <td>1</td>
          <td>Branch 1: Shahabpura</td>
          <td>Retail</td>
          <td style="width: 150px">
            <div class="flex-box">
              <a class="btn btn-orange btn-mr-inner" @click="deletedepartmentModal = true">delete</a>
              <a class="btn btn-orange btn-mr-inner">edit</a>
            </div>
          </td>
        </tr>
      </table>
    </div>

    <!-- The deletion Modal -->
    <Modal v-if="deletedepartmentModal">
      <template v-slot:header>
        <h2>Confirm Deletion</h2>
      </template>

      <template v-slot:body>
        <p>Are you sure you want to delete this department?</p>
      </template>

      <template v-slot:footer>
        <div class="flex-box">
          <button class="btn btn-orange btn-mr" @click="deletedepartmentModal = false">Cancel</button>
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
  name: 'Department',
  components: {
    Modal,
  },
  data() {
    return {
      deletedepartmentModal: false
    }
  },
  // define methods under the `methods` object
  methods: {
    closeDeletedepartmentModal: function(id: string) {
      this.deletedepartmentModal = false;
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
  #company-type {
    width: $w200;
    margin-left: 5%;
  }
</style>
