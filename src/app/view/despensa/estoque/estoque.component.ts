/* import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { notVoidOrNull } from 'src/app/core/utils/notVoidOrNull';
import { Estoque } from 'src/app/model/Despensa';
import { EstoqueProduto } from 'src/app/model/Estoque';
import { Produto } from 'src/app/model/Produto';
import { Unidade } from 'src/app/model/Unidade';
import { ProdutoService } from 'src/app/service/produto.service';

import { EstoqueProdutoService } from '../../../service/estoque-produto.service';
import { EstoqueService } from '../../../service/despensa.service';
import { UnidadeService } from '../../../service/unidade.service';



@Component({
  selector: 'app-estoque-produto',
  templateUrl: './estoque-produto.component.html'
})
export class EstoqueProdutoComponent implements OnInit {

  modalRef: BsModalRef;
  form: FormGroup;
  formEditar: FormGroup;

  estoque: Estoque;
  produtos: EstoqueProduto[];
  produtosDisponiveis: Produto[];
  unidadesDisponiveis: Unidade[];

  constructor(
    private estoqueProdutoService: EstoqueProdutoService,
    private produtoService: ProdutoService,
    private unidadeService: UnidadeService,
    private estoqueService: EstoqueService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute,
    private loader: NgxUiLoaderService,
    private toast: ToastrService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({ produtos: [''] });
    this.formEditar = this.formBuilder.group({
      unidade: [''],
      quantidade: ['', [Validators.min(0)]],
      quantidadeMinima: ['', [Validators.min(0)]]
    });

    const codigo = this.activatedRoute.snapshot.params.codigo;

    this.loader.startBackground();

    this.estoqueService.buscaPeloCodigo(codigo).subscribe(res => {
      this.estoque = res;
      // produtos da estoque
      this.estoqueProdutoService.buscaPorEstoque(this.estoque.codigo).subscribe(resp => {
        this.produtos = resp;
      }, err => {
        this.toast.error('Erro ao carregar produtos da estoque : ' + err.error.message);
      });
      // produtos disponiveis
      this.loader.startBackground();
      this.produtoService.listaTodos().subscribe(response => {
        this.produtosDisponiveis = response;
        this.loader.stopBackground();
      }, err => {
        this.toast.error('Erro ao carregar produtos disponíveis: ' + err.error.message);
        this.loader.stopBackground();
      });
      // unidades disponiveis
      this.unidadeService.listaTodos().subscribe(response => {
        this.unidadesDisponiveis = response;
        this.loader.stopBackground();
      }, err => {
        this.toast.error('Erro ao carregar unidades disponíveis: ' + err.error.message);
        this.loader.stopBackground();
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
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'modal-lg' }));
  }

  closeModal() {
    this.modalRef.hide();
  }

  adicionarProdutos() {
    const produtosSelecionados: Produto[] = this.form.get('produtos').value;
    if (produtosSelecionados.length > 0) {
      this.loader.startBackground();
      const estoquesProdutos: EstoqueProduto[] = [];

      produtosSelecionados.forEach(produto => {
        const estoqueProduto = new EstoqueProduto();
        estoqueProduto.produto = produto;
        estoquesProdutos.push(estoqueProduto);
      });

      this.estoqueProdutoService.criar(estoquesProdutos, this.estoque.codigo).subscribe(res => {
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
        this.closeModal();
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

  editarProduto(estoqueProduto: EstoqueProduto) {
    this.loader.startBackground();
    if (notVoidOrNull(this.formEditar.get('unidade').value) === true) {
      const unidade = new Unidade();
      unidade.codigo = this.formEditar.get('unidade').value;
      estoqueProduto.unidade = unidade;
    }
    if (notVoidOrNull(this.formEditar.get('quantidade').value) === true) {
      estoqueProduto.quantidade = this.formEditar.get('quantidade').value;
    }
    if (notVoidOrNull(this.formEditar.get('quantidadeMinima').value) === true) {
      estoqueProduto.quantidadeMinima = this.formEditar.get('quantidadeMinima').value;
    }

    this.estoqueProdutoService.atualizar(estoqueProduto).subscribe(res => {
      this.estoqueProdutoService.buscaPorEstoque(this.estoque.codigo).subscribe(resp => {
        this.produtos = resp;
        this.closeModal();
      }, err => {
        this.toast.error('Erro ao carregar Produtos da Estoque: ' + err.error.message);
      });
      this.toast.success('Alteração realizada com sucesso!');
      this.loader.stopBackground();
      this.formEditar.reset();
    }, err => {
      this.toast.error('Erro ao alterar quantidades do produto: ' + err.error.message);
      this.loader.stopBackground();
    });
  }

  verificaValidTouched(campo: string) {
    return this.formEditar.get(campo).invalid && this.formEditar.get(campo).touched;
  }

  aplicaCssErro(campo: string) {
    if (this.verificaValidTouched(campo)) { return 'is-invalid'; }
  }

}
 */
