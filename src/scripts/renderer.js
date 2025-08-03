const { ipcRenderer } = require("electron");

async function generate() {
    const asnPrefix = document.getElementById("asnPrefix").value;
    const firstASN = parseInt(document.getElementById("firstASN").value);
    const numCodes = parseInt(document.getElementById("numCodes").value);
    const rows = parseInt(document.getElementById("rows").value);
    const cols = parseInt(document.getElementById("cols").value);
    const marginTop = parseInt(document.getElementById("marginTop").value);
    const marginBottom = parseInt(
        document.getElementById("marginBottom").value
    );
    const marginLeft = parseInt(document.getElementById("marginLeft").value);
    const marginRight = parseInt(document.getElementById("marginRight").value);
    const barcodeWidth = parseInt(
        document.getElementById("barcodeWidth").value
    );
    const barcodeHeight = parseInt(
        document.getElementById("barcodeHeight").value
    );
    const filename = document.getElementById("filename").value;

    const result = await ipcRenderer.invoke("generate-pdf", {
        asnPrefix,
        firstASN,
        numCodes,
        filename,
        rows,
        cols,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        barcodeWidth,
        barcodeHeight,
        directory: __dirname,
    });

    alert("PDF created: " + result);
}
