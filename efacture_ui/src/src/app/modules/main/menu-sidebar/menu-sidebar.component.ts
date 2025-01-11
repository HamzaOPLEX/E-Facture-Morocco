import {AppState} from '@/store/state';
import {UiState} from '@/store/ui/state';
import {Component, HostBinding, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

const BASE_CLASSES = 'main-sidebar elevation-4';
@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
    @HostBinding('class') classes: string = BASE_CLASSES;
    public ui: Observable<UiState>;
    public user;
    public menu = MENU;
    public AppTitle = "E-FACTURE"
    constructor(
        private store: Store<AppState>
    ) {}

    ngOnInit() {
        this.ui = this.store.select('ui');
        this.ui.subscribe((state: UiState) => {
            this.classes = `${BASE_CLASSES} ${state.sidebarSkin}`;
        });
        this.user = 'USer';
    }
}
export const MENU = [
    {
        name: 'Dashboard',
        iconClasses: 'fas fa-tachometer-alt',
        liClass:"nav-link ",
        path: ['/']
    },
    {
        name: 'Réglages',
        iconClasses: 'fas fa-cog',
        liClass: "nav-link ",
        path: ['/settings']
    },
    {
        name: 'Gestioner Des Factures',
        iconClasses: 'fas fa-F',
        liClass: "nav-link ",
        children: [
            {
                name: 'Créer une facture',
                iconClasses: 'fas fa-plus-circle',
                liClass: "nav-link ",
                path: ['/invoices/create']
            },
            {
                name: 'Toutes les Factures',
                iconClasses: 'fas fa-file-invoice',
                liClass: "nav-link ",
                path: ['/invoices/list'] // Assuming 1 is a placeholder for invoice ID
            }
        ]
    },
    {
        name: 'Gestioner Des BL',
        iconClasses: 'fas fa-B',
        liClass: "nav-link ",
        children: [
            {
                name: 'Créer un BL',
                iconClasses: 'fas fa-plus-circle',
                liClass: "nav-link ",
                path: ['/bl/create']
            },
            {
                name: 'Toutes les BL',
                iconClasses: 'fas fa-file-invoice',
                liClass: "nav-link ",
                path: ['/bl/list'] // Assuming 1 is a placeholder for BL ID
            }
        ]
    },
    {
        name: 'Gestioner Des Devis',
        iconClasses: 'fas fa-D',
        liClass: "nav-link",
        children: [
            {
                name: 'Créer un Devis',
                iconClasses: 'fas fa-plus-circle',
                liClass: "nav-link ",
                path: ['/devis/create']
            },
            {
                name: 'Toutes les Devis',
                iconClasses: 'fas fa-file-invoice',
                liClass: "nav-link ",
                path: ['/devis/list'] // Assuming 1 is a placeholder for Devis ID
            }
        ]
    },
    {
        name: 'Se déconnecter',
        iconClasses: 'nav-icon fas fa-sign-out-alt ',
        liClass: "nav-link logout",
        path: ['/logout'] // Assuming 1 is a placeholder for Devis ID
    }
];
