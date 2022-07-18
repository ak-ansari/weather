import { Injectable } from '@angular/core';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  isLogedIn:boolean=false;

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
      .then(()=>this.isLogedIn=true)
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
      })
      .then(()=>this.isLogedIn=true)
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
        return this.isLogedIn=false;
        
      })
      .catch((error) => {
        console.warn('failed to logout')
      });
  }
}
