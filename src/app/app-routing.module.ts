import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";

import { FichaComponent } from './components/ficha/ficha.component';
import { ReporteComponent } from './components/reporte/reporte.component';

import { ReservaComponent } from './components/reserva/reserva.component';

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
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
