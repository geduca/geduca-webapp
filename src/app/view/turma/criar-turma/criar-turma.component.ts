import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Curso } from 'src/app/model/Curso';
import { Turma } from 'src/app/model/Turma';
import { CursoService } from 'src/app/service/curso.service';
import { TurmaService } from 'src/app/service/turma.service';

@Component({
  selector: 'app-criar-turma',
  templateUrl: './criar-turma.component.html'
})
export class CriarTurmaComponent implements OnInit {

  form: FormGroup;
  cursos: Curso[];

  constructor(
    private formBuilder: FormBuilder,
    private turmaService: TurmaService,
    private cursoService: CursoService,
    private toastr: ToastrService,
    private router: Router,
    private loader: NgxUiLoaderService
  ) { }

  ngOnInit() {
    this.loader.startBackground();
    this.cursoService.listaTodos().subscribe(res => {
      this.cursos = res;
      this.loader.stopBackground();
    }, err => {
      this.toastr.error('Erro ao carregar cursos: ' + err.error.message);
      this.loader.stopBackground();
    });

    this.form = this.formBuilder.group({
      nome: [''], sala: [''], curso: [''], periodo: [''], dataInicio: [''], dataFim: ['']
    });
  }

  cadastrar() {
    this.loader.startBackground();

    const turma = new Turma();
    const curso = new Curso();

    curso.codigo = this.form.get('curso').value;

    turma.nome = this.form.get('nome').value;
    turma.sala = this.form.get('sala').value;
    turma.periodo = this.form.get('periodo').value;
    turma.dataInicio = this.form.get('dataInicio').value;
    turma.dataFim = this.form.get('dataFim').value;
    turma.curso = curso;

    this.turmaService.criar(turma).subscribe(
      res => {
        this.router.navigate(['/home/turma']);
        this.toastr.success('Turma ' + res.codigo + ' - ' + res.nome + ' criada com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao criar turma: ' + err.error.message);
        this.loader.stopBackground();
      }
    );
  }
}
