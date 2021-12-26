import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Car } from '../_models/car';
import { Pagination, PaginatedResult } from '../_models/pagination';
import { AlertifyService } from '../_services/alertify.service';
import { CarsService } from '../_services/cars.service';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent implements OnInit {
  cars: Car[];
  pagination: Pagination;
  carParams: any = {};
  isCollapsed = false;
  constructor(private carService: CarsService, private alertify: AlertifyService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    this.route.data.subscribe((data) => {
      this.cars = data['cars'].result;
      this.pagination = data['cars'].pagination;
    });
    this.carParams.warehouse = '';
    this.carParams.model = '';
    this.carParams.price = '';
    this.carParams.orderBy = 'DNTO';
    this.route.queryParams.subscribe((params) => {
      if (params['searchKey']) {
        this.carParams.searchKey = params['searchKey'];
        this.loadCars();
      }
    });
  }
  resetFilters() {
    this.carParams.warehouse = '';
    this.carParams.model = '';
    this.carParams.price = '';
    this.carParams.orderBy = 'DNTO';
    this.loadCars();
  }
  loadCars() {
    this.carService.getCars(this.pagination.currentPage, this.pagination.itemsPerPage, this.carParams).subscribe(
      (res: PaginatedResult<Car[]>) => {
        this.cars = res.result;
        this.pagination = res.pagination;
      }, (error) => {
        this.alertify.error(error);
      });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadCars();
  }
}
