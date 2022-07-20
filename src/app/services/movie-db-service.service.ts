import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieDbService {
  private url=environment.baseUrl;
  private apiKey=environment.apiKey;
  constructor(private http:HttpClient) { }
  
  getToken(){
    return this.http.get(`${this.url}authentication/token/new?api_key=${this.apiKey}`)
  }

  getAccessMovie(dataAccess){
    return this.http.post(`${this.url}authentication/token/validate_with_login?api_key=${this.apiKey}`,dataAccess)
  }

  getLatestMovies():Observable<any>{
    return this.http.get(`${this.url}movie/now_playing?page=1&language=en-US&api_key=${this.apiKey}`)
  }

}
