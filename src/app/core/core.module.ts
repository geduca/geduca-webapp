import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

import { AuthService } from './auth.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [PaginaNaoEncontradaComponent],
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
    AuthService
  ]
})
export class CoreModule { }
