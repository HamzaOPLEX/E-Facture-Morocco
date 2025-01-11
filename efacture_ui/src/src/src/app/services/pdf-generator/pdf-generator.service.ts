import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor() { }

  generateInvoice(DocumentData: any) {
    const client_name = DocumentData.document_client.client_name;
    const client_address = DocumentData.document_client.client_city;
    const ICE = DocumentData.document_client.client_ICE;
    const document_number = DocumentData.document_number;
    const document_date = DocumentData.document_date;
    const document_items = DocumentData.document_items;

    let document_items_arry: any[] = [];
    let document_Total = 0;
    const document_TVA = 20;

    // Build table rows and calculate total
    document_items.forEach(element => {
      document_items_arry.push([element.name, element.quantity, element.unity_total, element.total]);
      document_Total += element.total;
    });

    // Ensure table has at least 20 rows
    const max_row_table = 20;
    if (document_items_arry.length < max_row_table) {
      const empty_rows = max_row_table - document_items_arry.length;
      for (let i = 0; i < empty_rows; i++) {
        document_items_arry.push(['', '', '', '']);
      }
    }

    // Compute VAT
    const document_TVAadd = (document_Total * document_TVA) / 100;
    const document_TotalTVA = document_Total + document_TVAadd;

    // Create PDF
    const doc = new jsPDF();

    // (Optional) Add a background image
    const backgroundImage = new Image();
    backgroundImage.src = 'assets/img/invoice-bg.png';

    backgroundImage.onload = () => {
      doc.addImage(
        backgroundImage,
        'JPEG',
        0,
        0,
        doc.internal.pageSize.getWidth(),
        doc.internal.pageSize.getHeight()
      );
      // We shift everything down to make the logo more visible
      const boxStartY = 35; // vertical offset for the two boxes
      const boxHeight = 17;
      const spacing = 25;   // space below the boxes before starting the table
      // "Billed to" box (same color)
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(10);
      doc.setFillColor(51, 122, 183);
      doc.setTextColor(255, 255, 255);
      doc.roundedRect(14, boxStartY, 60, boxHeight, 2, 2, 'FD');
      doc.text('Billed to: ' + client_name, 18, boxStartY + 5);
      doc.text('Address : ' + client_address, 18, boxStartY + 10);
      doc.text('ICE : ' + ICE, 18, boxStartY + 15);

      // "Number/Date" box (ensure same color)
      const xNumber = doc.internal.pageSize.getWidth() - 75;
      doc.setFillColor(51, 122, 183);
      doc.setTextColor(255, 255, 255);
      doc.roundedRect(xNumber, boxStartY, 60, boxHeight, 2, 2, 'FD');
      doc.text(`Number: ${document_number}`, xNumber + 5, boxStartY + 5);
      doc.text(`Date: ${document_date}`, xNumber + 5, boxStartY + 10);

      // ---- Table of items ----
      const tableStartY = boxStartY + boxHeight + spacing; // push table further down
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      autoTable(doc, {
        startY: tableStartY,
        head: [['Items', 'Quantity', 'Price', 'Amount']],
        body: document_items_arry,
        theme: 'grid',
        headStyles: {
          fillColor: [51, 122, 183],
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        },
        bodyStyles: { textColor: [0, 0, 0] }
      });

      // Totals table
      autoTable(doc, {
        body: [
          [
            { content: 'HT :', styles: { halign: 'left' } },
            { content: document_Total.toFixed(2), styles: { halign: 'right' } }
          ],
          [
            { content: 'TVA :', styles: { halign: 'left' } },
            { content: document_TVA.toFixed(2), styles: { halign: 'right' } }
          ],
          [
            { content: 'TTC :', styles: { halign: 'left' } },
            { content: document_TVAadd.toFixed(2), styles: { halign: 'right' } }
          ],
          [
            { content: 'Total :', styles: { halign: 'left' } },
            { content: document_TotalTVA.toFixed(2), styles: { halign: 'right' } }
          ],
        ],
        theme: 'grid',
        styles: {
          cellWidth: 25,
          halign: 'right'
        },
        margin: { top: 10, right: 10, bottom: 10, left: 145 },
      });

      // Open the PDF in a new tab
      const pdfBlob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, '_blank');
    };
  }
}
