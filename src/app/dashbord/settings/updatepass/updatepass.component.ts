import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-updatepass',
  templateUrl: './updatepass.component.html',
  styleUrls: ['./updatepass.component.css'],
})
export class UpdatepassComponent implements OnInit {
  constructor(private auth: AuthService) {}
  visibility = false;

  ngOnInit(): void {}
  updatepass(formvalue: any) {
    if (formvalue.pass !== formvalue.repeat_pass) {
      this.visibility = true;
      return;
    }
    this.auth.updatePassword(formvalue);
  }
}
