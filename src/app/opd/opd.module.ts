import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpdRoutingModule } from './opd-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { PatientsComponent } from './patients/patients.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    NavbarComponent,
    PatientsComponent
  ],
  imports: [
    CommonModule,
    OpdRoutingModule,
  SharedModule
  ]
})
export class OpdModule { }
