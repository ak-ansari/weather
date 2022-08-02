import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updatePassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  value: boolean = true;
  constructor(private route: Router) {
    this.isLogedIn.subscribe((data) => (this.value = data));
  }
  isLogedIn: Subject<boolean> = new Subject();
  status(): Observable<boolean> {
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
      .then(() => this.isLogedIn.next(true))
      .then(() => this.route.navigate(['main/dashbord']))
      .catch((error) => {
        this.isLogedIn.next(false);
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
        const user: any = userCredential.user;
        let token = user.accessToken;
        localStorage.setItem('token', token);
        console.log('login succese');
      })
      .then(() => this.isLogedIn.next(true))
      .then(() => this.route.navigate(['main/dashbord']))
      .catch((error) => {
        this.isLogedIn.next(false);
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
      .then(() => this.route.navigate(['/auth/login']))
      .then(() => localStorage.removeItem('token'))
      .catch((error) => {
        console.warn('failed to logout');
      });
  }
  //forgot passwords
  forgot_pass(email: any) {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert();
      })
      .then(() => this.route.navigate(['auth/login']))
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert('something went wrong please try again');
      });
  }
  //update pass
  updatePassword(form: any) {
    const auth = getAuth();

    const user: any = auth.currentUser;
    const newPassword = form.pass;

    updatePassword(user, newPassword)
      .then(() => {
        alert('passworrd updated succesfully new pass is :' + newPassword);
      })
      .catch((error: any) => {
        alert(error);
      });

    //deocode
  }
  decode(jwtToken:string) {
    try {
      let decoded = jwt_decode(jwtToken);
      if(decoded){

        return decoded;
      }
      
    } catch (error) {
      console.log('invalid token')
    }
  }
  
}
