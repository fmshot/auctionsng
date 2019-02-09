import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminauctionstableComponent } from './adminauctionstable.component';

describe('AdminauctionstableComponent', () => {
  let component: AdminauctionstableComponent;
  let fixture: ComponentFixture<AdminauctionstableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminauctionstableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminauctionstableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
