import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SuccessaddComponent } from '../successadd/successadd.component';

@Component({
  selector: 'app-cake-details',
  templateUrl: './cake-details.component.html',
  styleUrls: ['./cake-details.component.css']
})
export class CakeDetailsComponent implements OnInit {

  last1 = 5;
  num1 = 1;
  id:number | undefined;
  name:string | undefined ;
  price:number | undefined;
  category_id:number | undefined;
  description:string | undefined;
  image:string | undefined;
  products: { id1: number | undefined; name1: string | undefined; price1: number | undefined; amount: number;categoryid:number |undefined; image1: string | undefined; }[] | undefined;
  

  plus() {
    if (this.num1 === this.last1) {
      
    } else {
      this.num1++;
      
    }
  }
  minus() {
    if (this.num1 === 1) {
     
    } else {
      this.num1--;
    }
  }

  


  constructor(private snackBar:MatSnackBar, public router:Router, public route:ActivatedRoute, private auth:AuthService) { 
    this.auth.cartSubject.subscribe((data)=>{
      this.cartItem=data;
    })
  }

  back(){
    this.router.navigate(['..'],{
     });
    
  }

  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.id=parseInt(params['id']);
      this.name=params['name'];
      this.price=parseInt(params['price']);
      this.category_id=parseInt(params['category_id']);
      this.description=params['description'];
      this.image=params['image'];
      //alert(this.description);
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
  cakeCart:any=[];

  addtocart()
  {
    this.products=[{id1:this.id,name1:this.name,price1:this.price,amount:this.num1,categoryid:this.category_id,image1:this.image}];
    console.log(this.products[0]);
    let cartDataNull=localStorage.getItem('localCart');
    if(cartDataNull==null) //no value in localstorage
    {
      let storeDataGet:any=[];
      storeDataGet.push(this.products[0]);
      localStorage.setItem('localCart',JSON.stringify(storeDataGet));
    }
    else     //if products are in local storage
    {
      
       var id = this.products[0].id1;
      console.log(id);
      let  index:number = -1;
      this.cakeCart =JSON.parse(localStorage.getItem('localCart') || '{}');
      console.log(this.cakeCart);
      for(let i=0;i<this.cakeCart.length;i++)
      {
        console.log(this.cakeCart[i].id1);
        if(this.products[0].id1 == this.cakeCart[i].id1)
        {
          
          this.cakeCart[i].amount=this.products[0].amount;
          index=i;
          console.log(i);
          break;
        }
      }
      if(index==-1)
        {
          this.cakeCart.push(this.products[0]);
          localStorage.setItem('localCart',JSON.stringify(this.cakeCart));
        }
      else{
        localStorage.setItem('localCart',JSON.stringify(this.cakeCart));
      }
    }

  this.cartNumberFunc();
  this.snackBar.openFromComponent(SuccessaddComponent, {
    duration: 1000,
  });
  
  }

  //update cart
  cartNumber:number=0;
  cartNumberFunc(){
    var cartVal = JSON.parse(localStorage.getItem('localCart')|| '{}');
      
      this.cartNumber= cartVal.length;
      this.auth.cartSubject.next(this.cartNumber);
    
  }
}
