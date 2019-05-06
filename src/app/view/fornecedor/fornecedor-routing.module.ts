import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';

import { FornecedoresComponent } from './fornecedor/fornecedor.component';
import { CriarFornecedorComponent } from './criar-fornecedor/criar-fornecedor.component';
// import { EditarAlunoComponent } from './editar-aluno/editar-aluno.component';

const routes: Routes = [
  { path: '', component: FornecedoresComponent, canActivate: [AuthGuard] },
  { path: 'novo', component: CriarFornecedorComponent, canActivate: [AuthGuard] },
//   { path: 'editar/:codigo', component: EditarAlunoComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FornecedorRoutingModule { }
