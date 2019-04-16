import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CoreModule } from '../../core/core.module';
import { SecurityModule } from '../../security/security.module';
import { AlunosComponent } from './alunos.component';

@NgModule({
  declarations: [
    AlunosComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    CoreModule,
    SecurityModule
  ]
})
export class AlunosModule { }
