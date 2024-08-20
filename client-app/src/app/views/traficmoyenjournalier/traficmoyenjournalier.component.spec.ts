import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraficmoyenjournalierComponent } from './traficmoyenjournalier.component';

describe('TraficmoyenjournalierComponent', () => {
  let component: TraficmoyenjournalierComponent;
  let fixture: ComponentFixture<TraficmoyenjournalierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraficmoyenjournalierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TraficmoyenjournalierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
