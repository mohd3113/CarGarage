import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../_services/shopping-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartService:ShoppingCartService) { }

  cars : any;

  ngOnInit() {
    this.cars = this.cartService.cars;
  }

  reloadFromCart(event){
    this.cars = this.cartService.cars;
  }
  // openModal(){
  //   this.dialog.open(CartModalComponent, {
  //     width :'80%',
  //   })
  // }

}
