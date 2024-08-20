import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCapteurComponent } from './add-capteur.component';

describe('AddCapteurComponent', () => {
  let component: AddCapteurComponent;
  let fixture: ComponentFixture<AddCapteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCapteurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCapteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
