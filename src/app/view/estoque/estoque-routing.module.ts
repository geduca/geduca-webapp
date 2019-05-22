import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

import { CriarEstoqueComponent } from './criar-estoque/criar-estoque.component';
import { EditarEstoqueComponent } from './editar-estoque/editar-estoque.component';
import { EstoqueProdutoComponent } from './estoque-produto/estoque-produto.component';
import { EstoqueComponent } from './estoque/estoque.component';
import { VisualizarEstoqueComponent } from './visualizar-estoque/visualizar-estoque.component';

const routes: Routes = [
  { path: '', component: EstoqueComponent, canActivate: [AuthGuard] },
  { path: 'novo', component: CriarEstoqueComponent, canActivate: [AuthGuard] },
  { path: 'editar/:codigo', component: EditarEstoqueComponent, canActivate: [AuthGuard] },
  { path: 'visualizar/:codigo', component: VisualizarEstoqueComponent, canActivate: [AuthGuard] },
  { path: 'produtos/:codigo', component: EstoqueProdutoComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstoqueRoutingModule { }
