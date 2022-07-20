import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css'],
})
export class DashbordComponent implements OnInit {
  constructor(private api: ApiService) {}
  jsondata: any = null;
  search(city:string){
    this.tempAndTime=[];
    this.api.getWeather(city).subscribe(value=>{this.json(value);
      this.hourlyWeather(value)
    
    }

    );
    // this.json(jsonResponse);

  }

  address: string = '';
  date = new Date();
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
  houre: number = 0;
  minute: number = 0;
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
    this.api.getWeather('bundi').subscribe(value=>{
      this.json(value);
      this.hourlyWeather(value);
    })
    

    setInterval(() => {
      let date = new Date();
      this.day = date.getDate();
      this.month = 1 + date.getMonth();
      this.year = date.getFullYear();
      let houre = date.getHours();
      this.minute = date.getMinutes();
      if (houre > 12) {
        this.houre = houre - 12;
        return (this.ampm = 'PM');
      } else {
        this.houre = houre;
        return (this.ampm = 'AM');
      }
    });
  }
  json(data: any) {
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
      let houre=this.date.getHours();
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
