import { Injectable } from '@angular/core';
import { listadatos } from '../models/datos';
import { Reserva, ReservaPostBody, ReservaPutBody } from '../models/reserva';
import { base_url } from '../base_url';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Persona } from '../models/persona';




@Injectable({
  providedIn: 'root'
})
export class ReservaService {



  api = base_url+'';

  constructor(private http: HttpClient) { }

  getReservas(filtros: any): Observable<listadatos<Reserva>> {
    //console.log(filtros);
    let ejemplo: any = { }
    if (filtros.idEmpleado) {
      ejemplo["idEmpleado"] = { "idPersona": filtros.idEmpleado}
    }
    if (filtros.idCliente) {
      ejemplo["idCliente"] = { "idPersona": filtros.idCliente }
    }
    if (filtros.fechaDesde) {
      ejemplo["fechaDesdeCadena"] = filtros.fechaDesde.split('-').join('').toString();
      console.log('FEcha desde cadeana :' ,ejemplo.fechaDesdeCadena );
    }
    if (filtros.fechaHasta) {
      ejemplo["fechaHastaCadena"] = filtros.fechaHasta.split('-').join('').toString();
    }
    //ejemplo['flagEstado'] = "R";
    //console.log('los datos del filtro',JSON.stringify(ejemplo));
    let params = new HttpParams()
      //.set('cantidad', itemsPerPage)
      //.set('inicio', inicio)
      .set('', JSON.stringify(ejemplo));

    console.log('el ejemplo es : ', ejemplo);
    let urlCodificado =this.api + "?ejemplo" +encodeURIComponent(JSON.stringify(ejemplo));
    //retornar una url codificada
    console.log('Usando solo params : ',`${this.api}stock-nutrinatalia/reserva?ejemplo${params}`);
    //const data_gated=  this.http.get<listadatos<Reserva>>(`${this.api}stock-nutrinatalia/reserva?ejemplo${urlCodificado}`);
    //return data_gated  ;

    //let listaBruta =this.http.get<listadatos<Reserva>>(this.api, {params:params})


    return this.http.get<listadatos<Reserva>>(`${this.api}stock-nutrinatalia/reserva?ejemplo`, {params:params})

  }

  postReserva(reserva: ReservaPostBody): Observable<Reserva> {
    console.log('Agregando reserva' + JSON.stringify(reserva));
    return this.http.post<Reserva>(`${this.api}stock-nutrinatalia/reserva`, reserva, {
      headers: {
        "usuario": localStorage.getItem('userSession') as string,
      }
    });
  }

/*
  cancelarReserva(idReserva: number): Observable<void> {
    console.log('Se cancela Reserva: ',`${this.api}stock-nutrinatalia/reserva/${idReserva}`)
    return this.http.delete<void>(`${this.api}stock-nutrinatalia/reserva/${idReserva}`, {
      headers: {
        "usuario": localStorage.getItem('userSession') as string,
      }
    });
  }*/

  cancelarReserva(idReserva: number): Observable<void> {
    console.log('Se cancela Reserva: ',`${this.api}stock-nutrinatalia/reserva/${idReserva}`);
    return this.http.delete<void>(`${this.api}stock-nutrinatalia/reserva/${idReserva}`);
  }
  

  getAgenda(idPersona: number, fecha: string, itemsPerPage: number, inicio: number): Observable<Reserva[]> {

    let params = new HttpParams()
      //.set('cantidad', itemsPerPage)
      //.set('inicio', inicio)
      .set('fecha', fecha)
      .set('disponible', 'S');

    let urlCodificado =encodeURIComponent(params.toString());
    //console.log('Obteniendo agenda: ',`${this.api}stock-nutrinatalia/persona/${idPersona}/agenda?${params.toString()}`);

    return this.http.get<Reserva[]>(`${this.api}stock-nutrinatalia/persona/${idPersona}/agenda?`,{params});
  }

  getReserva(idReserva: number): Observable<Reserva> {
    console.log('Obteniendo reserva: ',`${this.api}stock-nutrinatalia/reserva/${idReserva}`);
    return this.http.get<Reserva>(`${this.api}stock-nutrinatalia/reserva/${idReserva}`);
  }

  modificarReserva(reserva: ReservaPutBody): Observable<void> {
    console.log('Modificando reserva: ',`${this.api}stock-nutrinatalia/reserva/${reserva.idReserva}`);
   
    return this.http.put<void>(`${this.api}stock-nutrinatalia/reserva`, reserva);
  }
}
