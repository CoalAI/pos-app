<template>
  <div id="detail">
    <div class="diff-shadow">
        <div class="flex-box">
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
      <div class="flex-box">
        <label class="pad-label ls" for="start_date">
          <strong>Start:</strong>
        </label>
        <div class="s-i">
          <input
            name="start_date"
            type="date"
            v-model="startDate"
          />
        </div>
        <label class="pad-label mr-l le" for="end_date">
          <strong>End:</strong>
        </label>
        <div class="e-i">
          <input
            name="end_date"
            type="date"
            v-model="endDate"
          />
        <span v-if="dateValidation" class="form-error">{{dateValidation}}</span>
        </div>
        <div class="b" style="margin-left: 10px">
          <button class="btn btn-orange">Search</button>
        </div>
      </div>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <span class="nav-link">
              <strong>User Name</strong>
          </span>
        </li>
       <li class="nav-item">
          <span class="nav-link">
              <strong>User Type</strong>
          </span>
        </li>
        <li class="nav-item">
          <span class="nav-link">
              <strong>Total Orders</strong>
          </span>
        </li>
        <li class="nav-item">
        <span class="nav-link">
              <strong>Total Amount</strong>
          </span>
        </li>
      </ul>
      
  <table>
    <colgroup>
      <col span="1" style="width: 25%;">
      <col span="1" style="width: 25%;">
      <col span="1" style="width: 25%;">
      <col span="1" style="width: 25%;">
    </colgroup>
    <tr>
      <td>example</td>
      <td>example</td>
      <td>example</td>
      <td>example</td>
    </tr>
  </table>
      <div class="flex-container">
        <button class="btn btn-orange" style="width:80px">Print</button>
        
        </div>
      </div>
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
