export const styles1 = `
<style lang="scss" scoped>	
    @page {
        size: 180mm;
        margin: 0
    }

    @body {
        margin-left: 5%;
    }

    .maindiv-print {
        padding: 4px;
        max-width: 800px;
    }

    .mb-5 {
        border-bottom: 2px solid black;
        padding-bottom: 5px;
    }

    .pt-5 {
        padding-top: 5px;
    }

    #date-section {
        display: grid !important;
        grid-template-columns: 1fr 2fr;
        grid-template-rows: 1fr;
        gap: 0.1em 0.1em;
        width:80mm;
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

    #header-section {
        display: grid !important;
        grid-template-columns: 1fr 2fr;
        grid-template-rows: 1fr;
        gap: 0.1em 0.1em;
        width:80mm;
    }

    #order-items-section th {
        border: 1px solid;
        border-color: black;
        text-align: center;
        padding: 1px;
    }
    .img-responsive{
        max-width: 100%;
        height: auto;
    }

    .text-center{
        text-align: center
    }
    .tble-mt {
        text-align: center;
        margin: 20px 0;
    }
    .header > th {
        text-align: center;
    }
    .header > th:first-child {
        border: none;
        border-radius: 10px 0px 0px 10px;
    }
    .header > th:last-child {
        border: none;
        border-radius: 0px 10px 10px 0px;
    }
    .header {
        border-radius: 5px;
        background-color: #0f2634;
        color: white;
    }
    td > .flex-box {
        justify-content: space-around;
        align-items: center;
    }
    .fr-row {
        font-size: 12px;
    }
    .stats {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        margin-left: 1rem;
        margin-right: 1rem;
    }
    .stats > div > span:first-child {
        font-size: 15px;
        font-weight: 600;
        margin-right: 2px;
    }
    .stats > div > span:last-child {
        font-size: 15px;
        font-weight: 550;
        color: #e73b2a;
    }
    .labelCmp {
        padding: 20px;
    }
    .custom-select {
        width: 35%;
    }
    .pagination{
        display: none !important;
    }
</style>
`;

export const styles2 = `
<style lang="scss" scoped>	
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


    #header-section {
    display: grid !important;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr;
    gap: 0.1em 0.1em;
    width:80mm;
    }

    #date-section {
    display: grid !important;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr;
    gap: 0.1em 0.1em;
    width:80mm;
    }

    .mb-5 {
    border-bottom: 2px solid black;
    padding-bottom: 0px;
    }

    .pt-5 {
    padding-top: 0px;
    }

    .img-responsive{
    max-width: 100%;
    height: auto;
    }

    .text-center{
    text-align: center
    }
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
</style>
`;