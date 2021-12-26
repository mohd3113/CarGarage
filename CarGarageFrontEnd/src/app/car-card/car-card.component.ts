import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Car } from '../_models/car';
import { AlertifyService } from '../_services/alertify.service';
import { CarsService } from '../_services/cars.service';
import { ShoppingCartService } from '../_services/shopping-cart.service';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.css']
})
export class CarCardComponent implements OnInit {

  @Input() car: Car;
  @Output()
  removed = new EventEmitter();

  constructor(
    private carService: CarsService,
    private alertify: AlertifyService,
    private cartService: ShoppingCartService
  ) { }

  ngOnInit() {
    if (this.cartService.cars.find(e => e.item.vehicleId == this.car.vehicleId)) {
      this.car.isAdded = true;
    }
  }

  removeCart() {
    this.cartService.removeFromCart(this.car);
    this.car.isAdded = false;
    this.alertify.error("Car removed from cart");
    this.removed.emit();
  }

  addToCart() {
    this.cartService.addToCart(this.car, 1);
    this.car.isAdded = true;
    this.alertify.success("Car added to cart");
  }

}
