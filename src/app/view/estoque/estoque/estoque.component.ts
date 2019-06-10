import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Estoque } from 'src/app/model/Estoque';
import { Page } from 'src/app/model/Page';
import { Pageable } from 'src/app/model/Pageable';

import { EstoqueService } from './../../../service/estoque.service';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html'
})
export class EstoqueComponent implements OnInit {

  columns = [];
  resposta: Page<Estoque>;
  estoques: Estoque[];
  page = new Pageable();

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
      { prop: 'codigo', name: 'Código' }
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
      this.estoques = this.resposta.content;
      this.page = res.pageable;
      this.loader.stopBackground();
    });
  }

}
