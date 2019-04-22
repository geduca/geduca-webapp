import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/app/model/Aluno';
import { Page } from 'src/app/model/Page';
import { AlunoService } from 'src/app/service/aluno.service';


@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html'
})
export class AlunosComponent implements OnInit {

  columns = [];
  resposta: Page<Aluno>;
  alunos: Aluno[];

  constructor(private alunoService: AlunoService) {
  }

  ngOnInit() {
    this.alunoService.pesquisar(0, 10).subscribe(res => {
      this.resposta = res;
      this.alunos = this.resposta.content;
      console.log(this.alunos);
    });
    this.columns = [
      { prop: 'codigo', name: 'Código' },
      { prop: 'pessoa.nome', name: 'Nome' },
      { prop: 'pessoa.cpf', name: 'Cpf' },
      { prop: 'pessoa.dataNascimento', name: 'Data de Nascimento' },
      { prop: 'pessoa.sexo', name: 'Sexo' },
      { prop: 'pessoa.ativo', name: 'Ativo' },
      { prop: 'dataMatricula', name: 'Data de Matricula' }
    ];
  }

}
