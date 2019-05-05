import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Aluno } from 'src/app/model/Aluno';
import { Pessoa } from 'src/app/model/Pessoa';
import { AlunoService } from 'src/app/service/aluno.service';

import { Endereco } from '../../../model/Endereco';
import { FichaSaude } from './../../../model/FichaSaude';

@Component({
  selector: 'app-criar-aluno',
  templateUrl: './criar-aluno.component.html'
})
export class CriarAlunoComponent implements OnInit {

  alunoForm: FormGroup;
  aluno: Aluno;
  pessoa: Pessoa;
  fichaSaude: FichaSaude;

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
      bairro: [''], cidade: [''], estado: [''], cartaoSus: [''], doenca: [''], tipoSanguineo: [''],
      doencaDescricao: [''], medicamento: [''], medicamentoDescricao: [''], suplemento: [''],
      suplementoDescricao: [''], deficiencia: [''], deficienciaDescricao: [''], alergia: [''],
      alergiaDescricao: [''], intolerancia: [''], intoleranciaDescricao: ['']
    });
  }

  cadastrar() {
    this.loader.startBackground();

    const pessoa = new Pessoa();
    const aluno = new Aluno();
    const endereco = new Endereco();
    const fichaSaude = new FichaSaude();

    pessoa.nome = this.alunoForm.get('nome').value;
    pessoa.cpf = this.alunoForm.get('cpf').value;
    pessoa.dataNascimento = this.alunoForm.get('dataNascimento').value;
    pessoa.sexo = this.alunoForm.get('sexo').value;
    pessoa.pai = this.alunoForm.get('pai').value;
    pessoa.mae = this.alunoForm.get('mae').value;
    pessoa.email = this.alunoForm.get('email').value;
    pessoa.telefone = this.alunoForm.get('telefone').value;
    pessoa.celular = this.alunoForm.get('celular').value;
    endereco.cep = this.alunoForm.get('cep').value;
    endereco.logradouro = this.alunoForm.get('logradouro').value;
    endereco.numero = this.alunoForm.get('numero').value;
    endereco.complemento = this.alunoForm.get('complemento').value;
    endereco.bairro = this.alunoForm.get('bairro').value;
    endereco.cidade = this.alunoForm.get('cidade').value;
    endereco.estado = this.alunoForm.get('estado').value;
    fichaSaude.cartaoSus = this.alunoForm.get('cartaoSus').value;
    fichaSaude.tipoSanguineo = this.alunoForm.get('tipoSanguineo').value;
    fichaSaude.doenca = this.alunoForm.get('doenca').value;
    fichaSaude.doencaDescricao = this.alunoForm.get('doencaDescricao').value;
    fichaSaude.medicamento = this.alunoForm.get('medicamento').value;
    fichaSaude.medicamentoDescricao = this.alunoForm.get('medicamentoDescricao').value;
    fichaSaude.suplemento = this.alunoForm.get('suplemento').value;
    fichaSaude.suplementoDescricao = this.alunoForm.get('suplementoDescricao').value;
    fichaSaude.deficiencia = this.alunoForm.get('deficiencia').value;
    fichaSaude.deficienciaDescricao = this.alunoForm.get('deficienciaDescricao').value;
    fichaSaude.alergia = this.alunoForm.get('alergia').value;
    fichaSaude.alergiaDescricao = this.alunoForm.get('alergiaDescricao').value;
    fichaSaude.intolerancia = this.alunoForm.get('intolerancia').value;
    fichaSaude.intoleranciaDescricao = this.alunoForm.get('intoleranciaDescricao').value;

    pessoa.endereco = endereco;
    aluno.pessoa = pessoa;
    aluno.fichaSaude = fichaSaude;

    this.alunoService.criar(aluno).subscribe(
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
