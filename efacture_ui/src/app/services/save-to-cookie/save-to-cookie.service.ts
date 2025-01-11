import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaveToCookieService {

  // Function to save data in cookies
  saveInCookies(temp_data, DOC_TYPE) {
    localStorage.setItem(DOC_TYPE, JSON.stringify(temp_data),);
  }

  // Function to save data based on type (table or billing)
  save(DOC_TYPE, data, type) {
    // Retrieve existing data for Doc_ID from cookies
    let temp_data = JSON.parse(localStorage.getItem(DOC_TYPE))

    // If no data found, set up new cookies
    if (temp_data == null) {
      this.setupCookies(DOC_TYPE)
    }
    // If data already exists, update it
    else if (temp_data !== null) {
      if (type == 'table') {
        temp_data['table_data'] = data
        console.log("[+] SaveToCookieService: temp_table_data =>", temp_data)
        console.log("[+] SaveToCookieService : New Table Change Detected Saving To Cookies")
        localStorage.setItem(DOC_TYPE, JSON.stringify(temp_data));
      }
      else if (type == "billing") {
        temp_data['billing_data'] = data
        console.log("[+] SaveToCookieService: temp_billing_data =>", temp_data)
        console.log("[+] SaveToCookieService : New billing Change Detected Saving To Cookies")
        localStorage.setItem(DOC_TYPE, JSON.stringify(temp_data));
      }
    }
  }

  // Function to get table data from cookies
  getData(Doc_TYPE,type) {
    if(type=='table'){
      return JSON.parse(localStorage.getItem(Doc_TYPE))['table_data'];
    }
    else if (type == 'billing'){
      return JSON.parse(localStorage.getItem(Doc_TYPE))['billing_data'];
    }
    else if (type == null){
      return JSON.parse(localStorage.getItem(Doc_TYPE));
    }
  }


  // Function to set up cookies with initial data
  setupCookies(Doc_TYPE: string) {
    let ttl = new Date().getTime() + 86400000 // 24H is time to live

    let temp_data_to_save = {}
    let temp_data = {
      billing_data: {}, // will store just on row of data
      table_data: [], // will store many table row data
      expiry: ttl, //recheck maybe no correct calculation
    }

    // Save initial data in cookies
    this.saveInCookies(temp_data, Doc_TYPE)
    console.log("[+] SaveToCookieService : Cookies have been set up...", temp_data_to_save)
  }
  ClearCache(TYPE) {
    localStorage.removeItem(TYPE) // remove current document cookie
    this.setupCookies(TYPE) // setup  new  empty temp_data cookie
    // location.reload() // reload page to refresh the view
  }
  constructor() { }
}
