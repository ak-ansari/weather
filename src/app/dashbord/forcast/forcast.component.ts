import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DashService } from '../dash.service';
import { dummy } from '../dashbord/jsonDummyData';

@Component({
  selector: 'app-forcast',
  templateUrl: './forcast.component.html',
  styleUrls: ['./forcast.component.css']
})
export class ForcastComponent implements OnInit {
forcastJson:any=[]
  constructor(private api:ApiService,private dash:DashService) { }

  ngOnInit(): void {
     this.forcastJson = [];
     this.forcastJson = this.dash.setParameters(dummy.data);
   
  }

  search(city:string){
  this.api.getWeather(city).subscribe(data=>{
    this.forcastJson=[]
   this.forcastJson= this.dash.setParameters(data)
   
})
}


}
