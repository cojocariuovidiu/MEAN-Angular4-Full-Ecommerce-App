import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';

// material //
import {MatButtonModule, MatCheckboxModule} from '@angular/material';

import { AppComponent } from './app.component';
import { RegisterComponent } from './users/register/register.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SigninComponent } from './users/signin/signin.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MyaccountComponent } from './users/myaccount/myaccount.component';

// Services
import { UsersDataService } from './users-data.service';
import { AuthService } from './auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthinterceptorService } from './auth/authinterceptor.service';

// Guards 
import { AuthGuard } from './auth/auth.guard';
const appRoutes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'signin',      component: SigninComponent },
  { path: 'myaccount',      component: MyaccountComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NavBarComponent,
    SigninComponent,
    PageNotFoundComponent,
    MyaccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes // <-- debugging purposes only
    )
  ],
  providers: [
    UsersDataService,
    AuthService,
    CookieService,
    AuthGuard,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthinterceptorService,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
