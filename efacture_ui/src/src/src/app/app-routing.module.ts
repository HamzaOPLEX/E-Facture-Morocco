import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from '@modules/main/main.component';
import { LoginComponent } from '@modules/login/login.component';
import { LogoutComponent } from '@modules/logout/logout/logout.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import { AuthGuard } from '@services/Auth/auth-guard.guard';
import { LoginAuthGuard } from '@services/Auth/LoginCanActivate/auth-guard.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ProductsComponent } from './pages/products/products.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { UsersComponent } from './pages/users/users.component';
import { DocummentsListingComponent } from './components/documments-listing/documments-listing.component';
import { EditDocumentComponent } from './pages/edit-document/edit-document/edit-document.component';
import { CreateDocumentComponent } from './pages/create-document/create-document/create-document.component';
import { RegistrationComponent } from './modules/registration/registration.component';
import { ResetPasswordComponent } from './modules/reset-password/reset-password.component';



const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: '',
                component: DashboardComponent
            },
            {
                path: 'settings',
                component: AdminComponent,
            },
            {
                path: 'settings/global',
                component: SettingsComponent
            },
            {
                path: 'settings/products',
                component: ProductsComponent
            },
            {
                path: 'settings/clients',
                component: ClientsComponent
            },
            {
                path: 'settings/products',
                component: ProductsComponent
            },
            {
                path: 'settings/users',
                component: UsersComponent
            },
            // Document URL
            {
                path: ':type/create',
                component: CreateDocumentComponent
            },
            {
                path: ':type/list',
                component: DocummentsListingComponent
            },
            {
                path: ':type/edit/:id',
                component: EditDocumentComponent
            },
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoginAuthGuard]
    },
    {
        path: 'logout',
        component: LogoutComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'register',
        component: RegistrationComponent,
        canActivate: [LoginAuthGuard]
    },
    {
        path: 'reset-password',
        component: ResetPasswordComponent,
        canActivate: [LoginAuthGuard]
    },
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
