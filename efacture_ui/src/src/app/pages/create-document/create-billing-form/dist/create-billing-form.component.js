"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateBillingFormComponent = void 0;
// Importing necessary modules and services
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var CreateBillingFormComponent = /** @class */ (function () {
    function CreateBillingFormComponent(SaveToCookieService, // Service for saving data to cookies
    FetchDocService, // Service for fetching document data
    SharedDataService, // Service for shared data
    SubmitFormService, // Service for shared data
    fb, // Form builder for creating forms
    route, pdfService, messageService, router) {
        this.SaveToCookieService = SaveToCookieService;
        this.FetchDocService = FetchDocService;
        this.SharedDataService = SharedDataService;
        this.SubmitFormService = SubmitFormService;
        this.fb = fb;
        this.route = route;
        this.pdfService = pdfService;
        this.messageService = messageService;
        this.router = router;
        this.submitted = false;
        // Example data
        this.user = { username: 'JohnDoe' };
        this.todayDate = '2023-10-12';
    }
    // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
    CreateBillingFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("[+] app-billing-form: o a7san walid o walid ");
        this.route.params.subscribe(function (params) {
            _this.FetchDocService.getAllClient().subscribe(function (response) {
                _this.SharedDataService.setClients(response);
                _this.clients = response;
                console.log(_this.clients);
                _this.TYPE = params.type;
                console.log('[+] app-billing-form: TYPE=', params.type);
                // SetupCookies : Create a temporary data cookie with the fetched data ID
                var temp_data = JSON.parse(localStorage.getItem(_this.TYPE)); // check if Cookies are setuped if not setup it
                console.log('[+] app-billing-form: temp data ', temp_data);
                if (temp_data == null) { // if cookies not setuped
                    console.log('[+] app-billing-form: setting up cookies ', temp_data);
                    _this.SaveToCookieService.setupCookies(_this.TYPE); // setuping cookies
                    console.log('[+] app-billing-form: setting up cookies done', temp_data);
                }
                else if (temp_data !== null) { // if cookies are setuped
                    temp_data = temp_data['billing_data'];
                    var temp_data_length = Object.values(temp_data).length;
                    console.log('[+] app-billing-form: temp data lengh', temp_data_length);
                    // Check if there is data saved in cookies
                    if (temp_data_length > 0) {
                        // Data found in table, load data
                        console.log('[+] app-billing-items: Data found in cookies, loading data...');
                        if (_this.TYPE == "invoices") {
                            _this.BillingForm = _this.fb.group({
                                document_client: [temp_data.document_client, [forms_1.Validators.required, _this.validateClientName]],
                                document_date: [temp_data.document_date, forms_1.Validators.required],
                                deposit: [temp_data.deposit, forms_1.Validators.required],
                                document_payment_method: [temp_data.document_payment_method, [forms_1.Validators.required, _this.validateClientName]],
                                ttc_or_ht: [temp_data.ttc_or_ht, forms_1.Validators.required] // Initialize ttc_or_ht field with default value 'TTC'
                            });
                        }
                        else {
                            _this.BillingForm = _this.fb.group({
                                document_client: [temp_data.document_client, [forms_1.Validators.required, _this.validateClientName]],
                                document_date: [temp_data.document_date, forms_1.Validators.required]
                            });
                            console.log('[+] app-billing-items: loding data done', temp_data);
                        }
                    }
                    else if (temp_data_length == 0) {
                        // No data found in cookies, loading empty form
                        console.log('[+] app-billing-items: Data Not Found in cookies, loading empty billing form...');
                        if (_this.TYPE == "invoices") {
                            _this.BillingForm = _this.fb.group({
                                document_client: ["-", [forms_1.Validators.required, _this.validateClientName]],
                                document_date: ['', forms_1.Validators.required],
                                deposit: ['0', forms_1.Validators.required],
                                document_payment_method: ['-', [forms_1.Validators.required, _this.validateClientName]],
                                ttc_or_ht: ['TTC', forms_1.Validators.required] // Initialize ttc_or_ht field with default value 'TTC'
                            });
                        }
                        else {
                            _this.BillingForm = _this.fb.group({
                                document_client: ['-', [forms_1.Validators.required, _this.validateClientName]],
                                document_date: ['', forms_1.Validators.required]
                            });
                        }
                    }
                }
            }, function (error) {
                console.error(error);
            });
        });
    };
    CreateBillingFormComponent.prototype.validateClientName = function (control) {
        if (control.value !== '-') {
            return null; // Validation passed
        }
        else {
            return { invalidClientName: true }; // Validation failed
        }
    };
    CreateBillingFormComponent.prototype.handleClientDataEvent = function (data) {
        this.clients = data['clientData'];
        this.BillingForm.patchValue({ "document_client": data['selectedClient'] }); // select new created client
    };
    // Function to clear cache (delete cookies with the same ID as the current invoice ID)
    CreateBillingFormComponent.prototype.ClearCache = function () {
        this.SaveToCookieService.ClearCache(this.TYPE);
        location.reload();
    };
    // Function called when form changes
    CreateBillingFormComponent.prototype.onFormChange = function () {
        console.log('Form Changes');
        var data = this.BillingForm.getRawValue();
        console.log(data);
        this.SaveToCookieService.save(this.TYPE, data, "billing");
    };
    CreateBillingFormComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        var table_data = this.SaveToCookieService.getData(this.TYPE, null);
        var isNotEmpty = Object.keys(table_data['table_data']).length > 0; // check data in the table
        var isvalid = this.isValid(table_data);
        // stop here if form is invalid
        if (this.BillingForm.invalid || isNotEmpty == false || isvalid == false) {
            this.messageService.add({ severity: 'error', summary: 'Form not complete please to check that all required field are filled' });
        }
        else {
            var formated_data = {};
            formated_data = table_data['billing_data'];
            formated_data['document_items'] = table_data['table_data'];
            this.SubmitFormService.CreateDocument(this.TYPE).subscribe(function (response) {
                // display form values on success
                _this.messageService.add({ severity: 'info', summary: 'Document Has Been Created ' + response.document_number });
                _this.pdfService.generateInvoice(response);
                _this.SaveToCookieService.ClearCache(_this.TYPE);
                _this.router.navigateByUrl("/" + _this.TYPE + "/list");
            }, function (error) {
                _this.messageService.add({ severity: 'error', summary: 'JSON.stringify(error.error)' });
            });
        }
    };
    CreateBillingFormComponent.prototype.isValid = function (table_data) {
        var valid = false;
        table_data['table_data'].forEach(function (element) {
            var id = element.id.toString().trim();
            var name = element.name.toString().trim();
            var quantity = element.quantity.toString().trim();
            var unity_total = element.unity_total.toString().trim();
            var total = element.total.toString().trim();
            if (id != '' && name != '' && quantity != '' && unity_total != '' && total != '') {
                valid = true;
            }
            else {
                valid = false;
            }
        });
        return valid;
    };
    CreateBillingFormComponent = __decorate([
        core_1.Component({
            selector: 'app-create-billing-form',
            templateUrl: './create-billing-form.component.html',
            styleUrls: ['./create-billing-form.component.scss']
        })
    ], CreateBillingFormComponent);
    return CreateBillingFormComponent;
}());
exports.CreateBillingFormComponent = CreateBillingFormComponent;
