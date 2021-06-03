<template>
  <div class="diff-shadow pad-2">
    <h2>Request Items</h2>
    <div class="search-grid-list-pages">
      <div class="flex-box"> 
        <label class="pad-label w100">
          <strong>Status filter:</strong>
        </label>
        <select class="transtype custom-select" v-model="searchStatus" @change="onChangeStatusFilter">
          <option value="">All</option>
          <option value="PENDING">PENDING</option>
          <option value="APPROVED">APPROVED</option>
          <option value="COMPLETE">COMPLETE</option>
          <option value="CANCEL">CANCEL</option>
        </select>
      </div>
    </div>
    <div class="mr-2">
      <div class="box1-tab">
        <table>
          <colgroup>
            <col span="1" style="width: 5%;">
            <col span="1" style="width: 5%;">
            <col span="1" style="width: 10%;">
            <col span="1" style="width: 10%;">
            <col span="1" style="width: 10%;">
            <col span="1" style="width: 25%;">
            <col span="1" style="width: 10%;">
            <col span="1" style="width: 10%;">
            <col span="1" style="width: 15%;">
          </colgroup>

          <tr>
            <th>Sr No.</th>
            <th>Req Id</th>
            <th>From</th>
            <th>to</th>
            <th>Request Type</th>
            <th>Description</th>
            <th>Created On</th>
            <th>Delivery Date</th>
            <th>Status</th>
          </tr>
          <template v-for="(request,index) in requests" v-bind:key="request.id">
            <tr @click="selectRequest(request.id)" :class="selected_request===request.id?'table-active':''">
              <td>{{index+1}}</td>
              <td>{{request.id}}</td>
              <td>{{request.sender.username}}<br>{{request.sender.company.company_name}}</td>
              <td>{{request.receiver.username}}<br>{{request.receiver.company.company_name}}</td>
              <td>{{request.request_type}}</td>
              <td>{{request.description}}</td>
              <td>{{datestr(request.created)}}</td>
              <td>{{request.expected_delivery_date}}</td>
              <td>
                <select
                class="custom-select"
                v-model="request.status"
                @change="sendResponse(request.id)"
                :disabled="diableRequestStatus(request.id)">
                  <option value="PENDING">PENDING</option>
                  <option v-if="request.status === 'APPROVED' || user.company.company_type == 'STORE'" value="APPROVED">APPROVED</option>
                  <option v-if="request.status === 'COMPLETE' || user.company.company_type == 'STORE'" value="COMPLETE">COMPLETE</option>
                  <option value="CANCEL">CANCEL</option>
                </select>
              </td>
            </tr>      
          </template>
        </table>
      </div>
      <div class="container">
        <h2>Request Detail</h2>
        <textarea id="requestdetail" type="text" v-bind:value="request_detail" readonly></textarea>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

import { Request } from '@/store/models/request';
import { ActionTypes as OrderActionTypes } from '@/store/modules/order/actions';
import { ActionTypes as AuthActionTypes } from '@/store/modules/auth/actions';


export default defineComponent({
  name:'Response',
  data(){
    return {
      request_detail:'request detail here!',
      searchStatus: 'PENDING',
      selected_request: 0,
    }
  },
  computed: {
    ...mapGetters({
      requests: 'getListOfRequests',
      user: 'getUser',
    })
  },
  methods:{
    selectRequest: function (requestId: number) {
      const request = this.requests.find((item: Request) => item.id && item.id == requestId);
      let buffer = '';
      if (request) {
        buffer+=request.id +'\r\n';
        buffer+=request.sender.username+'\r\n';
        buffer+=request.created+'\r\n';
        buffer+=request.expected_delivery_date+'\r\n';
        buffer+=request.status+'\r\n';
        buffer+=request.request_type+'\r\n';
      }
      this.request_detail=buffer+'\r\n';
      this.selected_request = requestId;
    },

    diableRequestStatus: function (requestId: number) {
      const request = this.requests.find((item: Request) => item.id && item.id == requestId);
      const unChangedStatuses = ['APPROVED', 'CANCEL',];
      if (request.status === 'COMPLETE' ||
      (this.user.company.company_type == 'RETIAL' && unChangedStatuses.includes(request.status))) {
        return true;
      }
      return false;
    },

    sendResponse: async function (requestID: number) {
      const request = this.requests.find((item: Request) => item.id && item.id == requestID);
      await this.updateRequest({
        id: request.id,
        status: request.status,
      });
    },

    onChangeStatusFilter: async function () {
      if (this.user) {
        let filter = {};
        if (this.user.company.company_type == 'RETIAL') filter = {sender__company: this.user.company.id, status: this.searchStatus};
        else if (this.user.company.company_type == 'STORE') filter = {receiver__company: this.user.company.id, status: this.searchStatus};
        await this.fetchRequests(filter);
      }
    },

    datestr: function(date: string) {
      const _date = new Date(date);
      return _date.getFullYear() + '-' + _date.getMonth() + '-' + _date.getDate();
    },

    ...mapActions({
      fetchRequests: OrderActionTypes.FETCH_REQUESTS,
      updateRequest: OrderActionTypes.UPDATE_REQUEST,
      userdata: AuthActionTypes.USER_DATA,
    })
  },
  async beforeMount () {
    await this.userdata();
    await this.onChangeStatusFilter();
  }
});
</script>




<style lang="scss" scoped>
  #requestdetail{
    height:$w200;
  }

  .pad-label {
    padding: 20px 20px 20px 0px;
  }

  .w100 {
    width: $w150;
  }

  .table-active{
    background-color:rgba(0,0,0,.4)
  }

  .box1-tab {
    overflow-y: auto;
    height: $order-item-table-height;
  }
</style>
