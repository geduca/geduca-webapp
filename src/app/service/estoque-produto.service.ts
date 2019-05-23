import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { EstoqueProduto } from '../model/EstoqueProduto';
import { Produto } from '../model/Produto';
import { EstoqueProdutoUtil } from '../model/utils/ProdutoEstoqueUtil';



@Injectable({
  providedIn: 'root'
})
export class EstoqueProdutoService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/estoques_produtos';
  }

  listaTodos(): Observable<EstoqueProduto[]> {
    return this.http.get<EstoqueProduto[]>(this.apiUrl + '/lista');
  }

  buscaPorEstoque(codigoEstoque: number): Observable<EstoqueProduto[]> {
    return this.http.get<EstoqueProduto[]>(this.apiUrl + `/estoque?codigoEstoque=${codigoEstoque}`);
  }

  buscaPorProduto(codigoProduto: number): Observable<EstoqueProduto[]> {
    return this.http.get<EstoqueProduto[]>(this.apiUrl + `/produto?codigoProduto=${codigoProduto}`);
  }

  criar(produtos: EstoqueProdutoUtil[], codigoEstoque: number): Observable<any> {
    return this.http.post<EstoqueProdutoUtil[]>(this.apiUrl + `?codigoEstoque=${codigoEstoque}`, produtos);
  }

  remover(codigo: number): Observable<any> {
    return this.http.delete(this.apiUrl + `/${codigo}`);
  }

  atualizar(estoqueProduto: EstoqueProduto): Observable<any> {
    return this.http.put<EstoqueProduto>(this.apiUrl + `/${estoqueProduto.codigo}`, estoqueProduto);
  }

}
