"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthInterceptorInterceptor = void 0;
var core_1 = require("@angular/core");
var AuthInterceptorInterceptor = /** @class */ (function () {
    function AuthInterceptorInterceptor(JWTauthService) {
        this.JWTauthService = JWTauthService;
    }
    AuthInterceptorInterceptor.prototype.intercept = function (request, next) {
        var accessToken = this.JWTauthService.getToken();
        // Exclude login requests from token addition
        if (request.url.endsWith('/login') && request.method === 'POST') {
            return next.handle(request);
        }
        // If the access token is available, add the Authorization header
        if (accessToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: "Bearer " + accessToken
                }
            });
        }
        return next.handle(request);
    };
    AuthInterceptorInterceptor = __decorate([
        core_1.Injectable()
    ], AuthInterceptorInterceptor);
    return AuthInterceptorInterceptor;
}());
exports.AuthInterceptorInterceptor = AuthInterceptorInterceptor;
