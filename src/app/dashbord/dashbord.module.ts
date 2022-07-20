import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { DashbordRoutingModule } from './dashbord-routing.module';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ForcastComponent } from './forcast/forcast.component';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';


@NgModule({
  declarations: [
    DashbordComponent,
    ForcastComponent
  ],
  imports: [
    CommonModule,
    DashbordRoutingModule,
    HttpClientModule,
    FormsModule,
    NzInputModule
  ]
})
export class DashbordModule { }
