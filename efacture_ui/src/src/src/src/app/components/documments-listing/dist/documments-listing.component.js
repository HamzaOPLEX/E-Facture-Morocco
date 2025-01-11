"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DocummentsListingComponent = void 0;
// Importing necessary modules and services
var core_1 = require("@angular/core");
var DocummentsListingComponent = /** @class */ (function () {
    // Constructor function to inject services
    function DocummentsListingComponent(FetchDocService, route, pdfService) {
        this.FetchDocService = FetchDocService;
        this.route = route;
        this.pdfService = pdfService;
        this.loading = true;
        this.activityValues = [0, 100]; // Initializing an array
    }
    // ngOnInit is a lifecycle hook that runs when the component is initialized
    DocummentsListingComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Subscribe to route params (when the URL changes)
        this.route.params.subscribe(function (params) {
            _this.TYPE = params['type']; // Retrieve 'type' parameter from the URL
            // Declare a variable to store the list of documents
            var documents_list;
            // Call the service to fetch documents
            _this.FetchDocService.getAllDocs(_this.TYPE).subscribe(function (response) {
                console.log(response);
                // Process the response data
                var HT;
                var Rest;
                var TTC;
                var TVA = 20;
                response.forEach(function (element) {
                    var HT = 0;
                    var TVA = 20;
                    for (var i = 0; i < element.document_items.length; i++) {
                        HT += element.document_items[i].total || 0;
                    }
                    var TTC = HT + (HT * TVA / 100);
                    element['HT'] = HT;
                    element['Rest'] = HT - element.deposit;
                    element['TTC'] = TTC;
                });
                // Assign data based on 'TYPE'
                if (_this.TYPE == 'invoices') {
                    _this.invoices = response;
                }
                else {
                    _this.documents = response;
                }
            }, function (error) {
                console.log(error); // Log any errors
            });
        });
        // Initialize 'statuses' array
        this.statuses = [
            { label: 'paid', value: 'paid' },
            { label: 'non-paid', value: 'non-paid' },
            { label: 'uncompleted', value: 'uncompleted' },
        ];
    };
    // Function to determine severity based on status
    DocummentsListingComponent.prototype.getSeverity = function (status) {
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
    };
    DocummentsListingComponent.prototype.PrintPDF = function (ID) {
        var _this = this;
        var data = this.FetchDocService.getDocumentData(ID, this.TYPE).subscribe(function (respond) {
            _this.pdfService.generateInvoice(respond);
            console.log(respond);
        }, function (error) {
            console.log(error);
        });
    };
    DocummentsListingComponent.prototype.handleDocumentDeletion = function (data) {
        // Assign data based on 'TYPE'
        console.log('o a7san walid o walid o a7san walid', data);
        if (this.TYPE == 'invoices') {
            this.invoices = data;
        }
        else {
            this.documents = data;
        }
    };
    DocummentsListingComponent = __decorate([
        core_1.Component({
            selector: 'app-documments-listing',
            templateUrl: './documments-listing.component.html',
            styleUrls: ['./documments-listing.component.scss']
        })
    ], DocummentsListingComponent);
    return DocummentsListingComponent;
}());
exports.DocummentsListingComponent = DocummentsListingComponent;
