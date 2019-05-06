import { Fornecedor } from './../../../model/Fornecedor';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { Endereco } from '../../../model/Endereco';
import { FornecedorService } from '../../../service/fornecedor.service';

@Component({
  selector: 'app-criar-fornecedor',
  templateUrl: './criar-fornecedor.component.html'
})
export class CriarFornecedorComponent implements OnInit {

  fornecedor: Fornecedor;
  fornecedorForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private fornecedorService: FornecedorService,
    private toastr: ToastrService,
    private router: Router,
    private loader: NgxUiLoaderService
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
}
