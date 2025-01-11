"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DashboardComponent = void 0;
var core_1 = require("@angular/core");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(http) {
        this.http = http;
        this.Lenghts = {
            len_factures: 0,
            len_devis: 0,
            len_bl: 0,
            len_products: 0,
            len_clients: 0
        };
        this.HT = 1000;
        this.HT_BL = 1000;
        this.TTC = 1200;
        this.TVA_taux = 20;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.http.get('http://127.0.0.1:8000/api/api/dashboard/').subscribe(function (response) {
            _this.Lenghts = {
                len_factures: response['total_invoices'],
                len_devis: response['total_devis'],
                len_bl: response['total_bl'],
                len_products: 0,
                len_clients: response['total_clients']
            };
        }, function (error) {
        });
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-dashboard',
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.scss']
        })
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
