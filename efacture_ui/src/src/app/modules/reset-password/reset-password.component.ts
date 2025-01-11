
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
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
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

  registrationForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]]
  })

  api_server = environment.api_server
  register_path = environment.endpoints.register
  onSubmit() {
    if (this.registrationForm.valid) {
      let formData = {
        username: this.registrationForm.get('username')?.value,
        password: this.registrationForm.get('password')?.value,
        email: this.registrationForm.get('password')?.value,
      };
      const apiUrl = `${this.api_server}/${this.register_path}`;
      this.http.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).subscribe(
        (response: any) => {
          this.router.navigateByUrl('/login');
          this.messageService.add({ severity: 'success', summary: 'Registration Successfull', detail: 'Please Login To Continue' });
        },
        (error) => {
          try {
            this.messageService.add({ severity: 'error', summary: 'Registration Error', detail: error.error.detail.detail });
          }
          catch (err) {
            this.messageService.add({ severity: 'error', summary: 'Server Error', detail: "Server Error Please Contact The Administrator" });
          }
        }
      );
    }
    if (this.registrationForm.invalid) {
      console.log("Registration Form Invalid")
      this.messageService.add({ severity: 'error', summary: 'Registration Error', detail: "Registration Form Invalid" });

    }
  }

  get controls(): { [p: string]: AbstractControl } {
    return this.registrationForm.controls;
  }
  ngOnDestroy() {
    this.renderer.removeClass(
      document.querySelector('app-root'),
      'login-page'
    );
  }
}
