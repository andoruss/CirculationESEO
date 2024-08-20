import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCapteurComponent } from './edit-capteur.component';

describe('EditCapteurComponent', () => {
  let component: EditCapteurComponent;
  let fixture: ComponentFixture<EditCapteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCapteurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCapteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
