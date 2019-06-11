import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  form: FormGroup;

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
      this.form.get('codigo').setValue(this.produto.codigo);
      this.form.get('nome').setValue(this.produto.nome);
      this.form.get('descricao').setValue(this.produto.descricao);
      this.form.get('marca').setValue(this.produto.marca);
      this.form.get('fornecedor').setValue(this.produto.fornecedor);
      this.form.get('quantidadeMinima').setValue(this.produto.quantidadeMinima);


      this.fornecedorService.listaTodos().subscribe(resp => {
        this.fornecedores = resp;
      });

      this.loader.stopBackground();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      descricao: [''],
      marca: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      quantidadeMinima: ['', [Validators.required, Validators.min(0)]],
      fornecedor: ['', [Validators.required]]
    });

  }

  editar() {
    this.loader.startBackground();

    this.produto.nome = this.form.get('nome').value;
    this.produto.descricao = this.form.get('descricao').value;
    this.produto.marca = this.form.get('marca').value;
    this.produto.quantidadeMinima = this.form.get('quantidadeMinima').value;
    this.produto.fornecedor = this.form.get('fornecedor').value;

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

  verificaValidTouched(campo: string) {
    return this.form.get(campo).invalid && this.form.get(campo).touched;
  }

  aplicaCssErro(campo: string) {
    if (this.verificaValidTouched(campo)) { return 'is-invalid'; }
  }

}
