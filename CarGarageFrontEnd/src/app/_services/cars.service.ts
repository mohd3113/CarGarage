import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Car } from '../_models/car';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiUrl;

  getCars(page?, itemsPerPage?, carParams?): Observable<PaginatedResult<Car[]>> {
    const paginatedResult: PaginatedResult<Car[]> = new PaginatedResult<Car[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (carParams != null) {
      params = params.append('model', carParams.model);
      params = params.append('price', carParams.price);
      params = params.append('orderBy', carParams.orderBy);

    }
    return this.http.get<Car[]>(this.baseUrl + 'Cars', { observe: 'response', params }).pipe(
      map((response) => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  getCar(id): Observable<Car> {
    return this.http.get<Car>(this.baseUrl + 'cars/' + id);
  }

}
