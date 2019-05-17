import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { RegistroNutricionalService } from '../../../service/registro-nutricional.service';
import { Aluno } from './../../../model/Aluno';
import { RegistroNutricional } from './../../../model/RegistroNutricional';
import { AlunoService } from './../../../service/aluno.service';


@Component({
  selector: 'app-criar-registro-nutricional',
  templateUrl: './criar-registro-nutricional.component.html'
})
export class CriarRegistroNutricionalComponent implements OnInit {

  form: FormGroup;
  codigoAluno: number;
  aluno: Aluno;

  constructor(
    private formBuilder: FormBuilder,
    private registroNutricionalService: RegistroNutricionalService,
    private alunoService: AlunoService,
    private activedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private loader: NgxUiLoaderService
  ) { }

  ngOnInit() {
    this.loader.startBackground();
    this.codigoAluno = this.activedRoute.snapshot.params.aluno;
    this.alunoService.buscaPeloCodigo(this.codigoAluno).subscribe(res => {
      this.aluno = res;
      this.loader.stopBackground();
    }, err => {
      this.toastr.error('Erro ao carregar Aluno: ' + err.error.message);
    });

    this.form = this.formBuilder.group({
      peso: [''], altura: ['']
    });
  }

  cadastrar() {
    this.loader.startBackground();

    const registro = new RegistroNutricional();

    registro.aluno.codigo = this.codigoAluno;
    registro.peso = this.form.get('peso').value;
    registro.altura = this.form.get('altura').value;


    this.registroNutricionalService.criar(registro).subscribe(
      res => {
        this.router.navigate(['/home/registro-nutricional/' + this.codigoAluno]);
        this.toastr.success('Registro Nutricional ' + res.codigo + ' criado com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao criar registro nutricional: ' + err.error.message);
        this.loader.stopBackground();
      }
    );
  }
}
