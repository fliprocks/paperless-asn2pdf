# Paperless asn2pdf

This project is a basic Electron application to create ASN (Archive Serial Number) barcode stickers in CODE128 format for [Paperless NGX](https://github.com/paperless-ngx/paperless-ngx).

⚠️ **Note:** This project is work in progress. It has not been fully tested or documented yet, and things may still change.

## Building an Executable

1. Clone the repository:
    ```bash
    git clone https://github.com/phipzzz/paperless-asn2pdf.git
    cd asn-pdf
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Build the executable for your platform:
    ```bash
    npm run dist
    ```

## Requirements

-   Node.js
-   npn
-   electron-builder

## Planned features

-   Preconfigured sticker types (e.g. Herma 4504), including all parameters like padding, rows, columns...
-   Improved documentation
-   Update notifications / auto update
-   Prebuild execuatbles for different plattforms
-   Preview options
-   Application hosted on Website

### Maybe features

-   Different code types
-   Start position (row and column) for partial sheets
