import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PdfGeneratorService } from '@services/pdf-generator/pdf-generator.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  templateColor: string = '#2983F7'; // Default color
  uploadedFiles: any[] = [];
  previewBackgroundImage: string | null = null; // Preview image URL
  pdfUrl: string | null = null; // For previewing generated PDF URL

  API_SERVER = environment.api_server;
  UPLOAD_URL = `${this.API_SERVER}/${environment.endpoints.upload_background_invoice}`;

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
    private pdfGeneratorService: PdfGeneratorService, // Inject the service
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getTemplateColor();
    this.generateFakeInvoice()
  }

  // Fetch template color from the server
  getTemplateColor() {
    const url = `${this.API_SERVER}/${environment.endpoints.save_settings}`;
    this.http.get<{ template_color: string }>(url).subscribe({
      next: (response) => {
        this.templateColor = response.template_color;
      },
      error: (error) => {
        console.error('Error fetching template color:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch template color.' });
      },
    });
  }

  // Handle background image upload
  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewBackgroundImage = reader.result as string;
      };
    }
    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
    this.generateFakeInvoice()
  }

  // Handle color change
  onColorChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.templateColor = inputElement.value;
    this.saveTemplateColor(); // Save the updated color
    
  }

  // Save template color to the server
  saveTemplateColor() {
    const url = `${this.API_SERVER}/${environment.endpoints.save_settings}`;
    const payload = { template_color: this.templateColor };

    this.http.post(url, payload).subscribe({
      next: (response: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Color Saved',
          detail: 'Template color updated successfully.',
        });
        this.generateFakeInvoice()
      },
      error: (error) => {
        console.error('Error saving template color:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update template color. Please try again.',
        });
      },
    });
  }
  // Generate fake invoice and preview it
  generateFakeInvoice() {
    // Fetch the background image from the server
    const backgroundImageUrl = `${environment.api_server}/api/get-invoice-background/`;
    const templateColor = this.pdfGeneratorService.getTemplateColor()
    this.http.get(backgroundImageUrl, { responseType: 'blob' }).subscribe(
      (imageBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(imageBlob);
        reader.onload = () => {
        const backgroundImage = reader.result as string;
        const fakeDocumentData = {
          document_client: {
            client_name: 'John Doe',
            client_city: '1234 Elm Street',
            client_ICE: 'ABC123456',
          },
          document_number: 'FA-1523',
          document_date: '2025-01-12',
          document_items: [
            { name: 'Product 1', quantity: 2, unity_total: 50, total: 100 },
            { name: 'Product 2', quantity: 1, unity_total: 150, total: 150 },
          ],
          backgroundImage:backgroundImage,
          templateColor:templateColor,
        };
      const pdfUrl = this.pdfGeneratorService.generateFakeInvoice(fakeDocumentData);
      this.pdfUrl = pdfUrl; // Bind this to the iframe's src in the template
      // this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error fetching the background image:', error);
      }
    }
    )

  }

}
