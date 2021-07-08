import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';


export interface Category{
  
  cat_name:string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  categories: Category[]=[];
  panelOpenState = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  loginStatus: boolean | undefined;

  constructor(public http: HttpClient,private breakpointObserver: BreakpointObserver,  private auth:AuthService, private sessionService:SessionService,public router:Router) {
    this.auth.cartSubject.subscribe((data)=>{
      this.cartItem=data;
    })
  }

  ngOnInit():void{
    var url ="http://3.21.52.3:3000/api/category";
    this.http.get<Category[]>(url)
    .subscribe(data => {
      this.categories=data;
    });
    this.cartItemFunc();
  }

  cartItem:number=0;
  cartItemFunc()
  {
    if(localStorage.getItem('localCart') != null)
    {
      var cartCount = JSON.parse(localStorage.getItem('localCart')|| '{}');
      console.log(cartCount);
      this.cartItem= cartCount.length;
    }
  }

  checkSession(){
    this.loginStatus=this.sessionService.autoLogin();
    if(this.loginStatus==true)
    {
      var user_id = JSON.parse(localStorage.getItem('localSession')|| '{}');
      console.log(user_id);
      this.router.navigate(['/profile'],{queryParams: {id:user_id}
    });
    }
    else{
      this.router.navigate(['/login']);
    }
  }
  checkCart(){
    this.loginStatus=this.sessionService.autoLogin();
    if(this.loginStatus==true)
    {
      var user_id = JSON.parse(localStorage.getItem('localSession')|| '{}');
      console.log(user_id);
      this.router.navigate(['/mycart'],{queryParams: {id:user_id}
    });
    }
    else{
      this.router.navigate(['/login']);
    }
  }

}
