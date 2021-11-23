<template>
     <div class="diff-shadow">
         <div class="flex-box" style="height:60px; width:100%" >
             <label class="pad-label ls" for="department">
           <strong>Department:</strong>
         </label>
         <select
             id="department"
             name="department"
             class="custom-select"
           >
             <option value="">Bakery</option>

           </select>

              <label class="pad-label ls" for="user">
           <strong>Product Category:</strong>
         </label>
         <select
             id="category"
             name="category"
             class="custom-select"
           >
             <option value="">Fresh Goods</option>

           </select>
          <div>
           <button class="btn btn-orange" style="width:80px">Search</button>
          </div>
         </div>
  <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Product Category</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in ProductInfo" :key="product.id">
                    <td>{{product.Name}}</td>
                    <td>{{product.Category}}</td>
                    <td>{{product.Quantity}}</td>
                    <td>{{product.Amount}}</td>
                </tr>
            </tbody>
        </table>
       <div>
         <b> Total Quantity: </b> 
         <p> {{totalQuantity}} </p>
       </div>
        <div>
        <b> Total Amount:</b> 
       <p> PKR {{totalAmount}} </p>
       </div>
       <button class="btn btn-orange" style="width:80px">Print</button>
      </div>
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
 .flex-container {
   display: flex;
   flex-direction: row-reverse;
 }
   #detail {
     padding-left: 15%;
     padding-right: 15%;
     margin-top: 3%;
   }
   .pad-label {
     padding: 20px 20px 20px 0px;
   }
   .w100 {
     width: $w150;
   }
   label {
     text-align: left;
   }
   .full-width {
     width: 100%;
   }
   .checkbox-label {
     font-size: $label-font-size;
   }
   .nav {
     display: -webkit-box;
     display: -ms-flexbox;
     display: flex;
     -ms-flex-wrap: wrap;
     flex-wrap: wrap;
     padding-left: 0;
     margin-bottom: 0;
     list-style: none;
   }
   .nav-tabs {
     border-bottom: 1px solid #dee2e6;
   }
   .nav-tabs .nav-item {
     margin-bottom: -1px;
     width: 25%;
   }
   .nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
     color: $primary-color;
     background-color: #fff;
     border-color: #dee2e6 #dee2e6 #fff;
   }
   .nav-tabs .nav-link {
     border: 1px solid transparent;
     border-top-left-radius: .25rem;
     border-top-right-radius: .25rem;
   }
   .nav-link {
     color: #495057;
     display: block;
     padding: .5rem 1rem;
   }
   a:visited {
     color: #495057;
   }
   .active a {
     color: $primary-color;
   }
    #department {
     width: $w200;
     margin-left: 1%;
     margin-right: 2%
   }
    #user {
     width: $w200;
     margin-left: 1%;
   }
 </style>