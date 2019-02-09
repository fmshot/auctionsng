import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminbidstableComponent } from './adminbidstable.component';

describe('AdminbidstableComponent', () => {
  let component: AdminbidstableComponent;
  let fixture: ComponentFixture<AdminbidstableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminbidstableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminbidstableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
