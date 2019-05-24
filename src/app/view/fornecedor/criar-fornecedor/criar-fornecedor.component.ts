import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Endereco as EnderecoViaCep, ErroCep, NgxViacepService } from '@brunoc/ngx-viacep';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { Endereco } from '../../../model/Endereco';
import { FornecedorService } from '../../../service/fornecedor.service';
import { Fornecedor } from './../../../model/Fornecedor';

@Component({
  selector: 'app-criar-fornecedor',
  templateUrl: './criar-fornecedor.component.html'
})
export class CriarFornecedorComponent implements OnInit {

  fornecedor: Fornecedor;
  fornecedorForm: FormGroup;

  @ViewChild('campoNumero') campoNumero: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private fornecedorService: FornecedorService,
    private toastr: ToastrService,
    private router: Router,
    private loader: NgxUiLoaderService,
    private viacep: NgxViacepService
  ) { }

  ngOnInit() {
    this.fornecedorForm = this.formBuilder.group({
      nome: [''], cpf: [''], email: [''],
      telefone: [''], responsavel: [''], celular: [''], cep: [''], logradouro: [''], numero: [''], complemento: [''],
      bairro: [''], cidade: [''], estado: ['']
    });
  }

  cadastrar() {
    this.loader.startBackground();
    const fornecedor = new Fornecedor();
    const e = new Endereco();
    fornecedor.nome = this.fornecedorForm.get('nome').value;
    fornecedor.cpf = this.fornecedorForm.get('cpf').value;
    fornecedor.email = this.fornecedorForm.get('email').value;
    fornecedor.responsavel = this.fornecedorForm.get('responsavel').value;
    fornecedor.telefone = this.fornecedorForm.get('telefone').value;
    e.cep = this.fornecedorForm.get('cep').value;
    e.logradouro = this.fornecedorForm.get('logradouro').value;
    e.numero = this.fornecedorForm.get('numero').value;
    e.complemento = this.fornecedorForm.get('complemento').value;
    e.bairro = this.fornecedorForm.get('bairro').value;
    e.cidade = this.fornecedorForm.get('cidade').value;
    e.estado = this.fornecedorForm.get('estado').value;

    fornecedor.endereco = e;

    this.fornecedorService.criar(fornecedor).subscribe(
      res => {
        this.router.navigate(['/home/fornecedor']);
        this.toastr.success('Fornecedor ' + res.codigo + ' - ' + res.nome + ' criado com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao criar fornecedor: ' + err.error.message)
        this.loader.stopBackground();
      }
    );
  }

  buscaCep() {
    this.viacep.buscarPorCep(this.fornecedorForm.get('cep').value).then((endereco: EnderecoViaCep) => {
      this.fornecedorForm.get('cep').setValue(endereco.cep);
      this.fornecedorForm.get('logradouro').setValue(endereco.logradouro);
      this.fornecedorForm.get('complemento').setValue(endereco.complemento);
      this.fornecedorForm.get('bairro').setValue(endereco.bairro);
      this.fornecedorForm.get('cidade').setValue(endereco.localidade);
      this.fornecedorForm.get('estado').setValue(endereco.uf);
      this.campoNumero.nativeElement.focus();
    }).catch((error: ErroCep) => {
      this.toastr.info(error.message);
    });
  }
}
