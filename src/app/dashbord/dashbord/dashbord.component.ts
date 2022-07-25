import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DashService } from '../dash.service';
import { dummy } from './jsonDummyData';
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css'],
})
export class DashbordComponent implements OnInit {
  constructor(private api: ApiService, private dash: DashService) {}
  search(city: string) {
    this.tempAndTime = [];
    this.api.getWeather(city).subscribe((value) => {
      this.currentWeatherData = {};
      this.tempAndTime=[]
      this.currentWeatherData = this.dash.json(value);
      this.tempAndTime = this.dash.hourlyWeather(
        value,
        this.currentWeatherData.hoursToDisplay
      );
    });
  }

  date = new Date();
  condition: string = '';
  houre: any = 0;
  minute: any = 0;
  day: number = 0;
  month: number = 0;
  year: number = 0;
  currentWeatherData: any = {};
  tempAndTime: Array<any> = [];

  ngOnInit(): void {
    this.currentWeatherData = this.dash.json(dummy.data);
    this.tempAndTime=this.dash.hourlyWeather(dummy.data,this.currentWeatherData.hoursToDisplay)

    setInterval(() => {
      let date = new Date();
      this.day = date.getDate();
      this.month = 1 + date.getMonth();
      this.year = date.getFullYear();
      let tempminute = date.getMinutes();
      this.minute = 0;
      if (tempminute < 10) {
        this.minute = `0${tempminute}`;
      } else {
        this.minute = tempminute;
      }
    });
  }

 
};

