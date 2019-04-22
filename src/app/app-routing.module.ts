import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guard/auth.guard';
import { AcessoNegadoComponent } from './core/view/acesso-negado.component';
import { PaginaNaoEncontradaComponent } from './core/view/pagina-nao-encontrada.component';
import { LoginComponent } from './security/login/login.component';
import { AlunoComponent } from './view/alunos/aluno/aluno.component';
import { AlunosComponent } from './view/alunos/alunos/alunos.component';
import { HomeComponent } from './view/home/home.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
      { path: 'alunos', component: AlunosComponent, canActivate: [AuthGuard] },
      { path: 'aluno', component: AlunoComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'acesso-negado', component: AcessoNegadoComponent, canActivate: [AuthGuard] },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'pagina-nao-encontrada', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
