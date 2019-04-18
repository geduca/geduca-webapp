import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  pesquisar(pagina, max): Observable<any> {
    const params = { pagina, max };
    return this.http.get(this.apiUrl + '/alunos', { params });
  }



}
