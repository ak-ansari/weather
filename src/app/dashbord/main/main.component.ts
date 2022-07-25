import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(private route: Router, private auth: AuthService) {
    this.auth.isLogedIn.subscribe((data) => {
      return (this.isLogedIn = data);
    });
  }
  isCollapsed = false;
  
  ngOnInit(): void {
    this.auth.isLogedIn.subscribe(val=>this.isLogedIn=val)
  };
  isLogedIn: boolean = false;

  logout() {
    this.auth.logout();
  }
  dashbord() {
    if (this.isLogedIn === false) {
      alert('please login first');
      return;
    } else if (this.isLogedIn === true) {
      this.route.navigate(['dashbord/dashbord']);
    }
  }
  forcast() {
    this.route.navigate(['dashbord/forcast']);
  }
  setting() {}
}
