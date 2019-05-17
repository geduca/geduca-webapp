import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { CriarRegistroNutricionalComponent } from './criar-registro-nutricional/criar-registro-nutricional.component';
import { EditarRegistroNutricionalComponent } from './editar-registro-nutricional/editar-registro-nutricional.component';
import { RegistroNutricionalRoutingModule } from './registro-nutricional-routing.module';
import { RegistrosNutricionaisComponent } from './registros-nutricionais/registros-nutricionais.component';


@NgModule({
  declarations: [
    RegistrosNutricionaisComponent,
    CriarRegistroNutricionalComponent,
    EditarRegistroNutricionalComponent
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
