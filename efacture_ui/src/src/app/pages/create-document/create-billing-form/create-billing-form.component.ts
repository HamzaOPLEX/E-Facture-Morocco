// Importing necessary modules and services
import { Component, Input, OnInit } from '@angular/core';
import { SaveToCookieService } from '@services/save-to-cookie/save-to-cookie.service';
import { FetchDocService } from '@services/fetch-doc/fetch-doc.service'; // Service for retrieving document-related data
import { SharedDataService } from '@services/SharedData/shared-data.service'; // Service for shared data between components
import { SubmitFormService } from '@services/Http/submit-form.service'
import { PdfGeneratorService } from '@services/pdf-generator/pdf-generator.service'
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService} from 'primeng/api';

interface document_payment_methods {
  method: string;
}


@Component({
  selector: 'app-create-billing-form',
  templateUrl: './create-billing-form.component.html',
  styleUrls: ['./create-billing-form.component.scss']
})
export class CreateBillingFormComponent implements OnInit {
  TYPE: string; // Input property for component type
  BillingForm!: FormGroup; // Form group for billing form
  submitted = false;
  PaimentMethod: document_payment_methods[] | undefined;
  SelectClient
  clients;

  constructor(
    private SaveToCookieService: SaveToCookieService, // Service for saving data to cookies
    private FetchDocService: FetchDocService, // Service for fetching document data
    private SharedDataService: SharedDataService, // Service for shared data
    private SubmitFormService: SubmitFormService, // Service for shared data
    private fb: FormBuilder, // Form builder for creating forms
    private route: ActivatedRoute,
    private pdfService: PdfGeneratorService,
    private messageService: MessageService,
    private router: Router,
    ) { }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.TYPE = params.type;
      this.SetupCookies()
      this.FetchDocService.getAllClient().subscribe(
        (response: any) => {
          this.clients = response
        },
        (error) => {
          console.log("a7san error",error)
          this.clients = []
        }
      )
      
    })
  }
  SetupCookies(){
    // SetupCookies : Create a temporary data cookie with the fetched data ID
    let temp_data = JSON.parse(localStorage.getItem(this.TYPE)); // check if Cookies are setuped if not setup it
    if (temp_data == null) { // if cookies not setuped
      this.SaveToCookieService.setupCookies(this.TYPE); // setuping cookies
    }
    else if (temp_data !== null) { // if cookies are setuped
      temp_data = temp_data['billing_data']
      let temp_data_length = Object.values(temp_data).length
      // Check if there is data saved in cookies
      if (temp_data_length > 0) {
        // Data found in table, load data
        if (this.TYPE == "invoices") {
          this.BillingForm = this.fb.group({
            document_client: [temp_data.document_client, [Validators.required, this.validateClientName]], // Initialize client name field
            document_date: [temp_data.document_date, Validators.required], // Initialize invoice date field
            deposit: [temp_data.deposit, Validators.required], // Initialize advance field
            document_payment_method: [temp_data.document_payment_method, [Validators.required, this.validateClientName]], // Initialize payment method field
            ttc_or_ht: [temp_data.ttc_or_ht, Validators.required] // Initialize ttc_or_ht field with default value 'TTC'
          });
        }
        else {
          this.BillingForm = this.fb.group({
            document_client: [temp_data.document_client, [Validators.required, this.validateClientName]], // Initialize client name field
            document_date: [temp_data.document_date, Validators.required], // Initialize invoice date field
          });
        }

      }
      else if (temp_data_length == 0) {
        // No data found in cookies, loading empty form
        console.log('[+] app-billing-items: Data Not Found in cookies, loading empty billing form...');
        if (this.TYPE == "invoices") {
          this.BillingForm = this.fb.group({
            document_client: ["-", [Validators.required, this.validateClientName]], // Initialize client name field
            document_date: ['', Validators.required], // Initialize invoice date field
            deposit: ['0', Validators.required], // Initialize advance field
            document_payment_method: ['-', [Validators.required, this.validateClientName]], // Initialize payment method field
            ttc_or_ht: ['TTC', Validators.required] // Initialize ttc_or_ht field with default value 'TTC'
          });
        }
        else {
          this.BillingForm = this.fb.group({
            document_client: ['-', [Validators.required, this.validateClientName]], // Initialize client name field
            document_date: ['', Validators.required], // Initialize invoice date field
          });
        }
      }
    }
  }
  validateClientName(control) {
    if (control.value !== '-') {
      return null; // Validation passed
    } 
    else {
      return { invalidClientName: true }; // Validation failed
    }
  }
  // Example data
  user = { username: 'JohnDoe' };
  todayDate = '2023-10-12';



  handleClientDataEvent(data){
    this.clients = data['clientData']
    this.BillingForm.patchValue({"document_client":data['selectedClient']}) // select new created client
  }

  // Function to clear cache (delete cookies with the same ID as the current invoice ID)
  ClearCache() {
    this.SaveToCookieService.ClearCache(this.TYPE)
    location.reload()
  }

  // Function called when form changes
  onFormChange() {
    console.log('Form Changes');
    let data = this.BillingForm.getRawValue()
    console.log(data)
    this.SaveToCookieService.save(this.TYPE, data, "billing")
  }

  onSubmit(){
    this.submitted = true;
    let table_data = this.SaveToCookieService.getData(this.TYPE,null)
    let isNotEmpty = Object.keys(table_data['table_data']).length > 0; // check data in the table
    const isvalid = this.isValid(table_data)

    // stop here if form is invalid
    if (this.BillingForm.invalid || isNotEmpty == false || isvalid == false) {
      this.messageService.add({ severity: 'error', summary: 'Form not complete please to check that all required field are filled' });

    }
    else {
      let formated_data = {}
      formated_data = table_data['billing_data']
      formated_data['document_items'] = table_data['table_data']
      this.SubmitFormService.CreateDocument(this.TYPE).subscribe(
        (response: any) => {
          // display form values on success
          this.messageService.add({ severity: 'info', summary: 'Document Has Been Created ' + response.document_number });
          this.pdfService.generateInvoice(response);
          this.SaveToCookieService.ClearCache(this.TYPE)
          this.router.navigateByUrl(`/${this.TYPE}/list`);
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'JSON.stringify(error.error)' });
        }
      )
    }                    
  }


  isValid(table_data){
    let valid = false
    table_data['table_data'].forEach(element => {
      let id = element.id.toString().trim()
      let name = element.name.toString().trim()
      let quantity = element.quantity.toString().trim()
      let unity_total = element.unity_total.toString().trim()
      let total = element.total.toString().trim()
      if (id != '' && name != '' && quantity != '' && unity_total != '' && total != '') {
        valid = true
      }
      else {
        valid = false
      }
    });
    return valid
  }


}
