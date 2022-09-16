import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { Ficha } from 'src/app/models/fichas';
import { Persona } from 'src/app/models/persona';
import { Subcategoria } from 'src/app/models/subcategoria';
import { ServicecategoriaService } from 'src/app/services/categoria.service';
import { ServicefichaService } from 'src/app/services/ficha.service';
import { ServicetipoproductoService } from 'src/app/services/tipoproducto.service';



type Filtro = {
  fechaDesde ?: string,
  fechaHasta?: string,
  idEmpleado?: number,
  idCliente?: number,
  idCategoria?: number,
  idTipoProducto?: number,
};
@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit {

  public data: Ficha[] = [];
  public columns = ["Fecha","Profesional","Cliente","Categoria","Subcategoria","Editar"];
  config = {
    id: "paginationFicha",
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 1
  }

  next = "Siguiente"
  back = "Anterior"
  categorias: Categoria [] = []
  tipoProductos: Subcategoria[] = []

  fulltiposProductos: Subcategoria[] = []
 
  empleado : Persona = new Persona()
  cliente : Persona = new Persona()
  categoria: Categoria = new Categoria()
  tipoProducto: Subcategoria = new Subcategoria()
  filtros: Filtro = {};
  constructor(private http: HttpClient, 
              private servicioFicha: ServicefichaService,
              private serviceCategoria: ServicecategoriaService,
              private serviceTipoProducto: ServicetipoproductoService
          ) { }

  ngOnInit(){
    this.getCategorias()
    this.get_All_subcategories()
  }

  //Este metodo no toma en cuenta la categorias que tomes

  getFichas(){
    let currentPage = this.config.currentPage;
    let itemsPerPage = this.config.itemsPerPage;
    let inicio = currentPage-1;
    inicio = inicio*itemsPerPage;
    this.servicioFicha.getfichas(this.filtros,itemsPerPage,inicio)
      .subscribe((data:any)=>{
        this.data = data.lista;
        this.config.totalItems=data.totalDatos;
      });
  }

  pageChanged(event: number){
    this.config.currentPage = event;
    this.getFichas()
  }

  buscar(): void{
    this.config.currentPage = 1
    this.filtros.idTipoProducto = this.tipoProducto.idTipoProducto
    this.filtros.idCliente = this.cliente.idPersona
    this.filtros.idEmpleado = this.empleado.idPersona

    this.getFichas()
  }
  seleccionarEmpleado(empleado: Persona){
    this.empleado = empleado
    this.empleado.fullName = empleado.nombre + " " + empleado.apellido;
  }

  seleccionarCliente(cliente: Persona){
    this.cliente = cliente
    this.cliente.fullName = cliente.nombre + " " + cliente.apellido;
  }
  getCategorias(){
    this.serviceCategoria.getCategorias().subscribe((data:any)=>{
      this.categorias = data.lista;
    })
  }

  getTipoProductos(){
    this.serviceTipoProducto.getTipoProductos(this.categoria.idCategoria)
    .subscribe((data:any)=>{
      this.tipoProductos = data.lista
    })
  }




//Codigo nuevo para hacer funcionar Tipos Productos

  get_All_subcategories(){
    this.serviceTipoProducto.get_AllTipos()
    .subscribe((data:any)=>{
      this.tipoProductos = data.lista
      this.fulltiposProductos=this.tipoProductos
    })
  }


  filtrar_subcategorias(id_categoria:number){
    this.tipoProductos=this.fulltiposProductos;
    this.tipoProductos=this.tipoProductos.filter((obj) => {
      return id_categoria === obj.idCategoria.idCategoria;
    })

  }




}

