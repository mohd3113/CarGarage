import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Car } from '../_models/car';
import { AlertifyService } from '../_services/alertify.service';
import { ShoppingCartService } from '../_services/shopping-cart.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  @ViewChild('mapRef', { static: true }) mapElement: ElementRef;

  car: Car;
  constructor(private route: ActivatedRoute, private router: Router,
    private cartService: ShoppingCartService, private alertify: AlertifyService) {
  }

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
    if (this.cartService.cars.find(e => e.item.vehicleId == this.car.vehicleId)) {
      this.car.isAdded = true;
    }
    this.renderMap();
  }

  removeCart() {
    this.cartService.removeFromCart(this.car);
    this.car.isAdded = false;
    this.alertify.error("Car removed from cart");
  }

  addToCart() {
    this.cartService.addToCart(this.car, 1);
    this.car.isAdded = true;
    this.alertify.success("Car added to cart");
  }

  navigateToCart() {
    window.scroll(0, 0);
    this.router.navigate(['/cart']);
  }

  loadMap = () => {
    var map = new window['google'].maps.Map(this.mapElement.nativeElement, {
      center: { lat: Number(this.car.lat), lng: Number(this.car.long) },
      zoom: 8
    });

    var marker = new window['google'].maps.Marker({
      position: { lat: Number(this.car.lat), lng: Number(this.car.long) },
      map: map,
      title: 'Hello World!',
      draggable: true,
      animation: window['google'].maps.Animation.DROP,
    });

    var contentString = '<div id="content">' +
      '<h3 id="thirdHeading" class="thirdHeading">' + this.car.warehouseName + '</h3></div>';

    var infowindow = new window['google'].maps.InfoWindow({
      content: contentString
    });

    marker.addListener('click', function () {
      infowindow.open(map, marker);
    });

  }
  renderMap() {
    window['initMap'] = () => {
      this.loadMap();
    }
    if (!window.document.getElementById('google-map-script')) {
      var s = window.document.createElement("script");
      s.id = "google-map-script";
      s.type = "text/javascript";
      s.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyA5JeTcNtZKTsHt_SGdmjHGeqVUf-eSXDc&callback=initMap";
      window.document.body.appendChild(s);
    } else {
      this.loadMap();
    }
  }
}
