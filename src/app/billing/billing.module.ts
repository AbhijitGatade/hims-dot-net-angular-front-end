import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingRoutingModule } from './billing-routing.module';
import { OpdComponent } from './opd/opd.component';
import { IpdComponent } from './ipd/ipd.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OpdBillsComponent } from './opd-bills/opd-bills.component';
import { IpdBillComponent } from './ipd-bill/ipd-bill.component';
import { PrintIpdBillComponent } from './print-ipd-bill/print-ipd-bill.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { OpdcasepaperComponent } from './opdcasepaper/opdcasepaper.component';
import { OpdcasepaperPrintComponent } from './opdcasepaper-print/opdcasepaper-print.component';
import { PendingDetailsComponent } from './pending-details/pending-details.component';


@NgModule({
  declarations: [
    OpdComponent,
    IpdComponent,
    NavbarComponent,
    OpdBillsComponent,
    IpdBillComponent,
    PrintIpdBillComponent,
    OpdcasepaperComponent,
    OpdcasepaperPrintComponent,
    PendingDetailsComponent
  ],
  imports: [
    CommonModule,
    BillingRoutingModule,
    FormsModule,
    SharedModule
  ],
  exports:[
      NavbarComponent
    ]
})
export class BillingModule { }
