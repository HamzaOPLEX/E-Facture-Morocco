"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddClientModalComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var AddClientModalComponent = /** @class */ (function () {
    function AddClientModalComponent(http, fb, messageService) {
        this.http = http;
        this.fb = fb;
        this.messageService = messageService;
        this.clients = new core_1.EventEmitter();
        this.submitted = false;
        this.closeResult = '';
        this.visible = false;
    }
    AddClientModalComponent.prototype.resetForm = function () {
        this.ClientForm = this.fb.group({
            client_name: ['', [forms_1.Validators.required]],
            client_ICE: ['', [forms_1.Validators.required]],
            client_city: ['', [forms_1.Validators.required]]
        });
    };
    AddClientModalComponent.prototype.ngOnInit = function () {
        this.resetForm();
    };
    AddClientModalComponent.prototype.showDialog = function () {
        this.visible = true;
    };
    AddClientModalComponent.prototype.Change = function () {
        console.log(this.ClientForm.getRawValue());
    };
    AddClientModalComponent.prototype.emitEvent = function (data) {
        this.clients.emit(data);
    };
    AddClientModalComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        // stop here if form is invalid
        if (this.ClientForm.invalid) {
            alert('Form not complete please to check that all required field are filled');
        }
        else {
            var url = 'http://127.0.0.1:8000/api/clients/create/';
            this.http.post(url, this.ClientForm.getRawValue()).subscribe(function (response) {
                _this.visible = false;
                _this.resetForm();
                var data = {};
                data['clientData'] = response[0];
                data['selectedClient'] = response[1];
                _this.emitEvent(data);
                _this.messageService.add({ severity: 'info', summary: 'Client Created', detail: 'Client has been created' });
            }, function (error) {
                _this.messageService.add({ severity: 'error', summary: 'Error', detail: JSON.stringify(error.error) });
            });
        }
    };
    __decorate([
        core_1.Output()
    ], AddClientModalComponent.prototype, "clients");
    AddClientModalComponent = __decorate([
        core_1.Component({
            selector: 'app-add-client-modal',
            templateUrl: './add-client-modal.component.html',
            styleUrls: ['./add-client-modal.component.scss']
        })
    ], AddClientModalComponent);
    return AddClientModalComponent;
}());
exports.AddClientModalComponent = AddClientModalComponent;
