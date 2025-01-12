import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class PdfGeneratorService {
  constructor(private messageService: MessageService, private http: HttpClient) {}

  hex_templateColor: string = '#2983F7'; // Default hex color
  rgb_templateColor: [number, number, number] = [41, 131, 247]; // Default RGB tuple
  API_SERVER = environment.api_server;
  pdfUrl;
  // Fetch template color from the server
  getTemplateColor() {
    const url = `${this.API_SERVER}/${environment.endpoints.save_settings}`;
    this.http.get<{ template_color: string }>(url).subscribe({
      next: (response) => {
        this.hex_templateColor = response.template_color; // Fallback to default color
        this.convertToRGB(); // Update RGB color
      },
      error: (error) => {
        console.error('Error fetching template color:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch template color. Using default color.',
        });
        const theRGBColor = this.convertToRGB(); // Update RGB color
        return theRGBColor
      },
    });
  }

  // Convert hex color to RGB
  convertToRGB() {
    const hex = this.hex_templateColor.replace('#', '').trim(); // Remove '#' if present and trim spaces
    if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
      // Validate hex format
      const r = parseInt(hex.substring(0, 2), 16); // Red
      const g = parseInt(hex.substring(2, 4), 16); // Green
      const b = parseInt(hex.substring(4, 6), 16); // Blue
      this.rgb_templateColor = [r, g, b];
      return this.rgb_templateColor
    } else {
      console.error(`Invalid hex color: ${this.hex_templateColor}`);
      this.rgb_templateColor = [0, 0, 0]; // Default to black if invalid
    }
  }

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
    document_items.forEach((element) => {
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

    // Fetch the background image from the server
    const backgroundImageUrl = `${environment.api_server}/api/get-invoice-background/`;
    this.getTemplateColor();
    this.http.get(backgroundImageUrl, { responseType: 'blob' }).subscribe(
      (imageBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(imageBlob);
        reader.onload = () => {
          const backgroundImage = reader.result as string;

          // Create PDF
          const doc = new jsPDF();

          // Add the background image
          doc.addImage(
            backgroundImage,
            'JPEG',
            0,
            0,
            doc.internal.pageSize.getWidth(),
            doc.internal.pageSize.getHeight()
          );

          // Generate content (Billed to, Number/Date boxes, Table, Totals)
          const boxStartY = 35; // Vertical offset for the two boxes
          const boxHeight = 17;
          const spacing = 25; // Space below the boxes before starting the table

          // "Billed to" box
          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(10);
          doc.setFillColor(...this.rgb_templateColor);
          doc.setTextColor(255, 255, 255);
          doc.roundedRect(14, boxStartY, 60, boxHeight, 2, 2, 'FD');
          doc.text('Billed to: ' + client_name, 18, boxStartY + 5);
          doc.text('Address : ' + client_address, 18, boxStartY + 10);
          doc.text('ICE : ' + ICE, 18, boxStartY + 15);

          // "Number/Date" box
          const xNumber = doc.internal.pageSize.getWidth() - 75;
          doc.setFillColor(...this.rgb_templateColor);
          doc.setTextColor(255, 255, 255);
          doc.roundedRect(xNumber, boxStartY, 60, boxHeight, 2, 2, 'FD');
          doc.text(`Number: ${document_number}`, xNumber + 5, boxStartY + 5);
          doc.text(`Date: ${document_date}`, xNumber + 5, boxStartY + 10);

          // Table of items
          const tableStartY = boxStartY + boxHeight + spacing;
          doc.setFontSize(12);
          doc.setTextColor(0, 0, 0);
          autoTable(doc, {
            startY: tableStartY,
            head: [['Items', 'Quantity', 'Price', 'Amount']],
            body: document_items_arry,
            theme: 'grid',
            headStyles: {
              fillColor: [...this.rgb_templateColor],
              textColor: [255, 255, 255],
              fontStyle: 'bold',
            },
            bodyStyles: { textColor: [0, 0, 0] },
          });

          // Totals table
          autoTable(doc, {
            body: [
              [
                { content: 'HT :', styles: { halign: 'left' } },
                { content: document_Total.toFixed(2), styles: { halign: 'right' } },
              ],
              [
                { content: 'TVA :', styles: { halign: 'left' } },
                { content: document_TVA.toFixed(2), styles: { halign: 'right' } },
              ],
              [
                { content: 'TTC :', styles: { halign: 'left' } },
                { content: document_TVAadd.toFixed(2), styles: { halign: 'right' } },
              ],
              [
                { content: 'Total :', styles: { halign: 'left' } },
                { content: document_TotalTVA.toFixed(2), styles: { halign: 'right' } },
              ],
            ],
            theme: 'grid',
            styles: {
              cellWidth: 25,
              halign: 'right',
            },
            margin: { top: 10, right: 10, bottom: 10, left: 145 },
          });

          // Open the PDF in a new tab
          const pdfBlob = doc.output('blob');
          this.pdfUrl = URL.createObjectURL(pdfBlob);
          window.open(this.pdfUrl, '_blank');
        };
      },
      (error) => {
        console.error('Error fetching the background image:', error);
      }
    );
    return this.pdfUrl;
  }


  generateFakeInvoice(DocumentData: any) {
    const client_name = DocumentData.document_client.client_name;
    const client_address = DocumentData.document_client.client_city;
    const ICE = DocumentData.document_client.client_ICE;
    const document_number = DocumentData.document_number;
    const document_date = DocumentData.document_date;
    const document_items = DocumentData.document_items;
    const backgroundImage = DocumentData.backgroundImage;
    const templatecolor = DocumentData.templateColor
    let document_items_arry: any[] = [];
    let document_Total = 0;
    const document_TVA = 20;

    // Build table rows and calculate total
    document_items.forEach((element) => {
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

    // Add the background image
    doc.addImage(
      backgroundImage,
      'JPEG',
      0,
      0,
      doc.internal.pageSize.getWidth(),
      doc.internal.pageSize.getHeight()
    );

    // Generate content (Billed to, Number/Date boxes, Table, Totals)
    const boxStartY = 35; // Vertical offset for the two boxes
    const boxHeight = 17;
    const spacing = 25; // Space below the boxes before starting the table

    // "Billed to" box
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(10);
    doc.setFillColor(...this.rgb_templateColor);
    doc.setTextColor(255, 255, 255);
    doc.roundedRect(14, boxStartY, 60, boxHeight, 2, 2, 'FD');
    doc.text('Billed to: ' + client_name, 18, boxStartY + 5);
    doc.text('Address : ' + client_address, 18, boxStartY + 10);
    doc.text('ICE : ' + ICE, 18, boxStartY + 15);

    // "Number/Date" box
    const xNumber = doc.internal.pageSize.getWidth() - 75;
    doc.setFillColor(...this.rgb_templateColor);
    doc.setTextColor(255, 255, 255);
    doc.roundedRect(xNumber, boxStartY, 60, boxHeight, 2, 2, 'FD');
    doc.text(`Number: ${document_number}`, xNumber + 5, boxStartY + 5);
    doc.text(`Date: ${document_date}`, xNumber + 5, boxStartY + 10);

    // Table of items
    const tableStartY = boxStartY + boxHeight + spacing;
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    autoTable(doc, {
      startY: tableStartY,
      head: [['Items', 'Quantity', 'Price', 'Amount']],
      body: document_items_arry,
      theme: 'grid',
      headStyles: {
        fillColor: [...this.rgb_templateColor],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
      bodyStyles: { textColor: [0, 0, 0] },
    });


          // Totals table
          autoTable(doc, {
            body: [
              [
                { content: 'HT :', styles: { halign: 'left' } },
                { content: document_Total.toFixed(2), styles: { halign: 'right' } },
              ],
              [
                { content: 'TVA :', styles: { halign: 'left' } },
                { content: document_TVA.toFixed(2), styles: { halign: 'right' } },
              ],
              [
                { content: 'TTC :', styles: { halign: 'left' } },
                { content: document_TVAadd.toFixed(2), styles: { halign: 'right' } },
              ],
              [
                { content: 'Total :', styles: { halign: 'left' } },
                { content: document_TotalTVA.toFixed(2), styles: { halign: 'right' } },
              ],
            ],
            theme: 'grid',
            styles: {
              cellWidth: 25,
              halign: 'right',
            },
            margin: { top: 10, right: 10, bottom: 10, left: 145 },
          });


    // Open the PDF in a new tab
    const pdfBlob = doc.output('blob');
    this.pdfUrl = URL.createObjectURL(pdfBlob);
    return this.pdfUrl;

  };
}
