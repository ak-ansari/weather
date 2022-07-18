import { Component } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { AuthService } from './auth/auth.service';
import {firebaseConfig} from './firebase.config'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth:AuthService){}
  isCollapsed = false;
  ngOnit():void{
    initializeApp(firebaseConfig)
  } 
logout(){
  this.auth.logout()
}}
