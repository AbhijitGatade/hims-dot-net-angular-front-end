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
import { IpdservicecategoriesComponent } from './ipdservicecategories/ipdservicecategories.component';
import { IpdservicesComponent } from './ipdservices/ipdservices.component';
import { OpdservicecategoriesComponent } from './opdservicecategories/opdservicecategories.component';
import { OpdservicesComponent } from './opdservices/opdservices.component';
import { TitlesComponent } from './titles/titles.component';
import { TownsComponent } from './towns/towns.component';
import { RoleMenusComponent } from './role-menus/role-menus.component';
import { DischargeExerciseComponent } from './discharge-exercise/discharge-exercise.component';
import { DischargeEmergencyComponent } from './discharge-emergency/discharge-emergency.component';
import { DischargeDietComponent } from './discharge-diet/discharge-diet.component';
import { DischargeSpecialInstructionComponent } from './discharge-special-instruction/discharge-special-instruction.component';
import { OpdCompanyDoctorServiceRatesComponent } from './opd-company-doctor-service-rates/opd-company-doctor-service-rates.component';
import { CompaniesComponent } from './companies/companies.component';
import { IpdCompanyServiceRatesComponent } from './ipd-company-service-rates/ipd-company-service-rates.component';

const routes: Routes = [
  {path:"", component:LayoutComponent, children:[
      {path:"rooms", component:RoomsComponent},
      {path:"beds/:roomid", component:BedsComponent},
      {path:"roles", component:RolesComponent},
      {path:"roles/menus/:roleid",component:RoleMenusComponent},
      {path:"concessionby",component:ConcessionByComponent},
      {path:"paymentmodes",component:PaymentmodesComponent},
      {path:"h-information",component:HInformationComponent},
      {path:"menus",component:MenusComponent},
      {path:"doctors",component:DoctorsComponent},
      {path:"users",component:UsersComponent},
      {path:"companies",component:CompaniesComponent},
      {path:"ipdservicecategories",component:IpdservicecategoriesComponent},
      {path:"ipdservices",component:IpdservicesComponent},
      {path:"opdservicecategories",component:OpdservicecategoriesComponent},
      {path:"opdservices",component:OpdservicesComponent},
      {path:"titles",component:TitlesComponent},
      {path:"towns",component:TownsComponent},


      {path:"opd-service-rates", component:OpdCompanyDoctorServiceRatesComponent},
      {path:"ipd-service-rates", component:IpdCompanyServiceRatesComponent},
      {path:"discharge-exercises", component:DischargeExerciseComponent},
      {path:"discharge-emergencies", component:DischargeEmergencyComponent},
      {path:"discharge-diets", component:DischargeDietComponent},
      {path:"discharge-special-instructions", component:DischargeSpecialInstructionComponent}

    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
