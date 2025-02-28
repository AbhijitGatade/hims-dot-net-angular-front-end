import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentmodesComponent } from './paymentmodes.component';

describe('PaymentmodesComponent', () => {
  let component: PaymentmodesComponent;
  let fixture: ComponentFixture<PaymentmodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentmodesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentmodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
