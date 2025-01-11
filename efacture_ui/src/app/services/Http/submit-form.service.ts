import { Injectable } from '@angular/core';
import { SaveToCookieService } from '@services/save-to-cookie/save-to-cookie.service'; // Service for shared data between components
import { ValidatorsService } from '@services/Validators/validators.service'; // Service for shared data between components
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService} from 'primeng/api';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SubmitFormService {
  billingFormData: any;
  itemsTableData: any[];


  constructor(
    private SaveToCookieService: SaveToCookieService,
    private ValidatorsService: ValidatorsService,
    private http: HttpClient,
    public jwtHelper: JwtHelperService,
    private messageService: MessageService,    
    ) {
  }

  CreateDocument(TYPE){
    let data = this.SaveToCookieService.getData(TYPE,null)
    const url = `${environment.api_server}/api/documents/create/`
    // const url = environment.api_server + "/documents/create/"

    // formating data for the api serializer 
    let formated_data = {}
    formated_data = data['billing_data']
    formated_data['document_items'] = data['table_data']
    formated_data['document_created_by'] = this.jwtHelper.decodeToken().id
    formated_data['document_type'] = TYPE
    

    return this.http.post(url, formated_data)
  }

}
