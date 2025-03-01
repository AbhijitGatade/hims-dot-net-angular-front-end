import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralRoutingModule } from './general-routing.module';
import { PatientComponent } from './patient/patient.component';
import { PatientsComponent } from './patients/patients.component';


@NgModule({
  declarations: [
    PatientComponent,
    PatientsComponent
  ],
  imports: [
    CommonModule,
    GeneralRoutingModule
  ]
})
export class GeneralModule { }
