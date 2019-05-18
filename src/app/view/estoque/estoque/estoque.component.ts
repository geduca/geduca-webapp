import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Curso } from 'src/app/model/Curso';
import { Page } from 'src/app/model/Page';
import { Pageable } from 'src/app/model/Pageable';

import { CursoService } from './../../../service/curso.service';
import { Estoque } from '../../../model/Estoque';
import { EstoqueService } from '../../../service/estoque.service';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html'
})
export class EstoqueComponent implements OnInit {

  columns = [];
  resposta: Page<Estoque>;
  estoque: Estoque[];
  page = new Pageable();

  @ViewChild('acoes') acoes: TemplateRef<any>;
  @ViewChild('ativo') ativo: TemplateRef<any>;

  constructor(
    private estoqueService: EstoqueService,
    private loader: NgxUiLoaderService,
    private toastr: ToastrService,
  ) {
    this.page.pageNumber = 0;
    this.page.pageSize = 10;
  }

  ngOnInit() {
    this.setPage({ offset: 0 });
    this.columns = [
      { prop: 'codigo', name: 'Código' },
      { prop: 'nome', name: 'Nome' },
      { prop: 'descricao', name: 'Descrição' },
      { prop: '', cellTemplate: this.acoes, name: 'Ações', sortable: false }
    ];
  }

  /**
   * Populate the table with new data based on the page number
   * @param page The page to select
   */
  setPage(pageInfo) {
    this.loader.startBackground();
    this.page.pageNumber = pageInfo.offset;
    this.estoqueService.pesquisar(this.page.pageNumber, this.page.pageSize).subscribe(res => {
      this.resposta = res;
      this.estoque = this.resposta.content;
      this.page = res.pageable;
      this.loader.stopBackground();
    });
  }

  remover(curso: Curso) {
    this.loader.startBackground();
    this.estoqueService.remover(curso.codigo).subscribe(
      res => {
        this.removerRegistroDaLista(curso);
        this.toastr.success
          ('Curso ' + curso.codigo + ' - ' + curso.nome + ' removido com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao remover curso: ' + err.error.message);
        this.loader.stopBackground();
      }
    );
  }

  removerRegistroDaLista(row: any): void {
    const tmp = this.estoque;
    _.remove(tmp, (linha) => _.isEqual(linha, row));
    this.estoque = [...tmp];
  }

}
