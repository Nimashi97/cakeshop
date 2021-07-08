import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SessionService {
 
  constructor() { }

  autoLogin(){
    let userdetail = localStorage.getItem('localSession');
    if(userdetail){
      return true;
    }
    return;
  }
}
