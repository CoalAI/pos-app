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
                    <td>{{request.type}}</td>
                    <td>{{request.created_on}}</td>
                    <td>{{request.delivery_date}}</td>
                    <td>
                        <select class="custom-select" v-model="request.status">
                            <option value="APPROVED">APPROVED</option>
                            <option value="PENDING">PENDING</option>
                            <option value="COMPLETED">COMPLETED</option>
                        </select>
                    </td>
                </tr>                
            </template>
            <tbody>
                <tr></tr>
            </tbody>
        </table>
        <div class="container">
            <h2>Request Detail</h2>
            <textarea id="requestdetail" type="text" v-bind:value="request_detail" readonly></textarea>
        </div>
    </div>
</div>

</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name:'Response',
    data(){
        return {
            requests:[
                {
                    id:'1',
                    from:'Sender',
                    created_on:new Date().toDateString(),
                    delivery_date:new Date().toDateString(),
                    status:'PENDING',
                    type:'CHANGE_PASSWORD'
                },
                {
                    id:'2',
                    from:'Sender',
                    created_on:new Date().toDateString(),
                    delivery_date:new Date().toDateString(),
                    status:'APPROVED',
                    type:'SPECIAL_ORDER'
                },
                {
                    id:'3',
                    from:'Sender',
                    created_on:new Date().toDateString(),
                    delivery_date:new Date().toDateString(),
                    status:'COMPLETED',
                    type:'SPECIAL_ORDER'
                }
            ],
            request_detail:'request detail here!',
            selected_request: ''
        }
    },
    methods:{
        selectRequest: function(requestId: string){
            const request = this.requests.find((item)=>item.id===requestId);
            let buffer = '';
            buffer+=request?.id+'\r\n'
            buffer+=request?.from+'\r\n'
            buffer+=request?.created_on+'\r\n'
            buffer+=request?.delivery_date+'\r\n'
            buffer+=request?.status+'\r\n'
            buffer+=request?.type+'\r\n'
            this.request_detail=buffer+'\r\n'
            console.log(request);
            this.selected_request = requestId
        }
    }
    
})
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
