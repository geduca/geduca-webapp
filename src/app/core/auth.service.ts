import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:12333/geduca/oauth/token';

  constructor(private http: HttpClient) { }

  authenticate(username: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Z2VkdWNhOmcmZHVjQA=='
      })
    };

    const body = `username=${username}&password=${password}&grant_type=password`;

    this.http.post(this.oauthTokenUrl, body, httpOptions).subscribe(res => {
      console.log(res);
    });
  }
}
