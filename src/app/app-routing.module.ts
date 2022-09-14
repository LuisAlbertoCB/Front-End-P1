import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";

import { FichaComponent } from './components/ficha/ficha.component';
import { ReporteComponent } from './components/reporte/reporte.component';

import { ReservaComponent } from './components/reserva/reserva.component';

import { NuevoServicioComponent } from './components/servicio/nuevo-servicio/nuevo-servicio.component';
import { ServicioComponent } from './components/servicio/servicio.component';
import { VerServicioComponent } from './components/servicio/ver-servicio/ver-servicio.component';
import { AgregarDetalleComponent } from './components/servicio/agregar-detalle/agregar-detalle.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "reporte",
    component: ReporteComponent
  },
  {
    path: "reserva",
    component: ReservaComponent
  },
  {
    path: "servicio",
    component: ServicioComponent
  },
  {
    path: "servicio/nuevo",
    component: NuevoServicioComponent
  },
  {
    path: "servicio/:id/ver",
    component: VerServicioComponent
  },
  {
    path: "servicio/:id/detalle",
    component: AgregarDetalleComponent
  },
  {
    path: "reporte",
    component: ReporteComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
