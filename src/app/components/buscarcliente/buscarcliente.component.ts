import { Component, OnInit, Output, EventEmitter } from '@angular/core';



import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-buscarcliente',
  templateUrl: './buscarcliente.component.html',
  styleUrls: ['./buscarcliente.component.css']
})
export class BuscarclienteComponent implements OnInit {

  nombre: string = "";
  apellido: string = "";

  public data: Persona[] = [];
  public columns = ["Nombres","Apellidos","Email","Telefono","Ruc","Cedula","Fecha de Nacimiento","Seleccionar"];

  config = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 1,
    id: 'paginationCliente'
}

  filtros = {
    nombre : "",
    apellido: ""
  }

  next = "Siguiente"
  back = "Anterior"



  @Output() seleccionarClienteEvent = new EventEmitter<Persona>()
  constructor(private servicePersona: PersonaService) {
  }

  ngOnInit(): void {
  }


  getClientes(){
    let currentPage = this.config.currentPage;
    let itemsPerPage = this.config.itemsPerPage;
    let inicio = currentPage-1;
    inicio = inicio*itemsPerPage;
    this.servicePersona.get_Clientes(this.filtros,itemsPerPage,inicio)
    .subscribe((data:any)=>{
        console.log(data);
        this.config.totalItems=data.totalDatos;
        this.data = data.lista;
    });
  }


  buscar(){
    this.filtros.nombre = this.nombre
    this.filtros.apellido = this.apellido
    this.config.currentPage = 1
    this.getClientes()
  }

  pageChanged(event: number) : void{
    setTimeout(() => {
      this.config.currentPage = event;

  }, 3);
  this.getClientes()
  }


  seleccionarCliente(cliente: Persona){
    this.seleccionarClienteEvent.emit(cliente)
  }



}
