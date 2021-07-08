import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NocakesComponent } from './nocakes.component';

describe('NocakesComponent', () => {
  let component: NocakesComponent;
  let fixture: ComponentFixture<NocakesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NocakesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NocakesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
