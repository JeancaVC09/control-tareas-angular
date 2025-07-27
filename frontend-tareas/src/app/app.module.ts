import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    // agrega aquí tus componentes: LoginComponent, RegisterComponent, etc.
  ],
  imports: [
    BrowserModule,
    FormsModule,          // ✅ Para [(ngModel)]
    HttpClientModule,     // ✅ Para peticiones HTTP
    AppRoutingModule,
    RouterModule,         // ✅ Para routerLink y router-outlet
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
