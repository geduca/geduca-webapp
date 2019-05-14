import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Turma } from 'src/app/model/Turma';
import { TurmaService } from 'src/app/service/turma.service';


@Component({
  selector: 'app-editar-turma',
  templateUrl: './editar-turma.component.html'
})
export class EditarTurmaComponent implements OnInit {

  turma: Turma;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private turmaService: TurmaService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loader: NgxUiLoaderService,
  ) { }

  ngOnInit() {
    const codigo = this.activatedRoute.snapshot.params.codigo;
    this.turmaService.buscaPeloCodigo(codigo).subscribe(res => {
      this.loader.startBackground();
      this.turma = res;
      this.form.get('nome').setValue(this.turma.nome);
      //this.form.get('descricao').setValue(this.curso.descricao);
      this.form.get('ativo').setValue(this.turma.ativo);
      this.loader.stopBackground();
    });
    this.form = this.formBuilder.group({
      nome: [''], descricao: [''], ativo: ['']
    });

  }

  editar() {
    this.loader.startBackground();
    this.turma.nome = this.form.get('nome').value;
    // this.turma.descricao = this.form.get('descricao').value;
    this.turma.ativo = this.form.get('ativo').value;
    this.turmaService.atualizar(this.turma).subscribe(
      res => {
        this.router.navigate(['/home/turma']);
        this.toastr.success('Turma ' + res.codigo + ' - ' + res.nome + ' editado com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao editar turma: ' + err.error.message);
        this.loader.stopBackground();
      }
    );
  }

}
