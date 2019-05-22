import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Produto } from 'src/app/model/Produto';
import { Estoque } from 'src/app/model/Estoque';
import { EstoqueProduto } from 'src/app/model/EstoqueProduto';
import { ProdutoService } from 'src/app/service/produto.service';

import { EstoqueProdutoService } from '../../../service/estoque-produto.service';
import { EstoqueService } from '../../../service/estoque.service';




@Component({
  selector: 'app-estoque-produto',
  templateUrl: './estoque-produto.component.html'
})
export class EstoqueProdutoComponent implements OnInit {

  modalRef: BsModalRef;
  form: FormGroup;

  estoque: Estoque;
  produtos: EstoqueProduto[];
  produtosDisponiveis: Produto[];

  constructor(
    private estoqueProdutoService: EstoqueProdutoService,
    private produtoService: ProdutoService,
    private estoqueService: EstoqueService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute,
    private loader: NgxUiLoaderService,
    private toast: ToastrService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({ produtos: [''] });

    const codigo = this.activatedRoute.snapshot.params.codigo;

    this.loader.startBackground();

    this.estoqueService.buscaPeloCodigo(codigo).subscribe(res => {
      this.estoque = res;
      // produtos da estoque
      this.estoqueProdutoService.buscaPorEstoque(this.estoque.codigo).subscribe(resp => {
        this.produtos = resp;
        console.log(this.produtos);
      }, err => {
        this.toast.error('Erro ao carregar produtos da estoque : ' + err.error.message);
      });

      this.loader.stopBackground();
    }, err => {
      this.toast.error('Erro ao carregar Produto: ' + err.error.message);
      this.loader.stopBackground();
    });

    this.loader.stopBackground();
  }

  isAtivo(status: boolean) {
    if (status === true) { return 'Ativo'; } else if (status === false) { return 'Desativado'; }
  }

  isSimNao(valor: boolean) {
    if (valor === true) { return 'Sim'; } else if (valor === false) { return 'Não'; }
  }

  openModal(template: TemplateRef<any>) {
    // produtos disponiveis
    this.loader.startBackground();
    this.produtoService.listaTodos().subscribe(response => {
      this.produtosDisponiveis = response;
      this.loader.stopBackground();
    }, err => {
      this.toast.error('Erro ao carregar produtos disponíveis: ' + err.error.message);
      this.loader.stopBackground();
    });
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'modal-lg' }));
  }

  closeModal() {
    this.modalRef.hide();
  }

  adicionarProdutos() {
    const produtosSelecionados: Produto[] = this.form.get('produtos').value;
    console.log(produtosSelecionados);
    if (produtosSelecionados.length > 0) {
      this.loader.startBackground();
      this.estoqueProdutoService.criar(produtosSelecionados, this.estoque.codigo).subscribe(res => {
        this.estoqueProdutoService.buscaPorEstoque(this.estoque.codigo).subscribe(resp => {
          this.produtos = resp;
          this.closeModal();
        }, err => {
          this.toast.error('Erro ao carregar Produtos da Estoque: ' + err.error.message);
        });
        this.toast.success('Produtos adicionados com sucesso!');
        this.loader.stopBackground();
      }, err => {
        this.toast.error('Erro ao adicionar produtos: ' + err.error.message);
        this.loader.stopBackground();
      });
    }
  }

  removerProduto(estoqueProduto: EstoqueProduto) {
    this.loader.startBackground();
    this.estoqueProdutoService.remover(estoqueProduto.codigo).subscribe(res => {
      this.estoqueProdutoService.buscaPorEstoque(this.estoque.codigo).subscribe(resp => {
        this.produtos = resp;
      }, err => {
          this.toast.error('Erro ao carregar Produtos da Estoque: ' + err.error.message);
      });
      this.toast.success('Produto removido com sucesso!');
      this.loader.stopBackground();
    }, err => {
      this.toast.error('Erro ao remover produto: ' + err.error.message);
      this.loader.stopBackground();
    });
  }

}
