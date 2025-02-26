import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"dashboard", loadChildren:()=>import('./dashboard/dashboard.module').then(m=>m.DashboardModule)},  
  {path:"master", loadChildren:()=>import('./master/master.module').then(m=>m.MasterModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
