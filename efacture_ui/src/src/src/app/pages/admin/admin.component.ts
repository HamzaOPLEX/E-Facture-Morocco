import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { FetchDocService } from '@services/fetch-doc/fetch-doc.service'; // Importing custom service
import { JwtAuthService } from '@services/Auth/JWTAuthService/jwt-auth-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  User
    constructor(
        private http: HttpClient,
        private messageService: MessageService,
        private FetchDocService: FetchDocService,
        private jwtHelper: JwtAuthService,
        ){
    }

  Lenghts = {
    len_products: 0, // Assuming this is a placeholder value, you should replace it with the actual length
    len_clients: 0,  // Replace with the actual length
    len_users: 0,    // Replace with the actual length
    // len_templates: 0 // Replace with the actual length
  };
  ngOnInit() {
    this.User = this.jwtHelper.getUser().username

    this.FetchDocService.getDashboardData().subscribe(
      (response) => {
        this.Lenghts = {
          len_products: 0,
          len_clients: response['total_clients'],
          len_users: response['total_users'],
          // len_templates: response['total_users']
        };
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Request Error', detail: "Server Request Error, Please Contact The Administrator" });
      }
    )
  }
}
