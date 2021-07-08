import { HttpClient, HttpParams } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../session.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  firstname: String | undefined;
  lastname: String | undefined;
  emailControl=new FormControl();
  passwordControl=new FormControl();
  hide = true;
  loginStatus: boolean | undefined;
  constructor(private sessionService:SessionService,public http: HttpClient,public router: Router, public route: ActivatedRoute) { }

  

  ngOnInit(): void {
  }

  login()
  {
    let body=new HttpParams({
      fromObject: {
        
        'email':this.emailControl.value,
        'password':this.passwordControl.value,
        
      }
    });
    
//alert(body);
    var url ="http://3.21.52.3:3000/api/login";
    this.http.post(url, body,{responseType:'text'}).subscribe(
      data=>{
        if(data=="not matching")
        {
          alert("Username or Password incorrect");
        }
        else if(data=="empty")
        {
          alert("You Are Not Registered Yet");
        }
        else{
        var obj=JSON.parse(data);
        alert("Login Successful");
        this.router.navigate(['/profile'],
        {queryParams: {id:obj[0].user_id,first_name:obj[0].first_name}
        });

        let storeDataGet:any=[];
      storeDataGet.push(obj[0].user_id);
      localStorage.setItem('localSession',JSON.stringify(storeDataGet));
      this.loginStatus=this.sessionService.autoLogin();
      console.log(this.loginStatus);
        }
      }
    );

   
      
    }
  }
  


