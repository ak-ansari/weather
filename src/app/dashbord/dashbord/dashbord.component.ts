import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiService } from '../api.service';
import {dummy} from './jsonDummyData'

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css'],
})
export class DashbordComponent implements OnInit {
  constructor(private api: ApiService) {}
  search(city:string){
    this.tempAndTime=[];
    this.api.getWeather(city).subscribe(value=>{this.json(value);
      this.hourlyWeather(value)
    
    }

    );
    // this.json(jsonResponse);

  }

  address: string = '';
  sunrise:any=null;
  sunset:any=null;
  date = new Date();
  condition:string=''
  hoursToDisplay=0
  temp: number = 0;
  maxtemp: number = 0;
  mintemp: number = 0;
  humidity: number = 0;
  visibility: number = 0;
  wind: number = 0;
  pressure: number = 0;
  feelslike: number = 0;
  cloud: number = 0;
  description: string = '';
  houre:any = 0;
  minute: any = 0;
  ampm: string = '';
  day: number = 0;
  month: number = 0;
  year: number = 0;
  icon: Subject<any> = new Subject();

  // address:string='';
  // address:string='';
  // address:string='';
  ngOnInit(): void {
    this.imgurls().subscribe(
      (data) => (this.imgurl = `../../../assets/logos/${data}.png`)
    );
    this.json(dummy.data);
    this.hourlyWeather(dummy.data)
    // this.api.getWeather('bundi').subscribe(value=>{
    //   this.json(value);
    //   this.hourlyWeather(value);
    // })
    

    setInterval(() => {
      let date = new Date();
      this.day = date.getDate();
      this.month = 1 + date.getMonth();
      this.year = date.getFullYear();
      let tempminute = date.getMinutes();
      this.minute =0;
      if(tempminute<10){
        this.minute=`0${tempminute}`
      }
      else{
        this.minute=tempminute;
      }
    });
  }
  json(data: any) {
    let str: string = data.currentConditions.datetime;
    console.log(str)
    this.houre=parseInt(str.slice(0,2));
    if(this.houre>12){
      this.hoursToDisplay=this.houre-12;
    this.ampm='PM'}
      else{
        this.hoursToDisplay=this.houre;
        this.ampm='AM'
      }
      this.sunrise=data.currentConditions.sunrise;
      this.sunset=data.currentConditions.sunset;
      this.condition = data.currentConditions.conditions;
    this.address = data.resolvedAddress;
    this.temp = data.currentConditions.temp;
    this.maxtemp = data.days[0].tempmax;
    this.mintemp = data.days[0].tempmin;
    this.wind = data.currentConditions.windspeed;
    this.humidity = data.currentConditions.humidity;
    this.pressure = data.currentConditions.pressure;
    this.visibility = data.currentConditions.visibility;
    this.cloud = data.currentConditions.cloudcover;
    this.feelslike = data.currentConditions.feelslike;
    this.icon.next(data.currentConditions.icon);
    this.description = data.days[0].description;
  }
  imgurl: any;
  imgurls(): Observable<any> {
    return this.icon;
  }
  tempAndTime:Array<any> = [];
  hourlyWeather = (data:any) => {
    return new Promise((res,rej) => {
      res(()=>{})
      let j=1;
      let l=0
      let k=3;
      let forcastTime:any=0;
      let json=data.days;
      let houre=this.houre;
      let time=houre+k;
      

     
      for (let i = 0; i <8; i ++) {
        if (time >= 24) {
          time -= 24;
          j++;
        }
        if(time>12){
          forcastTime=`${time-12} PM`;

        }
        else if(time==0){
          forcastTime=12+' AM';

        }
        else{
          forcastTime=time+' AM';
        }
        let obj = {
          temp: json[j].hours[time].temp,
          date: json[j].datetime,
          src: `../../../assets/logos/${json[j].hours[time].icon}.png`,
          time:forcastTime
        };
        this.tempAndTime.push(obj);
        time+=3;
        

     }
     

  });
  }}
