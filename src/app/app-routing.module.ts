import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"dashboard", loadChildren:()=>import('./dashboard/dashboard.module').then(m=>m.DashboardModule)},  
  {path:"master", loadChildren:()=>import('./master/master.module').then(m=>m.MasterModule)},
  {path:"general", loadChildren:()=>import('./general/general.module').then(m=>m.GeneralModule)},
  {path:"opd", loadChildren:()=>import('./opd/opd.module').then(m=>m.OpdModule)},
  {path:"ipd", loadChildren:()=>import('./ipd/ipd.module').then(m=>m.IpdModule)},
  {path:"billing", loadChildren:()=>import('./billing/billing.module').then(m=>m.BillingModule)},
  {path:"discharge", loadChildren:()=>import('./discharge/discharge.module').then(m=>m.DischargeModule)},
  {path:"report", loadChildren:()=>import('./reports/reports.module').then(m=>m.ReportsModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
