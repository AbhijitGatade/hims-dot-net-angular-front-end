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
import { IpdservicecategoriesComponent } from './ipdservicecategories/ipdservicecategories.component';
import { OpdservicecategoriesComponent } from './opdservicecategories/opdservicecategories.component';
import { OpdservicesComponent } from './opdservices/opdservices.component';
import { IpdservicesComponent } from './ipdservices/ipdservices.component';
import { RoleMenusComponent } from './role-menus/role-menus.component';
import { FormsModule } from '@angular/forms';
import { DischargeDietComponent } from './discharge-diet/discharge-diet.component';
import { DischargeEmergencyComponent } from './discharge-emergency/discharge-emergency.component';
import { DischargeExerciseComponent } from './discharge-exercise/discharge-exercise.component';
import { DischargeSpecialInstructionComponent } from './discharge-special-instruction/discharge-special-instruction.component';
import { IpdCompanyServiceRatesComponent } from './ipd-company-service-rates/ipd-company-service-rates.component';
import { OpdCompanyDoctorServiceRatesComponent } from './opd-company-doctor-service-rates/opd-company-doctor-service-rates.component';
import { CompaniesComponent } from './companies/companies.component';


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
    CompaniesComponent,
    IpdservicecategoriesComponent,
    OpdservicecategoriesComponent,
    OpdservicesComponent,
    IpdservicesComponent,
    RoleMenusComponent,

    DischargeDietComponent,
    DischargeEmergencyComponent,
    DischargeExerciseComponent,
    DischargeSpecialInstructionComponent,
    IpdCompanyServiceRatesComponent,
    OpdCompanyDoctorServiceRatesComponent
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    SharedModule,
    FormsModule
  ],
  exports:[
    NavbarComponent
  ]
})
export class MasterModule { }
