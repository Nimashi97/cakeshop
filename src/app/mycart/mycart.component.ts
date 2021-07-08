import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NocakesComponent } from '../nocakes/nocakes.component';
import { SessionService } from '../session.service';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutdialogComponent } from '../checkoutdialog/checkoutdialog.component';
import { $$ } from 'protractor';


@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent implements OnInit {
  last1 = 5;
  num1 = 1;
  getUserDetails: any;
  subprice: number | undefined;
  loginStatus: any;
  
  constructor(private auth:AuthService,public http:HttpClient,private sessionService:SessionService, public router:Router,public dialog:MatDialog) { }

  ngOnInit(): void {

    this.cakeDetails();
    this.loadCart();
  }
  
  
  
 

  getCartDetails:any=[];
  cakeDetails(){
    if(localStorage.getItem !=null){
        this.getCartDetails=JSON.parse(localStorage.getItem('localCart') || "{}");
        console.log(this.getCartDetails);
    }
  }
  
  minus(productId: any,qnty: any) {
    for(let i=0;i<this.getCartDetails.length;i++)
    {
      if(this.getCartDetails[i].id1 === productId){
        if(qnty !=1)
        this.getCartDetails[i].amount= parseInt(qnty)-1;
      }
    }
    localStorage.setItem("localCart",JSON.stringify(this.getCartDetails));
    this.loadCart();
  }

  plus(productId: any,qnty: any) {
    for(let i=0;i<this.getCartDetails.length;i++)
    {
      if(this.getCartDetails[i].id1 === productId){
        if(qnty !=5)
        this.getCartDetails[i].amount= parseInt(qnty)+1;
      }
    }
    localStorage.setItem("localCart",JSON.stringify(this.getCartDetails));
    this.loadCart();
  }
  total:number=0;
  loadCart(){ //to get total
    if(localStorage.getItem('localCart'))
    {
      this.getCartDetails=JSON.parse(localStorage.getItem('localCart') || "{}");
      this.total=this.getCartDetails.reduce(function(acc: any,val: any){
          return acc + (val.price1 * val.amount);
      },0);
    }

  }

  singleDelete(getCartDetail: any){
    console.log(getCartDetail);
    if(localStorage.getItem('localCart')){
      this.getCartDetails=JSON.parse(localStorage.getItem('localCart') || "{}");
      for(let i=0;i<this.getCartDetails.length;i++)
      {
        if(this.getCartDetails[i].id1 === getCartDetail){
          this.getCartDetails.splice(i,1);
          localStorage.setItem('localCart',JSON.stringify(this.getCartDetails));
          
          this.loadCart();
         // this.cakeDetails();
         this.cartNumberFunc();
        }
      }
    }
  }

  cartNumber:number=0;//update cart
  cartNumberFunc(){
    var cartVal = JSON.parse(localStorage.getItem('localCart')|| '{}');
      
      this.cartNumber= cartVal.length;
      this.auth.cartSubject.next(this.cartNumber);
    
  }
  date =new Date().toISOString().slice(0,10);
  checkout(user_id: any){

    if(localStorage.getItem('localCart')){
      this.getCartDetails=JSON.parse(localStorage.getItem('localCart') || "{}");
      for(let i=0;i<this.getCartDetails.length;i++)
      {
       // this.subprice=this.getCartDetails[i].price1*this.getCartDetails[i].amount;
        console.log(this.getCartDetails[i].id1);
        let body=new HttpParams({
          fromObject: {
            'user_id':user_id,
            'cake_id': this.getCartDetails[i].id1,
            'cat_id':this.getCartDetails[i].categoryid,
            'quantity':this.getCartDetails[i].amount,
            'price':this.getCartDetails[i].price1,
            'date':this.date
            
          }
        });
        var url ="http://3.21.52.3:3000/api/order";
        this.http.post(url, body,{responseType:'text'}).subscribe(
        data=>{
        console.log(data);
      }
    )
          
      }
      
    }
  }
  checkSession(){
    this.loginStatus=this.sessionService.autoLogin();
    if(this.loginStatus==true)
    {
      var user_id = JSON.parse(localStorage.getItem('localSession')|| '{}');
     // console.log(user_id);
      this.checkout(user_id);
      this.removeall();
    }
    
    else{
      alert("You have to login first");
      this.router.navigate(['/login']);
    }
  }
  removeall(){
    localStorage.removeItem("localCart");
      this.getCartDetails=[];
      this.total=0;
      this.cartNumber=0;
      this.auth.cartSubject.next(this.cartNumber);
  }

  openDialog(){
    let dialogRef=this.dialog.open(CheckoutdialogComponent);
    dialogRef.afterClosed().subscribe(result =>{
      
      if(`${result}`=='true'){
        this.checkSession();
      }
      else{
        this.dialog.closeAll();
      }
    });
  }
  
}
