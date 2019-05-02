import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AlunosRoutingModule } from './alunos-routing.module';
import { AlunosComponent } from './alunos/alunos.component';
import { CriarAlunoComponent } from './criar-aluno/criar-aluno.component';
import { EditarAlunoComponent } from './editar-aluno/editar-aluno.component';

@NgModule({
  declarations: [
    AlunosComponent,
    CriarAlunoComponent,
    EditarAlunoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AlunosRoutingModule,
    NgxDatatableModule,
  ],
  exports: [],
  providers: [],
})
export class AlunosModule { }
