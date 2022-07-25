import { Injectable } from '@angular/core';
import {currentConditions} from './dashbord/weatherdatainterface'

@Injectable({
  providedIn: 'root',
})
export class DashService {
  city:string=''
  date = new Date();

  constructor() {}
  json(data: any) {
    let currentWeatherData: any = {};
    let currentConditions = data.currentConditions;
    let daysData = data.days[0];
    let hoursToDisplay = 0;
    let AmPm = '';
    let str: string = data.currentConditions.datetime;
    let hour = parseInt(str.slice(0, 2));
    if (hour > 12) {
      hoursToDisplay = hour - 12;
      AmPm = 'PM';
    } else {
      hoursToDisplay = hour;
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
      description: daysData.description,
      ampm: AmPm,
    };
    currentWeatherData = obj;
    return currentWeatherData;
  }
  hourlyWeather = (data: any, hour: number) => {
    let tempAndTime: Array<any> = [];
    let j = 0;
    let l = 0;
    let k = 3;
    let forcastTime: any = 0;
    let json = data.days;
    let houre = hour;
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
      tempAndTime.push(obj);
      time += 3;
    }
    return tempAndTime;
  };
  setParameters(data: any) {
    let forcastJson = [];
    for (let i = 1; i <= 7; i++) {
      let obj: any = {
        address: data.address,
        date: data.days[i].datetime,
        src: `../../../assets/logos/${data.days[i].icon}.png`,
        temp: data.days[i].temp,
        condition: data.days[i].conditions,
        feelslike: data.days[i].feelslike,
        wind: data.days[i].windspeed,
        humidity: data.days[i].humidity,
        preci: data.days[i].precip,
        preciprob: data.days[i].precipprob,
        sunrise: data.days[i].sunrise,
        sunset: data.days[i].sunset,
        index: i % 2,
        resadd: data.resolvedAddress,
      };
      forcastJson.push(obj);
    }
    console.log(forcastJson);
    return forcastJson;
  }
}
