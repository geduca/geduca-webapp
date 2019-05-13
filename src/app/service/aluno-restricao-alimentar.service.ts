import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

import { AlunoRestricaoAlimentar } from './../model/AlunoRestricaoAlimentar';

@Injectable({
  providedIn: 'root'
})
export class AlunoRestricaoAlimentarService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/alunos_restricoes_alimentares';
  }

  buscaPorAluno(codigoAluno: number): Observable<AlunoRestricaoAlimentar> {
    return this.http.get<AlunoRestricaoAlimentar>(this.apiUrl + `/${codigoAluno}`);
  }

  criar(alunoRestricaoAlimentar: AlunoRestricaoAlimentar): Observable<any> {
    return this.http.post<AlunoRestricaoAlimentar>(this.apiUrl, AlunoRestricaoAlimentar);
  }

  remover(codigo: number): Observable<any> {
    return this.http.delete(this.apiUrl + `/${codigo}`);
  }

}
