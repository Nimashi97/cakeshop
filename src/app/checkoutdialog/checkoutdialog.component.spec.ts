import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutdialogComponent } from './checkoutdialog.component';

describe('CheckoutdialogComponent', () => {
  let component: CheckoutdialogComponent;
  let fixture: ComponentFixture<CheckoutdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
