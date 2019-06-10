import { CriarEstoqueComponent } from './criar-estoque/criar-estoque.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CoreModule } from 'src/app/core/core.module';

import { EstoqueRoutingModule } from './estoque-routing.module';
import { EstoqueComponent } from './estoque/estoque.component';


@NgModule({
  declarations: [
    EstoqueComponent,
    CriarEstoqueComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EstoqueRoutingModule,
    NgxDatatableModule,
    TooltipModule,
    CoreModule
  ],
  exports: [],
  providers: [],
})
export class EstoqueModule { }
