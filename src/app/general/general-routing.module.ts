import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../shared/layout/layout.component';
import { PatientComponent } from './patient/patient.component';
import { PatientsComponent } from './patients/patients.component';

const routes: Routes = [
   {path:"", component:LayoutComponent, children:[
        {path:"patient", component:PatientComponent},
        {path:"patients", component:PatientsComponent},
      ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralRoutingModule { }
