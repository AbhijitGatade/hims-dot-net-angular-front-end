import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../shared/layout/layout.component';
import { OpdComponent } from './opd/opd.component';
import { IpdComponent } from './ipd/ipd.component';
import { OpdBillsComponent } from './opd-bills/opd-bills.component';
import { IpdBillComponent } from './ipd-bill/ipd-bill.component';
import { PrintIpdBillComponent } from './print-ipd-bill/print-ipd-bill.component';
import { OpdcasepaperComponent } from './opdcasepaper/opdcasepaper.component';
import { OpdcasepaperPrintComponent } from './opdcasepaper-print/opdcasepaper-print.component';

const routes: Routes = [
  {
    path: "", component: LayoutComponent, children: [
      { path: "opd", component: OpdComponent },
      { path: "ipd", component: IpdComponent },
      { path: "opd/:opdid", component: OpdBillsComponent },
      { path: "ipd/:ipdid", component: IpdBillComponent },
      { path: "print-ipd-bill/:ipdid", component: PrintIpdBillComponent},
      { path: "opdcasepaper/:opdid/:billid", component: OpdcasepaperComponent },
      { path: "opdcasepaper/print/:opdid/:billid", component: OpdcasepaperPrintComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingRoutingModule { }
