import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FetchDocService } from '@services/fetch-doc/fetch-doc.service'; // Importing custom service
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  constructor(
    private http: HttpClient,
    private FetchDocService: FetchDocService
  ) { }

  products
  api_server = environment.api_server
  ngOnInit() {
    this.FetchDocService.getAllClient().subscribe(
      (response: any) => {
        this.products = response
      },
      (error) => {
        console.error(error)
      }
    )
  }
  handleClientDataEvent(data) {
    console.log(data)
    this.products = data['clientData']
  }
  handleClientDeletion(data) {
    console.log("mn 3andk khokom walid o a7san walid :", data)
    this.products = data
  }
  User = {
    username: "Hamza"
  }
}
