<template>
  <div id="bill-preview" class="maindiv-print">
		<div id="header-section">
			<div>
				<img class="img-responsive" src="../../assets/rohi_logo.jpg" alt="Rohi">
			</div>
			<div class="company-info">
				<p class="mb-5 pb-5" style="font-size: 16px;"><strong>Rohi Bakers &amp; Restaurant</strong></p>
				<p class="text-center">Bypass Road Khanpur</p>
				<p class="text-center">068-5955051</p>
				<!-- <p class="text-center">Sales Invoice</p>
				<span class="text-center" style="border: 1px solid black; padding: 2px;">{{order.invoice_id}}</span> -->
			</div>
			<div class="company-info">
				<p class="text-center">Sales Invoice</p>
				<span class="text-center" style="border: 1px solid black; padding: 2px;">{{order.invoice_id}}</span>
			</div>
		</div>

		<div id="date-section" class="mb-5 pt-5">
			<p class="text-center">{{getCurrentTime(order.created)}}</p>
			<p class="text-center">{{getCurrentDate(order.created)}}</p>
		</div>

		<div id="customer-details-sections" style="margin-bottom: 5px; customer-details-sections">
			<p v-if="getCustomerFullName()!=='' && customer.user_type!=='WALK_IN_CUSTOMER'">
				<span><strong>Customer's Name: </strong></span>
				<span>{{getCustomerFullName()}}</span>
			</p>
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
					<th>Size</th>
					<th>Qty</th>
					<th>Rate</th>
					<th>Amount</th>
				</tr>
				<tr v-for="(orderItem, index) in order.order_item" v-bind:key="orderItem.id">
					<td>{{ index+1 }}</td>
					<td style="font-size: x-small; font-weight: bold;">{{ getProductName(orderItem) }}</td>
					<td style="font-size: x-small; font-weight: bold;">{{getProductSize(orderItem)}}</td>
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
			<p>
				<span>Operator: </span>
				<span>{{getOperatorFullName()}}</span>
			</p>
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

export default defineComponent({
  name: 'OrderBill',
  data(){
		return{
			printDelay: 200,
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
			styles = `
			<style lang="scss" scoped>	
				@page {
					size: 80mm;
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
			links = this.getElementTag('link');
			const printContents = this.getHtmlContents();
      this.printContent(printContents, styles, links);
      this.checkToken();
		},

		getCurrentTime(date: Date){
			return new Date(date).toLocaleTimeString();
		},

		getCurrentDate(date: Date){
			return new Date(date).toDateString();
		},

		getItemTotal: function(price: string, quantity: string): string {
			return (parseFloat(price)*parseFloat(quantity)).toFixed(2);
		},

		getProductName: function(orderItem: any) {
			return orderItem.batch.product_variant.product.name;
		},

		getProductSize: function(orderItem: any) {
			return orderItem.batch.product_variant.size;
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

    printContent: function(htmlcontent: string, styles: string, links: string) {

      const endscripttag = "/script"
      const popupWin = window.open("", "_blank", "top=0,left=0,height=auto,width=auto,focused=false");
        
      if (popupWin) {
        popupWin.document.open()
        popupWin.document.write(`
        <html>
          <head>
          <title></title>
          ${styles}
          ${links}
          </head>
          <body>
          ${htmlcontent}
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

    checkToken: function () {
      if (this.order.order_item) {
        for (const orderItem of this.order.order_item) {
          if (orderItem.batch.product_variant.product.token) {
            this.printToken(orderItem, this.order.created)
          }
        }
      }
    },

    printToken: function (orderItem: OrderItem, created: Date) {
      if (orderItem.price &&
      orderItem.quantity &&
      orderItem.batch &&
      typeof orderItem.batch !== 'number' &&
      orderItem.batch.product_variant &&
      typeof orderItem.batch.product_variant !== 'number' &&
      orderItem.batch.product_variant.product &&
      typeof orderItem.batch.product_variant.product !== 'number' &&
        orderItem.batch.product_variant.product.name) {
          let styles = '', links = '';
        styles = `
        <style>
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
          border: 1px solid black;
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
        `;
        links = this.getElementTag('link');
        const printContents = `
        <div id="TokenPreview">
          <p class="text-center" style="font-size: 20px; text-align: center;"><strong>Rohi Sweets & Bakers</strong></p>
          <p class="text-center" style="margin: 10px 0px 10px; text-align: center;">
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
                <th style="text-align: right;">تفصیل</th>
                <th>تعداد</th>
              </tr>

              <tr>
                <td>${this.trimNumber(orderItem.price)}</td>
                <td style="text-align: right;">${orderItem.batch.product_variant.product.name}</td>
                <td>${this.trimNumber(orderItem.quantity)}</td>
              </tr>
            </table>
          </div>
          <hr class="dashed">
          <div class="mb-5">${this.getItemTotal(orderItem.price, orderItem.quantity)}</div>
          <div id="date-section">
            <p class="text-center">${this.getCurrentTime(created)}</p>
            <p class="text-center">${this.getCurrentDate(created)}</p>
          </div>
        </div>
        `;
        this.printContent(printContents, styles, links);
      }
    },

    sleep: function (ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
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
			default: 0,
		},
		customer: {
			default: {
				first_name:'',
				last_name:'',
				user_type: 'WALK_IN_CUSTOMER',
			}
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