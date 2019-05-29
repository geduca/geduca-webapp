import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxMaskModule } from 'ngx-mask';

import { CriarFuncionarioComponent } from './criar-funcionario/criar-funcionario.component';
import { EditarFuncionarioComponent } from './editar-funcionario/editar-funcionario.component';
import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { VisualizarFuncionarioComponent } from './visualizar-funcionario/visualizar-funcionario.component';

@NgModule({
  declarations: [
    FuncionariosComponent,
    CriarFuncionarioComponent,
    EditarFuncionarioComponent,
    VisualizarFuncionarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FuncionarioRoutingModule,
    NgxDatatableModule,
    NgxMaskModule,
    TooltipModule
  ],
  exports: [],
  providers: [],
})
export class FuncionarioModule { }
