"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditClientModalComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var EditClientModalComponent = /** @class */ (function () {
    function EditClientModalComponent(http, fb, SharedDataService, messageService) {
        this.http = http;
        this.fb = fb;
        this.SharedDataService = SharedDataService;
        this.messageService = messageService;
        this.clients = new core_1.EventEmitter();
        this.submitted = false;
        this.closeResult = '';
        this.visible = false;
    }
    EditClientModalComponent.prototype.resetForm = function () {
        this.ClientForm = this.fb.group({
            client_name: ['', [forms_1.Validators.required]],
            client_ICE: ['', [forms_1.Validators.required]],
            client_city: ['', [forms_1.Validators.required]]
        });
    };
    EditClientModalComponent.prototype.ngOnInit = function () {
        this.resetForm();
    };
    EditClientModalComponent.prototype.showDialog = function () {
        var _this = this;
        this.visible = true;
        var url = "http://127.0.0.1:8000/api/clients/" + this.Item_ID;
        this.http.get(url).subscribe(function (response) {
            // this.visible = false;
            _this.ClientForm.controls['client_name'].setValue(response.client_name);
            _this.ClientForm.controls['client_ICE'].setValue(response.client_ICE);
            _this.ClientForm.controls['client_city'].setValue(response.client_city);
        }, function (error) {
            _this.messageService.add({ severity: 'error', summary: 'Error', detail: JSON.stringify(error.error) });
        });
    };
    EditClientModalComponent.prototype.Change = function () {
        var _this = this;
        var data = this.ClientForm.getRawValue();
        var url = "http://127.0.0.1:8000/api/clients/update/" + this.Item_ID;
        this.http.put(url, data).subscribe(function (response) {
            // this.visible = false;
            _this.messageService.add({ severity: 'info', summary: 'Saved', detail: 'Client Informations Saved Successfully' });
        }, function (error) {
            _this.messageService.add({ severity: 'error', summary: 'Error', detail: JSON.stringify(error.error) });
        });
    };
    __decorate([
        core_1.Output()
    ], EditClientModalComponent.prototype, "clients");
    __decorate([
        core_1.Input()
    ], EditClientModalComponent.prototype, "Item_ID");
    __decorate([
        core_1.Input()
    ], EditClientModalComponent.prototype, "URL");
    EditClientModalComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-client-modal',
            templateUrl: './edit-client-modal.component.html',
            styleUrls: ['./edit-client-modal.component.scss']
        })
    ], EditClientModalComponent);
    return EditClientModalComponent;
}());
exports.EditClientModalComponent = EditClientModalComponent;
