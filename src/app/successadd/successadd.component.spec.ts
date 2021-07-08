import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessaddComponent } from './successadd.component';

describe('SuccessaddComponent', () => {
  let component: SuccessaddComponent;
  let fixture: ComponentFixture<SuccessaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
