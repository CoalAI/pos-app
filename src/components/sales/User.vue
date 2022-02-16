<template>
  <div class="user-container">
    <div class="diff-shadow">
      <div class="page-upper">
        <div>
          <router-link to="/user/create" class="btn user-btn ab_btn btn-orange">Add New User</router-link>
        </div>
        <div id="search-container">
            <form class="ab-form-pos">
                <input
                  label="Username"
                  name="username"
                  type="text"
                  placeholder="Search"
                  class=""
                  v-model="search"
                  @input="searchUsers"
                />
                <button class="btn ab-pos btn-orange" @click="searchUsers">
                  <svg id="White_search_icon" data-name="White search icon" xmlns="http://www.w3.org/2000/svg" width="13.049" height="13.048" viewBox="0 0 13.049 13.048">
                    <path id="Path_99" data-name="Path 99" d="M23.076,23.074a.816.816,0,0,1,1.154,0l3.14,3.14a.816.816,0,0,1-1.153,1.154l-3.14-3.14a.816.816,0,0,1,0-1.154Z" transform="translate(-14.56 -14.558)" fill="#fff" fill-rule="evenodd"/>
                    <path id="Path_100" data-name="Path 100" d="M5.3,9.786A4.485,4.485,0,1,0,.816,5.3,4.485,4.485,0,0,0,5.3,9.786ZM10.6,5.3A5.3,5.3,0,1,1,5.3,0a5.3,5.3,0,0,1,5.3,5.3Z" fill="#fff" fill-rule="evenodd"/>
                  </svg>
                </button>
            </form>
        </div>
      </div>
      <div class="ab-mb-7">
        <!-- start here -->
        <table>
          <colgroup>
            <col span="1" style="width: 2%;">
            <col span="1" style="width: 15%;">
            <col span="1" style="width: 15%;">
            <col span="1" style="width: 12%;">
            <col span="1" style="width: 12%;">
            <col span="1" style="width: 12%;">
            <col span="1" style="width: 7%;">
            <col span="1" style="width: 25%;">
          </colgroup>

          <tr class="fr-row header">
            <th>Sr No.</th>
            <th>Username</th>
            <th>Name</th>
            <th>Role</th>
            <th>Company</th>
            <th>Contact</th>
            <th>Credit</th>
            <th></th>
          </tr>
          <template v-for="(user, index) in users" v-bind:key="user.id">
            <tr class="fr-row content">
              <td>{{index + 1}}</td>
              <td>{{user.username}}</td>
              <td>{{user.first_name}} {{user.last_name}}</td>
              <td>{{user.user_type}}</td>
              <td><span v-if="user.company" >{{user.company.company_name}}</span></td>
              <td>{{user.contact_number}}</td>
              <td>{{user.credit}}</td>
              <td>
                <div class="flex-box">
                  <div>
                    <button class="btn ab_btn btn-orange"  @click="setUserActivation(user.id, user.is_active)">
                      <span v-if="user.is_active">Deactivate</span>
                      <span v-else>Activate</span>
                    </button>
                  </div>
                  <div>
                    <router-link :to="{name: 'EditUser', params: {userId: user.id}}" class="btn btn-blue">Edit</router-link>
                  </div>
                </div>
              </td>
            </tr>
          </template>
        </table>
      </div>
      <Paginator :count="counts.users" @pageChange="changePage"/>

      <!-- The deletion Modal -->

    </div>
  </div>
  <Modal v-if="deleteUserModal">
    <template v-slot:header>
      <h2>Confirm <span v-if="userActivation.activate">deactivation</span><span v-else>Activation</span></h2>
    </template>

    <template v-slot:body>
      <p style="text-align: center;">Are you sure you want to <span v-if="userActivation.activate">deactivate</span><span v-else>activate</span> this user?</p>
    </template>

    <template v-slot:footer>
      <div class="delete-model-footer-container">
        <div>
          <button class="btn ab_btn btn-orange delete-model-yes-btn" @click="toggleActivation">Yes</button>
        </div>
        <div>
          <button class="btn btn-blue" @click="closedeleteUserModal">Cancel</button>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

import { ActionTypes } from '@/store/modules/auth/actions';
import Modal from '@/components/common-components/Modal.vue';
import Paginator from '@/components/common-components/Paginator.vue';
import { User } from '@/store/models/user';

export default defineComponent( {
  name: 'User',
  components: {
    Modal,
    Paginator
  },
  data() {
    return {
      deleteUserModal: false,
      search: '',
      userActivation: {
        id: 0,
        activate: true
      }
    }
  },
  computed: {
    ...mapGetters({
      users: 'getListOfUsers',
      counts: 'getTotalCounts',
    })
  },
  // define methods under the `methods` object
  methods: {
    clearUserActivation: function () {
      this.userActivation.id = 0;
      this.userActivation.activate = true;
    },

    setUserActivation: function (id: number, activation: boolean) {
      this.userActivation.id = id;
      this.userActivation.activate = activation;
      this.deleteUserModal = true;
    },

    closedeleteUserModal: function() {
      this.deleteUserModal = false;
      this.clearUserActivation();
    },

    searchUsers: function (event: Event) {
      if (event) {
        event.preventDefault()
      }
      this.getUsers({
        search: this.search
      });
    },

    toggleActivation: async function () {
      const user: User = {
        id: this.userActivation.id,
        is_active: !this.userActivation.activate
      };
      await this.updateUser(user);
      await this.getUsers();
      this.clearUserActivation();
      this.deleteUserModal = false;
    },

    changePage: async function (pageNo: number) {
      await this.getUsers({
        search: this.search,
        page: pageNo
      });
    },

    ...mapActions({
      getUsers: ActionTypes.GET_USERS,
      updateUser: ActionTypes.UPDATE_USER
    })
  },
  async beforeMount () {
    await this.getUsers();
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
  // ab
  .btn{
    border-radius: 0;
    margin: 0;
  }
  .user-container{
    // padding: 2.65% 16%;
    max-width: 1140px;
    margin: 0 auto;
  }
  .diff-shadow{
    padding: 1.6% 5.5% 5.5% 5.5%;
  }

  .page-upper{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  #search-container{
    width: 50%;
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
    padding: 8px 40px;
    cursor: pointer;
    color:$white-color;
    border:none;

    // font-weight:bold;
  }
  
  .ab_btn{
    color: $white-color;
    text-decoration: none;
    padding: 8px 22px;
    cursor: pointer;
    font-size: $btn-font-size;
    border:none;
    border-radius: 20px;
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

  // table desgins
  .fr-row {
    font-size: 12px;
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
  td > .flex-box{
    justify-content: space-around;
  }
  .content{
    background-color: white; 
    color: #0f2634;
  }
  .content > td{
    text-align: center;
  }
  .ab-mb-7{
    margin-bottom: 70px;
  }


  // delete model styles
  .modal-footer{
    justify-content: center;
  }
  .delete-model-yes-btn{
    width: 117px;
    margin-right: 20px;
  }
  .delete-model-footer-container{
    width: 100%;
    display: flex;
    justify-content: center;
  }

  // blur content
  .blur-content{
    filter: blur(2px); 
  }
</style>
