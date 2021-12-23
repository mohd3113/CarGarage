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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    CollapseModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    AlertifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
