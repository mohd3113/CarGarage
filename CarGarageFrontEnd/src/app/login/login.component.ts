import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  registerMode = false;
  photoUrl: string;

  constructor(public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
  login() {
    this.authService.login(this.model).subscribe(
      (next) => {
        this.alertify.success('logged In successfully');
      },
      (error) => {
        this.alertify.error(error);
      }, () => {
        this.router.navigate(['requests']);
      }
    );
  }
  loggedIn() {
    return this.authService.loggedIn();
  }
}
