/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CarsService } from './cars.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { ExpandOperator } from 'rxjs/internal/operators/expand';
import { CARS } from '../data/cars';
import { PaginatedResult } from '../_models/pagination';
import { Car } from '../_models/car';

describe('CarService', () => {
  let carsService: CarsService,
    httpTestingController: HttpTestingController
  let baseUrl: string;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CarsService]
    });

    carsService = TestBed.inject(CarsService);
    httpTestingController = TestBed.inject(HttpTestingController);
    baseUrl = environment.apiUrl;
  });

  fit('should retrieve all cars in first page', () => {
    carsService.getCars(1, 5, {}).subscribe(cars => {

      expect(cars).toBeTruthy('No cars found');
      debugger;
      expect(cars.result.length).toBe(5, "Incorrect number of cars");
      const car = cars.result.find(car => car.vehicleId == 2);
      expect(car.make).toBe("Chevrolet");
    });
    const req = httpTestingController.expectOne(baseUrl + 'Cars?pageNumber=1&pageSize=5&model=undefined&warehouse=undefined&price=undefined&orderBy=undefined&licensed=undefined');
    expect(req.request.method).toEqual("GET");
    req.flush(CARS.result);
  });
});
