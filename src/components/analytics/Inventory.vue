<template>
  <div class="ab-flex-box">
    <label class="labelCmp" for="start_date">
      <strong>Company:</strong>
    </label>
    <div class="ab-select-container">
      <select
        id="company-type"
        name="company-type"
        class="custom-select"
        v-model="company"
        @change="fetchAnalyticsBtn"
        :disabled="!admin"
      >
        <option class="batches-op" v-for="company in companies" v-bind:key="company.id" v-bind:value="company.id">
          {{company.company_name}}
        </option>
      </select>
    </div>
  </div>
  <div id="print">
    <table class="tble-mt">
      <colgroup>
        <col span="1" style="width: 35%;">
        <col span="1" style="width: 35%;">
        <col span="1" style="width: 35%;">
      </colgroup>
      <thead>
        <tr class="fr-row header">
          <th scope="col">Category</th>
          <th scope="col">Total Products</th>
          <th scope="col">Total Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr class="fr-row content" v-for="(item, key) in analytics.category_stats" :key="key">
          <td>{{key}}</td>
          <td>{{item.quantity}}</td>
          <td>{{item.total_amount}}</td>
        </tr>
      </tbody>
    </table>
    <div class="analytics">
      <div>
        <span>
          Net Products:
        </span>
        <span>{{analytics.unique_products_count}}</span>
      </div>
      <div>
        <span>
          Net Amount:
        </span>
        <span>{{analytics.total_inventory_amount}}</span> 
      </div>
    </div>
  </div>
  <button
      class="btn-orange btn mt-5"
      @click="printPage()"
      :disabled="submitOrderButton"
      ref="submitandprint"
    >
      Print Details
    </button>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { ActionTypes } from '@/store/modules/order/actions';
import { ActionTypes as AuthActionTypes } from '@/store/modules/auth/actions';

export default defineComponent({
  name: 'InventoryAnaltyics',
  data() {
    const date = new Date();
    const dateStr = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    return {
      startDate: dateStr,
      endDate: dateStr,
      company: 0,
    };
  },
  computed: {
    ...mapGetters({
      analytics: 'getAnalytics',
      companies: 'getInventoryCompanies',
      userdata: 'getUser',
    }),
    admin(){
      const allowedRoles = ['SUPER_ADMIN', 'ADMIN'];
      const allowedCompanies = ['PARENT', 'STORE'];
      if(this.userdata != null && allowedRoles.includes(this.userdata.user_type)
        && allowedCompanies.includes(this.userdata.company.company_type) 
      ){
        return true;
      }
      return false;
    },
  },
  methods: {
    ...mapActions({
      fetchAnalytics: ActionTypes.FETCH_ANALYTICS,
      fetchCompanies: AuthActionTypes.FETCH_ALL_COMPANIES,
      fetchUser: AuthActionTypes.USER_DATA,
    }),
    async fetchAnalyticsBtn() {
      await this.fetchAnalytics({
        start_date: this.startDate,
        end_date: this.endDate,
        company: this.company,
      });
    },
    getElementTag: function (tag: keyof HTMLElementTagNameMap): string {
      const html: string[] = [];
      const elements = document.getElementsByTagName(tag);
      for (let index = 0; index < elements.length; index++) {
        html.push(elements[index].outerHTML);
      }
      return html.join("\r\n");
    },

    getHtmlContents: function () {
      const printContents = document.getElementById("print");
      return printContents && printContents.innerHTML
        ? printContents.innerHTML
        : "";
    },

    printPage: function () {
      let styles = "",
        links = "";
      styles = `
			<style lang="scss" scoped>	
				th:first-child {
    border-radius: 10px 0px 0px 10px;
}
h1 {
    text-align: center;
}

.header > th {
    text-align: center;
}

td, th {
    border: 1px solid;
    border-color: #ddd;
    text-align: left;
    padding: 8px;
}
th {
    text-align: inherit;
}
th {
    display: table-cell;
    vertical-align: inherit;
    font-weight: bold;
    text-align: -internal-center;
}

.fr-row {
    font-size: 12px;
}

.header {
    border-radius: 5px;
    background-color: #0f2634;
    color: white;
}

table {
    border-collapse: collapse;
    width: 100%;
}
table {
    border-collapse: collapse;
}
user agent stylesheet
table {
    border-collapse: separate;
    text-indent: initial;
    border-spacing: 2px;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

body {
    margin: 0;
    font-size: 100%;
}
body {
    margin: 0;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: left;
    background-color: #fff;
}

html {
    font-family: sans-serif;
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    -ms-overflow-style: scrollbar;
    -webkit-tap-highlight-color: transparent;
}
.stats{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    margin-left: 1rem;
    margin-right: 1rem;
}

			</style>
			`;
      // links = this.getElementTag('link');
      links = "";
      const printContents = this.getHtmlContents();
      console.log(printContents, "printContents");
      this.printContent(printContents, styles, links);
      // this.checkToken();
    },
    printContent: function (
      htmlcontent: string,
      styles: string,
      links: string
    ) {
      const endscripttag = "/script";
      const popupWin = window.open(
        "",
        "_blank",
        "top=0,left=0,height=auto,width=auto,focused=false"
      );

      if (popupWin) {
        popupWin.document.open();
        popupWin.document.write(`
        <html>
          <head>
          <title></title>
          ${styles}
          ${links}
          </head>
          <body>
          <h1>Inventory</h1>
          ${htmlcontent}
          <script defer>
            function triggerPrint(event) {
            window.removeEventListener('load', triggerPrint, false);
            setTimeout(function() {
              closeWindow(window.print());
            }, 100);
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
  },
  async mounted() {
    await this.fetchUser();
    await this.fetchCompanies();
    await this.fetchAnalyticsBtn();
    this.company = this.userdata.company.id;
  }
})
</script>

<style scoped>

.analytics{
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin-left: 1rem;
}
.analytics > div > span:first-child{
  font-size: 15px;
  font-weight: 600;
}
.analytics > div > span:last-child{
  font-size: 15px;
  font-weight: 500;
  color: #e73b2a;
}

/* ab css */
  /* ab-flex-box */
  .ab-flex-box{
    display: flex;
    align-items: baseline;
  }
  .ab-flex-box > .ab-select-container{
    width: 100%;
    margin-left: 10px;
  }
  .ab-flex-box > label{
    font-weight: 500;
  }
  /* select designs */
  .ab-select-container > select{
    padding: 8px 18px;
    font-size: 12px;
  }
  /* table designs */
  .tble-mt{
    margin: 20px 0;
  }

  .fr-row {
    font-size: 12px;
  }
  .header > th{
    text-align: center;
  }
  .header > th:first-child{
    border: none;
    border-radius: 10px 0px 0px 10px;
  }
  .header > th:last-child{
    border: none;
    border-radius: 0px 10px 10px 0px;
  }
  .header {
    border-radius: 5px;
    background-color: #0f2634; 
    color: white;
  }
  td > .flex-box{
    justify-content: space-around;
    align-items: center;
  }
  .content{
    background-color: white; 
    color: #0f2634;
  }
  .content > td{
    text-align: center;
}
.labelCmp{
  padding: 20px;
}
.custom-select{
  width: 35%;
}
</style>
