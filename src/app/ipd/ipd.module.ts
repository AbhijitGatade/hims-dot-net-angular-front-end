import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IpdRoutingModule } from './ipd-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { PatientsComponent } from './patients/patients.component';
import { SharedModule } from '../shared/shared.module';
import { EditIpdComponent } from './edit-ipd/edit-ipd.component';


@NgModule({
  declarations: [
    NavbarComponent,
    PatientsComponent,
    EditIpdComponent
  ],
  imports: [
    CommonModule,
    IpdRoutingModule,
    SharedModule
  ]
})
export class IpdModule { }
