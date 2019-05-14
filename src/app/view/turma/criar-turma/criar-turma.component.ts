import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Turma } from 'src/app/model/Turma';
import { TurmaService } from 'src/app/service/turma.service';

@Component({
  selector: 'app-criar-turma',
  templateUrl: './criar-turma.component.html'
})
export class CriarTurmaComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private turmaService: TurmaService,
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

    const turma = new Turma();

    turma.nome = this.form.get('nome').value;
    // turma.descricao = this.form.get('descricao').value;


    this.turmaService.criar(turma).subscribe(
      res => {
        this.router.navigate(['/home/turma']);
        this.toastr.success('Turma ' + res.codigo + ' - ' + res.nome + ' criado com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao criar turma: ' + err.error.message);
        this.loader.stopBackground();
      }
    );
  }
}
