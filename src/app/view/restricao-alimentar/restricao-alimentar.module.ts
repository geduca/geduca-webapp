import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { CriarRestricaoAlimentarComponent } from './criar-restricao-alimentar/criar-restricao-alimentar.component';
import { EditarRestricaoAlimentarComponent } from './editar-restricao-alimentar/editar-restricao-alimentar.component';
import { RestricaoAlimentarRoutingModule } from './restricao-alimentar-routing.module';
import { RestricoesAlimentaresComponent } from './restricoes-alimentares/restricoes-alimentares.component';
import {
  VisualizarRestricaoAlimentarComponent,
} from './visualizar-restricao-alimentar/visualizar-restricao-alimentar.component';

@NgModule({
  declarations: [
    RestricoesAlimentaresComponent,
    CriarRestricaoAlimentarComponent,
    EditarRestricaoAlimentarComponent,
    VisualizarRestricaoAlimentarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RestricaoAlimentarRoutingModule,
    NgxDatatableModule,
    TooltipModule
  ],
  exports: [],
  providers: [],
})
export class RestricaoAlimentarModule { }
