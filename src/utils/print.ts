import constants from "@/constants";
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

const printDiv = function (elementID: string, title: string, style?: string,) {
  const styles = style ? style: constants.print_analytics_styles
  const links = "";
  const printContents = getHtmlContents(elementID);
  printContent(printContents, styles, links, title);
};

export default printDiv;
