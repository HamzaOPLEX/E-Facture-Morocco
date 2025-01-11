"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClientsComponent = void 0;
var core_1 = require("@angular/core");
var ClientsComponent = /** @class */ (function () {
    function ClientsComponent(http, FetchDocService) {
        this.http = http;
        this.FetchDocService = FetchDocService;
        this.User = {
            username: "Hamza"
        };
    }
    ClientsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.FetchDocService.getAllClient().subscribe(function (response) {
            _this.clients = response;
        }, function (error) {
            console.error(error);
        });
    };
    ClientsComponent.prototype.handleClientDataEvent = function (data) {
        console.log(data);
        this.clients = data['clientData'];
    };
    ClientsComponent.prototype.handleClientDeletion = function (data) {
        console.log("mn 3andk khokom walid o a7san walid :", data);
        this.clients = data;
    };
    ClientsComponent = __decorate([
        core_1.Component({
            selector: 'app-clients',
            templateUrl: './clients.component.html',
            styleUrls: ['./clients.component.scss']
        })
    ], ClientsComponent);
    return ClientsComponent;
}());
exports.ClientsComponent = ClientsComponent;
