"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PdfGeneratorService = void 0;
var core_1 = require("@angular/core");
var jspdf_1 = require("jspdf");
var jspdf_autotable_1 = require("jspdf-autotable");
var PdfGeneratorService = /** @class */ (function () {
    function PdfGeneratorService() {
    }
    PdfGeneratorService.prototype.generateInvoice = function (DocumentData) {
        var client_name = DocumentData.document_client.client_name;
        var client_address = DocumentData.document_client.client_city;
        var ICE = DocumentData.document_client.client_ICE;
        var document_number = DocumentData.document_number;
        var document_date = DocumentData.document_date;
        var document_items = DocumentData.document_items;
        var document_items_arry = [];
        var document_Total = 0;
        var document_TVA = 20;
        var max_row_table = 20;
        document_items.forEach(function (element) {
            document_items_arry.push([element.name, element.quantity, element.unity_total, element.total]);
            document_Total = document_Total + element.total;
        });
        console.log(document_items_arry.length);
        if (document_items_arry.length < max_row_table) {
            var empty_rows = max_row_table - document_items_arry.length;
            for (var index = 0; index < empty_rows; index++) {
                document_items_arry.push(['', "", "", ""]);
            }
        }
        var document_TVAadd = document_Total * document_TVA / 100;
        var document_TotalTVA = document_TVAadd + document_Total;
        var doc = new jspdf_1["default"]();
        // Add background image
        var backgroundImage = new Image();
        backgroundImage.src = 'assets/img/invoice-bg.png'; // Keeping the image path unchanged
        backgroundImage.onload = function () {
            doc.addImage(backgroundImage, 'JPEG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());
            doc.setFont("Helvetica", "bold");
            // Move down to avoid overlapping with the header
            var headerHeight = 20; // Adjusted value based on your header height
            // Draw Billed to: rectangle
            var borderRadius = 2;
            var cellWidth = 60; // Adjusted width
            var cellHeight = 17; // Adjusted height
            var xBilledTo = 14;
            var yBilledTo = headerHeight + 20; // Use the current Y position after moving down
            doc.setFillColor(255, 172, 28); // Background color #FFAC1C
            doc.setTextColor(255, 255, 255); // Text color white
            doc.setDrawColor(255, 172, 28); // Border color black
            doc.setLineWidth(0.1); // Border width
            // Draw the rounded rectangle with adjusted padding and border radius for Billed to:
            doc.roundedRect(xBilledTo, yBilledTo, cellWidth, cellHeight, borderRadius, borderRadius, 'FD');
            // Set a smaller font size for the text
            doc.setFontSize(10);
            // Draw the text with adjusted padding for Billed to:
            var textXBilledTo = xBilledTo + 5; // Adjusted padding on the left
            var textYBilledTo = yBilledTo + 5; // Adjusted padding on the top
            doc.text('Billed to: ' + client_name, textXBilledTo, textYBilledTo);
            doc.text('Address : ' + client_address, textXBilledTo, textYBilledTo + 5);
            doc.text('ICE : ' + ICE, textXBilledTo, textYBilledTo + 10);
            // Draw Number: rectangle on the right side
            var xNumber = doc.internal.pageSize.getWidth() - 75; // Adjusted X position for Number:
            var yNumber = yBilledTo; // Same Y position as Billed to:
            doc.setFillColor(255, 172, 28); // Background color #FFAC1C
            doc.setTextColor(255, 255, 255); // Text color white
            doc.setDrawColor(255, 172, 28); // Border color black
            doc.setLineWidth(0.25); // Border width
            // Draw the rounded rectangle with adjusted padding and border radius for Number:
            doc.roundedRect(xNumber, yNumber, cellWidth, cellHeight, borderRadius, borderRadius, 'FD');
            // Draw the text with adjusted padding for Number:
            var textXNumber = xNumber + 5; // Adjusted padding on the left
            var textYNumber = yNumber + 5; // Adjusted padding on the top
            doc.text("Number: " + document_number, textXNumber, textYNumber);
            doc.text("Date: " + document_date, textXNumber, textYNumber + 5);
            // Reset font size for subsequent text
            doc.setFontSize(12);
            // Calculate startY based on the maximum Y position of the Billed to and Number rectangles
            var spaceBetween = 10; // Adjust the space between the rectangles and the table
            var startY = Math.max(yBilledTo, yNumber) + cellHeight + spaceBetween;
            // Calculate the remaining height for the invoice table considering the footer height
            var footerHeight = 10; // Adjusted value based on your footer height
            var availableHeight = doc.internal.pageSize.getHeight() - startY - footerHeight;
            // Draw the invoice table
            jspdf_autotable_1["default"](doc, {
                startY: startY,
                head: [['Items', 'Quantity', 'Price', 'Amount']],
                body: document_items_arry,
                theme: 'striped',
                headStyles: {
                    fillColor: '#FFAC1C'
                }
            });
            jspdf_autotable_1["default"](doc, {
                body: [
                    [
                        {
                            content: 'HT :',
                            styles: {
                                halign: 'left'
                            }
                        },
                        {
                            content: document_Total,
                            styles: {
                                halign: 'right'
                            }
                        },
                    ],
                    [
                        {
                            content: 'TVA :',
                            styles: {
                                halign: 'left'
                            }
                        },
                        {
                            content: document_TVA,
                            styles: {
                                halign: 'right'
                            }
                        },
                    ],
                    [
                        {
                            content: 'TTC :',
                            styles: {
                                halign: 'left'
                            }
                        },
                        {
                            content: document_TVAadd,
                            styles: {
                                halign: 'right'
                            }
                        },
                    ],
                    [
                        {
                            content: 'Total :',
                            styles: {
                                halign: 'left'
                            }
                        },
                        {
                            content: document_TotalTVA,
                            styles: {
                                halign: 'right'
                            }
                        },
                    ],
                ],
                theme: 'striped',
                styles: {
                    cellWidth: 25,
                    halign: 'right' // Aligned to the right
                },
                margin: { top: 10, right: 10, bottom: 10, left: 146 }
            });
            // Save the PDF
            var pdfBlob = doc.output('blob');
            var pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl, '_blank');
        };
    };
    PdfGeneratorService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], PdfGeneratorService);
    return PdfGeneratorService;
}());
exports.PdfGeneratorService = PdfGeneratorService;
