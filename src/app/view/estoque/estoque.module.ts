import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { CriarEstoqueComponent } from './criar-estoque/criar-estoque.component';
import { EditarEstoqueComponent } from './editar-estoque/editar-estoque.component';
import { EstoqueProdutoComponent } from './estoque-produto/estoque-produto.component';
import { EstoqueRoutingModule } from './estoque-routing.module';
import { EstoqueComponent } from './estoque/estoque.component';
import { VisualizarEstoqueComponent } from './visualizar-estoque/visualizar-estoque.component';
import { CoreModule } from 'src/app/core/core.module';


@NgModule({
  declarations: [
    EstoqueComponent,
    CriarEstoqueComponent,
    EditarEstoqueComponent,
    VisualizarEstoqueComponent,
    EstoqueProdutoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EstoqueRoutingModule,
    NgxDatatableModule,
    CoreModule,
    TooltipModule
  ],
  exports: [],
  providers: [],
})
export class EstoqueModule { }
