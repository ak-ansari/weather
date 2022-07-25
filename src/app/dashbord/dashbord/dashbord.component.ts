import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiService } from '../api.service';
import { dummy } from './jsonDummyData';
import { currentConditions } from './weatherdatainterface';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css'],
})
export class DashbordComponent implements OnInit {
  constructor(private api: ApiService) {}
  search(city: string) {
    this.tempAndTime = [];
    this.api.getWeather(city).subscribe((value) => {
      this.json(value);
      this.hourlyWeather(value);
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
  ngOnInit(): void {
    this.json(dummy.data);

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

  json(data: any) {
    let currentConditions = data.currentConditions;
    let daysData = data.days[0];
    let hoursToDisplay = 0;
    let AmPm = '';
    let str: string = data.currentConditions.datetime;
    this.houre = parseInt(str.slice(0, 2));
    if (this.houre > 12) {
      hoursToDisplay = this.houre - 12;
      AmPm = 'PM';
    } else {
      hoursToDisplay = this.houre;
      AmPm = 'AM';
    }

    let obj: currentConditions = {
      hoursToDisplay: hoursToDisplay,
      sunrise: currentConditions.sunrise,
      sunset: currentConditions.sunset,
      condition: currentConditions.conditions,
      address: data.resolvedAddress,
      temp: currentConditions.temp,
      maxtemp: daysData.tempmax,
      mintemp: daysData.tempmin,
      wind: currentConditions.windspeed,
      humidity: currentConditions.humidity,
      pressure: currentConditions.pressure,
      visibility: currentConditions.visibility,
      cloud: currentConditions.cloudcover,
      feelslike: currentConditions.feelslike,
      icon: `../../../assets/logos/${currentConditions.icon}.png`,
      description: daysData.descrip,
      ampm: AmPm,
    };
    this.currentWeatherData = obj;
  }
  tempAndTime: Array<any> = [];
  hourlyWeather = (data: any) => {
    return new Promise((res, rej) => {
      res(() => {});
      let j = 1;
      let l = 0;
      let k = 3;
      let forcastTime: any = 0;
      let json = data.days;
      let houre = this.houre;
      let time = houre + k;

      for (let i = 0; i < 8; i++) {
        if (time >= 24) {
          time -= 24;
          j++;
        }
        if (time > 12) {
          forcastTime = `${time - 12} PM`;
        } else if (time == 0) {
          forcastTime = 12 + ' AM';
        } else {
          forcastTime = time + ' AM';
        }
        let obj = {
          temp: json[j].hours[time].temp,
          date: json[j].datetime,
          src: `../../../assets/logos/${json[j].hours[time].icon}.png`,
          time: forcastTime,
        };
        this.tempAndTime.push(obj);
        time += 3;
      }
    });
  };
}
