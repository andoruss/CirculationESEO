import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraficmoyenhistogrammeComponent } from './traficmoyenhistogramme.component';

describe('TraficmoyenhistogrammeComponent', () => {
  let component: TraficmoyenhistogrammeComponent;
  let fixture: ComponentFixture<TraficmoyenhistogrammeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraficmoyenhistogrammeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TraficmoyenhistogrammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
