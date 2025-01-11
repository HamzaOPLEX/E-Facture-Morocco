import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  providers: [ConfirmationService],
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.scss']
})
export class DeleteItemComponent {
  @Input() Item_ID
  @Input() URL
  @Output() data = new EventEmitter<string>();
  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private http: HttpClient,) { }
  emitEvent(data) {
    this.data.emit(data);
  }
  Delete(){
    let url = this.URL + this.Item_ID
    this.http.delete(url).subscribe(
      (response: any) => {
        // display form values on success
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: this.Item_ID + ' deleted' });
        this.emitEvent(response)
        // location.reload()
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: JSON.stringify(error.error)});
      }
    )
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.Delete()
      },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      }
    });
  }
}
