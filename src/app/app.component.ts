import { Component } from '@angular/core';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cake';
  panelOpenState = false;
  // Slider Images
  // slides = [{'image': '/assets/cakes/cake1.jpg'},
  //  {'image': '/assets/cakes/cake2.jpg'},
  //  {'image': '/assets/cakes/cake3.jpg'}];
  constructor(public router:Router, public route:ActivatedRoute) { }

  ngOnInit(): void {
  }
  cart(){
    this.router.navigate(['/mycart'],{
    });
  }
}
