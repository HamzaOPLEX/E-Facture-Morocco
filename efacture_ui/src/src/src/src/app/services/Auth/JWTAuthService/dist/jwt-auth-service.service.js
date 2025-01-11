"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.JwtAuthService = void 0;
var core_1 = require("@angular/core");
var JwtAuthService = /** @class */ (function () {
    function JwtAuthService(jwtHelper) {
        this.jwtHelper = jwtHelper;
        this.TOKEN_KEY = 'token';
    }
    JwtAuthService.prototype.getToken = function () {
        var token = localStorage.getItem('token');
        return token;
    };
    JwtAuthService.prototype.getUser = function () {
        var token = localStorage.getItem('token');
        var username = this.jwtHelper.decodeToken(token).username;
        var userID = this.jwtHelper.decodeToken(token).user_id;
        return {
            username: username,
            userID: userID
        };
    };
    JwtAuthService.prototype.isAuthenticated = function () {
        var token = this.getToken();
        console.log('[+] JwtAuthService : token =>', token);
        var isLoggedIn = false;
        var isExpired = true;
        // Check whether the token is expired and return
        // true or false
        if (token != null) {
            isExpired = this.jwtHelper.isTokenExpired(token);
            if (isExpired == false) {
                isLoggedIn = true;
                console.log('[+] JwtAuthService : token valid');
            }
            else {
                isLoggedIn = false;
                console.log('[+] JwtAuthService : token expired');
            }
        }
        else {
            isLoggedIn = false; // if not token find so it's expired
            console.log("[+] JwtAuthService : null" + isExpired);
        }
        console.log("[+] JwtAuthService : Is User Logged In", isLoggedIn);
        return isLoggedIn;
    };
    // Function to set the token in localStorage
    JwtAuthService.prototype.setToken = function (token) {
        localStorage.setItem(this.TOKEN_KEY, token);
    };
    // Function to remove the token from localStorage
    JwtAuthService.prototype.removeToken = function () {
        localStorage.removeItem(this.TOKEN_KEY);
    };
    JwtAuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], JwtAuthService);
    return JwtAuthService;
}());
exports.JwtAuthService = JwtAuthService;
