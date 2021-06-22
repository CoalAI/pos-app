<template>
  <div id="bill-preview">
		<div id="header-section">
			<div>
				<img class="img-responsive" src="../../assets/rohi_logo.jpg" alt="Rohi">
			</div>
			<div>
				<p class="mb-5" style="font-size: 30px;"><strong>Rohi Sweets & Bakers</strong></p>
				<p class="text-center">Zahirpir Road Khanpur</p>
				<p class="text-center">068-5572999</p>
				<p class="text-center">Sales Invoice</p>
				<p class="text-center" style="border: 1px solid black; padding: 2px;">30806</p>

			</div>
		</div>

		<div id="date-section" class="mb-5">
			<p class="text-center">3:44 pm</p>
			<p class="text-center">Friday, 11 June, 2021</p>
		</div>

		<div id="customer-details-sections" style="margin-bottom: 5px">
			<p>
				<span><strong>Customer's Name: </strong></span>
				<span>Omer Ali</span>
			</p>
		</div>

		<div id="order-items-section" class="mb-5">
			<table>
				<colgroup>
					<col span="1" style="width: 5%;">
					<col span="1" style="width: 40%;">
					<col span="1" style="width: 15%;">
					<col span="1" style="width: 15%;">
					<col span="1" style="width: 25%;">
				</colgroup>

				<tr>
					<th>Sr#</th>
					<th>Item's Name</th>
					<th>Qty</th>
					<th>Rate</th>
					<th>Amount</th>
				</tr>
				<tr>
					<td>1</td>
					<td style="text-align: left;">Strawberry Cake</td>
					<td>2.00</td>
					<td>1000</td>
					<td style="text-align: right;">2000</td>
				</tr>
				<tr>
					<td>1</td>
					<td style="text-align: left;">Strawberry Cake</td>
					<td>2.00</td>
					<td>1000</td>
					<td style="text-align: right;">2000</td>
				</tr>
				<tr>
					<td>1</td>
					<td style="text-align: left;">Strawberry Cake</td>
					<td>2.00</td>
					<td>1000</td>
					<td style="text-align: right;">2000</td>
				</tr>
				<tr>
					<td>1</td>
					<td style="text-align: left;">Strawberry Cake</td>
					<td>2.00</td>
					<td>1000</td>
					<td style="text-align: right;">2000</td>
				</tr>
				<tr>
					<td>1</td>
					<td style="text-align: left;">Strawberry Cake</td>
					<td>2.00</td>
					<td>1000</td>
					<td style="text-align: right;">2000</td>
				</tr>
				<tr>
					<td>1</td>
					<td style="text-align: left;">Strawberry Cake</td>
					<td>2.00</td>
					<td>1000</td>
					<td style="text-align: right;">2000</td>
				</tr>
				<tr>
					<td>1</td>
					<td style="text-align: left;">Strawberry Cake</td>
					<td>2.00</td>
					<td>1000</td>
					<td style="text-align: right;">2000</td>
				</tr>
				<tr>
					<td>1</td>
					<td style="text-align: left;">Strawberry Cake</td>
					<td>2.00</td>
					<td>1000</td>
					<td style="text-align: right;">2000</td>
				</tr>
				
			</table>
		</div>

		<div id="totals-section" class="mb-5">
			<div id="col-1">
				<table>
					<colgroup>
						<col span="1" style="width: 60%;">
						<col span="1" style="width: 40%;">
					</colgroup>
					<tr>
						<td><strong>Total Units: </strong></td>
						<td>4</td>
					</tr>
					<tr>
						<td><strong>Total Discount: </strong></td>
						<td>0</td>
					</tr>
				</table>
			</div>
			<div id="col-2">
				<table>
					<colgroup>
						<col span="1" style="width: 60%;">
						<col span="1" style="width: 40%;">
					</colgroup>
					<tr>
						<td><strong>Total: </strong></td>
						<td>8000</td>
					</tr>
					<tr>
						<td><strong>Net Payable: </strong></td>
						<td>8000</td>
					</tr>
					<tr>
						<td><strong>Received: </strong></td>
						<td>8500</td>
					</tr>
					<tr>
						<td><strong>Change: </strong></td>
						<td>500</td>
					</tr>
				</table>
			</div>
			<div>
				1
			</div>
		</div>

		<div id="footer-section">
			<p>
				<span>Operator: </span>
				<span>Ammar Haider</span>
			</p>
			<p class="text-center" style="font-size: 20px;"><strong>Thanks for Visiting</strong></p>
		</div>
	</div>
	<div v-if="tokenPrinting">
		<div id="TokenPreview">
			<p class="text-center" style="font-size: 20px;"><strong>Rohi Sweets & Bakers</strong></p>
			<p class="text-center" style="margin: 10px 0px 10px">
				<span style="border: 1px solid black; padding: 2px 20px;">30806</span>
			</p>
			<div id="order-items-section">
				<table>
					<colgroup>
						<col span="1" style="width: 20%;">
						<col span="1" style="width: 70%;">
						<col span="1" style="width: 10%;">
					</colgroup>

					<tr>
						<th>قیمت</th>
						<th>تفصیل</th>
						<th>تعداد</th>
					</tr>

					<tr>
						<td>50</td>
						<td style="text-align: right;"> سنگل سکوپ </td>
						<td>1</td>
					</tr>
				</table>
			</div>
			<hr class="dashed">
			<div class="mb-5">50</div>
			<div id="date-section">
				<p class="text-center">3:44 pm</p>
				<p class="text-center">Friday, 11 June, 2021</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'OrderBill',
  data () {
        return {
            tokenPrinting: false
        }
  }
});
</script>

<style lang="scss" scoped>
    #bill-preview {
    border: 1px solid black;
    padding: 10px;
  }

  #TokenPreview {
	border: 1px solid black;
    padding: 20px 30px;
  }

   #header-section {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr;
    gap: 0.1em 0.1em;
  }

  #date-section {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr;
    gap: 0.1em 0.1em;
  }

  #order-items-section table {
    border-collapse: separate;
  }

  #order-items-section th {
    border-color: black;
    text-align: center;
    padding: 1px;
  }

  #order-items-section td {
    border: none;
    text-align: center;
    padding: 1px;
  }

  #order-items-section tr:nth-child(even) {
    background-color: white;
  }

  #totals-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 0.1em 0.1em;
  }

  #totals-section p {
    text-align: right;
  }

  #totals-section td {
    border: none;
    text-align: right;
    padding: 1px;
  }

  #totals-section tr:nth-child(even) {
    background-color: white;
  }

  .mb-5 {
    border-bottom: 2px solid black;
    padding-bottom: 5px;
  }

  hr.dashed {
	border-top: 1px dashed black;
	}
</style>