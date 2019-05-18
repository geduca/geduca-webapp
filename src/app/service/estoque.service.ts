import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

import { Page } from '../model/Page';
import { Estoque } from '../model/Estoque';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/estoque';
  }

  pesquisar(pagina, max): Observable<Page<Estoque>> {
    const params = { pagina, max };
    return this.http.get<Page<Estoque>>(this.apiUrl, { params });
  }

  listaTodos(): Observable<Estoque[]> {
    return this.http.get<Estoque[]>(this.apiUrl + '/lista');
  }

  buscaPeloCodigo(codigo: number): Observable<Estoque> {
    return this.http.get<Estoque>(this.apiUrl + `/${codigo}`);
  }

  criar(estoque: Estoque): Observable<any> {
    return this.http.post<Estoque>(this.apiUrl, estoque);
  }

  atualizar(estoque: Estoque): Observable<any> {
    return this.http.put<Estoque>(this.apiUrl + `/${estoque.codigo}`, estoque);
  }

  remover(codigo: number): Observable<any> {
    return this.http.delete(this.apiUrl + `/${codigo}`);
  }

}
