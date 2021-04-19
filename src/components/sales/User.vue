<template>
  <div class="diff-shadow pad-2">
    <h2>Users</h2>
    <div class="search-grid-list-pages">
      <router-link to="/user/create" class="btn btn-orange add-btn-width">Add New User</router-link>
      <div id="search-bar">
          <form class="flex-box">
            <input
              label="Username"
              name="username"
              type="text"
              placeholder="Enter Username, Contact or Company name to search"
              class="search-input"
              v-model="search"
              @input="searchUsers"
            />
            <button class="btn btn-orange search-btn" @click="searchUsers">Search user</button>
          </form>
      </div>
    </div>
    <div class="mr-2">
      <table>
        <colgroup>
          <col span="1" style="width: 2%;">
          <col span="1" style="width: 20%;">
          <col span="1" style="width: 20%;">
          <col span="1" style="width: 12%;">
          <col span="1" style="width: 12%;">
          <col span="1" style="width: 12%;">
          <col span="1" style="width: 22%;">
        </colgroup>

        <tr>
          <th>Sr No.</th>
          <th>Username</th>
          <th>Name</th>
          <th>Role</th>
          <th>Company</th>
          <th>Contact</th>
          <th></th>
        </tr>
        <template v-for="(user, index) in users" v-bind:key="user.id">
          <tr>
            <td>{{index + 1}}</td>
            <td>{{user.username}}</td>
            <td>{{user.first_name}} {{user.last_name}}</td>
            <td>{{user.user_type}}</td>
            <td><span v-if="user.company" >{{user.company.company_name}}</span></td>
            <td>{{user.contact_number}}</td>
            <td style="width: 150px">
              <div class="flex-box">
                <button class="btn btn-orange btn-mr-inner"  @click="deleteUserModal = true">
                  <span v-if="user.is_active">Deactivate</span>
                  <span v-else>Activate</span>
                </button>
                <a class="btn btn-orange btn-mr-inner">edit</a>
              </div>
            </td>
          </tr>
        </template>
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
import { mapActions, mapGetters } from 'vuex';

import { ActionTypes } from '@/store/modules/auth/actions';
import Modal from '@/components/common-components/Modal.vue';

export default defineComponent( {
  name: 'User',
  components: {
    Modal,
  },
  data() {
    return {
      deleteUserModal: false,
      search: ''
    }
  },
  computed: {
    ...mapGetters({
      users: 'getListOfUsers'
    })
  },
  // define methods under the `methods` object
  methods: {
    closedeleteUserModal: function(id: string) {
      this.deleteUserModal = false;
      // perform delete logic
    },

    searchUsers: function () {
      this.getUsers(this.search)
    },

    ...mapActions({
      getUsers: ActionTypes.GET_USERS
    })
  },
  async beforeMount () {
    await this.getUsers('');
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
</style>
