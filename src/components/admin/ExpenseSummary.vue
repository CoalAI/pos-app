<template>
  <div class="diff-shadow">
    <h2>Expense Summary (To be implemented)</h2>
    <div class="filter-grid mr-2">
      <div class="sw">
        <label class="custom-radio" style="margin-right: 10px">Daily
          <input type="radio" name="order_type" value="from">
          <span class="checkmark"></span>
        </label>
        <label class="custom-radio" style="margin-right: 10px">Custom
          <input type="radio" name="order_type" value="to">
          <span class="checkmark"></span>
        </label>
      </div>
      <label class="pad-label ls" for="start_date">
        <strong>Start:</strong>
      </label>
      <div class="s-i">
        <input
          name="start_date"
          type="date"
        />
      </div>
      <label class="pad-label mr-l le" for="end_date">
        <strong>End:</strong>
      </label>
      <div class="e-i">
        <input
          name="end_date"
          type="date"
        />
      </div>
      <div class="b">
        <button class="btn btn-orange">Search Summary</button>
      </div>
    </div>
    <div class="mr-2 box1-tab">
      <table>
        <colgroup>
          <col span="1" style="width: 10%;">
          <col span="1" style="width: 40%;">
          <col span="1" style="width: 15%;">
          <col span="1" style="width: 15%;">
          <col span="1" style="width: 30%;">
        </colgroup>

        <tr>
          <th>Sr No.</th>
          <th>Transaction ID</th>
          <th>Received From</th>
          <th>Amount</th>
          <th>More Columns</th>
        </tr>
        <tr>
          <td>1</td>
          <td>0011</td>
          <td>Hammid - Store</td>
          <td>100,000 </td>
          <td></td>
        </tr>
        <tr>
          <td>1</td>
          <td>0011</td>
          <td>Hammid - Store</td>
          <td>100,000 </td>
          <td></td>
        </tr><tr>
          <td>1</td>
          <td>0011</td>
          <td>Hammid - Store</td>
          <td>100,000 </td>
          <td></td>
        </tr><tr>
          <td>1</td>
          <td>0011</td>
          <td>Hammid - Store</td>
          <td>100,000 </td>
          <td></td>
        </tr><tr>
          <td>1</td>
          <td>0011</td>
          <td>Hammid - Store</td>
          <td>100,000 </td>
          <td></td>
        </tr><tr>
          <td>1</td>
          <td>0011</td>
          <td>Hammid - Store</td>
          <td>100,000 </td>
          <td></td>
        </tr><tr>
          <td>1</td>
          <td>0011</td>
          <td>Hammid - Store</td>
          <td>100,000 </td>
          <td></td>
        </tr>
      </table>
    </div>
    <div id="Balance-information" class="mr-2">
      <label class="pad-label" for="balance">
        <strong>Current Balance:</strong>
      </label>
      <div>
        <input
          name="balance"
          type="text"
          value="30,000"
          readonly
        />
      </div>
      <label class="pad-label" for="Starting-Balance">
        <strong>Starting Balance:</strong>
      </label>
      <div>
        <input
          name="Starting-Balance"
          type="text"
          value="30,000"
          readonly
        />
      </div>
      <label class="pad-label" for="expense">
        <strong>Total Expense:</strong>
      </label>
      <div>
        <input
          name="expense"
          type="text"
          value="30,000"
          readonly
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

import { ActionTypes } from '@/store/modules/auth/actions';
import { Company } from '@/store/models/company';

export default defineComponent({
  name: 'ExpenseSummary',
});
</script>

<style lang="scss" scoped>
  .filter-grid {
    display: grid;
    grid-template-columns: 1fr 0.5fr 2fr 0.5fr 2fr 1fr;
    grid-template-rows: 1fr;
    gap: 0.1em 0.1em;
    grid-template-areas:
    "sw ls s-i le e-i b"
  }

  .sw .custom-radio {
    grid-area: sw;
    font-size: 15px;
  }
  .ls {grid-area: ls;}
  .s-i {grid-area: s-i;}
  .le {grid-area: le;}
  .e-i {grid-area: e-i;}
  .b {grid-area: b;}

  #Balance-information {
    display: grid;
    grid-template-columns: 0.3fr 1fr 0.3fr 1fr;
    grid-template-rows: 1fr 1fr;
  }

  .btn-mr{
    margin: 10px;
  }

  .btn-mr-inner{
    margin: 1px 1px 1px 5px;
  }

  .pr-var-mr {
    margin: 10px;
  }

  #company-type {
    width: $w200;
    margin-left: 5%;
  }

  #delete-table td {
    border: none;
  }

  #delete-table tr:nth-child(even) {
    background-color: $white-color;
  }

  .pad-label {
    padding: 20px 20px 20px 0px;
  }

  .mr-l {
    margin-left: 10px;
  }

  .box1-tab {
    overflow-y: auto;
    height: $order-item-table-height;
  }
</style>
