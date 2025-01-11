import { Component, Input } from '@angular/core';
import { SaveToCookieService } from '@services/save-to-cookie/save-to-cookie.service'
import { SharedDataService } from '@services/SharedData/shared-data.service'
import { Router, ActivatedRoute } from '@angular/router';
import { SaveToDbService } from '@services/save-to-db/save-to-db.service';

@Component({
  selector: 'app-edit-document-table-items',
  templateUrl: './edit-document-table-items.component.html',
  styleUrls: ['./edit-document-table-items.component.scss']
})
export class EditDocumentTableItemsComponent {
  TYPE;
  ID;
  @Input() document_data;

  constructor(
    private SaveToDbService: SaveToDbService,
    private route: ActivatedRoute,
  ) { }

  N_ELEMENT: number = 0;
  TOTAL_HT: number = 0;
  TOTAL_TTC: number = 0;
  TVA: number = 0;
  tableData = [];

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.TYPE = params.type;
      this.ID = params.id

      // Get saved data from DB based on Doc_ID
      const temp_data = this.document_data.document_items

      // Log the retrieved temp_data
      console.log("[+] app-table-items: Getting Saved Table Data =>", temp_data);

      // Check if there is data saved in DB
      if (temp_data.length > 0) {
        // Data found in table, load data
        console.log('[+] app-table-items: Data found in DB, loading data...');

        // Set tableData to the retrieved data
        this.tableData = temp_data;

        // Calculate total values based on the loaded data
        this.calculateTotalValues();
      } else if (temp_data.length == 0) {
        // No data found in DB, loading empty table
        console.log('[+] app-table-items: Data Not Found in DB, loading empty table...');
      }
    })
  }
  // Function to calculate values
  calculateTotalValues() {
    // Get the number of elements in the tableData array
    this.N_ELEMENT = this.tableData.length;

    let total = 0;
    // Iterate through tableData to calculate the total
    for (let i = 0; i < this.tableData.length; i++) {
      total += this.tableData[i].total || 0;
    }
    // Set total before tax (HT)
    this.TOTAL_HT = total;
    // Set TVA (Value Added Tax)
    this.TVA = 20;
    // Calculate total including tax (TTC)
    this.TOTAL_TTC = this.TOTAL_HT + (this.TOTAL_HT * this.TVA / 100);
  }

  // Function to add a new row to the tableData
  addRow() {
    console.log(this.tableData);

    // Add a new row with default values
    this.tableData.push({ id: this.tableData.length + 1, name: '', quantity: 0, unity_total: 0, total: 0 });

    // Increment the number of elements
    this.N_ELEMENT = this.N_ELEMENT + 1;

    let document_items = { 'document_items': this.tableData }
    // Save the updated tableData to DB
    this.SaveToDbService.AutoSave(this.ID, document_items, this.TYPE)

  }

  // Function to clean a row by ensuring quantity and unity_total are non-negative
  CleanRow(item) {
    if (item.quantity < 0 || item.unity_total < 0) {
      item.quantity = Math.abs(item.quantity);
      item.unity_total = Math.abs(item.unity_total);
    }

    // Calculate the total for the row
    item.total = item.quantity * item.unity_total;
  }

  // Function to save row data after cleaning
  RowDataSave(item) {
    // Clean the row
    this.CleanRow(item);

    // Recalculate total values
    this.calculateTotalValues();

    // Save the updated tableData to DB
    // this.SaveToCookieService.save(this.TYPE, this.tableData, 'table');
    let document_items = { 'document_items': this.tableData }
    // Save the updated tableData to DB
    this.SaveToDbService.AutoSave(this.ID, document_items, this.TYPE)
  }

  // Function to delete a row from tableData
  deleteRow(index: number) {
    // Remove the row at the specified index
    this.tableData.splice(index, 1);

    // Recalculate total values
    this.calculateTotalValues();

    let document_items = {'document_items':this.tableData}
    // Save the updated tableData to DB
    this.SaveToDbService.AutoSave(this.ID, document_items, this.TYPE)

  }


}
