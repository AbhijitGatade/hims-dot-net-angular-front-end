import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingRoutingModule } from './billing-routing.module';
import { OpdComponent } from './opd/opd.component';
import { IpdComponent } from './ipd/ipd.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OpdBillsComponent } from './opd-bills/opd-bills.component';
import { IpdBillComponent } from './ipd-bill/ipd-bill.component';
import { PrintIpdBillComponent } from './print-ipd-bill/print-ipd-bill.component';


@NgModule({
  declarations: [
    OpdComponent,
    IpdComponent,
    NavbarComponent,
    OpdBillsComponent,
    IpdBillComponent,
    PrintIpdBillComponent
  ],
  imports: [
    CommonModule,
    BillingRoutingModule
  ]
})
export class BillingModule { }
