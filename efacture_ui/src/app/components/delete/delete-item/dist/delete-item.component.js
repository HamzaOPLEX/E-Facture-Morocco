"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DeleteItemComponent = void 0;
var core_1 = require("@angular/core");
var api_1 = require("primeng/api");
var DeleteItemComponent = /** @class */ (function () {
    function DeleteItemComponent(confirmationService, messageService, http) {
        this.confirmationService = confirmationService;
        this.messageService = messageService;
        this.http = http;
        this.data = new core_1.EventEmitter();
    }
    DeleteItemComponent.prototype.emitEvent = function (data) {
        this.data.emit(data);
    };
    DeleteItemComponent.prototype.Delete = function () {
        var _this = this;
        var url = this.URL + this.Item_ID;
        this.http["delete"](url).subscribe(function (response) {
            // display form values on success
            _this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: _this.Item_ID + ' deleted' });
            _this.emitEvent(response);
            // location.reload()
        }, function (error) {
            _this.messageService.add({ severity: 'error', summary: 'Error', detail: JSON.stringify(error.error) });
        });
    };
    DeleteItemComponent.prototype.confirmDelete = function () {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: function () {
                _this.Delete();
            },
            reject: function (type) {
                switch (type) {
                    case api_1.ConfirmEventType.REJECT:
                        _this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                        break;
                    case api_1.ConfirmEventType.CANCEL:
                        _this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                        break;
                }
            }
        });
    };
    __decorate([
        core_1.Input()
    ], DeleteItemComponent.prototype, "Item_ID");
    __decorate([
        core_1.Input()
    ], DeleteItemComponent.prototype, "URL");
    __decorate([
        core_1.Output()
    ], DeleteItemComponent.prototype, "data");
    DeleteItemComponent = __decorate([
        core_1.Component({
            providers: [api_1.ConfirmationService],
            selector: 'app-delete-item',
            templateUrl: './delete-item.component.html',
            styleUrls: ['./delete-item.component.scss']
        })
    ], DeleteItemComponent);
    return DeleteItemComponent;
}());
exports.DeleteItemComponent = DeleteItemComponent;
