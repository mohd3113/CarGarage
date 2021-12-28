import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { CarsService } from '../_services/cars.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Car } from '../_models/car';
import { RequestService } from '../_services/request.service';

@Injectable()

export class RequestListResolver implements Resolve<Request[]>{
    constructor(private requestService: RequestService,
        private router: Router, private alertify: AlertifyService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Request[]> {
        return this.requestService.getRequests().pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/errors']);
                return of(null);
            })
        );
    }
}
