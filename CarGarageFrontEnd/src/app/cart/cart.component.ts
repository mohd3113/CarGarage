import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Car } from '../_models/car';
import { AlertifyService } from '../_services/alertify.service';
import { RequestService } from '../_services/request.service';
import { ShoppingCartService } from '../_services/shopping-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartService: ShoppingCartService,
    private requestService: RequestService,
    private alertify: AlertifyService,
    private router: Router
  ) { }

  cars: any;
  isSent: boolean = false;
  model: any = {};
  ngOnInit() {
    this.cars = this.cartService.cars;
  }

  reloadFromCart(event) {
    this.cars = this.cartService.cars;
  }

  SendRequest() {
    this.model.vehiclesIds = this.cars.map(a => a.item.vehicleId);

    this.requestService.createRequest(this.model).subscribe(() => {
      this.alertify.success('Request had been sent successfully');
      this.isSent = true;
      this.cars.forEach(({ item }) => {
        this.removeCart(item)
      });
    }, (error) => {
      this.alertify.error('Error was occured!');
    }, () => {
      this.router.navigate(['/']);
    });
  }

  removeCart(car) {
    this.cartService.removeFromCart(car);
    car.isAdded = false;
  }
}
