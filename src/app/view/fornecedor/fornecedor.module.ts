import { CriarFornecedorComponent } from './criar-fornecedor/criar-fornecedor.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { FornecedorRoutingModule } from './fornecedor-routing.module';
import { FornecedoresComponent } from './fornecedor/fornecedor.component';
// import { EditarAlunoComponent } from './editar-aluno/editar-aluno.component';

@NgModule({
  declarations: [
    FornecedoresComponent,
    CriarFornecedorComponent,
   //  EditarAlunoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FornecedorRoutingModule,
    NgxDatatableModule,
  ],
  exports: [],
  providers: [],
})
export class FornecedorModule { }
