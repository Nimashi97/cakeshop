import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AddacakeComponent } from './addacake/addacake.component';
import { CakeDetailsComponent } from './cake-details/cake-details.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MycartComponent } from './mycart/mycart.component';
import { ProfileComponent } from './profile/profile.component';
import { ShopComponent } from './shop/shop.component';
import { SignupComponent } from './signup/signup.component';
import { NocakesComponent } from './nocakes/nocakes.component';
import { SuccessaddComponent } from './successadd/successadd.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'about', component:AboutComponent},
  {path:'contact', component:ContactComponent},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'cake-details', component:CakeDetailsComponent},
  {path:'shop', component:ShopComponent},
  {path:'addacake', component:AddacakeComponent},
  {path:'mycart', component:MycartComponent},
  {path:'profile', component:ProfileComponent},
  {path:'nocakes',component:NocakesComponent},
  {path:'successadd',component:SuccessaddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
