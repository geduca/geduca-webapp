import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

import { AuthGuard } from './guard/auth.guard';
import { AuthInterceptService } from './service/auth-intercept.service';
import { AuthService } from './service/auth.service';
import { AcessoNegadoComponent } from './view/acesso-negado.component';
import { PaginaNaoEncontradaComponent } from './view/pagina-nao-encontrada.component';

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
        skipWhenExpired: false
      }
    })
  ],
  exports: [],
  providers: [
    AuthService,
    AuthInterceptService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptService,
      multi: true
    }
  ]
})
export class CoreModule { }
