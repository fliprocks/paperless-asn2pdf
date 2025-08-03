const fs = require("fs");
const path = require("path");
const bwipjs = require("bwip-js");
const PDFDocument = require("pdfkit");

module.exports = async function generatePDF({
    asnPrefix,
    firstASN,
    numCodes,
    directory,
    rows,
    cols,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    barcodeWidth,
    barcodeHeight,
    filename,
}) {
    const doc = new PDFDocument({ size: "A4" });

    const filenamePath =
        directory && filename
            ? path.join(directory, filename)
            : path.join(__dirname, "barcodes.pdf");

    const output = fs.createWriteStream(filenamePath);
    doc.pipe(output);

    const pageWidth = 210;
    const pageHeight = 297;
    const barcodeHeightPt = barcodeHeight * 2.835;
    const pageWidthPt = pageWidth * 2.835;
    const pageHeightPt = pageHeight * 2.835;
    const marginTopPt = marginTop * 2.835;
    const marginBottomPt = marginBottom * 2.835;
    const marginLeftPt = marginLeft * 2.835;
    const marginRightPt = marginRight * 2.835;
    const usableWidth = pageWidthPt - marginLeftPt - marginRightPt;
    const usableHeight = pageHeightPt - marginTopPt - marginBottomPt;
    const cellWidth = usableWidth / cols;
    const cellHeight = usableHeight / rows;
    const barcodeWidthPt = barcodeWidth * 2.835;

    function generateASN(index) {
        return asnPrefix + String(index).padStart(5, "0");
    }

    return new Promise((resolve, reject) => {
        (async () => {
            try {
                for (let i = 0; i < numCodes; i++) {
                    const asnNumber = firstASN + i;
                    const value = generateASN(asnNumber);

                    const row = Math.floor((i / cols) % rows);
                    const col = i % cols;

                    if (i > 0 && i % (cols * rows) === 0) {
                        doc.addPage();
                    }

                    const png = await bwipjs.toBuffer({
                        bcid: "code128",
                        text: value,
                        scale: 3,
                        height: 15,
                        includetext: true,
                        textxalign: "center",
                        textsize: 14,
                        textyoffset: 3,
                    });

                    const x =
                        marginLeftPt +
                        col * cellWidth +
                        (cellWidth - barcodeWidthPt) / 2;
                    const y =
                        marginTopPt +
                        row * cellHeight +
                        (cellHeight - barcodeHeightPt) / 2;

                    doc.image(png, x, y, {
                        width: barcodeWidthPt,
                        height: barcodeHeightPt,
                    });
                }

                doc.end();
            } catch (err) {
                reject(err);
            }
        })();

        output.on("finish", () => resolve(filenamePath));
        output.on("error", reject);
    });
};
