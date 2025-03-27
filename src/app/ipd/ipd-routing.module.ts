import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsComponent } from './patients/patients.component';
import { LayoutComponent } from '../shared/layout/layout.component';
import { EditIpdComponent } from './edit-ipd/edit-ipd.component';

const routes: Routes = [
 {path:"", component:LayoutComponent,children:[
      {path:"patients", component:PatientsComponent},
      {path:"edit/:ipdid", component:EditIpdComponent},
  
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IpdRoutingModule { }
