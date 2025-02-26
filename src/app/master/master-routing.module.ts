import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../shared/layout/layout.component';
import { RoomsComponent } from './rooms/rooms.component';

const routes: Routes = [
  {path:"", component:LayoutComponent, children:[
      {path:"rooms", component:RoomsComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
