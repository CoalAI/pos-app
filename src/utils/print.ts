const getHtmlContents = function (elementID: string) {
  const printContents = document.getElementById(elementID);
  return printContents && printContents.innerHTML ? printContents.innerHTML : "";
};
const printContent = function (htmlcontent: string, styles: string, links: string, title: string) {
  const endscripttag = "/script";
  const popupWin = window.open("", "_blank", "top=0,left=0,height=auto,width=auto,focused=false");

  if (popupWin) {
    popupWin.document.open();
    popupWin.document.write(`
    <html>
      <head>
      <title>${title}</title>
      ${styles}
      ${links}
      </head>
      <body>
      <h1>${title}</h1>
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
};

const printDiv = function (elementID: string, title: string) {
  let styles = "",
    links = "";
  styles = `
			<style lang="scss" scoped>	
				th:first-child {
    border-radius: 10px 0px 0px 10px;
}
.pagination {
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
  links = "";
  const printContents = getHtmlContents(elementID);
  printContent(printContents, styles, links, title);
};

export default printDiv;
