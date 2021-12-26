import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Car } from '../_models/car';
import { ShoppingCartService } from '../_services/shopping-cart.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  car: Car;
  constructor(private route: ActivatedRoute, private router: Router, private cartService: ShoppingCartService) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    this.route.data.subscribe(data => {
      this.car = data['car'];
    });
  }
  addToCart(){
    this.cartService.addToCart(this.car,1);
    this.car.isAdded = true;
  }

  navigateToCart(){
    window.scroll(0,0);
    this.router.navigate(['/cart']);
  }
}
