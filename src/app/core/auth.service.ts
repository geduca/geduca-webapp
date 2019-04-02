import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:12333/geduca/oauth/token';
  jwtPayload: any;

  constructor(private http: HttpClient, private jwtHelper: JwtHelper) { }

  authenticate(username: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic Z2VkdWNhOmcmZHVjQA==',
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    const body = `grant_type=password&username=${username}&password=${password}&client_id=geduca`;
    return this.http.post(this.oauthTokenUrl, body, httpOptions).subscribe(
      res => {
        console.log('autenticado');

      },
      err => {
        console.log(err);
      }
    );
  }

  private tokenStore(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
  }
}
