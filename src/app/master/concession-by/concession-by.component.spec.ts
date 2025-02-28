import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcessionByComponent } from './concession-by.component';

describe('ConcessionByComponent', () => {
  let component: ConcessionByComponent;
  let fixture: ComponentFixture<ConcessionByComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConcessionByComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConcessionByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
