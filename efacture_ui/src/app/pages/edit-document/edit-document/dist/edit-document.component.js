"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditDocumentComponent = void 0;
var core_1 = require("@angular/core");
var EditDocumentComponent = /** @class */ (function () {
    function EditDocumentComponent(FetchDocService, route, SharedDataService, jwtHelper) {
        this.FetchDocService = FetchDocService;
        this.route = route;
        this.SharedDataService = SharedDataService;
        this.jwtHelper = jwtHelper;
    }
    EditDocumentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.TYPE = params['type'];
            _this.Doc_ID = params['id'];
            _this.User = _this.jwtHelper.getUser().username;
            _this.FetchDocService.getDocumentData(_this.Doc_ID, _this.TYPE).subscribe(function (respond) {
                _this.document_data = respond;
                _this.doc_number = _this.document_data.document_number;
            }, function (error) {
                console.log(error.error);
            });
            // this.SharedDataService.setDoc_Data(this.document_data)
        });
    };
    ;
    EditDocumentComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-document',
            templateUrl: './edit-document.component.html',
            styleUrls: ['./edit-document.component.scss']
        })
    ], EditDocumentComponent);
    return EditDocumentComponent;
}());
exports.EditDocumentComponent = EditDocumentComponent;
