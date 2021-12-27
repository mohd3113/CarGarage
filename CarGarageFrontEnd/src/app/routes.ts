import { Routes } from '@angular/router';
import { CarDetailsComponent } from './car-details/car-details.component';
import { CartComponent } from './cart/cart.component';
import { ErrorsComponent } from './errors/errors.component';
import { HomeComponent } from './Home/Home.component';
import { CarDetailsResolver } from './_resolvers/car-details.resolver';
import { CarListResolver } from './_resolvers/car-list.resolver';



export const appRoutes: Routes = [
    { path: '', component: HomeComponent, resolve: { cars: CarListResolver }},
    { path: 'cars/:id', component: CarDetailsComponent, resolve: { car: CarDetailsResolver }},
    { path: 'cart', component: CartComponent },
    { path: 'errors', component: ErrorsComponent },
    // {
    //     path: '',
    //     runGuardsAndResolvers: 'always',
    //     canActivate: [AuthGuard],
    //     children: [
    //         { path: 'activities', component: ActivitiesListComponent, resolve: { activities: ActivityListResolver } },
    //     ]
    // },
    // { path: 'home', component: HomeComponent, resolve: { home: HomeResolver } },
    // { path: 'login', component: LoginComponent },
    // { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

