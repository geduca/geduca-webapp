import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Estoque } from '../model/Estoque';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/estoque';
  }

  listaTodos(): Observable<Estoque[]> {
    return this.http.get<Estoque[]>(this.apiUrl + '/lista');
  }

  buscaPorDispensa(codigoDispensa: number): Observable<Estoque[]> {
    return this.http.get<Estoque[]>(this.apiUrl + `/estoque?codigoDispensa=${codigoDispensa}`);
  }

  buscaPorProduto(codigoProduto: number): Observable<Estoque[]> {
    return this.http.get<Estoque[]>(this.apiUrl + `/produto?codigoProduto=${codigoProduto}`);
  }

  criar(estoque: Estoque): Observable<any> {
    return this.http.post<Estoque[]>(this.apiUrl, estoque);
  }

  remover(codigo: number): Observable<any> {
    return this.http.delete(this.apiUrl + `/${codigo}`);
  }

  atualizar(estoque: Estoque): Observable<any> {
    return this.http.put<Estoque>(this.apiUrl + `/${estoque.codigo}`, estoque);
  }

}
