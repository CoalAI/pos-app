<template>
  <div id="bill-preview" class="maindiv-print">
		<div id="header-section">
			<div>
				<img class="img-responsive" :src="logoimg ? logoimg : src_img" alt="Rohi">
			</div>
			<div class="company-info">
				<p class="mb-5 pb-5" style="font-size: 16px;"><strong>{{user.company.company_name}}</strong></p>
				<p class="text-center">{{user.company.address}}</p>
				<p class="text-center">{{user.company.contact_number}}</p>
				<!-- <p class="text-center">Sales Invoice</p>
				<span class="text-center" style="border: 1px solid black; padding: 2px;">{{order.invoice_id}}</span> -->
			</div>
			<div class="company-info">
				<p class="text-center">Sales Invoice</p>
			</div>
		</div>

		<div id="date-section" class="mb-5 pt-5">
			<p class="text-center">{{getCurrentTime()}}</p>
			<p class="text-center">{{getCurrentDate()}}</p>
		</div>


		<div id="order-items-section" class="mb-5">
			<table>
				<colgroup>
					<col span="1" style="width: 5%;">
					<col span="1" style="width: 30%;">
					<col span="1" style="width: 10%;">
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
					<td>{{product_name[index]}}</td>
					<td>{{ trimNumber(orderItem.quantity) }}</td>
					<td>{{ trimNumber(orderItem.price) }}</td>
					<td>{{ getItemTotal(orderItem.price, orderItem.quantity) }}</td>
				</tr>
			</table>
		</div>

		<div id="totals-section" class="mb-5">
			<div id="col-1">
				<table style="font-size: 12px;">
					<colgroup>
						<col span="1" style="width: 75%;">
						<col span="1" style="width: 25%;">
					</colgroup>
					<tr>
						<td><strong>Total Units: </strong></td>
						<td>{{order.order_item.length}}</td>
					</tr>
					<tr>
						<td><strong>Discount: </strong></td>
						<td>{{ trimNumber(order.total_discount) }}</td>
					</tr>
				</table>
			</div>
			<div id="col-2">
				<table style="font-size: 12px;">
					<colgroup>
						<col span="1" style="width: 70%;">
						<col span="1" style="width: 30%;">
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

		<div id="footer-section" style="width:80mm">
			<p class="text-center" style="font-size: 14px;"><strong>Thanks for Visiting</strong></p>
			<p class="text-center" style="font-size: 14px;"><strong>Powered by CoalDev</strong></p>
		</div>
	</div>
</template>

<script lang="ts">
import { OrderItem } from '@/store/models/orderItem';
import { ActionTypes } from '@/store/modules/order/actions';
import { defineComponent } from 'vue';
import {mapActions, mapGetters } from 'vuex';
import offlineStoreService from "@/utils/offline-store/index";
import printDiv from '@/utils/print';
export default defineComponent({
  name: 'OfflineOrderBill',
  data(){
		return{
			src_img: require('@/assets/rohi_logo.png'),
			printDelay: 200,
			order: offlineStoreService.getLatestOrder(),
		}
  },
  methods:{
	
		printBill: function() {
			const styles = `
			<style lang="scss" scoped>	
				@page {
					size: 180mm;
					margin: 0
				}
				@body {
					margin-left: 5%;
				}
				.company-info{
					display: flex;
					flex-wrap: nowrap;
					flex-direction: column;
					align-content: center;
					justify-content: center;
					align-items: center;
					font-size: 12px;
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
					width:80mm;
				}

				#date-section {
					display: grid;
					grid-template-columns: 1fr 2fr;
					grid-template-rows: 1fr;
					gap: 0.1em 0.1em;
					width:80mm;
				}

				#order-items-section table {
					border-collapse: separate !important;
					width: 80mm;
				}

				#order-items-section th {
					border: 1px solid;
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
				width: 80mm;
				display: flex;
				justify-content: space-between;
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

				.pt-5 {
					padding-top: 5px;
				}

				.img-responsive{
					max-width: 100%;
					height: auto;
				}

				.text-center{
					text-align: center
				}
			</style>
			`;
			printDiv("bill-preview","", styles);
		},

		getCurrentTime(){
			return new Date().toLocaleTimeString();
		},

		getCurrentDate(){
			return new Date().toDateString();
		},

		getItemTotal: function(price: string, quantity: string): string {
			return (parseFloat(price)*parseFloat(quantity)).toFixed(2);
		},

		trimNumber: function(value: string) {
			return parseFloat(value).toFixed(2);

		},


    sleep: function (ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },

		...mapActions({
			clearOrder: ActionTypes.CHANGE_ORDER_STATUS
		}),
    },
	computed:{
		total: function(): string {
			let sum = 0;
			if(this.order.order_item){
				(this.order.order_item).map((item: any) => {
					sum = sum + parseFloat(item.price?item.price:'0')*parseFloat(item.quantity?item.quantity:'0')
				})
				return sum.toFixed(2);
			}
			else{
				return "";
			}
		},

		change: function(): string {
			if(this.order.amount_received && this.order.total){
				return (parseFloat(this.order.amount_received) - parseFloat(this.order.total)).toFixed(2);
			}
			else{
				return "";
			}
		},
		...mapGetters({
			logoimg: 'getLogoImg',

		})

	},
	props:{
		user: {},
		product_name: {
			default: [""],
		},
    print: {
      default: true,
    },
	},
	mounted: function () {
    if (this.print) {
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
	.company-info{
		display: flex;
		flex-wrap: nowrap;
		flex-direction: column;
		align-content: center;
		justify-content: center;
		align-items: center;
		font-size: 12px
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
	display: flex;
    justify-content: space-between;
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

	.pt-5 {
		padding-top: 5px;
	}
</style>