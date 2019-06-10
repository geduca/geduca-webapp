import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

import { EstoqueComponent } from './estoque/estoque.component';
import { CriarEstoqueComponent } from './criar-estoque/criar-estoque.component';


const routes: Routes = [
  { path: '', component: EstoqueComponent, canActivate: [AuthGuard] },
  { path: 'novo', component: CriarEstoqueComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstoqueRoutingModule { }
