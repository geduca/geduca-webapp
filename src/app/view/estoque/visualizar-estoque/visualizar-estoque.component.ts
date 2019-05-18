import { Estoque } from './../../../model/Estoque';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { EstoqueService } from '../../../service/estoque.service';


@Component({
  selector: 'app-visualizar-estoque',
  templateUrl: './visualizar-estoque.component.html'
})
export class VisualizarEstoqueComponent implements OnInit {

  estoque: Estoque;

  constructor(
    private estoqueService: EstoqueService,
    private activatedRoute: ActivatedRoute,
    private loader: NgxUiLoaderService
  ) { }

  ngOnInit() {
    const codigo = this.activatedRoute.snapshot.params.codigo;
    this.estoqueService.buscaPeloCodigo(codigo).subscribe(res => {
      this.loader.startBackground();
      this.estoque = res;
      this.loader.stopBackground();
    });
  }

  isAtivo(status: boolean) {
    if (status === true) { return 'Ativo'; } else if (status === false) { return 'Desativado'; }
  }

}
