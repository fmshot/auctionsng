import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminuserstableComponent } from './adminuserstable.component';

describe('AdminuserstableComponent', () => {
  let component: AdminuserstableComponent;
  let fixture: ComponentFixture<AdminuserstableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminuserstableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminuserstableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
