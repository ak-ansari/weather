import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  isCollapsed = false;
  isLogedIn = this.auth.value;

  constructor(private auth: AuthService, private route: Router) {}

  ngOnInit(): void {
    this.auth.isLogedIn.subscribe((val) => (this.isLogedIn = val));
  }
  logout() {
    this.auth.logout();
  }
  dashbord() {
    if (this.isLogedIn === false) {
      alert('please login first');
      return;
    } else if (this.isLogedIn === true) {
    }
    this.route.navigate(['main/dashbord']);
  }
  forcast() {
    this.route.navigate(['main/forcast']);
  }
  setting() {}
}
