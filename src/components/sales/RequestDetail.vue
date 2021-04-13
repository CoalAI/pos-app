<template>
  <div class="diff-shadow">
    <div class="pad-1">
      <div style="padding-bottom: 20px">
        <p>
          <strong>TO: </strong><span>Godam</span>
        </p>
        <p>
          <strong>FROM: </strong><span>Bakery 1</span>
        </p>
        <p>
          <strong>Request Number: </strong><span>1000283</span>
        </p>
        <p>
          <strong>Request Date: </strong><span>12-03-2021</span>
        </p>
      </div>
      <div class="table-box">
        <table>
          <tr>
            <th>Sr No.</th>
            <th>Bar Code</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Disc</th>
            <th>Total Price</th>
          </tr>
          <tr>
            <td>1</td>
            <td>3572937</td>
            <td>Germany</td>
            <td>2</td>
            <td>$3</td>
            <td>0.0</td>
            <td>$6</td>
          </tr>
          <tr>
            <td>1</td>
            <td>3572937</td>
            <td>Germany</td>
            <td>2</td>
            <td>$3</td>
            <td>0.0</td>
            <td>$6</td>
          </tr>
          <tr>
            <td>1</td>
            <td>3572937</td>
            <td>Germany</td>
            <td>2</td>
            <td>$3</td>
            <td>0.0</td>
            <td>$6</td>
          </tr>
          <tr>
            <td>1</td>
            <td>3572937</td>
            <td>Germany</td>
            <td>2</td>
            <td>$3</td>
            <td>0.0</td>
            <td>$6</td>
          </tr>
          <tr>
            <td>1</td>
            <td>3572937</td>
            <td>Germany</td>
            <td>2</td>
            <td>$3</td>
            <td>0.0</td>
            <td>$6</td>
          </tr>
          <tr>
            <td>1</td>
            <td>3572937</td>
            <td>Germany</td>
            <td>2</td>
            <td>$3</td>
            <td>0.0</td>
            <td>$6</td>
          </tr>
          <tr>
            <td>1</td>
            <td>3572937</td>
            <td>Germany</td>
            <td>2</td>
            <td>$3</td>
            <td>0.0</td>
            <td>$6</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RequestDetails',
});
</script>

<style lang="scss" scoped>

  .container-edit-Request {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr;
    gap: 0.1em 0.1em;
  }

  .btn-mr{
    margin: 60px 36px;
    padding: 14px;
  }

  .w100 {
    width: $w200;
  }

  .table-box {
    height: $order-item-table-height;
    overflow-y: auto;
  }

  p {
    padding: 10px;
  }
</style>
