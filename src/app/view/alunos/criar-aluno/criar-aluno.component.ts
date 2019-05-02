import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Aluno } from 'src/app/model/Aluno';
import { Pessoa } from 'src/app/model/Pessoa';
import { AlunoService } from 'src/app/service/aluno.service';

import { Endereco } from '../../../model/Endereco';

@Component({
  selector: 'app-criar-aluno',
  templateUrl: './criar-aluno.component.html'
})
export class CriarAlunoComponent implements OnInit {

  aluno: Aluno;
  pessoa: Pessoa;
  alunoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private alunoService: AlunoService,
    private toastr: ToastrService,
    private router: Router,
    private loader: NgxUiLoaderService
  ) { }

  ngOnInit() {
    this.alunoForm = this.formBuilder.group({
      nome: [''], cpf: [''], dataNascimento: [''], sexo: [''], pai: [''], mae: [''], email: [''],
      telefone: [''], celular: [''], cep: [''], logradouro: [''], numero: [''], complemento: [''],
      bairro: [''], cidade: [''], estado: ['']
    });
  }

  cadastrar() {
    this.loader.startBackground();
    const p = new Pessoa();
    const a = new Aluno();
    const e = new Endereco();
    p.nome = this.alunoForm.get('nome').value;
    p.cpf = this.alunoForm.get('cpf').value;
    p.dataNascimento = this.alunoForm.get('dataNascimento').value;
    p.sexo = this.alunoForm.get('sexo').value;
    p.pai = this.alunoForm.get('pai').value;
    p.mae = this.alunoForm.get('mae').value;
    p.email = this.alunoForm.get('email').value;
    p.telefone = this.alunoForm.get('telefone').value;
    p.celular = this.alunoForm.get('celular').value;
    e.cep = this.alunoForm.get('cep').value;
    e.logradouro = this.alunoForm.get('logradouro').value;
    e.numero = this.alunoForm.get('numero').value;
    e.complemento = this.alunoForm.get('complemento').value;
    e.bairro = this.alunoForm.get('bairro').value;
    e.cidade = this.alunoForm.get('cidade').value;
    e.estado = this.alunoForm.get('estado').value;

    p.endereco = e;
    a.pessoa = p;

    this.alunoService.criar(a).subscribe(
      res => {
        this.router.navigate(['/home/alunos']);
        this.toastr.success('Aluno ' + res.codigo + ' - ' + res.pessoa.nome + ' criado com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao criar aluno: ' + err.error.message)
        this.loader.stopBackground();
      }
    );
  }
}
