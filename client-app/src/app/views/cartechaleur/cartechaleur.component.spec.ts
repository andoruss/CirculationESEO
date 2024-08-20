import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartechaleurComponent } from './cartechaleur.component';

describe('CartechaleurComponent', () => {
  let component: CartechaleurComponent;
  let fixture: ComponentFixture<CartechaleurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartechaleurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartechaleurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
