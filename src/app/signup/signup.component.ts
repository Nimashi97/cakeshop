import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  submitted:boolean=false;
  firstnControl =new FormControl();
  lastnControl =new FormControl();
  mobileControl =new FormControl();
  addressControl =new FormControl();
  passwordControl =new FormControl();
  emailControl= new FormControl();
  hide=true;
  reactiveForm: FormGroup;
  constructor(public http: HttpClient,public router: Router, public route: ActivatedRoute, private formBuilder:FormBuilder) {

    this.reactiveForm= this.formBuilder.group({
    passwordControl:new FormControl(null,[Validators.max(6)])
    })
   }

  
  ngOnInit(): void {
    
  }

  get f(){return this.reactiveForm.controls}
  confirm()
  {
    this.submitted=true;
    if(this.reactiveForm.invalid){
      return;
    }
    else{
    let body=new HttpParams({
      fromObject: {
        'first_name': this.firstnControl.value,
        'last_name':this.lastnControl.value,
        'email':this.emailControl.value,
        'mobile':this.mobileControl.value,
        'address':this.addressControl.value,
        'password':this.passwordControl.value,
      }
    });
    

    var url ="http://3.21.52.3:3000/api/registered";
    this.http.post(url, body,{responseType:'text'}).subscribe(
      data=>{
        if(data=="Insert Success"){
          alert("Registered Successfully");
          this.router.navigate(['/login']);
        }
        else{
          alert(data);
        }
      }
    )
  }
}

}
