import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

import { AuthInterceptService } from './service/auth-intercept.service';
import { AuthService } from './service/auth.service';
import { MoneyHttpService } from './service/money-http.service';
import { AcessoNegadoComponent } from './view/acesso-negado.component';
import { PaginaNaoEncontradaComponent } from './view/pagina-nao-encontrada.component';
import { AuthGuard } from './guard/auth.guard';

export function tokenGetter() {
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [
    PaginaNaoEncontradaComponent,
    AcessoNegadoComponent
  ],
  imports: [
    CommonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: environment.tokenWhitelistedDomains,
        blacklistedRoutes: environment.tokenBlacklistedRoutes,
        skipWhenExpired: true
      }
    })
  ],
  exports: [],
  providers: [
    AuthService,
    AuthInterceptService,
    MoneyHttpService,
    AuthGuard
  ]
})
export class CoreModule { }
