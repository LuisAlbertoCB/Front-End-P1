//Modulos
import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';


//modelos
import {Persona,listaPersonas } from '../models/persona';

import { dominio } from '../url_API';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private api_url: string = dominio + "stock-nutrinatalia/persona";

  constructor( private http: HttpClient ) { }
  
  get_AllPersona():Observable<listaPersonas> {
    return this.http.get<listaPersonas>(this.api_url);
  }

  get_Usuarios():Observable<listaPersonas> {
    let parametros = new HttpParams()
    .set('ejemplo', '{"soloUsuariosDelSistema": true}')
    return this.http.get<listaPersonas>(this.api_url,{params:parametros});
    }

  get_Empleados(filtros: any,itemsPerPage: number,inicio: number): Observable<listaPersonas> {
    let parametros = new HttpParams()
    .set('like','S')
    .set('ejemplo', `{"nombre": "${filtros.nombre}", "apellido": "${filtros.apellido}","soloUsuariosDelSistema": true}`)
    .set('cantidad',itemsPerPage)
    .set('inicio',inicio)

    return this.http.get<listaPersonas>(this.api_url,{params:parametros});
  }

  get_Clientes(filtros: any,itemsPerPage: number, inicio: number): Observable<listaPersonas>{
    let parametros = new HttpParams()
    .set('like','S')
    .set('ejemplo', `{"nombre": "${filtros.nombre}", "apellido": "${filtros.apellido}"}`)
    .set('cantidad',itemsPerPage)
    .set('inicio',inicio)
    return this.http.get<listaPersonas>(this.api_url,{params:parametros}); 
  }

  }



