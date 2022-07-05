const backgroundColor = [
  "rgba(255, 99, 88, 0.2)",
  "rgba(255, 159, 64, 0.2)",
  "rgba(255, 205, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(201, 203, 207, 0.2)",
];
const borderColor = [
  "rgb(255, 99, 132)",
  "rgb(255, 159, 64)",
  "rgb(255, 205, 86)",
  "rgb(75, 192, 192)",
  "rgb(54, 162, 235)",
  "rgb(153, 102, 255)",
  "rgb(201, 203, 207)",
];

const print_analytics_styles = `
<style lang="scss" scoped>	
  th:first-child {
border-radius: 10px 0px 0px 10px;
}
.pagination {
display: none;
}
.no_print {
display: none;
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

export default {
    backgroundColor,
    borderColor,
    print_analytics_styles
}