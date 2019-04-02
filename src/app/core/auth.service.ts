import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl: string;
  jwtPayload: any;

  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) {
    this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
    this.loadToken();
  }

  authenticate(username: string, password: string): Observable<void> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic Z2VkdWNhOmcmZHVjQA==',
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    const body = `grant_type=password&username=${username}&password=${password}&client_id=geduca`;
    return this.http.post<any>(this.oauthTokenUrl, body, httpOptions).pipe(map(res => {
      if (res && res.access_token) {
        this.tokenStore(res.access_token);
      }
      return res;
    }));
  }

  private tokenStore(token: string) {
    this.jwtPayload = this.jwtHelperService.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private loadToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.tokenStore(token);
    }
  }
}
