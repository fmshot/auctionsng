import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminproductstableComponent } from './adminproductstable.component';

describe('AdminproductstableComponent', () => {
  let component: AdminproductstableComponent;
  let fixture: ComponentFixture<AdminproductstableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminproductstableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminproductstableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
