<template>
  <div>
    <div class="pad-2" style="padding-left: 10px">
      <router-link to="/user/create" class="btn btn-orange btn-mr">Add New User</router-link>
      <div class="float-right">
          <form class="flex-box">
            <input
              label="Username"
              name="username"
              type="text"
              placeholder="Enter user name to search"
              class="search-input"
            />
            <button class="btn btn-orange search-btn">Search user</button>
          </form>
        </div>
    </div>
    <div class="mr-2 pad-2">
      <table>
        <tr>
          <th>Sr No.</th>
          <th>Name</th>
          <th>Role</th>
          <th>Company</th>
          <th>Contact</th>
          <th></th>
        </tr>
        <tr>
          <td>1</td>
          <td>Usama</td>
          <td>Manager</td>
          <td>Rohi</td>
          <td>0324-9640277</td>
          <td style="width: 150px">
            <div class="flex-box">
              <a class="btn btn-orange btn-mr-inner"  @click="deleteUserModal = true">delete</a>
              <a class="btn btn-orange btn-mr-inner">edit</a>
            </div>
          </td>
        </tr>
        <tr>
          <td>1</td>
          <td>Usama</td>
          <td>Manager</td>
          <td>Rohi</td>
          <td>0324-9640277</td>
          <td style="width: 150px">
            <div class="flex-box">
              <a class="btn btn-orange btn-mr-inner" @click="deleteUserModal = true">delete</a>
              <a class="btn btn-orange btn-mr-inner">edit</a>
            </div>
          </td>
        </tr>
      </table>
    </div>

    <!-- The deletion Modal -->
    <Modal v-if="deleteUserModal">
      <template v-slot:header>
        <h2>Confirm Deletion</h2>
      </template>

      <template v-slot:body>
        <p>Are you sure you want to delete this user?</p>
      </template>

      <template v-slot:footer>
        <div class="flex-box">
          <button class="btn btn-orange btn-mr" @click="deleteUserModal = false">Cancel</button>
          <button class="btn btn-orange btn-mr">Yes</button>
        </div>
      </template>
    </Modal>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Modal from '@/components/common-components/Modal.vue';

export default defineComponent( {
  name: 'User',
  components: {
    Modal,
  },
  data() {
    return {
      deleteUserModal: false
    }
  },
  // define methods under the `methods` object
  methods: {
    closedeleteUserModal: function(id: string) {
      this.deleteUserModal = false;
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
