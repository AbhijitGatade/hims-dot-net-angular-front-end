import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleMenusComponent } from './role-menus.component';

describe('RoleMenusComponent', () => {
  let component: RoleMenusComponent;
  let fixture: ComponentFixture<RoleMenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoleMenusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
