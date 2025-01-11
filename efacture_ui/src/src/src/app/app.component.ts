import {Component} from '@angular/core';
import { SharedDataService } from '@services/SharedData/shared-data.service'; // Service for shared data between components


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private SharedDataService: SharedDataService,){}
    ngOnInit(){
    }
}
