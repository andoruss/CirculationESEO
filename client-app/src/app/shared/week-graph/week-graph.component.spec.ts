import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekGraphComponent } from './week-graph.component';

describe('WeekGraphComponent', () => {
  let component: WeekGraphComponent;
  let fixture: ComponentFixture<WeekGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeekGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeekGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
