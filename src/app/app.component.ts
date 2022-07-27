import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { AuthService } from './auth/auth.service';
import { firebaseConfig } from './firebase.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private auth: AuthService, private route: Router) {
    this.auth.isLogedIn.subscribe((data) => {
      return (this.isLogedIn = data);
    });
  }
  isCollapsed = false;
  ngOnit(): void {
    initializeApp(firebaseConfig);
    this.auth.status().subscribe((value) => (this.isLogedIn = value));
  }
  isLogedIn: boolean = false;
}
