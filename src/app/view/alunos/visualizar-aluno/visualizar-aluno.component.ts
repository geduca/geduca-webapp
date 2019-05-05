import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Aluno } from 'src/app/model/Aluno';
import { Pessoa } from 'src/app/model/Pessoa';
import { AlunoService } from 'src/app/service/aluno.service';

@Component({
  selector: 'app-visualizar-aluno',
  templateUrl: './visualizar-aluno.component.html'
})
export class VisualizarAlunoComponent implements OnInit {

  aluno: Aluno;
  pessoa: Pessoa;

  constructor(
    private alunoService: AlunoService,
    private activatedRoute: ActivatedRoute,
    private loader: NgxUiLoaderService
  ) { }

  ngOnInit() {
    const codigo = this.activatedRoute.snapshot.params.codigo;
    this.alunoService.buscaPeloCodigo(codigo).subscribe(res => {
      this.loader.startBackground();
      this.aluno = res;
      this.loader.stopBackground();
    });
  }

  isAtivo(status: boolean) {
    return status === true ? 'Ativo' : 'Desativado';
  }

}
