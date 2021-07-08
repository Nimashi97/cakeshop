import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddacakeComponent } from './addacake.component';

describe('AddacakeComponent', () => {
  let component: AddacakeComponent;
  let fixture: ComponentFixture<AddacakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddacakeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddacakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
