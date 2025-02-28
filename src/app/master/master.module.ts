import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { RoomsComponent } from './rooms/rooms.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { BedsComponent } from './beds/beds.component';
import { RolesComponent } from './roles/roles.component';
import { ConcessionByComponent } from './concession-by/concession-by.component';
import { PaymentmodesComponent } from './paymentmodes/paymentmodes.component';
import { HInformationComponent } from './h-information/h-information.component';
import { MenusComponent } from './menus/menus.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [
    RoomsComponent,
    NavbarComponent,
    BedsComponent,
    RolesComponent,
    ConcessionByComponent,
    PaymentmodesComponent,
    HInformationComponent,
    MenusComponent,
    DoctorsComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    SharedModule
  ]
})
export class MasterModule { }
