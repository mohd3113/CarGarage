import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { NavigationStart, Router } from '@angular/router';
import { ShoppingCartService } from '../_services/shopping-cart.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  isCollapsed = true;
  photoUrl: string;
  cartItems: any = 0;
  totalPrice: number;
  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router,
    private cartService: ShoppingCartService
  ) { }


  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }
  ngOnInit() {
    this.cartService.carsRef.subscribe((items) => {
      this.cartItems = items;
    });
    this.totalPrice = this.cartService.getTotalPrice();
  }

  getTotal(event) {
    this.totalPrice = this.cartService.getTotalPrice();
  }
  navigateToCart() {
    window.scroll(0, 0);
    this.router.navigate(["/cart"]);
  }
}
