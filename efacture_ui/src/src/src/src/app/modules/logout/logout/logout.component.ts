import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtAuthService } from '@services/Auth/JWTAuthService/jwt-auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Header, MessageService } from 'primeng/api';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  constructor(
    private http: HttpClient,
    public jwtAuthService: JwtAuthService,
    private toastr: ToastrService,
    private router: Router,
    private messageService: MessageService

  ) { }
  ngOnInit(): void {
    const apiUrl = `${environment.api_server}/api/auth/logout`;
    this.jwtAuthService.removeToken()
    this.router.navigateByUrl('/login');
    this.messageService.add({ severity: 'success', summary: 'Logout Successfull', detail: 'See You Again :)' });
  }
}
