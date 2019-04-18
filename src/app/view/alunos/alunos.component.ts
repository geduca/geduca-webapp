import { Component, OnInit } from '@angular/core';

import { AlunoService } from './../../service/aluno.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html'
})
export class AlunosComponent implements OnInit {

  rows = [];
  columns = [];
  resposta = [];

  constructor(private alunoService: AlunoService) {
  }

  ngOnInit() {
    this.alunoService.pesquisar(0, 10).subscribe(res => this.resposta = res);
    console.log(this.resposta);
  }

}
