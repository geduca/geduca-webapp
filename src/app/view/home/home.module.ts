import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppFooterModule, AppHeaderModule, AppSidebarModule } from '@coreui/angular';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { CriarAlunoComponent } from '../alunos/aluno/criar-aluno.component';
import { AlunosComponent } from '../alunos/alunos/alunos.component';
import { CoreModule } from './../../core/core.module';
import { SecurityModule } from './../../security/security.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent,
    AlunosComponent,
    CriarAlunoComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CoreModule,
    SecurityModule,
    AppRoutingModule,
    AppHeaderModule,
    AppSidebarModule,
    AppFooterModule,
    BsDropdownModule,
    NgxDatatableModule
  ]
})
export class HomeModule { }
