import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  settings = {
    Company_ICE: 'XXXXXXXXXXXXXX',
    Company_TVATAUX: 20,
    Company_Place: 'Tangier',
    APP_lang: 'fr',
    Invoice_Color: '#ffffff'
  };

  messages: string[] = [];

  constructor() { }

  onSubmit() {
    // Handle form submission logic here
  }
}
