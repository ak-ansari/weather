import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ForcastComponent } from './forcast/forcast.component';
import { MainComponent } from './main/main.component';
import { GuardGuard } from './guard.guard';
import { UpdatepassComponent } from './settings/updatepass/updatepass.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'main/dashbord', component: DashbordComponent },
      { path: 'main/forcast', component: ForcastComponent },
      { path: 'main/settings/updatepass', component: UpdatepassComponent },
    ],
    canActivate: [GuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashbordRoutingModule {}
