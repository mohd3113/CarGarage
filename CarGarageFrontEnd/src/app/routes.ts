import { Routes } from '@angular/router';
import { HomeComponent } from './Home/Home.component';



export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
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

