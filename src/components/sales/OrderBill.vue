<template>
  <div id="bill-preview" class="maindiv-print">
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
				<tr v-for="(orderItem, index) in orderItems" v-bind:key="orderItem.product.bar_code">
					<td>{{ index+1 }}</td>
					<td>{{ orderItem.product.name }}</td>
					<td>{{ orderItem.quantity}}</td>
					<td>{{ orderItem.price }}</td>
					<td>{{ orderItem.totalPrice}}</td>
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
						<td>{{orderItems.length}}</td>
					</tr>
					<tr>
						<td><strong>Total Discount: </strong></td>
						<td>{{totalDiscount}}</td>
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
						<td>{{total}}</td>
					</tr>
					<tr>
						<td><strong>Net Payable: </strong></td>
						<td>{{net_payable}}</td>
					</tr>
					<tr>
						<td><strong>Received: </strong></td>
						<td>{{cashReceived}}</td>
					</tr>
					<tr>
						<td><strong>Change: </strong></td>
						<td>{{change}}</td>
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
</template>

<script lang="ts">
import { OrderItem } from '@/store/models/orderItem';
import printJS from 'print-js';
import { defineComponent } from 'vue';


export default defineComponent({
  name: 'OrderBill',
  methods:{
		getElementTag: function(tag: keyof HTMLElementTagNameMap): string {
			const html: string[] = [];
			const elements = document.getElementsByTagName(tag);
			for (let index = 0; index < elements.length; index++) {
				html.push(elements[index].outerHTML);
			}
			return html.join('\r\n');
		},

		printBill: function(){
			const styles = this.getElementTag('style');
			printJS({printable:'bill-preview', type: 'html', style: styles, maxWidth:850});
			
		},
    },
	computed:{
		total: function(): number {
			let sum = 0;
			(this.orderItems as OrderItem[]).map((item: OrderItem) => {
				sum = sum + parseFloat(item.price?item.price:'0')*parseFloat(item.quantity?item.quantity:'0')
			})
			return sum;
		},
		net_payable: function(): number{
			let sum = 0;
			(this.orderItems as OrderItem[]).map((item: OrderItem) => {
				if(item && item.totalPrice)
					sum = sum + item.totalPrice
			})
			return sum;
		},
		change: function(): number {
			return parseFloat(this.cashReceived) - this.net_payable;
		},
		totalDiscount: function(): string {
			const disc = (this.total - this.net_payable)/this.total * 100;
			return `${disc.toFixed(2)}%`;
		}
	},
	props:{
		print:{
			default:false
		},
		orderItems: {
			default: []
		},
		cashReceived: {
			default: '0'
		}
	},

	watch:{
		print: function(newVal, oldVal) {
			this.printBill();
		}
	},
});
</script>

<style lang="scss" scoped>

@page {
	size: 80mm;
	margin: 0
}

  .maindiv {
    border: 1px solid black;
    padding: 10px;
  }
  
  .maindiv-print {
    padding: 4px;
	max-width: 800px;
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
</style>