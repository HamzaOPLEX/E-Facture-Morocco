"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FetchDocService = void 0;
var core_1 = require("@angular/core");
var FetchDocService = /** @class */ (function () {
    function FetchDocService(http) {
        this.http = http;
    }
    FetchDocService.prototype.getAllClient = function () {
        var url = "http://127.0.0.1:8000/api/clients/";
        return this.http.get(url);
    };
    FetchDocService.prototype.getDocumentData = function (id, TYPE) {
        var url = "http://127.0.0.1:8000/api/" + TYPE.trim() + "/document/" + id;
        return this.http.get(url);
    };
    FetchDocService.prototype.getAllDocs = function (TYPE) {
        var url = "http://127.0.0.1:8000/api/documents/" + TYPE.trim();
        return this.http.get(url);
    };
    FetchDocService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], FetchDocService);
    return FetchDocService;
}());
exports.FetchDocService = FetchDocService;
