import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewproductsdetailsComponent } from './newproductsdetails.component';

describe('NewproductsdetailsComponent', () => {
  let component: NewproductsdetailsComponent;
  let fixture: ComponentFixture<NewproductsdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewproductsdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewproductsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
