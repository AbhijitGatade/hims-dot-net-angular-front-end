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
import { TitlesComponent } from './titles/titles.component';
import { TownsComponent } from './towns/towns.component';
import { IpdcompaniesComponent } from './ipdcompanies/ipdcompanies.component';
import { IpdservicecategoriesComponent } from './ipdservicecategories/ipdservicecategories.component';
import { OpdservicecategoriesComponent } from './opdservicecategories/opdservicecategories.component';
import { OpdservicesComponent } from './opdservices/opdservices.component';
import { IpdservicesComponent } from './ipdservices/ipdservices.component';


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
    UsersComponent,
    TitlesComponent,
    TownsComponent,
    IpdcompaniesComponent,
    IpdservicecategoriesComponent,
    OpdservicecategoriesComponent,
    OpdservicesComponent,
    IpdservicesComponent
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    SharedModule
  ]
})
export class MasterModule { }
