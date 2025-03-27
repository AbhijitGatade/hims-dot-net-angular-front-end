import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DischargeRoutingModule } from './discharge-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { PatientsComponent } from './patients/patients.component';
import { DischargeSummaryComponent } from './discharge-summary/discharge-summary.component';
import { PrintDischargeSummaryComponent } from './print-discharge-summary/print-discharge-summary.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    NavbarComponent,
    PatientsComponent,
    DischargeSummaryComponent,
    PrintDischargeSummaryComponent
  ],
  imports: [    
    CommonModule,
    DischargeRoutingModule,
    SharedModule
  ]
})
export class DischargeModule { }
