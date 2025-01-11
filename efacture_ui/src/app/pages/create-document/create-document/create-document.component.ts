import { Component } from '@angular/core';
import { FetchDocService } from '@services/fetch-doc/fetch-doc.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedDataService } from '@services/SharedData/shared-data.service'; // Service for shared data between components
import { JwtAuthService } from '@services/Auth/JWTAuthService/jwt-auth-service.service';

@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.scss']
})
export class CreateDocumentComponent {
  TYPE
  clients;
  User;
  constructor(
    private FetchDocService: FetchDocService, 
    private route: ActivatedRoute, 
    private SharedDataService: SharedDataService, // Service for shared data
    private jwtHelper: JwtAuthService,
  ) { }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.TYPE = params['type'];
      this.User = this.jwtHelper.getUser().username
    })
  };

}
