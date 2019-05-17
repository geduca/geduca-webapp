import { ProdutoService } from './../../../service/produto.service';
import { Produto } from './../../../model/Produto';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Fornecedor } from '../../../model/Fornecedor';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html'
})
export class EditarProdutoComponent implements OnInit {

  produto: Produto;
  produtoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loader: NgxUiLoaderService,
  ) { }

  ngOnInit() {
    const codigo = this.activatedRoute.snapshot.params.codigo;
    this.produtoService.buscaPeloCodigo(codigo).subscribe(res => {
      this.loader.startBackground();
      this.produto = res;
      this.produtoForm.get('codigo').setValue(this.produto.codigo);
      this.produtoForm.get('nome').setValue(this.produto.nome);
      this.produtoForm.get('descricao').setValue(this.produto.descricao);
      this.produtoForm.get('quantidade').setValue(this.produto.quantidade);
      this.produtoForm.get('quantidadeMinima').setValue(this.produto.quantidadeMinima);
      this.produtoForm.get('dataValidade').setValue(this.produto.dataValidade);
      this.produtoForm.get('fornecedores').setValue(this.produto.fornecedores);

      this.loader.stopBackground();
    });
    this.produtoForm = this.formBuilder.group({
      codigo: [''], nome: [''], descricao: [''],
      quantidade: [''], quantidadeMinima: [''], dataValidade: [''], fornecedores: []
    });

  }

  removerFornecedor(fornecedor: Fornecedor) {
     this.produto.fornecedores.splice(this.produto.fornecedores.indexOf(fornecedor));
  }

  editar() {
    this.loader.startBackground();

    this.produto.nome = this.produtoForm.get('nome').value;
    this.produto.codigo = this.produtoForm.get('codigo').value;
    this.produto.descricao = this.produtoForm.get('descricao').value;
    this.produto.quantidade = this.produtoForm.get('quantidade').value;
    this.produto.quantidadeMinima = this.produtoForm.get('quantidadeMinima').value;
    this.produto.dataValidade = this.produtoForm.get('dataValidade').value;

    this.produtoService.atualizar(this.produto).subscribe(
      res => {
        this.router.navigate(['/home/produtos']);
        this.toastr.success('Fornecedor ' + res.nome + ' editado com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao editar Fornecedor: ' + err.error.message);
        this.loader.stopBackground();
      }
    );
  }

}
