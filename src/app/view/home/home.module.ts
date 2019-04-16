import { AlunosComponent } from './../alunos/alunos.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppFooterModule, AppHeaderModule, AppSidebarModule } from '@coreui/angular';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { CoreModule } from './../../core/core.module';
import { SecurityModule } from './../../security/security.module';
import { HomeComponent } from './home.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    AlunosComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    CoreModule,
    SecurityModule,
    AppRoutingModule,
    AppHeaderModule,
    AppSidebarModule,
    AppFooterModule,
    BsDropdownModule
  ]
})
export class HomeModule { }
