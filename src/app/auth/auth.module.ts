import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [LoginComponent, SignUpComponent, ForgotPassComponent, NotificationComponent],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
  ],
})
export class AuthModule {}
