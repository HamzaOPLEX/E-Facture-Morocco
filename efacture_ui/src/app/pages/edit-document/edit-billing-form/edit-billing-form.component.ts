// Importing necessary modules and services
import { Component, Input, OnInit } from '@angular/core';
import { SaveToDbService } from '@services/save-to-db/save-to-db.service';
import { FetchDocService } from '@services/fetch-doc/fetch-doc.service'; // Service for retrieving document-related data
import { SharedDataService } from '@services/SharedData/shared-data.service'; // Service for shared data between components
import { SubmitFormService } from '@services/Http/submit-form.service'
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { PdfGeneratorService } from '@services/pdf-generator/pdf-generator.service'

interface document_payment_methods {
  method: string;
}

@Component({
  selector: 'app-edit-billing-form',
  templateUrl: './edit-billing-form.component.html',
  styleUrls: ['./edit-billing-form.component.scss']
})
export class EditBillingFormComponent {

  @Input() document_data;

  TYPE: string; // Input property for component type
  ID;
  BillingForm!: FormGroup; // Form group for billing form
  submitted = false;
  PaimentMethod: document_payment_methods[] | undefined;
  SelectClient
  clients;

  constructor(
    private SaveToDbService: SaveToDbService, // Service for saving data to db
    private FetchDocService: FetchDocService, // Service for fetching document data
    private SharedDataService: SharedDataService, // Service for shared data
    private SubmitFormService: SubmitFormService, // Service for shared data
    private fb: FormBuilder, // Form builder for creating forms
    private route: ActivatedRoute,
    private pdfService: PdfGeneratorService  

  ) { }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
    console.log(this.document_data)
    this.route.params.subscribe(params => {
      this.FetchDocService.getAllClient().subscribe(
        (response: any) => {
          this.SharedDataService.setClients(response)
          this.clients = response
        },
        (error) => {
          console.error(error)
        }
      )
      this.TYPE = params.type;
      this.ID = params.id;
      console.log('[+] app-billing-form: TYPE=', params.type)

      console.log('[+] app-billing-items: Data Not Found in cookies, loading empty billing form...');
      if (this.TYPE == "invoices") {
        this.BillingForm = this.fb.group({
          document_client: [this.document_data.document_client.id, [Validators.required, this.validateClientName]], // Initialize client name field
          document_date: [this.document_data.document_date, Validators.required], // Initialize invoice date field
          deposit: [this.document_data.deposit, Validators.required], // Initialize advance field
          document_payment_method: [this.document_data.document_payment_method, [Validators.required, this.validateClientName]], // Initialize payment method field
          ttc_or_ht: [this.document_data.ttc_or_ht, Validators.required] // Initialize ttc_or_ht field with default value 'TTC'
        });
      }
      else {
        this.BillingForm = this.fb.group({
          document_client: [this.document_data.document_client.id, [Validators.required, this.validateClientName]], // Initialize client name field
          document_date: [this.document_data.document_date, Validators.required], // Initialize invoice date field
        });
      }    
    })
  }
  validateClientName(control) {
    if (control.value !== '-') {
      return null; // Validation passed
    } else {
      return { invalidClientName: true }; // Validation failed
    }
  }
  // Example data
  user = { username: 'JohnDoe' };
  todayDate = '2023-10-12';



  handleClientDataEvent(data) {
    this.clients = data['clientData']
    this.BillingForm.patchValue({ "document_client": data['selectedClient'] }) // select new created client
    let form_data = this.BillingForm.getRawValue()
    this.SaveToDbService.AutoSave(this.ID, form_data, this.TYPE)
  }

  // Function called when form changes
  onFormChange() {
    let form_data = this.BillingForm.getRawValue()
    this.SaveToDbService.AutoSave(this.ID, form_data, this.TYPE)
  }

  PrintPDF(){
    let data = this.FetchDocService.getDocumentData(this.ID,this.TYPE).subscribe(
      (respond)=>{
        this.pdfService.generateInvoice(respond);
        console.log(respond)
      },
      (error)=>{
        console.log(error)
      }
    )
  }
}
