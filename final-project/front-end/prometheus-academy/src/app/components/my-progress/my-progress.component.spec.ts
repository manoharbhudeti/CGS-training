import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProgressComponent } from './my-progress.component';

describe('MyProgressComponent', () => {
  let component: MyProgressComponent;
  let fixture: ComponentFixture<MyProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyProgressComponent]
    });
    fixture = TestBed.createComponent(MyProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
