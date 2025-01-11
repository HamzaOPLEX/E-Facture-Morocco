import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedDataService } from '@services/SharedData/shared-data.service'; // Service for shared data between components
import { MessageService} from 'primeng/api';
import {environment } from 'environments/environment';
@Component({
  selector: 'app-add-client-modal',
  templateUrl: './add-client-modal.component.html',
  styleUrls: ['./add-client-modal.component.scss']
})
export class AddClientModalComponent {
  @Output() clients = new EventEmitter<string>();
  submitted = false;
  closeResult = '';
  ClientForm!: FormGroup;
  constructor(
    private http: HttpClient, 
    private fb: FormBuilder, 
    private messageService: MessageService
    ) {}

  visible: boolean = false;

  resetForm(){
    this.ClientForm = this.fb.group({
      client_name: ['', [Validators.required]],
      client_ICE: ['', [Validators.required]],
      client_city: ['', [Validators.required]]
    })
  }

  ngOnInit(){
    this.resetForm()
  }

  showDialog() {
    this.visible = true;
  }

  Change(){
    console.log(this.ClientForm.getRawValue())
  }
  emitEvent(data) {
    this.clients.emit(data);
  }
  onSubmit(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.ClientForm.invalid) {
      alert('Form not complete please to check that all required field are filled')
    }
    else {
      let url = `${environment.api_server}/api/clients/create/`
      this.http.post(url, this.ClientForm.getRawValue()).subscribe(
        (response: any) => {
          this.visible = false;
          this.resetForm()
          let data = {}
          data['clientData'] = response[0]
          data['selectedClient'] = response[1]
          this.emitEvent(data)
          this.messageService.add({ severity: 'info', summary: 'Client Created', detail: 'Client has been created' });
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: JSON.stringify(error.error) });
        }
      )    
    }
  }
}
