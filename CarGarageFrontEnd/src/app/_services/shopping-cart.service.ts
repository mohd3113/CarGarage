import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  carsRef = new BehaviorSubject<any>([]);

  cars: any = [];

  constructor() {
    if (JSON.parse(localStorage.getItem('cars'))) {
      this.cars = JSON.parse(localStorage.getItem('cars'));
    }
    this.carsRef.next(this.cars);
  }

  getCartCars() {
    return this.cars.asObservable;
  }

  addToCart(car, quantity) {
    this.cars.push({
      item: car,
      quantity: quantity
    });
    this.carsRef.next(this.cars);
    localStorage.setItem('cars', JSON.stringify(this.cars));

  }

  removeFromCart(car) {
    this.cars = this.cars.filter(e => e.item.vehicleId != car.vehicleId);
    this.carsRef.next(this.cars);
    localStorage.setItem('cars', JSON.stringify(this.cars));
  }

  getTotalPrice(): number {
    return this.cars.reduce((accumulator, current) => accumulator + current.item.price, 0);
  }

}
