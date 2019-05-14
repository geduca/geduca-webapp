import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { AcessoNegadoComponent } from './core/views/acesso-negado.component';
import { PaginaNaoEncontradaComponent } from './core/views/pagina-nao-encontrada.component';
import { LoginComponent } from './security/login/login.component';
import { HomeComponent } from './view/home/home.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
      {
        path: 'aluno',
        loadChildren: './view/aluno/aluno.module#AlunoModule'
      },
      {
        path: 'curso',
        loadChildren: './view/curso/curso.module#CursoModule'
      },
      {
        path: 'restricao-alimentar',
        loadChildren: './view/restricao-alimentar/restricao-alimentar.module#RestricaoAlimentarModule'
      },
      {
        path: 'fornecedor',
        loadChildren: './view/fornecedor/fornecedor.module#FornecedorModule'
      }
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
