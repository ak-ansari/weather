import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  status:boolean=false;
  constructor(private auth:AuthService){}
  value:boolean=false;
  
  canActivate() {
    return this.auth.value;
  }
  
}
