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
        'Authorization': 'Basic Z2VkdWNhOmcmZHVjQA==',
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    const body = `grant_type=password&username=${username}&password=${password}&client_id=geduca`;

    return this.http.post(this.oauthTokenUrl, body, httpOptions);
  }
}
