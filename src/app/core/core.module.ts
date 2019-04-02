import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [],
  providers: [
    JwtHelper,
    AuthService
  ]
})
export class CoreModule { }
