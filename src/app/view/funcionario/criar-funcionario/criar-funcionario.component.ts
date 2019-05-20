import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Funcionario } from 'src/app/model/Funcionario';
import { Pessoa } from 'src/app/model/Pessoa';
import { FuncionarioService } from 'src/app/service/funcionario.service';

import { Endereco } from '../../../model/Endereco';

@Component({
  selector: 'app-criar-funcionario',
  templateUrl: './criar-funcionario.component.html'
})
export class CriarFuncionarioComponent implements OnInit {

  funcionarioForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private funcionarioService: FuncionarioService,
    private toastr: ToastrService,
    private router: Router,
    private loader: NgxUiLoaderService
  ) { }

  ngOnInit() {

    this.funcionarioForm = this.formBuilder.group({
      formacao: [''], area: [''], nome: [''], cpf: [''], dataNascimento: [''], sexo: [''], pai: [''], mae: [''], email: [''],
      telefone: [''], celular: [''], cep: [''], logradouro: [''], numero: [''], complemento: [''],
      bairro: [''], cidade: [''], estado: ['']
    });
  }

  cadastrar() {

    this.loader.startBackground();

    const pessoa = new Pessoa();
    const funcionario = new Funcionario();
    const endereco = new Endereco();

    funcionario.area = this.funcionarioForm.get('area').value;
    funcionario.formacao = this.funcionarioForm.get('formacao').value;
    pessoa.nome = this.funcionarioForm.get('nome').value;
    pessoa.cpf = this.funcionarioForm.get('cpf').value;
    pessoa.dataNascimento = this.funcionarioForm.get('dataNascimento').value;
    pessoa.sexo = this.funcionarioForm.get('sexo').value;
    pessoa.pai = this.funcionarioForm.get('pai').value;
    pessoa.mae = this.funcionarioForm.get('mae').value;
    pessoa.email = this.funcionarioForm.get('email').value;
    pessoa.telefone = this.funcionarioForm.get('telefone').value;
    pessoa.celular = this.funcionarioForm.get('celular').value;
    endereco.cep = this.funcionarioForm.get('cep').value;
    endereco.logradouro = this.funcionarioForm.get('logradouro').value;
    endereco.numero = this.funcionarioForm.get('numero').value;
    endereco.complemento = this.funcionarioForm.get('complemento').value;
    endereco.bairro = this.funcionarioForm.get('bairro').value;
    endereco.cidade = this.funcionarioForm.get('cidade').value;
    endereco.estado = this.funcionarioForm.get('estado').value;

    pessoa.endereco = endereco;
    funcionario.pessoa = pessoa;

    this.funcionarioService.criar(funcionario).subscribe(
      res => {
        this.router.navigate(['/home/funcionario']);
        this.toastr.success('Funcionario ' + res.codigo + ' - ' + res.pessoa.nome + ' criado com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao criar funcionario: ' + err.error.message);
        this.loader.stopBackground();
      }
    );
  }
}
