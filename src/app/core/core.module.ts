import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

import { AuthGuard } from './guards/auth.guard';
import { DateBrPipe } from './pipes/date-br.pipe';
import { AuthInterceptService } from './services/auth-intercept.service';
import { AuthService } from './services/auth.service';
import { AcessoNegadoComponent } from './views/acesso-negado.component';
import { PaginaNaoEncontradaComponent } from './views/pagina-nao-encontrada.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [
    PaginaNaoEncontradaComponent,
    AcessoNegadoComponent,
    DateBrPipe
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
  exports: [DateBrPipe],
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
