"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(http, formBuilder, jwtAuthService, toastr, router, renderer, messageService) {
        this.http = http;
        this.formBuilder = formBuilder;
        this.jwtAuthService = jwtAuthService;
        this.toastr = toastr;
        this.router = router;
        this.renderer = renderer;
        this.messageService = messageService;
        this["class"] = 'login-box';
        this.loginForm = this.formBuilder.group({
            username: ['', [forms_1.Validators.required]],
            password: ['', [forms_1.Validators.required]]
        });
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.renderer.addClass(document.querySelector('app-root'), 'login-page');
    };
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        var _a, _b;
        if (this.loginForm.valid) {
            var formData = {
                username: (_a = this.loginForm.get('username')) === null || _a === void 0 ? void 0 : _a.value,
                password: (_b = this.loginForm.get('password')) === null || _b === void 0 ? void 0 : _b.value
            };
            var apiUrl = 'http://127.0.0.1:8000/api/auth/login';
            this.http.post(apiUrl, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).subscribe(function (response) {
                var token = response.jwt;
                console.log('Login successful:', token);
                _this.jwtAuthService.setToken(token);
                _this.router.navigateByUrl('/');
                // location.reload();
                _this.messageService.add({ severity: 'success', summary: 'Login Successfull', detail: 'Welcome To E-facture' });
                // Handle successful login (e.g., redirect to another page)
            }, function (error) {
                _this.messageService.add({ severity: 'error', summary: 'Login Error', detail: error.error.detail.detail });
                // Handle login error (e.g., display error message)
            });
        }
        if (this.loginForm.invalid) {
            console.log("Login Form Invalid");
            this.messageService.add({ severity: 'error', summary: 'Login Error', detail: "Login Form Invalid" });
        }
    };
    Object.defineProperty(LoginComponent.prototype, "controls", {
        get: function () {
            return this.loginForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    LoginComponent.prototype.ngOnDestroy = function () {
        this.renderer.removeClass(document.querySelector('app-root'), 'login-page');
    };
    __decorate([
        core_1.HostBinding('class')
    ], LoginComponent.prototype, "class");
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
