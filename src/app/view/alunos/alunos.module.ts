import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { CriarAlunoComponent } from './aluno/criar-aluno.component';
import { AlunosRoutingModule } from './alunos-routing.module';
import { AlunosComponent } from './alunos/alunos.component';

@NgModule({
  declarations: [
    AlunosComponent,
    CriarAlunoComponent
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
