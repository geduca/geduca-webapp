import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { Pageable } from '../../../model/Pageable';
import { Produto } from '../../../model/Produto';
import { FornecedorService } from '../../../service/fornecedor.service';
import { ProdutoService } from '../../../service/produto.service';
import { Fornecedor } from './../../../model/Fornecedor';

@Component({
  selector: 'app-criar-produto',
  templateUrl: './criar-produto.component.html'
})
export class CriarProdutoComponent implements OnInit {

  produto: Produto;
  fornecedores: Fornecedor[];
  produtoForm: FormGroup;
  page = new Pageable();

  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private fornecedorService: FornecedorService,
    private toastr: ToastrService,
    private router: Router,
    private loader: NgxUiLoaderService
  ) {
    this.page.pageNumber = 0;
    this.page.pageSize = 10;
  }

  ngOnInit() {
    this.produto = new Produto();
    this.fornecedorService.pesquisar(this.page.pageNumber, this.page.pageSize).subscribe(res => {
      this.fornecedores = res.content;
      this.page = res.pageable;
      this.loader.stopBackground();
    });

    this.produtoForm = this.formBuilder.group({
      codigo: [''], nome: [''], descricao: [''], marca: ['']
    });
  }

  cadastrar() {
    this.loader.startBackground();
    const produto = new Produto();
    produto.codigo = this.produtoForm.get('codigo').value;
    produto.nome = this.produtoForm.get('nome').value;
    produto.descricao = this.produtoForm.get('descricao').value;
    produto.marca = this.produtoForm.get('marca').value;

    this.produtoService.criar(produto).subscribe(
      res => {
        this.router.navigate(['/home/produto']);
        this.toastr.success('Produto ' + res.codigo + ' - ' + res.nome + ' criado com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao criar produto: ' + err.error.message)
        this.loader.stopBackground();
      }
    );
  }
}
