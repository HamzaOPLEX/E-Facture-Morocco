import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FetchDocService } from '@services/fetch-doc/fetch-doc.service'; // Importing custom service
import { environment } from 'environments/environment';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {
  constructor(
    private http: HttpClient, 
    private FetchDocService: FetchDocService
    ){}

  clients
  api_server = environment.api_server
  ngOnInit(){
    this.FetchDocService.getAllClient().subscribe(
      (response: any) => {
        this.clients = response
      },
    (error) => {
        console.error(error)
      }
    )
  }
  handleClientDataEvent(data) {
    this.clients = data['clientData']
  }
  handleClientDeletion(data){
    this.clients = data
  }
  User = {
    username: "Hamza"
  }
}
