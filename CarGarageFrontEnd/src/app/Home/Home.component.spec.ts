/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HomeComponent } from './Home.component';
import { CarCardComponent } from '../car-card/car-card.component';
import { AppComponent } from '../app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { CARS } from '../data/cars';
import { DebugElement, Type } from '@angular/core';
import { Pagination } from '../_models/pagination';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CarsService } from '../_services/cars.service';
import { environment } from 'src/environments/environment';
import { appRoutes } from '../routes';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

describe('HomeComponent', () => {
  let carsService: CarsService,
    httpTestingController: HttpTestingController
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let baseUrl: string;
  let el: DebugElement;
  const route = ({ data: of({ pagination: CARS.pagination, result: CARS.result }), queryParams: of({}) } as any) as ActivatedRoute;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CarCardComponent,
        HomeComponent,
      ],
      imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule.forRoot(appRoutes),
        CollapseModule.forRoot(),
        BrowserAnimationsModule,
        FormsModule,
        PaginationModule,
        BsDropdownModule,
        HttpClientTestingModule,

      ],
      providers: [
        { provide: ActivatedRoute, useValue: route },
        CarsService
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        carsService = TestBed.inject(CarsService);
        httpTestingController = fixture.debugElement.injector
          .get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);

      });
    baseUrl = environment.apiUrl;
  }));


  fit('should create the component', () => {
    expect(component).toBeTruthy();
  });

  fit('should display the car list', () => {

    component.cars = CARS.result;
    let pagination: Pagination = {
      totalItems: 5,
      totalPages: 1,
      itemsPerPage: 5,
      currentPage: 1,
    };
    component.pagination = pagination;
    fixture.detectChanges();
    let makes = ["BMW", "Mercedes"];
    const req = httpTestingController
      .expectOne(baseUrl + 'cars/GetCarMake');
    req.flush(makes);
    const cards = el.queryAll(By.css('.property-item'));
    expect(cards).toBeTruthy();
    expect(cards.length).toBe(5);
    fixture.detectChanges();

  });

  afterEach(() => {
    fixture.destroy();
  });

});


