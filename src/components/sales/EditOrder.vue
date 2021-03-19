<template>
    <div class="diff-shadow">
      <div class="pad-1">
        <p>
          <strong>Order Number: </strong><span>1000283</span>
          <strong style="margin-left: 20px;">Order Date: </strong><span>12-03-2021</span>
        </p>
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
      <div class="container-edit-order">
        <div class="box1">
          <div class="flex-box">
            <label class="pad-label w100" for="barcode">
              <strong>Total Amount:</strong>
            </label>
            <input type="text"
            placeholder="Enter total Amount"
            name="total_price"/>
          </div>
          <div class="flex-box">
            <label class="pad-label w100" for="barcode">
              <strong>Discount:</strong>
            </label>
            <input type="text"
            placeholder="Discount on total bill"
            name="total_discount"/>
          </div>
          <div class="flex-box">
            <label class="pad-label w100" for="barcode">
              <strong>Cash Received:</strong>
            </label>
            <input type="text"
            placeholder="Enter received cash"
            name="amount_received"/>
          </div>
          <div class="flex-box">
            <label class="pad-label w100" for="barcode">
              <strong>Cash Returned:</strong>
            </label>
            <input type="text"
            placeholder="Enter returned cash"
            name="amount_received"/>
          </div>
        </div>
        <div class="box2">
          <div class="flex-box">
            <a class="btn btn-orange btn-mr">Edit Order</a>
            <a class="btn btn-orange btn-mr">Cancel</a>
            <a id="delete-btn" class="btn btn-orange btn-mr">Delete Order</a>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EditOrder',
});
</script>

<style lang="scss" scoped>

  .container-edit-order {
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
</style>
