import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Aluno } from 'src/app/model/Aluno';
import { Pessoa } from 'src/app/model/Pessoa';
import { AlunoService } from 'src/app/service/aluno.service';

import { Endereco } from '../../../model/Endereco';

@Component({
  selector: 'app-editar-aluno',
  templateUrl: './editar-aluno.component.html'
})
export class EditarAlunoComponent implements OnInit {

  aluno: Aluno;
  pessoa: Pessoa;
  alunoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private alunoService: AlunoService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loader: NgxUiLoaderService
  ) { }

  ngOnInit() {
    const codigo = this.activatedRoute.snapshot.params.codigo;
    this.alunoService.buscaPeloCodigo(codigo).subscribe(res => {
      this.aluno = res;
      this.alunoForm.get('nome').setValue(this.aluno.pessoa.nome);
      this.alunoForm.get('cpf').setValue(this.aluno.pessoa.cpf);
      this.alunoForm.get('dataNascimento').setValue(this.aluno.pessoa.dataNascimento);
      this.alunoForm.get('sexo').setValue(this.aluno.pessoa.sexo);
      this.alunoForm.get('pai').setValue(this.aluno.pessoa.pai);
      this.alunoForm.get('mae').setValue(this.aluno.pessoa.mae);
      this.alunoForm.get('email').setValue(this.aluno.pessoa.email);
      this.alunoForm.get('telefone').setValue(this.aluno.pessoa.telefone);
      this.alunoForm.get('celular').setValue(this.aluno.pessoa.celular);
      this.alunoForm.get('cep').setValue(this.aluno.pessoa.endereco.cep);
      this.alunoForm.get('logradouro').setValue(this.aluno.pessoa.endereco.logradouro);
      this.alunoForm.get('numero').setValue(this.aluno.pessoa.endereco.numero);
      this.alunoForm.get('complemento').setValue(this.aluno.pessoa.endereco.complemento);
      this.alunoForm.get('bairro').setValue(this.aluno.pessoa.endereco.bairro);
      this.alunoForm.get('cidade').setValue(this.aluno.pessoa.endereco.cidade);
      this.alunoForm.get('estado').setValue(this.aluno.pessoa.endereco.cidade);
    });
    this.alunoForm = this.formBuilder.group({
      nome: [''], cpf: [''], dataNascimento: [''], sexo: [''], pai: [''], mae: [''], email: [''],
      telefone: [''], celular: [''], cep: [''], logradouro: [''], numero: [''], complemento: [''],
      bairro: [''], cidade: [''], estado: ['']
    });

  }

  editar() {
    this.loader.startBackground();
    const p = new Pessoa();
    const a = new Aluno();
    const e = new Endereco();

    p.codigo = this.aluno.pessoa.codigo;
    a.codigo = this.aluno.codigo;

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

    this.alunoService.atualizar(a).subscribe(
      res => {
        this.router.navigate(['/home/alunos']);
        this.toastr.success('Aluno ' + res.codigo + ' - ' + res.pessoa.nome + ' editado com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao criar aluno: ' + err.error.message);
        this.loader.stopBackground();
      }
    );
  }

  isAtivo(status: boolean) {
    return status === true ? 'Ativo' : 'Desativado';
  }

}
