import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { CriarCursoComponent } from './criar-curso/criar-curso.component';
import { CursoRoutingModule } from './curso-routing.module';
import { CursosComponent } from './cursos/cursos.component';
import { EditarCursoComponent } from './editar-curso/editar-curso.component';
import { VisualizarCursoComponent } from './visualizar-curso/visualizar-curso.component';

@NgModule({
  declarations: [
    CursosComponent,
    CriarCursoComponent,
    EditarCursoComponent,
    VisualizarCursoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CursoRoutingModule,
    NgxDatatableModule,
    TooltipModule
  ],
  exports: [],
  providers: [],
})
export class CursoModule { }
