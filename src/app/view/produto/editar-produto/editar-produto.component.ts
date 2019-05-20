import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FornecedorService } from 'src/app/service/fornecedor.service';

import { Fornecedor } from './../../../model/Fornecedor';
import { Produto } from './../../../model/Produto';
import { ProdutoService } from './../../../service/produto.service';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html'
})
export class EditarProdutoComponent implements OnInit {

  produto: Produto;
  fornecedores: Fornecedor[];
  produtoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private fornecedorService: FornecedorService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loader: NgxUiLoaderService,
  ) { }

  ngOnInit() {
    this.loader.startBackground();

    const codigo = this.activatedRoute.snapshot.params.codigo;

    this.produtoService.buscaPeloCodigo(codigo).subscribe(res => {
      this.produto = res;
      this.produtoForm.get('codigo').setValue(this.produto.codigo);
      this.produtoForm.get('nome').setValue(this.produto.nome);
      this.produtoForm.get('descricao').setValue(this.produto.descricao);
      this.produtoForm.get('marca').setValue(this.produto.marca);
      this.produtoForm.get('fornecedor').setValue(this.produto.fornecedor);


      this.fornecedorService.listaTodos().subscribe(resp => {
        this.fornecedores = resp;
      });

      this.loader.stopBackground();
    });

    this.produtoForm = this.formBuilder.group({
      codigo: [''], nome: [''], descricao: [''], marca: [''], fornecedor: ['']
    });

  }

  editar() {
    this.loader.startBackground();

    this.produto.nome = this.produtoForm.get('nome').value;
    this.produto.codigo = this.produtoForm.get('codigo').value;
    this.produto.descricao = this.produtoForm.get('descricao').value;
    this.produto.marca = this.produtoForm.get('marca').value;
    this.produto.fornecedor = this.produtoForm.get('fornecedor').value;

    this.produtoService.atualizar(this.produto).subscribe(
      res => {
        this.router.navigate(['/home/produto']);
        this.toastr.success('Produto ' + res.nome + ' editado com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao editar produto: ' + err.error.message);
        this.loader.stopBackground();
      }
    );
  }

}
