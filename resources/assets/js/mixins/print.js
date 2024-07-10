export default {
    methods: {
        /**
         * Use the 4sm printer to print document
         * @param {string} url
         */
        printUrl: function (url) {
            let address = 'http://localhost:63020';
            let data = { type: 'pdf', url: url, printer: 'Zebra  ZP 450-200 dpi' }
            // let data = {type: 'pdf', url: url, printer: 'Microsoft Print to PDF'}
            //Microsoft Print to PDF
            let xhr = new XMLHttpRequest();

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    //you can add a redirect here when the request is finished
                    console.log(this.responseText);
                }
            });

            xhr.open("POST", address);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            data = Object.keys(data).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
            }).join('&');

            xhr.send(data);
        },

        /**
         * Use the 4sm printer to print document
         * @param {string} url
         */
        printHtml: function (url) {
            let address = 'http://localhost:63020';
            let data = { type: 'html', url: url, printer: 'P-6035i MFP' }
            let xhr = new XMLHttpRequest();

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    //you can add a redirect here when the request is finished
                    console.log(this.responseText);
                }
            });

            xhr.open("POST", address);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            data = Object.keys(data).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
            }).join('&');

            xhr.send(data);
        },

        printFile: function (url, callback = false) {
            let address = 'http://localhost:63020';
            // let data = {type: 'gif', url: url}
            let data = { type: 'gif', url: url, printer: 'Zebra  ZP 450-200 dpi' }
            let xhr = new XMLHttpRequest();

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    if (callback) {
                        callback();
                    }
                }
            });

            xhr.open("POST", address);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            data = Object.keys(data).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
            }).join('&');

            xhr.send(data);
        },


        printLabel: function (label) {
            var printWindow = window.open('', 'PRINT', 'height=400,width=600');
            printWindow.document.write(label);
            printWindow.document.close(); // necessary for IE >= 10
            printWindow.focus(); // necessary for IE >= 10

            setTimeout(function () {
                printWindow.print();
                printWindow.close();
            }, 1000);
        },
        printPage: function (url, select = false) {
            var printWindow = window.open(url, 'PRINT', 'height=400,width=600');
            printWindow.document.close(); // necessary for IE >= 10
            printWindow.focus(); // necessary for IE >= 10

            setTimeout(function () {
                printWindow.print();
                if (!select) {
                    printWindow.close();
                }
            }, 1000);
        },
        printChart: function (element) {
            var printWindow = window.open('', 'PRINT', 'height=400,width=600');

            printWindow.document.write('<html><head><title>' + document.title + '</title>');
            printWindow.document.write('</head><body >');
            printWindow.document.write('<h1>' + document.title + '</h1>');

            // if this is a table element we need to print it in other ways

            printWindow.document.write(element.getElementsByTagName('table')[0].outerHTML);

            printWindow.document.write('</body></html>');

            printWindow.document.close(); // necessary for IE >= 10
            printWindow.focus(); // necessary for IE >= 10

            setTimeout(function () {
                printWindow.print();
                printWindow.close();
            }, 1000);
        },
        printImages: function (element, count, label) {
            var printWindow = window.open('', 'PRINT', 'height=400,width=600');

            printWindow.document.write('<html><head><title>' + label + '</title>');
            printWindow.document.write('<link rel="stylesheet" href="css/print.css" type="text/css" />');
            printWindow.document.write('</head><body>');
            //printWindow.document.write('<h1>' + label + '</h1>');

            var images = element.querySelectorAll('svg');

            for (let i = 0; i < count; i++) {
                images.forEach(img => {
                    printWindow.document.body.appendChild(img.cloneNode(true));
                });
            }

            printWindow.document.write('</body></html>');
            printWindow.document.close(); // necessary for IE >= 10
            printWindow.focus(); // necessary for IE >= 10

            setTimeout(function () {
                printWindow.print();
                printWindow.close();
            }, 1000);
        },
        printHTML: function (html, count) {
            var printWindow = window.open('', 'PRINT', 'height=400,width=600');

            printWindow.document.write('<html><head><title>Label</title>');
            printWindow.document.write('<link rel="stylesheet" href="css/print.css" type="text/css" />');
            printWindow.document.write('</head><body >');
            //printWindow.document.write('<h1>Label</h1>');

            console.log(html);
            var div = document.createElement("DIV");
            //div.style.cssText = 'display: inline-block; margin-right: 10px;';
            //var h = document.createElement("H1");
            var d = document.createElement("div");
            //h.appendChild(document.createTextNode(html.Title));
            d.innerHTML = html.Description;
            d.style.cssText = 'white-space: pre-wrap;';
            //div.appendChild(h);
            div.appendChild(d);

            for (let i = 0; i < count; i++) {
                printWindow.document.body.appendChild(div.cloneNode(true));
            }

            printWindow.document.write('</body></html>');
            printWindow.document.close(); // necessary for IE >= 10
            printWindow.focus(); // necessary for IE >= 10

            setTimeout(function () {
                printWindow.print();
                printWindow.close();
            }, 1000);
        },
    }
}
