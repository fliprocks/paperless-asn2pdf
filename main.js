const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const generatePDF = require("./src/scripts/generator");

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 860,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    win.loadFile("index.html");
}

app.whenReady().then(() => {
    createWindow();

    ipcMain.handle("generate-pdf", async (event, args) => {
        const { canceled, filePath } = await dialog.showSaveDialog({
            title: "Store PDF",
            defaultPath: args.filename || "barcodes.pdf",
            filters: [{ name: "PDF-Files", extensions: ["pdf"] }],
        });

        if (canceled || !filePath) {
            return null;
        }

        args.directory = path.dirname(filePath);
        args.filename = path.basename(filePath);

        return await generatePDF(args);
    });
});
