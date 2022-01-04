/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { CarsService } from './cars.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { CARS } from '../data/cars';

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
      expect(cars.result.length).toBe(5, "Incorrect number of cars");
      const car = cars.result.find(car => car.vehicleId == 2);
      expect(car.make).toBe("Chevrolet");
    });

    const req = httpTestingController.expectOne(baseUrl + 'cars?pageNumber=1&pageSize=5&model=undefined&warehouse=undefined&price=undefined&orderBy=undefined&licensed=undefined');
    expect(req.request.method).toEqual("GET");
    expect(Number(req.request.params.get('pageNumber'))).toEqual(1);
    expect(Number(req.request.params.get('pageSize'))).toEqual(5);
    
    req.flush(CARS.result);
  });

  fit('should find car by id', () => {
    carsService.getCar(2).subscribe(car => {
      expect(car).toBeTruthy();
      expect(car.vehicleId).toBe(2);
    });

    const req = httpTestingController.expectOne(baseUrl + 'cars/2');
    expect(req.request.method).toEqual("GET");
    req.flush(CARS.result[1]);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

});
