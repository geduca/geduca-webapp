import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Aluno } from 'src/app/model/Aluno';
import { Turma } from 'src/app/model/Turma';
import { TurmaAluno } from 'src/app/model/TurmaAluno';
import { AlunoService } from 'src/app/service/aluno.service';

import { TurmaAlunoService } from './../../../service/turma-aluno.service';
import { TurmaService } from './../../../service/turma.service';




@Component({
  selector: 'app-turma-aluno',
  templateUrl: './turma-aluno.component.html'
})
export class TurmaAlunoComponent implements OnInit {

  modalRef: BsModalRef;
  form: FormGroup;

  turma: Turma;
  alunos: TurmaAluno[];
  alunosDisponiveis: Aluno[];

  constructor(
    private turmaAlunoService: TurmaAlunoService,
    private alunoService: AlunoService,
    private turmaService: TurmaService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute,
    private loader: NgxUiLoaderService,
    private toast: ToastrService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({ alunos: [''] });

    const codigo = this.activatedRoute.snapshot.params.codigo;

    this.loader.startBackground();

    this.turmaService.buscaPeloCodigo(codigo).subscribe(res => {
      this.turma = res;
      // restricoes do aluno
      this.turmaAlunoService.buscaPorTurma(this.turma.codigo).subscribe(resp => {
        this.alunos = resp;
      }, err => {
        this.toast.error('Erro ao carregar alunos da turma : ' + err.error.message);
      });
      // restricoes disponiveis
      this.alunoService.listaTodos().subscribe(response => {
        this.alunosDisponiveis = response;
      }, err => {
        this.toast.error('Erro ao carregar alunos disponíveis: ' + err.error.message);
      });

      this.loader.stopBackground();
    }, err => {
      this.toast.error('Erro ao carregar Aluno: ' + err.error.message);
      this.loader.stopBackground();
    });

    this.loader.stopBackground();
  }

  isAtivo(status: boolean) {
    if (status === true) { return 'Ativo'; } else if (status === false) { return 'Desativado'; }
  }

  isSimNao(valor: boolean) {
    if (valor === true) { return 'Sim'; } else if (valor === false) { return 'Não'; }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalRef.hide();
  }

  // adicionarRestricoes() {
  //   const restricoesAdicionadas: RestricaoAlimentar[] = this.form.get('restricaoAlimentar').value;
  //   console.log(restricoesAdicionadas);
  //   if (restricoesAdicionadas.length > 0) {
  //     this.loader.startBackground();
  //     this.alunoRestricaoAlimentarService.criar(restricoesAdicionadas, this.aluno.codigo).subscribe(res => {
  //       this.alunoRestricaoAlimentarService.buscaPorAluno(this.aluno.codigo).subscribe(resp => {
  //         this.restricoes = resp;
  //         this.closeModal();
  //       }, err => {
  //         this.toast.error('Erro ao carregar Restrições alimentares: ' + err.error.message);
  //       });
  //       this.toast.success('Restrições adicionadas com sucesso!');
  //       this.loader.stopBackground();
  //     }, err => {
  //       this.toast.error('Erro ao adicionar restrições alimentares: ' + err.error.message);
  //       this.loader.stopBackground();
  //     });
  //   }
  // }

  // removerRestricao(restricao: RestricaoAlimentar) {
  //   this.loader.startBackground();
  //   this.alunoRestricaoAlimentarService.remover(restricao.codigo).subscribe(res => {
  //     this.alunoRestricaoAlimentarService.buscaPorAluno(this.aluno.codigo).subscribe(resp => {
  //       this.restricoes = resp;
  //     }, err => {
  //       this.toast.error('Erro ao carregar Restrições alimentares: ' + err.error.message);
  //     });
  //     this.toast.success('Restricao removida com sucesso!');
  //     this.loader.stopBackground();
  //   }, err => {
  //     this.toast.error('Erro ao remover restrições alimentares: ' + err.error.message);
  //     this.loader.stopBackground();
  //   });
  // }

}
