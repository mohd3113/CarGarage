import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { appRoutes } from './routes';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './Home/Home.component';
import { RouterModule } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarDetailsComponent } from './car-details/car-details.component';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CarCardComponent } from './car-card/car-card.component';
import { TimeagoModule } from 'ngx-timeago';
import { CarListResolver } from './_resolvers/car-list.resolver';
import { CarDetailsResolver } from './_resolvers/car-details.resolver';
import { CartComponent } from './cart/cart.component';
import { ShoppingCartService } from './_services/shopping-cart.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ErrorsComponent } from './errors/errors.component';
import { RequestService } from './_services/request.service';
import { RequestListResolver } from './_resolvers/request-list.resolver';
import { RequestDetailsResolver } from './_resolvers/request-details';
import { RequestListComponent } from './request-list/request-list.component';
import { RequestDetailsComponent } from './request-details/request-details.component';
import { LoginComponent } from './login/login.component';
import { HasRoleDirective } from './_directives/hasRole.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NavComponent,
    CarDetailsComponent,
    CarCardComponent,
    CartComponent,
    ErrorsComponent,
    RequestListComponent,
    RequestDetailsComponent,
    LoginComponent,
    HasRoleDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    CollapseModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    PaginationModule,
    TimeagoModule,
    BsDropdownModule
  ],
  providers: [
    AuthService,
    AlertifyService,
    CarListResolver,
    CarDetailsResolver,
    ShoppingCartService,
    RequestService,
    RequestListResolver,
    RequestDetailsResolver

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
