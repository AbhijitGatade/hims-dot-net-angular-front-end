import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIpdComponent } from './edit-ipd.component';

describe('EditIpdComponent', () => {
  let component: EditIpdComponent;
  let fixture: ComponentFixture<EditIpdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditIpdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditIpdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
