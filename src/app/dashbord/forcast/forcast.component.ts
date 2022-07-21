import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { dummy } from '../dashbord/jsonDummyData';

@Component({
  selector: 'app-forcast',
  templateUrl: './forcast.component.html',
  styleUrls: ['./forcast.component.css']
})
export class ForcastComponent implements OnInit {
forcastJson:any=[]
  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.setParameters(dummy.data)
  }

  search(city:string){
  this.api.getWeather(city).subscribe(data=>{
    this.setParameters(data)
   
})
}
setParameters(data:any){
   this.forcastJson=[];
     for (let i = 1; i<=7; i++) {
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
    this.forcastJson.push(obj)
  }
  console.log(this.forcastJson)
}

}
