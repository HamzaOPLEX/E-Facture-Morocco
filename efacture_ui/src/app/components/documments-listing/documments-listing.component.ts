// Importing necessary modules and services
import { Component, OnInit } from '@angular/core';
import { FetchDocService } from '@services/fetch-doc/fetch-doc.service'; // Importing custom service
import { Router, ActivatedRoute } from '@angular/router';
import { PdfGeneratorService } from '@services/pdf-generator/pdf-generator.service'
import { MessageService } from 'primeng/api';
import { JwtAuthService } from '@services/Auth/JWTAuthService/jwt-auth-service.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-documments-listing',
  templateUrl: './documments-listing.component.html',
  styleUrls: ['./documments-listing.component.scss']
})
export class DocummentsListingComponent {
  // Declaring class properties
  documents;
  invoices;
  TYPE: string;
  selectedCustomers;
  statuses!: any[]; // Declaration without initialization
  api_server = environment.api_server
  loading: boolean = true;
  User

  activityValues: number[] = [0, 100]; // Initializing an array

  // Constructor function to inject services
  constructor(
    private FetchDocService: FetchDocService, 
    private route: ActivatedRoute,
    private pdfService: PdfGeneratorService,
    private messageService: MessageService,
    private jwtHelper: JwtAuthService,

) { }

  // ngOnInit is a lifecycle hook that runs when the component is initialized
  ngOnInit() {
    // Subscribe to route params (when the URL changes)
    this.User = this.jwtHelper.getUser().username

    this.route.params.subscribe(params => {
      this.TYPE = params['type']; // Retrieve 'type' parameter from the URL

      // Declare a variable to store the list of documents
      let documents_list

      // Call the service to fetch documents
      this.FetchDocService.getAllDocs(this.TYPE).subscribe(
        (response: any) => {
          // Process the response data
          let HT;
          let Rest;
          let TTC;
          let TVA = 20;
          response.forEach(element => {
            let HT = 0;
            let TVA = 20;
            for (let i = 0; i < element.document_items.length; i++) {
              HT += element.document_items[i].total || 0;
            }
            let TTC = HT + (HT * TVA / 100);
            element['HT'] = HT;
            element['Rest'] = HT - element.deposit;
            element['TTC'] = TTC;
          });

          // Assign data based on 'TYPE'
          if (this.TYPE == 'invoices') {
            this.invoices = response;
          } else {
            this.documents = response;
          }

        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Request Error', detail: "Server Request Error, Please Contact The Administrator" });
        }
      )
    });

    // Initialize 'statuses' array
    this.statuses = [
      { label: 'paid', value: 'paid' },
      { label: 'non-paid', value: 'non-paid' },
      { label: 'uncompleted', value: 'uncompleted' },
    ];
  }

  // Function to determine severity based on status
  getSeverity(status: string) {
    switch (status) {
      case 'non-paid':
        return 'danger';

      case 'paid':
        return 'success';

      case 'new':
        return 'info';

      case 'uncompleted':
        return 'warning';

      case 'renewal':
        return null; // No specific severity
    }
  }
  PrintPDF(ID){
    let data = this.FetchDocService.getDocumentData(ID,this.TYPE).subscribe(
      (respond)=>{
        this.pdfService.generateInvoice(respond);
        console.log(respond)
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  handleDocumentDeletion(data){
    // Assign data based on 'TYPE'
    if (this.TYPE == 'invoices') {
      this.invoices = data;
    } 
    else {
      this.documents = data;
    }
  }
}
