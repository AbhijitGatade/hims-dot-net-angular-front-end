import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../shared/layout/layout.component';
import { RoomsComponent } from './rooms/rooms.component';
import { BedsComponent } from './beds/beds.component';
import { RolesComponent } from './roles/roles.component';
import { ConcessionByComponent } from './concession-by/concession-by.component';
import { PaymentmodesComponent } from './paymentmodes/paymentmodes.component';
import { HInformationComponent } from './h-information/h-information.component';
import { MenusComponent } from './menus/menus.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path:"", component:LayoutComponent, children:[
      {path:"rooms", component:RoomsComponent},
      {path:"beds/:roomid", component:BedsComponent},
      {path:"roles", component:RolesComponent},
      {path:"concessionBy",component:ConcessionByComponent},
      {path:"paymentmodes",component:PaymentmodesComponent},
      {path:"h-information",component:HInformationComponent},
      {path:"menus",component:MenusComponent},
      {path:"doctors",component:DoctorsComponent},
      {path:"users",component:UsersComponent}

    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
