import { Component, OnInit } from '@angular/core';
import { listadatos } from 'src/app/models/datos';
import { Persona } from 'src/app/models/persona';
import { Reserva } from "src/app/models/reserva";
import { ReservaService } from 'src/app/services/reserva.service';

type Filtro = {
  fechaDesde?: string,
  fechaHasta?: string,
  idEmpleado?: number,
  idCliente?: number,
};

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  public listaDeReservasCompleto: Reserva[] = [];
  public listaDeReservas: Reserva[] = [];




  public columns = ["Fecha", "Hora inicio", "Hora fin", "Profesional", "Cliente", "Acciones"];
  config = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 1
  }

  next = "Siguiente"
  back = "Anterior"
  empleado: Persona = new Persona();
  cliente: Persona = new Persona();
  filtros: Filtro = {};


  constructor(private reservaService: ReservaService) {
    const today = new Date();
    const todayString = `${today.getFullYear()}-${today.getMonth() < 9 ? '0' : ''}${today.getMonth() + 1}-${today.getDate() <= 9 ? '0' : ''}${today.getDate()}`;
    this.filtros.fechaDesde = todayString;
    this.filtros.fechaHasta = todayString;
  }

  ngOnInit(): void {
    this.getAll();
  }


  getAll() {
    this.reservaService.getReservas(this.filtros)
      .subscribe((data: listadatos<Reserva>) => {
        this.listaDeReservasCompleto = data.lista;
        this.listaDeReservas=this.listaDeReservasCompleto;
        this.config.totalItems = this.listaDeReservas.length;
      });

  }


  getReservas() {
    let currentPage = this.config.currentPage;
    let itemsPerPage = this.config.itemsPerPage;

    let inicio = currentPage - 1;
    inicio = inicio * itemsPerPage;

    this.reservaService.getReservas(this.filtros)
      .subscribe((data: listadatos<Reserva>) => {
        this.listaDeReservas = this.pvFiltrar(data);
        this.config.totalItems = this.listaDeReservas.length;

      });
  }

  pvFiltrar(data: listadatos<Reserva>) {
    let aux = data.lista
    if (this.filtros.idCliente) {
      aux = aux.filter((obj) => {
        return this.filtros.idCliente === obj.idCliente.idPersona;
      })
    }

    if (this.filtros.idEmpleado) {
      aux = aux.filter((obj) => {
        return this.filtros.idEmpleado === obj.idEmpleado.idPersona;
      })
    }

    if (this.filtros.fechaDesde) {
      aux = aux.filter((obj) => {
        let f_desde: Date = new Date();
        let f_fecha = new Date(obj.fecha);
        if (this.filtros.fechaDesde != undefined) {
          f_desde = new Date(this.filtros.fechaDesde);
        }
        return f_fecha >= f_desde;
      })
    }

    if (this.filtros.fechaHasta) {

      aux = aux.filter((obj) => {
        let f_hasta = new Date();
        let f_fecha = new Date(obj.fecha);

        if (this.filtros.fechaHasta != undefined) {
          f_hasta = new Date(this.filtros.fechaHasta);
        }

        return f_fecha <= f_hasta;
      })
    }

    return aux;

  }

  cancelarReserva(reserva: Reserva) {
    this.reservaService.cancelarReserva(reserva.idReserva)
      .subscribe((data: any) => console.log(`Reserva ${reserva.idReserva} cancelada!`));
    this.getReservas();
  }

  pageChanged(event: number) {
    this.config.currentPage = event;//1
    let currentPage = this.config.currentPage;//1
    let itemsPerPage = this.config.itemsPerPage;//10

    let inicio = currentPage - 1;//0
    inicio = inicio * itemsPerPage;//0

    this.listaDeReservas=this.listaDeReservasCompleto;

    this.listaDeReservas=this.listaDeReservas.slice(inicio,inicio+this.config.itemsPerPage);
    //this.getReservas()

  }

  seleccionarEmpleado(empleado: Persona) {
    this.empleado = empleado
    this.empleado.fullName = empleado.nombre + " " + empleado.apellido;
  }

  seleccionarCliente(cliente: Persona) {
    this.cliente = cliente
    this.cliente.fullName = cliente.nombre + " " + cliente.apellido;
  }

  buscar(): void {
    this.config.currentPage = 1;
    this.filtros.idCliente = this.cliente.idPersona;
    this.filtros.idEmpleado = this.empleado.idPersona;

    this.getReservas();
  }
}

