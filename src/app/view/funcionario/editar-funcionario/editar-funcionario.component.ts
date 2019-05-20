import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Funcionario } from 'src/app/model/Funcionario';
import { FuncionarioService } from 'src/app/service/funcionario.service';

@Component({
  selector: 'app-editar-funcionario',
  templateUrl: './editar-funcionario.component.html'
})
export class EditarFuncionarioComponent implements OnInit {

  funcionario: Funcionario;
  funcionarioForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private funcionarioService: FuncionarioService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loader: NgxUiLoaderService
  ) { }

  ngOnInit() {
    const codigo = this.activatedRoute.snapshot.params.codigo;
    this.funcionarioService.buscaPeloCodigo(codigo).subscribe(res => {
      this.loader.startBackground();
      this.funcionario = res;
      this.funcionarioForm.get('area').setValue(this.funcionario.area);
      this.funcionarioForm.get('formacao').setValue(this.funcionario.formacao);
      this.funcionarioForm.get('nome').setValue(this.funcionario.pessoa.nome);
      this.funcionarioForm.get('cpf').setValue(this.funcionario.pessoa.cpf);
      this.funcionarioForm.get('dataNascimento').setValue(this.funcionario.pessoa.dataNascimento);
      this.funcionarioForm.get('sexo').setValue(this.funcionario.pessoa.sexo);
      this.funcionarioForm.get('pai').setValue(this.funcionario.pessoa.pai);
      this.funcionarioForm.get('mae').setValue(this.funcionario.pessoa.mae);
      this.funcionarioForm.get('email').setValue(this.funcionario.pessoa.email);
      this.funcionarioForm.get('telefone').setValue(this.funcionario.pessoa.telefone);
      this.funcionarioForm.get('celular').setValue(this.funcionario.pessoa.celular);
      this.funcionarioForm.get('cep').setValue(this.funcionario.pessoa.endereco.cep);
      this.funcionarioForm.get('logradouro').setValue(this.funcionario.pessoa.endereco.logradouro);
      this.funcionarioForm.get('numero').setValue(this.funcionario.pessoa.endereco.numero);
      this.funcionarioForm.get('complemento').setValue(this.funcionario.pessoa.endereco.complemento);
      this.funcionarioForm.get('bairro').setValue(this.funcionario.pessoa.endereco.bairro);
      this.funcionarioForm.get('cidade').setValue(this.funcionario.pessoa.endereco.cidade);
      this.funcionarioForm.get('estado').setValue(this.funcionario.pessoa.endereco.cidade);

      this.loader.stopBackground();
    });

    this.funcionarioForm = this.formBuilder.group({
      formacao: [''], area: [''], nome: [''], cpf: [''], dataNascimento: [''], sexo: [''], pai: [''], mae: [''], email: [''],
      telefone: [''], celular: [''], cep: [''], logradouro: [''], numero: [''], complemento: [''],
      bairro: [''], cidade: [''], estado: ['']
    });

  }

  editar() {
    this.loader.startBackground();

    this.funcionario.area = this.funcionarioForm.get('area').value;
    this.funcionario.formacao = this.funcionarioForm.get('formacao').value;
    this.funcionario.pessoa.nome = this.funcionarioForm.get('nome').value;
    this.funcionario.pessoa.cpf = this.funcionarioForm.get('cpf').value;
    this.funcionario.pessoa.dataNascimento = this.funcionarioForm.get('dataNascimento').value;
    this.funcionario.pessoa.sexo = this.funcionarioForm.get('sexo').value;
    this.funcionario.pessoa.pai = this.funcionarioForm.get('pai').value;
    this.funcionario.pessoa.mae = this.funcionarioForm.get('mae').value;
    this.funcionario.pessoa.email = this.funcionarioForm.get('email').value;
    this.funcionario.pessoa.telefone = this.funcionarioForm.get('telefone').value;
    this.funcionario.pessoa.celular = this.funcionarioForm.get('celular').value;
    this.funcionario.pessoa.endereco.cep = this.funcionarioForm.get('cep').value;
    this.funcionario.pessoa.endereco.logradouro = this.funcionarioForm.get('logradouro').value;
    this.funcionario.pessoa.endereco.numero = this.funcionarioForm.get('numero').value;
    this.funcionario.pessoa.endereco.complemento = this.funcionarioForm.get('complemento').value;
    this.funcionario.pessoa.endereco.bairro = this.funcionarioForm.get('bairro').value;
    this.funcionario.pessoa.endereco.cidade = this.funcionarioForm.get('cidade').value;
    this.funcionario.pessoa.endereco.estado = this.funcionarioForm.get('estado').value;

    this.funcionarioService.atualizar(this.funcionario).subscribe(
      res => {
        this.router.navigate(['/home/funcionario']);
        this.toastr.success('Funcionario ' + res.codigo + ' - ' + res.pessoa.nome + ' editado com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao editar funcionario: ' + err.error.message);
        this.loader.stopBackground();
      }
    );
  }

}
