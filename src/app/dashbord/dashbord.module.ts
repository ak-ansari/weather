import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { DashbordRoutingModule } from './dashbord-routing.module';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ForcastComponent } from './forcast/forcast.component';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { MainComponent } from './main/main.component';
import { IconsProviderModule } from '../icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [DashbordComponent, ForcastComponent, MainComponent],
  imports: [
    CommonModule,
    DashbordRoutingModule,
    HttpClientModule,
    FormsModule,
    NzInputModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NgbModule,
  ],
})
export class DashbordModule {}
