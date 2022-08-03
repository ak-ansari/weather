import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import {
  NzNotificationPlacement,
  NzNotificationService,
} from 'ng-zorro-antd/notification';
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
  constructor(
    private route: Router,
    private notification: NzNotificationService
  ) {
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
        const user: any = userCredential.user;
        let token = user.accessToken;
        localStorage.setItem('token', token);
      })
      .then(() => this.isLogedIn.next(true))
      .then(() => this.route.navigate(['main/dashbord']))
      .catch((error) => {
        this.isLogedIn.next(false);
        this.createBasicNotification('topRight','Error',error)
      });
  };

  //login mehtod
  login =async (form: any) => {
    const auth = getAuth();
   await signInWithEmailAndPassword(
      auth,
      form.get('email').value,
      form.get('password').value
    )
      .then( async (userCredential) => {
        const user: any = userCredential.user;
        let token =await user.accessToken;
         localStorage.setItem('token', token);
      })
      .then(() => this.isLogedIn.next(true))
      .then(async() => {
        await this.route.navigate(['main/dashbord']);
        this.createBasicNotification(
          'topRight',
          'Voila!',
          'Welcome to Weather Mania'
        );
      })
      .catch((error) => {
        this.isLogedIn.next(false);
        this.createBasicNotification('topRight','Error',error)
      });
  };

  //logout mehod

  logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        this.createBasicNotification('topRight', 'Logged out', '');
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
        this.createBasicNotification(
          'topRight',
          'email sent',
          'a password rest emait is sent to your email address'
        );
      })
      .then(() => this.route.navigate(['auth/login']))
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.createBasicNotification(
          'topRight',
          'Oops!',
          'Somthing went wrong please try again'
        );
      });
  }
  //update pass
  updatePassword(form: any) {
    const auth = getAuth();

    const user: any = auth.currentUser;
    const newPassword = form.pass;

    updatePassword(user, newPassword)
      .then(() => {
        this.createBasicNotification(
          'topRight',
          'success',
          'passworrd updated succesfully : )'
        );
      })
      .catch((error: any) => {
        this.createBasicNotification('topLeft', 'Error', error);
      });

    //deocode
  }
  decode(jwtToken: string) {
    try {
      let decoded = jwt_decode(jwtToken);
      if (decoded) {
        return decoded;
      }
    } catch (error) {
      this.createBasicNotification(
        'topRight',
        'Bed request',
        'You are not loggedIn'
      );
      this.route.navigate(['auth/login'])
    }
  }
  //notification

  placement = 'topRight';

  createBasicNotification(
    position: NzNotificationPlacement,
    title: string,
    discription: string
  ): void {
    this.notification.blank(title, discription, { nzPlacement: position });
  }
}
