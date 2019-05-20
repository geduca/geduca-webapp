import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ProdutosComponent } from './produto/produto.component';
import { ProdutoRoutingModule } from './produto-routing.module';
import { CriarProdutoComponent } from './criar-produto/criar-produto.component';
import { EditarProdutoComponent } from './editar-produto/editar-produto.component';

@NgModule({
  declarations: [
    ProdutosComponent,
    CriarProdutoComponent,
    EditarProdutoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProdutoRoutingModule,
    NgxDatatableModule,
  ],
  exports: [],
  providers: [],
})
export class ProdutoModule { }
