import { Component, OnInit } from '@angular/core';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-addacake',
  templateUrl: './addacake.component.html',
  styleUrls: ['./addacake.component.css']
})
export class AddacakeComponent implements OnInit {

  selectedValue: string | undefined;

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  constructor() { }

  ngOnInit(): void {
  }

url="./assets/cakes/cake4.jpg";
onselectFile(e: { target: { files: any; }; targer: { files: Blob[]; }; })
{
  if(e.target.files)
  {
    var reader = new FileReader();
    reader.readAsDataURL(e.targer.files[0]);
    reader.onload=(event:any)=>
      this.url=event.target.result;
  }
}
}
