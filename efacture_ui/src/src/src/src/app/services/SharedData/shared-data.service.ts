import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  loading = true
  constructor() { }
  document_data = ''
  clients

  setClients(data){
    console.log('[+] Client Data Has Been Shared')
    this.clients = data
  }
  getClients(){
    return this.clients
  }


  setLoadingStatus(status){
    this.loading = status
  }
  getLoadingStatus(){
    return this.loading
  }

  setDoc_Data(data) {
    this.document_data = data
    return true
  }
  getDoc_Data() {
    return this.document_data
  }
}
