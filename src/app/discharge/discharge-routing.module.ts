import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../shared/layout/layout.component';
import { PatientsComponent } from './patients/patients.component';
import { DischargeSummaryComponent } from './discharge-summary/discharge-summary.component';
import { PrintDischargeSummaryComponent } from './print-discharge-summary/print-discharge-summary.component';

const routes: Routes = [
 {path:"", component:LayoutComponent,children:[
      {path:"patients", component:PatientsComponent},
      {path:"summary/:ipdid", component:DischargeSummaryComponent},
      {path:"print-summary/:ipdid", component:PrintDischargeSummaryComponent},  
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DischargeRoutingModule { }
