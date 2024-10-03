import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeProgressComponent } from './employee-progress.component';

describe('EmployeeProgressComponent', () => {
  let component: EmployeeProgressComponent;
  let fixture: ComponentFixture<EmployeeProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeProgressComponent]
    });
    fixture = TestBed.createComponent(EmployeeProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
