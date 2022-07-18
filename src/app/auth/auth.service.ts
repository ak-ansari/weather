import { Injectable } from '@angular/core';
import { Subject,observable, Observable } from 'rxjs';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  value:boolean=false;
  constructor(private route:Router) {
    this.isLogedIn.subscribe(data=>this.value=data)
  }
  isLogedIn:Subject<boolean>= new Subject();
  status():Observable<boolean>{
    return this.isLogedIn;
  }


  // signup method
  signUp = (form: any) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(
      auth,
      form.get('email').value,
      form.get('password').value
    )
      .then((userCredential) => {
        const user = userCredential.user;
        
      })
      .then(()=>this.isLogedIn.next(true))
      .then(()=>this.route.navigate(['dashbord']))
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  //login mehtod
  login = (form: any) => {
    const auth = getAuth();
    signInWithEmailAndPassword(
      auth,
      form.get('email').value,
      form.get('password').value
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('login succese');
      })
      .then(() => this.isLogedIn.next(true))
      .then(() => this.route.navigate(['dashbord']))
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  //logout mehod

  logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('signed out');
        return this.isLogedIn.next(false);
        
      })
      .then(()=>this.route.navigate(['/auth/login']))
      .catch((error) => {
        console.warn('failed to logout')
      });
  }

}
