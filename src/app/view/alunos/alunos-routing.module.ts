import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';

import { AlunosComponent } from './alunos/alunos.component';
import { CriarAlunoComponent } from './criar-aluno/criar-aluno.component';
import { EditarAlunoComponent } from './editar-aluno/editar-aluno.component';

const routes: Routes = [
  { path: '', component: AlunosComponent, canActivate: [AuthGuard] },
  { path: 'novo', component: CriarAlunoComponent, canActivate: [AuthGuard] },
  { path: 'editar/:codigo', component: EditarAlunoComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlunosRoutingModule { }
