import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Aluno } from 'src/app/model/Aluno';
import { Pessoa } from 'src/app/model/Pessoa';
import { AlunoService } from 'src/app/service/aluno.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-visualizar-aluno',
  templateUrl: './visualizar-aluno.component.html'
})
export class VisualizarAlunoComponent implements OnInit {

  aluno: Aluno;
  pessoa: Pessoa;
  alunoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private alunoService: AlunoService,
    private activatedRoute: ActivatedRoute,
    private loader: NgxUiLoaderService
  ) { }

  ngOnInit() {
    const codigo = this.activatedRoute.snapshot.params.codigo;
    this.alunoService.buscaPeloCodigo(codigo).subscribe(res => {
      this.loader.startBackground();
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
      this.loader.stopBackground();
    });
    this.alunoForm = this.formBuilder.group({
      nome: [{ value: '', disabled: true }],
      cpf: [{ value: '', disabled: true }],
      dataNascimento: [{ value: '', disabled: true }],
      sexo: [{ value: '', disabled: true }],
      pai: [{ value: '', disabled: true }],
      mae: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      telefone: [{ value: '', disabled: true }],
      celular: [{ value: '', disabled: true }],
      cep: [{ value: '', disabled: true }],
      logradouro: [{ value: '', disabled: true }],
      numero: [{ value: '', disabled: true }],
      complemento: [{ value: '', disabled: true }],
      bairro: [{ value: '', disabled: true }],
      cidade: [{ value: '', disabled: true }],
      estado: [{ value: '', disabled: true }]
    });
  }

  isAtivo(status: boolean) {
    return status === true ? 'Ativo' : 'Desativado';
  }

}
