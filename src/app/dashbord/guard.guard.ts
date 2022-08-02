import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GuardGuard implements CanActivate {
  status: boolean = false;
  constructor(private auth: AuthService, private router: Router) {
   this.authenticationCheck()
  }
  value: boolean = false;
async authenticationCheck(){
   let token = localStorage.getItem('token');
   if (token) {
     let decoded = this.auth.decode(token);
     if (decoded) {
       this.value = true;
     }
   } else {
     console.log('no available token');
     this.value = false;
   }
}
  canActivate() {
    if (this.value === false) {
      this.router.navigate(['/auth/login']);
      return this.value;
    } else {
      return this.value;
    }
    // return true;
  }
}
