<template>
  <div class="diff-shadow pad-2">
    <h2>Request Items</h2>
    <div class="search-grid-list-pages">
      <router-link to="/requests" class="btn btn-orange add-btn-width">Create Request</router-link>
      <div class="transtypecont container"> 
        <label>Trans Type:</label>
        <select class="transtype custom-select">
          <option value="0" disabled>Trans Type</option>
          <option value="APPROVED">APPROVED</option>
          <option value="PENDING">PENDING</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>
      </div>
    </div>
      <div class="mr-2">
        <table>
            <colgroup>
              <col span="1" style="width: 2%;">
              <col span="1" style="width: 15%;">
              <col span="1" style="width: 15%;">
              <col span="1" style="width: 12%;">
              <col span="1" style="width: 12%;">
              <col span="1" style="width: 12%;">
              <col span="1" style="width: 22%;">
            </colgroup>

            <tr>
              <th>Sr No.</th>
              <th>Req Id</th>
              <th>From</th>
              <th>Req Type</th>
              <th>Created On</th>
              <th>Delivery Date</th>
              <th>Status</th>
            </tr>
            <template v-for="(request,index) in requests" v-bind:key="request.id">
              <tr @click="selectRequest(request.id)" :class="selected_request===request.id?'table-active':''">
                <td>{{index+1}}</td>
                <td>{{request.id}}</td>
                <td>{{request.from}}</td>
                <td>{{request.request_type}}</td>
                <td>{{datestr(request.created)}}</td>
                <td>{{request.expected_delivery_date}}</td>
                <td>
                  <select class="custom-select" v-model="request.status">
                    <option value="APPROVED">APPROVED</option>
                    <option value="PENDING">PENDING</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                </td>
              </tr>      
            </template>
        </table>
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
      selected_request: 0
    }
  },
  computed: {
    ...mapGetters({
      requests: 'getListOfRequests',
      user: 'getUser',
    })
  },
  methods:{
    selectRequest: function(requestId: number){
      const request = this.requests.find((item: Request) => item.id && item.id == requestId);
      let buffer = '';
      buffer+=request?.id+'\r\n'
      buffer+=request?.from+'\r\n'
      buffer+=request?.created_on+'\r\n'
      buffer+=request?.delivery_date+'\r\n'
      buffer+=request?.status+'\r\n'
      buffer+=request?.type+'\r\n'
      this.request_detail=buffer+'\r\n'
      this.selected_request = requestId
    },

    datestr: function(date: string) {
      const _date = new Date(date);
      return _date.getFullYear() + '-' + _date.getMonth() + '-' + _date.getDate();
    },

    ...mapActions({
      fetchRequests: OrderActionTypes.FETCH_REQUESTS,
      userdata: AuthActionTypes.USER_DATA,

    })
  },
  async beforeMount () {
    await this.userdata();
    if (this.user) {
      let filter;
      if (this.user.company.company_type == 'RETAIL') filter = {requester__company: this.user.company.id};
      else if (this.user.company.company_type == 'STORE') filter = {requestee__company: this.user.company.id};
      await this.fetchRequests(filter);
    }
  }
});
</script>




<style lang="scss" scoped>
 #requestdetail{
     height:$w200;
 }
 .transtype{
    max-width: $w200;
    margin-left: $label-pad;
 }  

 .transtypecont.container{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    justify-content: flex-end;
    align-items: center;
 }
.table-active{
    background-color:rgba(0,0,0,.4)
}
</style>
