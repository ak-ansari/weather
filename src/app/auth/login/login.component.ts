import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  isLoadingOne = false;

  submitForm(): void {
    this.isLoadingOne = true;
    setTimeout(() => {
    this.isLoadingOne=false  
    },5000);
    if (this.validateForm.valid) {
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
    this.authService.login(this.validateForm);
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route:Router
  ) {}

  ngOnInit(): void {
    let token=localStorage.getItem('token')
    if(token){
      let decoded=this.authService.decode(token);
      if(decoded){
       this.route.navigate(['main/dashbord'])
      }}
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }
}
