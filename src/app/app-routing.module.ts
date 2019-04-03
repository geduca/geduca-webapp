import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './core/views/pagina-nao-encontrada.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './security/login/login.component';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'pagina-nao-encontrada', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
