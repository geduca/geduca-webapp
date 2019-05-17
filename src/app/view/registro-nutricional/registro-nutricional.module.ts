import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { CriarRegistroNutricionalComponent } from './criar-registro-nutricional/criar-registro-nutricional.component';
import { EditarRestricaoAlimentarComponent } from './editar-restricao-alimentar/editar-restricao-alimentar.component';
import { RegistroNutricionalRoutingModule } from './registro-nutricional-routing.module';
import { RegistrosNutricionaisComponent } from './registros-nutricionais/registros-nutricionais.component';


@NgModule({
  declarations: [
    RegistrosNutricionaisComponent,
    CriarRegistroNutricionalComponent,
    EditarRestricaoAlimentarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RegistroNutricionalRoutingModule,
    NgxDatatableModule,
    TooltipModule
  ],
  exports: [],
  providers: [],
})
export class RegistroNutricionalModule { }
