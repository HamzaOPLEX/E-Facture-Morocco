import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "environments/environment"

@Injectable({
  providedIn: 'root'
})
export class FetchDocService {
  constructor(private http: HttpClient){}
  api_server = environment.api_server
  clientsURL = environment.endpoints.clientsList
  documentsURL = environment.endpoints.documentList
  documentDetailURL = environment.endpoints.documentDetail
  dashboardURL = environment.endpoints.dashboard
  getAllClient(){
    let url = this.api_server+"/"+this.clientsURL
    return this.http.get(url)
  }
  getAllProduct() {
    let url = `${this.api_server}/api/products/`
    // const url = environment.api_server + "/documents/create/"

    return this.http.get(url)
  }
  getDocumentData(id,TYPE){
    let url = `${this.api_server}/${this.documentDetailURL}/${TYPE.trim()}/${id}`
    return this.http.get(url)
    }

  getAllDocs(TYPE) {
    let url = `${this.api_server}/${this.documentsURL}/${TYPE.trim()}`
    return this.http.get(url)
  }
  getDashboardData() {
    let url = `${this.api_server}/${this.dashboardURL}`
    return this.http.get(url)
  }
  getAdminPageData(){
    let url = `${this.api_server}/${this.dashboardURL}`
    return this.http.get(url)
  }
}
