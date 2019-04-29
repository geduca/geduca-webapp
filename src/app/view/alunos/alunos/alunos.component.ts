import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/app/model/Aluno';
import { Page } from 'src/app/model/Page';
import { Pageable } from 'src/app/model/Pageable';
import { AlunoService } from 'src/app/service/aluno.service';


@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html'
})
export class AlunosComponent implements OnInit {

  columns = [];
  resposta: Page<Aluno>;
  alunos: Aluno[];
  page = new Pageable();

  constructor(private alunoService: AlunoService) {
    this.page.pageNumber = 0;
    this.page.pageSize = 10;
  }

  ngOnInit() {
    this.setPage({ offset: 0 });
    this.columns = [
      { prop: 'codigo', name: 'Matricula' },
      { prop: 'pessoa.nome', name: 'Nome' },
      { prop: 'pessoa.cpf', name: 'CPF' },
      { prop: 'pessoa.dataNascimento', name: 'Data de Nascimento' },
      { prop: 'pessoa.sexo', name: 'Sexo' },
      { prop: 'pessoa.ativo', name: 'Ativo' },
      { prop: 'dataMatricula', name: 'Data de Matricula' }
    ];
  }

  /**
   * Populate the table with new data based on the page number
   * @param page The page to select
   */
  setPage(pageInfo){
    this.page.pageNumber = pageInfo.offset;
    this.alunoService.pesquisar(this.page.pageNumber, this.page.pageSize).subscribe(res => {
      this.resposta = res;
      this.alunos = this.resposta.content;
      this.page = res.pageable;
      console.log(this.alunos);
    });
  }

  

}
