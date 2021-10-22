<template>
        <div class="flex-box marginTop">
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
          <strong>User:</strong>
        </label>
        <select
            id="user"
            name="user"
            class="custom-select"
          >
            <option value="">User (Sale/Admin)</option>
           
          </select>
        </div>
     
      
  <table class="marginTop">
   <thead>
    <tr>
      <th scope="col">User Name</th>
      <th scope="col">User Type</th>
      <th scope="col">Total Orders</th>
      <th scope="col">Total Amount</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>example</td>
      <td>example</td>
      <td>example</td>
      <td>example</td>
    </tr>
  </tbody>
  </table>
      <div class="flex-container marginTop">
        <button class="btn btn-orange" style="width:80px">Print</button>
        
        </div>
     
  

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'OperatorSalesDetail',
  data() {
    const path = window.location.pathname;
    const date = new Date();
    const dateStr = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    return {
      tab: path.split('/')[2],
      startDate: dateStr,
      endDate: dateStr,
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

  .pad-label {
    padding: 20px 20px 20px 0px;
  }

  .w100 {
    width: $w150;
  }

  label {
    text-align: left;
  }
 .marginTop {
  margin-top: 20px;
}
</style>
