import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
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
  autenticado = false;
  mostrarHeaderEmitter = new EventEmitter<boolean>();

  headers = new HttpHeaders({
    'Authorization': 'Basic Z2VkdWNhOmcmZHVjQA==',
    'Content-Type': 'application/x-www-form-urlencoded'
  })

  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) {
    this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
    this.loadToken();
  }

  authenticate(username: string, password: string): Observable<void> {
    const body = `grant_type=password&username=${username}&password=${password}&client_id=geduca`;
    return this.http.post<any>(this.oauthTokenUrl, body, { headers: this.headers, withCredentials: true }).pipe(map(res => {
      if (res && res.access_token) {
        this.tokenStore(res.access_token);
        this.autenticado = true;
        this.mostrarHeaderEmitter.emit(true);
      }
      return res;
    },
      err => {
        this.autenticado = false;
        this.mostrarHeaderEmitter.emit(false);
      }
    ));
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

  refreshToken(): Observable<string> {
    const headers = this.headers;
    const params = new HttpParams().set('grant_type', 'refresh_token');

    return this.http.post<any>(this.oauthTokenUrl, null, { headers, params, withCredentials: true })
      .pipe(
        map(token => {
          this.tokenStore(token.access_token);
          return token.access_token;
        })
      );
  }

  isAccessTokenInvalid() {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelperService.isTokenExpired(token);
  }

}
