import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { $ } from 'protractor';
import { SessionService } from '../session.service';
import { ViewEncapsulation} from '@angular/core';
import {MatCalendar, MatCalendarCellClassFunction, MatCalendarCellCssClasses} from '@angular/material/datepicker';
import { ViewChild } from '@angular/core';

export interface UserDetail{
  user_id:number;
  first_name:string;
  last_name:string;
  email:string;
  mobile:string;
  address:string;
}
export interface OrderDetail{
  order_id:number;
  cake_id:number;
  cat_id:number;
  date:string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent implements OnInit {
  
  id:number | undefined;
 
  loginStatus: boolean | undefined;
  selected: Date | null | undefined;
  userdetails:UserDetail[]=[];
  orderdetails:OrderDetail[]=[];
  firstname: any;
  lastname: any;
  email: any;
  mobile: any;
  address: any;
  date:any | undefined;
  userid:number | undefined;
  firstnamecontrol = new FormControl();
  lastnamecontrol=new FormControl();
  mobilecontrol=new FormControl();
  addresscontrol=new FormControl();
  isReadonly = true;

  @ViewChild('calendar')
  calendar!: MatCalendar<Date>;
  selectedDate: any;  
  minDate: string | null = null;
  datesToHighlight:Array<string> = [];
  constructor(private sessionService:SessionService, private http:HttpClient, public router: Router,public route:ActivatedRoute) { }
 
  ngOnInit(): void {
   // this.loginStatus=this.sessionService.autoLogin();
    this.loginStatus=this.sessionService.autoLogin();
    if(this.loginStatus==true)
    {
      this.userid = JSON.parse(localStorage.getItem('localSession')|| '{}');
     // alert(this.userid);
      
      var url1 ="http://3.21.52.3:3000/api/userdetails/"+this.userid;
    this.http.get(url1,{responseType: 'text'}).subscribe (
      (data:any) => {

      var obj=JSON.parse(data);
      this.userdetails.push({user_id:obj[0].user_id,first_name:obj[0].first_name,last_name:obj[0].last_name,email:obj[0].email,mobile:obj[0].mobile,address:obj[0].address})
      console.log(this.userdetails);
     // alert(obj[0].first_name);
    
      this.firstname=obj[0].first_name;
      this.lastname=obj[0].last_name;
      this.email=obj[0].email;
      this.mobile=obj[0].mobile;
      this.address=obj[0].address;

      this.firstnamecontrol.setValue(this.firstname);
      this.lastnamecontrol.setValue(this.lastname);
      this.mobilecontrol.setValue(this.mobile);
      this.addresscontrol.setValue(this.address);
    });
    var url2 ="http://3.21.52.3:3000/api/orders/"+this.userid;
    this.http.get(url2,{responseType: 'text'}).subscribe (
      (data:any) => {
        var obj=JSON.parse(data);
        for (let i=0;i<obj.length;i++)
        {
      
      this.orderdetails.push({order_id:obj[i].order_id,cake_id:obj[i].cake_id,cat_id:obj[i].cat_id,date:obj[i].date});
      this.date=obj[i].date;
      this.datesToHighlight.push(this.date);
     
     // alert(obj[0].first_name);
        }
        console.log(this.datesToHighlight);
        console.log(this.orderdetails);
      
    });
     
  }
  
    //alert(this.id);
   
  }
  

  toggleReadonly() {
    this.isReadonly = !this.isReadonly;
  }

  logout(){
    this.loginStatus=false;
    localStorage.removeItem("localSession");
    this.router.navigate(['/login']);
  }
  toggleSave()
  {
    this.isReadonly;
    console.log(this.firstnamecontrol.value);
  }
  confirm()
  {
    
    //console.log(this.userid);
    let body=new HttpParams({
      fromObject: {
        'user_id':String(this.userid),
        'first_name': this.firstnamecontrol.value,
        'last_name':this.lastnamecontrol.value,
        'mobile':String(this.mobilecontrol.value),
        'address':this.addresscontrol.value,
        
        
        
      }
    });
    

    var url ="http://3.21.52.3:3000/api/updateprofile";
    this.http.post(url, body,{responseType:'text'}).subscribe(
      data=>{
        if(data=="update Success"){
          alert("Your Profile is Updated");
        }
        else{
          alert(data);
        }
      }
    )

    this.isReadonly= true;
  }
  
  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      const highlightDate = this.datesToHighlight
        .map(strDate => new Date(strDate))
        .some(d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear());
        
      return highlightDate ? 'special-date' : '';
    };
  }
  

}
