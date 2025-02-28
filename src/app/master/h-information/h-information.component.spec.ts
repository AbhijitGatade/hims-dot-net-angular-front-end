import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HInformationComponent } from './h-information.component';

describe('HInformationComponent', () => {
  let component: HInformationComponent;
  let fixture: ComponentFixture<HInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
