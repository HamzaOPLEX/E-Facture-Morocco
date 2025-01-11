import { Component } from '@angular/core';
import { FetchDocService } from '@services/fetch-doc/fetch-doc.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedDataService } from '@services/SharedData/shared-data.service'; // Service for shared data between components
import { JwtAuthService } from '@services/Auth/JWTAuthService/jwt-auth-service.service';

@Component({
  selector: 'app-edit-document',
  templateUrl: './edit-document.component.html',
  styleUrls: ['./edit-document.component.scss']
})


export class EditDocumentComponent {
  TYPE
  Doc_ID
  User
  document_data
  doc_number
  constructor(private FetchDocService: FetchDocService, private route: ActivatedRoute, private SharedDataService: SharedDataService,
    private jwtHelper: JwtAuthService,
 // Service for shared data
) { }
  ngOnInit(){
      this.route.params.subscribe(params => {
        this.TYPE = params['type'];
        this.Doc_ID = params['id'];
        this.User = this.jwtHelper.getUser().username
  
        this.FetchDocService.getDocumentData(this.Doc_ID,this.TYPE).subscribe(
          (respond)=>{
            this.document_data = respond
            this.doc_number = this.document_data.document_number
          },
          (error)=>{
            console.log(error.error)
          }
        )
        // this.SharedDataService.setDoc_Data(this.document_data)
      })
  };

}
