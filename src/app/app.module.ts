import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BuscarclienteComponent } from './components/buscarcliente/buscarcliente.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import {FormsModule} from "@angular/forms";
import { HomeComponent } from './components/home/home.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import { ServicioComponent } from './components/servicio/servicio.component';
import { FichaComponent } from './components/ficha/ficha.component';
import { ModificarfichaComponent } from './components/ficha/modificarficha/modificarficha.component';
import { NuevafichaComponent } from './components/ficha/nuevaficha/nuevaficha.component';
import { ReservaComponent } from './components/reserva/reserva.component';


@NgModule({
  declarations: [
    AppComponent,
    BuscarclienteComponent,
    LoginComponent,
    HomeComponent,
    ReporteComponent,
    ServicioComponent,
    FichaComponent,
    ModificarfichaComponent,
    NuevafichaComponent,
    ReservaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
