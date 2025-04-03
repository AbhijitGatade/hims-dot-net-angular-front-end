import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpdcasepaperComponent } from './opdcasepaper.component';

describe('OpdcasepaperComponent', () => {
  let component: OpdcasepaperComponent;
  let fixture: ComponentFixture<OpdcasepaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpdcasepaperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpdcasepaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
