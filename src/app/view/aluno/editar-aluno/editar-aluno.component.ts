import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Aluno } from 'src/app/model/Aluno';
import { AlunoService } from 'src/app/service/aluno.service';

@Component({
  selector: 'app-editar-aluno',
  templateUrl: './editar-aluno.component.html'
})
export class EditarAlunoComponent implements OnInit {

  aluno: Aluno;
  alunoForm: FormGroup;
  modalRef: BsModalRef;

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
      this.alunoForm.get('cartaoSus').setValue(this.aluno.fichaSaude.cartaoSus);
      this.alunoForm.get('tipoSanguineo').setValue(this.aluno.fichaSaude.tipoSanguineo);
      this.alunoForm.get('doenca').setValue(this.aluno.fichaSaude.doenca);
      this.alunoForm.get('doencaDescricao').setValue(this.aluno.fichaSaude.doencaDescricao);
      this.alunoForm.get('medicamento').setValue(this.aluno.fichaSaude.medicamento);
      this.alunoForm.get('medicamentoDescricao').setValue(this.aluno.fichaSaude.medicamentoDescricao);
      this.alunoForm.get('suplemento').setValue(this.aluno.fichaSaude.suplemento);
      this.alunoForm.get('suplementoDescricao').setValue(this.aluno.fichaSaude.suplementoDescricao);
      this.alunoForm.get('deficiencia').setValue(this.aluno.fichaSaude.deficiencia);
      this.alunoForm.get('deficienciaDescricao').setValue(this.aluno.fichaSaude.deficienciaDescricao);
      this.alunoForm.get('alergia').setValue(this.aluno.fichaSaude.alergia);
      this.alunoForm.get('alergiaDescricao').setValue(this.aluno.fichaSaude.alergiaDescricao);
      this.alunoForm.get('intolerancia').setValue(this.aluno.fichaSaude.intolerancia);
      this.alunoForm.get('intoleranciaDescricao').setValue(this.aluno.fichaSaude.intoleranciaDescricao);

      this.loader.stopBackground();
    });
    this.alunoForm = this.formBuilder.group({
      ativo: [''], nome: [''], cpf: [''], dataNascimento: [''], sexo: [''], pai: [''], mae: [''],
      email: [''], telefone: [''], celular: [''], cep: [''], logradouro: [''], numero: [''], complemento: [''],
      bairro: [''], cidade: [''], estado: [''], cartaoSus: [''], doenca: [''], tipoSanguineo: [''],
      doencaDescricao: [''], medicamento: [''], medicamentoDescricao: [''], suplemento: [''],
      suplementoDescricao: [''], deficiencia: [''], deficienciaDescricao: [''], alergia: [''],
      alergiaDescricao: [''], intolerancia: [''], intoleranciaDescricao: ['']
    });

  }

  editar() {
    this.loader.startBackground();

    this.aluno.pessoa.nome = this.alunoForm.get('nome').value;
    this.aluno.pessoa.cpf = this.alunoForm.get('cpf').value;
    this.aluno.pessoa.dataNascimento = this.alunoForm.get('dataNascimento').value;
    this.aluno.pessoa.sexo = this.alunoForm.get('sexo').value;
    this.aluno.pessoa.pai = this.alunoForm.get('pai').value;
    this.aluno.pessoa.mae = this.alunoForm.get('mae').value;
    this.aluno.pessoa.email = this.alunoForm.get('email').value;
    this.aluno.pessoa.telefone = this.alunoForm.get('telefone').value;
    this.aluno.pessoa.celular = this.alunoForm.get('celular').value;
    this.aluno.pessoa.endereco.cep = this.alunoForm.get('cep').value;
    this.aluno.pessoa.endereco.logradouro = this.alunoForm.get('logradouro').value;
    this.aluno.pessoa.endereco.numero = this.alunoForm.get('numero').value;
    this.aluno.pessoa.endereco.complemento = this.alunoForm.get('complemento').value;
    this.aluno.pessoa.endereco.bairro = this.alunoForm.get('bairro').value;
    this.aluno.pessoa.endereco.cidade = this.alunoForm.get('cidade').value;
    this.aluno.pessoa.endereco.estado = this.alunoForm.get('estado').value;
    this.aluno.fichaSaude.cartaoSus = this.alunoForm.get('cartaoSus').value;
    this.aluno.fichaSaude.tipoSanguineo = this.alunoForm.get('tipoSanguineo').value;
    this.aluno.fichaSaude.doenca = this.alunoForm.get('doenca').value;
    this.aluno.fichaSaude.doencaDescricao = this.alunoForm.get('doencaDescricao').value;
    this.aluno.fichaSaude.medicamento = this.alunoForm.get('medicamento').value;
    this.aluno.fichaSaude.medicamentoDescricao = this.alunoForm.get('medicamentoDescricao').value;
    this.aluno.fichaSaude.suplemento = this.alunoForm.get('suplemento').value;
    this.aluno.fichaSaude.suplementoDescricao = this.alunoForm.get('suplementoDescricao').value;
    this.aluno.fichaSaude.deficiencia = this.alunoForm.get('deficiencia').value;
    this.aluno.fichaSaude.deficienciaDescricao = this.alunoForm.get('deficienciaDescricao').value;
    this.aluno.fichaSaude.alergia = this.alunoForm.get('alergia').value;
    this.aluno.fichaSaude.alergiaDescricao = this.alunoForm.get('alergiaDescricao').value;
    this.aluno.fichaSaude.intolerancia = this.alunoForm.get('intolerancia').value;
    this.aluno.fichaSaude.intoleranciaDescricao = this.alunoForm.get('intoleranciaDescricao').value;

    this.alunoService.atualizar(this.aluno).subscribe(
      res => {
        this.router.navigate(['/home/aluno']);
        this.toastr.success('Aluno ' + res.codigo + ' - ' + res.pessoa.nome + ' editado com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao editar aluno: ' + err.error.message);
        this.loader.stopBackground();
      }
    );
  }

}
