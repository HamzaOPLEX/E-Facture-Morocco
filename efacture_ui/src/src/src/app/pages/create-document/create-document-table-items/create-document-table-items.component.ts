import { Component, Input } from '@angular/core';
import { SaveToCookieService } from '@services/save-to-cookie/save-to-cookie.service'
import { SharedDataService } from '@services/SharedData/shared-data.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-document-table-items',
  templateUrl: './create-document-table-items.component.html',
  styleUrls: ['./create-document-table-items.component.scss']
})
export class CreateDocumentTableItemsComponent {

  TYPE;

  constructor(
    private SaveToCookieService: SaveToCookieService,
    private SharedDataService: SharedDataService,
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

      // Get saved data from cookies based on Doc_ID
      const temp_data = this.SaveToCookieService.getData(this.TYPE, 'table');

      // Log the retrieved temp_data
      console.log("[+] app-table-items: Getting Saved Table Data =>", temp_data);

      // Check if there is data saved in cookies
      if (temp_data.length > 0) {
        // Data found in table, load data
        console.log('[+] app-table-items: Data found in cookies, loading data...');

        // Set tableData to the retrieved data
        this.tableData = temp_data;

        // Calculate total values based on the loaded data
        this.calculateTotalValues();
      } else if (temp_data.length == 0) {
        // No data found in cookies, loading empty table
        console.log('[+] app-table-items: Data Not Found in cookies, loading empty table...');
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

    // Save the updated tableData to cookies
    this.SaveToCookieService.save(this.TYPE, this.tableData, 'table');
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

    // Save the updated tableData to cookies
    this.SaveToCookieService.save(this.TYPE, this.tableData, 'table');
  }

  // Function to delete a row from tableData
  deleteRow(index: number) {
    // Remove the row at the specified index
    this.tableData.splice(index, 1);

    // Recalculate total values
    this.calculateTotalValues();

    // Save the updated tableData to cookies
    this.SaveToCookieService.save(this.TYPE, this.tableData, 'table');
  }

  

}
