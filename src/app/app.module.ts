import { BrowserModule } from '@angular/platform-browser';
import { Directive, Input, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyMaterialModule } from './material';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { MainComponent } from './main/main.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CakeDetailsComponent } from './cake-details/cake-details.component';
import { ShopComponent } from './shop/shop.component';
import { AddacakeComponent } from './addacake/addacake.component';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import { MycartComponent } from './mycart/mycart.component';
import { ProfileComponent } from './profile/profile.component';
import { NocakesComponent } from './nocakes/nocakes.component';
import { SuccessaddComponent } from './successadd/successadd.component';
import { CheckoutdialogComponent } from './checkoutdialog/checkoutdialog.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    MainComponent,
    LoginComponent,
    SignupComponent,
   
    CakeDetailsComponent,
   
    ShopComponent,
   
    AddacakeComponent,
   
    MycartComponent,
   
    ProfileComponent,
   
    NocakesComponent,
   
    SuccessaddComponent,
   
    CheckoutdialogComponent
  ],
  entryComponents:[CheckoutdialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,

    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
