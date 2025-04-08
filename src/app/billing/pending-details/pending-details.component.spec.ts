import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingDetailsComponent } from './pending-details.component';

describe('PendingDetailsComponent', () => {
  let component: PendingDetailsComponent;
  let fixture: ComponentFixture<PendingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PendingDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
