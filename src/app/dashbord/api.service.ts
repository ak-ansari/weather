import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  
   getWeather(city:string): Observable<any> {
    let key = '96D3ZBK378DF2KZQHP4QVXEKX';
    const weatherApiUrl: string = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&elements=datetime%2CdatetimeEpoch%2Cname%2Caddress%2CresolvedAddress%2Cdatetime%2Cprecip%2Cprecipprob%2Ctempmax%2Ctempmin%2Ctemp%2Cfeelslike%2Chumidity%2Cwindspeed%2Cpressure%2Ccloudcover%2Cvisibility%2Csunrise%2Csunset%2Cconditions%2Cdescription%2Cicon&include=events%2Cdays%2Chours%2Calerts%2Ccurrent&key=${key}&contentType=json`;
    let temp = this.http.get(weatherApiUrl);
    return temp;
      }
  


    
  
  }

