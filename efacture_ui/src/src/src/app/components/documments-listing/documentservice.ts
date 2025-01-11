import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DocumentService {
    getData() {
        return [
            {
                id: 2356,
                clientName: 'Evelyn Martinez',
                documentDate: '2020-10-15',
                documentStatus: 'pending',
            },
        ];
    }

    constructor(private http: HttpClient) { }

    getCustomersMini() {
        return Promise.resolve(this.getData().slice(0, 5));
    }

    getCustomersSmall() {
        return Promise.resolve(this.getData().slice(0, 10));
    }

    getCustomersMedium() {
        return Promise.resolve(this.getData().slice(0, 50));
    }

    getCustomersLarge() {
        return Promise.resolve(this.getData().slice(0, 200));
    }

    getCustomersXLarge() {
        return Promise.resolve(this.getData());
    }

    getCustomers(params?: any) {
        return this.http.get<any>('https://www.primefaces.org/data/customers', { params: params }).toPromise();
    }
};