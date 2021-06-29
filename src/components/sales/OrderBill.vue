<template>
  <div id="bill-preview" class="maindiv-print">
		<div id="header-section">
			<div>
				<img class="img-responsive" src="../../assets/rohi_logo.jpg" alt="Rohi">
			</div>
			<div class="company-info">
				<p class="mb-5 pb-5" style="font-size: 30px;"><strong>Rohi Sweets &amp; Bakers</strong></p>
				<p class="text-center">Zahirpir Road Khanpur</p>
				<p class="text-center">068-5572999</p>
				<p class="text-center">Sales Invoice</p>
				<span class="text-center" style="border: 1px solid black; padding: 2px;">{{order.invoice_id}}</span>
			</div>
		</div>

		<div id="date-section" class="mb-5">
			<p class="text-center">{{getCurrentTime()}}</p>
			<p class="text-center">{{getCurrentDate()}}</p>
		</div>

		<div id="customer-details-sections" style="margin-bottom: 5px">
			<p v-if="getCustomerFullName()!=='' && customer.user_type!=='WALK_IN_CUSTOMER'">
				<span><strong>Customer's Name: </strong></span>
				<span>{{getCustomerFullName()}}</span>
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
				<tr v-for="(orderItem, index) in order.order_item" v-bind:key="orderItem.id">
					<td>{{ index+1 }}</td>
					<td>{{ getProductName(orderItem) }}</td>
					<td>{{ trimNumber(orderItem.quantity) }}</td>
					<td>{{ trimNumber(orderItem.price) }}</td>
					<td>{{ getItemTotal(orderItem.price, orderItem.quantity) }}</td>
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
						<td>{{order.order_item.length}}</td>
					</tr>
					<tr>
						<td><strong>Total Discount: </strong></td>
						<td>{{ trimNumber(order.total_discount) }}</td>
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
						<td>{{trimNumber(order.total)}}</td>
					</tr>
					<tr>
						<td><strong>Received: </strong></td>
						<td>{{trimNumber(order.amount_received)}}</td>
					</tr>
					<tr>
						<td><strong>Change: </strong></td>
						<td>{{change}}</td>
					</tr>
				</table>
			</div>
		</div>

		<div id="footer-section">
			<p>
				<span>Operator: </span>
				<span>{{getOperatorFullName()}}</span>
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
import { ActionTypes } from '@/store/modules/order/actions';
import { defineComponent } from 'vue';
import {mapActions, mapGetters } from 'vuex';

export default defineComponent({
  name: 'OrderBill',
  data(){
		return{
			printDelay: 0,
			tokenPrinting: false
		}
  },
  methods:{
		getElementTag: function(tag: keyof HTMLElementTagNameMap): string {
			const html: string[] = [];
			const elements = document.getElementsByTagName(tag);
			for (let index = 0; index < elements.length; index++) {
				html.push(elements[index].outerHTML);
			}
			return html.join('\r\n');
		},
		getHtmlContents: function() {
			const printContents = document.getElementById("bill-preview");
			return printContents && printContents.innerHTML?printContents.innerHTML:'';
		},
		printBill: function() {
			let styles = '', links = '';
			styles = this.getElementTag('style');
			links = this.getElementTag('link');
			const endscripttag = "/script"
			const printContents = this.getHtmlContents();
			const popupWin = window.open("", "_blank", "top=0,left=0,height=auto,width=auto,focused=false");
			
			if(popupWin){
				popupWin.document.open()
				
				popupWin.document.write(`
				<html>
					<head>
					<title></title>
					${styles}
					${links}
					</head>
					<body>
					${printContents}
					<script defer>
						function triggerPrint(event) {
						window.removeEventListener('load', triggerPrint, false);
						setTimeout(function() {
							closeWindow(window.print());
						}, ${this.printDelay});
						}
						function closeWindow(){
							window.close();
						}
						window.addEventListener('load', triggerPrint, false);
					<${endscripttag}>
					</body>
				</html>`);
				popupWin.document.close();
			}
		},
		getCurrentTime(){
			return new Date(this.order.created).toLocaleTimeString();
		},
		getCurrentDate(){
			return new Date(this.order.created).toDateString();
		},
		getItemTotal: function(price: string, quantity: string): string {
			return (parseFloat(price)*parseFloat(quantity)).toFixed(2);

		},
		getProductName: function(orderItem: any) {
			return orderItem.batch.product_variant.product.name;
		},
		getOperatorFullName: function() {
			const firstname = this.operator.first_name!==undefined?this.operator.first_name:'';
			const lastname = this.operator.last_name!==undefined?this.operator.last_name:'';
			return `${firstname} ${lastname}`;
		},
		getCustomerFullName: function() {
			const firstname = this.customer.first_name!==undefined?this.customer.first_name:'';
			const lastname = this.customer.last_name!==undefined?this.customer.last_name:'';
			return `${firstname} ${lastname}`;
		},
		trimNumber: function(value: string) {
			return parseFloat(value).toFixed(2);

		},
		...mapActions({
			fetchOrder: ActionTypes.FETCH_ORDER,
			clearOrder: ActionTypes.CHANGE_ORDER_STATUS
		}),
    },
	computed:{
		total: function(): string {
			let sum = 0;
			(this.order.order_item).map((item: any) => {
				sum = sum + parseFloat(item.price?item.price:'0')*parseFloat(item.quantity?item.quantity:'0')
			})
			return sum.toFixed(2);
		},
		change: function(): string {
			return (parseFloat(this.order.amount_received) - parseFloat(this.order.total)).toFixed(2);
		},

		...mapGetters({
			order: 'getOrder',
			operator: 'getUser',
		})
	},
	props:{
		orderId: {
			default: 0
		},
		customer: {
			default: {
				first_name:'',
				last_name:'',
				user_type: 'WALK_IN_CUSTOMER'
			}
		}
	},
	mounted: function () {
		this.printBill();
	},
	beforeMount: async function() {
		await this.fetchOrder(this.orderId);
	},
	unmounted: async function() {
		await this.clearOrder();
	}
});
</script>

<style lang="scss" scoped>	
	@page {
		size: 80mm;
		margin: 0
	}
	.company-info{
		display: flex;
		flex-wrap: nowrap;
		flex-direction: column;
		align-content: center;
		justify-content: center;
		align-items: center;
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