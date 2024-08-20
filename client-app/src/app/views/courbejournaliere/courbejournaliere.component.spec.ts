import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourbejournaliereComponent } from './courbejournaliere.component';

describe('CourbejournaliereComponent', () => {
  let component: CourbejournaliereComponent;
  let fixture: ComponentFixture<CourbejournaliereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourbejournaliereComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourbejournaliereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
