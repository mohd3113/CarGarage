import { Routes } from '@angular/router';
import { CarDetailsComponent } from './car-details/car-details.component';
import { CartComponent } from './cart/cart.component';
import { ErrorsComponent } from './errors/errors.component';
import { HomeComponent } from './Home/Home.component';
import { LoginComponent } from './login/login.component';
import { RequestDetailsComponent } from './request-details/request-details.component';
import { RequestListComponent } from './request-list/request-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { CarDetailsResolver } from './_resolvers/car-details.resolver';
import { CarListResolver } from './_resolvers/car-list.resolver';
import { RequestDetailsResolver } from './_resolvers/request-details';
import { RequestListResolver } from './_resolvers/request-list.resolver';



export const appRoutes: Routes = [
    { path: '', component: HomeComponent, resolve: { cars: CarListResolver } },
    { path: 'cars/:id', component: CarDetailsComponent, resolve: { car: CarDetailsResolver } },
    { path: 'cart', component: CartComponent },
    { path: 'errors', component: ErrorsComponent },
    { path: 'login', component: LoginComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'requests', component: RequestListComponent, resolve: { requests: RequestListResolver }, data: { roles: ['Admin'] } },
            { path: 'requests/:id', component: RequestDetailsComponent, resolve: { request: RequestDetailsResolver }, data: { roles: ['Admin'] } },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

