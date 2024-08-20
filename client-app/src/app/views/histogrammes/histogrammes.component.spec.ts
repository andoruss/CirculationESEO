import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistogrammesComponent } from './histogrammes.component';

describe('HistogrammesComponent', () => {
  let component: HistogrammesComponent;
  let fixture: ComponentFixture<HistogrammesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistogrammesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistogrammesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
