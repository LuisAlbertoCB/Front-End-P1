import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Persona } from 'src/app/models/persona';
import { PresentacionProducto } from 'src/app/models/presentacionProducto';
import { DetallePostBody, Servicio } from 'src/app/models/servicio';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-agregar-detalle',
  templateUrl: './agregar-detalle.component.html',
  styleUrls: ['./agregar-detalle.component.css']
})
export class AgregarDetalleComponent implements OnInit {

  servicio: Servicio = new Servicio();
  empleado: Persona = new Persona();
  cliente: Persona = new Persona();
  cantidad: number = 0;
  public presentacionProductos: PresentacionProducto[] = [];
  public presentacionProducto: PresentacionProducto = new PresentacionProducto();

  constructor(private route: ActivatedRoute, private servicioService: ServicioService) { }

  ngOnInit(): void {
    this.route.paramMap
    .subscribe( paramMap => {
      this.servicio.idServicio = parseInt(paramMap.get('id') ?? '');
      this.servicioService.getUnServicio(this.servicio.idServicio)
      .subscribe((data:any)=>{
        this.servicio = data;
        this.empleado = data.idEmpleado;
        this.cliente = data.idFichaClinica.idCliente;
        console.log(data)
      });
    });

    this.getPresentacionProducto();
  }

  agregarDetalle() {

    let detalleBody = new DetallePostBody();

    detalleBody.cantidad = this.cantidad;
    detalleBody.idPresentacionProducto = {
      idPresentacionProducto: this.presentacionProducto.idPresentacionProducto
    };
    detalleBody.idServicio = {
      idServicio: this.servicio.idServicio
    };

    this.servicioService.postDetalle(detalleBody, this.servicio.idServicio)
    .subscribe((data: Servicio) => console.log(JSON.stringify(data)));
  }

  getPresentacionProducto(){
    this.servicioService.getPresentacionProducto().subscribe((data:any)=>{
      this.presentacionProductos = data.lista;
      console.log(data.lista);
      console.log(("Holaaa"));
    })
  }

}

