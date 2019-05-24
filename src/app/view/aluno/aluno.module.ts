import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxViacepModule } from '@brunoc/ngx-viacep';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { AlunoRestricaoAlimentarComponent } from './aluno-restricao-alimentar/aluno-restricao-alimentar.component';
import { AlunoRoutingModule } from './aluno-routing.module';
import { AlunosComponent } from './alunos/alunos.component';
import { CriarAlunoComponent } from './criar-aluno/criar-aluno.component';
import { EditarAlunoComponent } from './editar-aluno/editar-aluno.component';
import { VisualizarAlunoComponent } from './visualizar-aluno/visualizar-aluno.component';

@NgModule({
  declarations: [
    AlunosComponent,
    CriarAlunoComponent,
    EditarAlunoComponent,
    VisualizarAlunoComponent,
    AlunoRestricaoAlimentarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlunoRoutingModule,
    NgxDatatableModule,
    TooltipModule,
    NgxViacepModule
  ],
  exports: [],
  providers: [],
})
export class AlunoModule { }
