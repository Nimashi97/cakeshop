import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export interface Category{
  cat_id:number;
  cat_name:string;
}

export interface Cake{
   cake_id:number;
   cake_name:string;
  price:string;
  category_id:number;
  description:string;
  image:string;

}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories: Category[]=[];
  cakes:Cake[]=[];
  cakesToShow:Cake[]=[];
  gridColumns=3;
  // public cake_id:number | undefined;
  // public cake_name:string | undefined;
  constructor(public http:HttpClient,public router:Router) { }

  ngOnInit(): void {
     
    var url ="http://3.21.52.3:3000/api/cakeslist";
    this.http.get(url,{responseType: 'text'}).subscribe (
      (data:any) => {

      var obj=JSON.parse(data);
      // for(const i of obj)
      // {
      //   console.log(i.cake_name);
      // }
      for (let i=0;i<obj.length;i++)
      {
        var img="http://3.21.52.3:3000/"+obj[i].image;
        this.cakes.push({cake_id: obj[i].cake_id, cake_name: obj[i].cake_name, price: obj[i].price, 
          category_id: parseInt(obj[i].category_id),description: obj[i].description,image:img});  
             
      }
      //alert(this.cakes);
      this.cakesToShow=this.cakes;

     
    });

    var url1 ="http://3.21.52.3:3000/api/category";
    this.http.get<Category[]>(url1)
    .subscribe(data => {
      this.categories=data;
    });

  }
  clickItem(cake_id: any,cake_name: any,price: any,category_id: any,description: any,image: any)
  {
    //alert(cake_id+description);
    this.router.navigate(['/cake-details'],{queryParams: {id:cake_id,name:cake_name,price:price,category_id:category_id,description:description,image:image}});
  }
  

  //Slider Images
  slides = [{'image': '/assets/cakes/cake1.jpg'},
   {'image': '/assets/cakes/cake2.jpg'},
   {'image': '/assets/cakes/cake3.jpg'}];

filterCakes(cat_id:any){
  //alert(cat_id);

      this.cakesToShow=this.cakes.filter(cake=>cake.category_id === cat_id);
 
}

  

}
