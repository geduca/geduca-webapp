import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppFooterModule, AppHeaderModule, AppSidebarModule } from '@coreui/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './home/home.component';
import { SecurityModule } from './security/security.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    SecurityModule,
    AppHeaderModule,
    AppSidebarModule,
    AppFooterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
