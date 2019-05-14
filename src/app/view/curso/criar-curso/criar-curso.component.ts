import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Curso } from 'src/app/model/Curso';

import { CursoService } from './../../../service/curso.service';

@Component({
  selector: 'app-criar-curso',
  templateUrl: './criar-curso.component.html'
})
export class CriarCursoComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cursoService: CursoService,
    private toastr: ToastrService,
    private router: Router,
    private loader: NgxUiLoaderService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nome: [''], descricao: ['']
    });
  }

  cadastrar() {
    this.loader.startBackground();

    const curso = new Curso();

    curso.nome = this.form.get('nome').value;
    curso.descricao = this.form.get('descricao').value;


    this.cursoService.criar(curso).subscribe(
      res => {
        this.router.navigate(['/home/curso']);
        this.toastr.success('Curso ' + res.codigo + ' - ' + res.nome + ' criado com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao criar curso: ' + err.error.message);
        this.loader.stopBackground();
      }
    );
  }
}
