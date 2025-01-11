import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedDataService } from '@services/SharedData/shared-data.service'; // Service for shared data between components
import { Header, MessageService } from 'primeng/api';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-client-modal',
  templateUrl: './edit-client-modal.component.html',
  styleUrls: ['./edit-client-modal.component.scss']
})
export class EditClientModalComponent {
  @Output() clients = new EventEmitter<string>();
  @Input() Item_ID;
  @Input() URL ;
  submitted = false;
  closeResult = '';
  ClientForm!: FormGroup;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private SharedDataService: SharedDataService,
    private messageService: MessageService,
    private router: Router
  ) { }

  visible: boolean = false;

  resetForm() {
    this.ClientForm = this.fb.group({
      client_name: ['', [Validators.required]],
      client_ICE: ['', [Validators.required]],
      client_city: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.resetForm()

  }

  showDialog() {
    this.visible = true;
    let url = `${environment.api_server}/api/clients/${this.Item_ID}/`
    this.http.get(url).subscribe(
      (response: any) => {
        // this.visible = false;
        this.ClientForm.controls['client_name'].setValue(response.client_name)
        this.ClientForm.controls['client_ICE'].setValue(response.client_ICE)
        this.ClientForm.controls['client_city'].setValue(response.client_city)
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: JSON.stringify(error.error) });
      }
    )
  }

  Change() {
    let data = this.ClientForm.getRawValue()
    let url = `${environment.api_server}/api/clients/update/${this.Item_ID}`
    this.http.put(url, data).subscribe(
      (response: any) => {
        this.visible = false;
        this.messageService.add({ severity: 'info', summary: 'Saved', detail: 'Client Informations Saved Successfully' });
        window.location.reload();
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: JSON.stringify(error.error) });
      }
    )
  }
  // emitEvent(data) {
  //   this.clients.emit(data);
  // }
}
