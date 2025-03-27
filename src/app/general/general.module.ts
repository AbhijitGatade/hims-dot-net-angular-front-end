import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralRoutingModule } from './general-routing.module';
import { PatientComponent } from './patient/patient.component';
import { PatientsComponent } from './patients/patients.component';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './navbar/navbar.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';


@NgModule({
  declarations: [
    PatientComponent,
     PatientsComponent,
    NavbarComponent,
    PatientDetailsComponent,
    EditPatientComponent
    
  ],
  imports: [
    CommonModule,
    GeneralRoutingModule,
    SharedModule
  ]
})
export class GeneralModule { }
