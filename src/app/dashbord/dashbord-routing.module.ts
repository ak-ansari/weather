import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ForcastComponent } from './forcast/forcast.component';
import {MainComponent} from './main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent,
children:[
  {path:'dashbord',component:DashbordComponent},
  {path:'forcast',component:ForcastComponent}
]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashbordRoutingModule {}
