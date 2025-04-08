import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DischargeSummaryComponent } from './discharge-summary.component';

describe('DischargeSummaryComponent', () => {
  let component: DischargeSummaryComponent;
  let fixture: ComponentFixture<DischargeSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DischargeSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DischargeSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
