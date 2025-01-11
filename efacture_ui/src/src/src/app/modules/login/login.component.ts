
import {
    Component,
    OnInit,
    OnDestroy,
    Renderer2,
    HostBinding
} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormBuilder, Validators } from "@angular/forms";
import { JwtAuthService } from '@services/Auth/JWTAuthService/jwt-auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    @HostBinding('class') class = 'login-box';

    ngOnInit(): void {
        this.renderer.addClass(
            document.querySelector('app-root'),
            'login-page'
        );

    }

    constructor(
        private http: HttpClient,
        private formBuilder: FormBuilder,
        public jwtAuthService: JwtAuthService,
        private router: Router,
        private renderer: Renderer2,
        private messageService: MessageService

    ) { }

    loginForm = this.formBuilder.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
    })

    api_server = environment.api_server
    login_path = environment.endpoints.login
    onSubmit() {
        if (this.loginForm.valid) {
            let formData = {
                username: this.loginForm.get('username')?.value,
                password: this.loginForm.get('password')?.value,
            };
            const apiUrl = `${this.api_server}/${this.login_path}`;
            this.http.post(apiUrl, formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).subscribe(
                (response: any) => {
                    const token = response.jwt;
                    console.log('Login successful:', token);
                    this.jwtAuthService.setToken(token)
                    this.router.navigateByUrl('/');
                    // location.reload();
                    this.messageService.add({ severity: 'success', summary: 'Login Successfull', detail: 'Welcome To E-facture' });
                    // Handle successful login (e.g., redirect to another page)
                },
                (error) => {
                    try{
                        this.messageService.add({ severity: 'error', summary: 'Login Error', detail: error.error.detail.detail });
                    }
                    catch(err){
                        this.messageService.add({ severity: 'error', summary: 'Server Error', detail: "Server Error Please Contact The Administrator" });
                    }
                    // Handle login error (e.g., display error message)
                }
            );
        }
        if (this.loginForm.invalid) {
            console.log("Login Form Invalid")
            this.messageService.add({ severity: 'error', summary: 'Login Error', detail: "Login Form Invalid" });

        }
    }

    get controls(): { [p: string]: AbstractControl } {
        return this.loginForm.controls;
    }
    ngOnDestroy() {
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'login-page'
        );
    }
}