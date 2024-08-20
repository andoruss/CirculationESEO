import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerWeekComponent } from './date-picker-week.component';

describe('DatePickerWeekComponent', () => {
  let component: DatePickerWeekComponent;
  let fixture: ComponentFixture<DatePickerWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatePickerWeekComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatePickerWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
