<template>
    
  <div class="ab-flex-box" >
    <div class="left">
      <label class="" for="department">
        <strong>Department:</strong>
      </label>
      <div class="ab-select-container">
        <select
          id="department"
          name="department"
          class="custom-select"
        >
          <option value="">Bakery</option>

        </select>
      </div>
    </div>
    <div class="right">
      <label class="" for="user">
        <strong>Product Category:</strong>
      </label>
      <div class="ab-select-container">
        <select
            id="category"
            name="category"
            class="custom-select"
          >
            <option value="">Fresh Goods</option>

        </select>
      </div>
    </div>
    <!-- <div>
      <button class="btn btn-orange" style="width:80px">Search</button>
    </div> -->
  </div>
  <table class="tble-mt">
    <colgroup>
        <col span="1" style="width: 30%;">
        <col span="1" style="width: 30%;">
        <col span="1" style="width: 15%;">
        <col span="1" style="width: 25%;">
    </colgroup>
    <thead>
        <tr class="fr-row header">
            <th>Product Name</th>
            <th>Product Category</th>
            <th>Quantity</th>
            <th>Amount</th>
        </tr>
    </thead>
    <tbody>
        <tr class="fr-row content" v-for="product in ProductInfo" :key="product.id">
            <td>{{product.Name}}</td>
            <td>{{product.Category}}</td>
            <td>{{product.Quantity}}</td>
            <td>{{product.Amount}}</td>
        </tr>
    </tbody>
  </table>
  <!-- commented out as this was not in mockups -->
  <!-- <div>
    <b> Total Quantity: </b> 
    <p> {{totalQuantity}} </p>
  </div>
  <div>
    <b> Total Amount:</b> 
    <p> PKR {{totalAmount}} </p>
  </div>
  <button class="btn btn-orange" style="width:80px">Print</button> -->
 </template>

 <script lang="ts">
 import { defineComponent } from 'vue';
 export default defineComponent({
   name: 'StockStatement',
   data() {
     const path = window.location.pathname;
     const date = new Date();
     const dateStr = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
     return {
       tab: path.split('/')[2],
       startDate: dateStr,
       endDate: dateStr,
       ProductInfo: [
                { Name: 'Butter', Category: 'Food', Quantity: 12, Amount: 500 },
                { Name: 'Eggs', Category: 'Food', Quantity: 1200, Amount: 1500 },
                { Name: 'Flour Bag', Category: 'Food', Quantity: 100, Amount: 100 },
                { Name: 'Yoghurt', Category: 'Food', Quantity: 130, Amount: 700 }
    
            ],
     }
   },
   computed: {
     dateValidation: function(): string | null {
       if(this.startDate !== undefined && this.endDate !== undefined && 
         this.startDate !=='' && this.endDate !== '' &&
         Date.parse(this.startDate) <= Date.parse(this.endDate)
       ){
         return null;
       }
       return 'invalid date range';
     },
     totalQuantity: function() {
      let total = 0;
      for(let i =0; i < this.ProductInfo.length; i++) {
          total = total + this.ProductInfo[i].Quantity
      }
      return total;
     },
     totalAmount: function() {
      let total = 0;
      for(let i =0; i < this.ProductInfo.length; i++) {
          total = total + this.ProductInfo[i].Quantity*this.ProductInfo[i].Amount;
      }
      return total; 
     }

   },
   methods: {
   }
 });
</script>

<style lang="scss" scoped>
  .ab-flex-box{
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .left{
    display: flex;
    align-items: baseline;
    width: 40%;
  }
  .left > label{
    font-size: 13px
  }
  .right{
    display: flex;
    align-items: baseline;
    width: 40%;
  }
  .right > label{
    font-size: 13px;
  }
  .ab-select-container{
    flex-grow: 1;
  }
  .ab-select-container > select{
    margin-left: 10px;
    padding: 8px 18px;
    border-radius: 10px;
    font-size: 12px;
  }
  /* table designs */
  .tble-mt{
    margin: 20px 0;
  }

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
    align-items: center;
  }
  .content{
    background-color: white; 
    color: #0f2634;
  }
  .content > td{
    text-align: center;
  }
</style>