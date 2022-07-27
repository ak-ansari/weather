import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GuardGuard implements CanActivate {
  status: boolean = false;
  constructor(private auth: AuthService, private router: Router) {}
  value: boolean = false;

  canActivate() {
    if (this.auth.value === false) {
      this.router.navigate(['/auth/login']);
      return this.auth.value;
    } else {
      return this.auth.value;
    }
    // return true;
  }
}
