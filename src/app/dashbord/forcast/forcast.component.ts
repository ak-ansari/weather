import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from '../api.service';
import { DashService } from '../dash.service';

@Component({
  selector: 'app-forcast',
  templateUrl: './forcast.component.html',
  styleUrls: ['./forcast.component.css'],
})
export class ForcastComponent implements OnInit {
  forcastJson: any = [{ resadd: 'Kota, RJ, India' }];
  resadd: any;

  constructor(private api: ApiService, private dash: DashService) {}

  ngOnInit(): void {
    let city: any = localStorage.getItem('city') || 'kota';
    this.api.getWeather(city).subscribe((data) => {
      this.forcastJson = [];
      this.forcastJson = this.dash.setParameters(data);
      this.resadd = this.forcastJson[0].ressadd;
    });
  }
  

  search(city: string) {
    localStorage.setItem('city',city)
    this.api.getWeather(city).subscribe((data) => {
      this.forcastJson = [];
      this.forcastJson = this.dash.setParameters(data);
    });
  }
}
