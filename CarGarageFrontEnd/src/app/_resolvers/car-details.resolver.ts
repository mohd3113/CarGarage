import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { CarsService } from '../_services/cars.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Car } from '../_models/car';

@Injectable()

export class CarDetailsResolver implements Resolve<Car>{
    constructor(private carService: CarsService,
        private router: Router, private alertify: AlertifyService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<Car> {
        return this.carService.getCar(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/errors']);
                return of(null);
            })
        );
    }
}
