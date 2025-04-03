import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpdcasepaperPrintComponent } from './opdcasepaper-print.component';

describe('OpdcasepaperPrintComponent', () => {
  let component: OpdcasepaperPrintComponent;
  let fixture: ComponentFixture<OpdcasepaperPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpdcasepaperPrintComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpdcasepaperPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
