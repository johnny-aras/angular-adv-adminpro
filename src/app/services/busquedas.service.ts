import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pipe } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.models';

const base_url=environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http:HttpClient) { }

  get token():string
  { 
    return localStorage.getItem('token') || '';
  }
 
  get headers(){
    return { 
      headers:{
        'x-token':this.token
      }
    }
  }

  transformarUsuarios(registros:any[]):Usuario[]
  {
    const resultado=registros.map(user => new Usuario(user.nombre,user.email,'',user.img,user.role,user.google,user.uid))
    return resultado;
  }

  //ruta: localhost:3005/api/todo/coleccion/usuarios/e 
  buscar(tipo:'usuarios'|'medicos'|'hospitales',
        termino:string='')
  {
    
    const url=`${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url,this.headers)
            .pipe(
              //map((resp:{ok:boolean,resultados:Usuario[]}) =>{
                map((resp:any) =>{
                 return this.transformarUsuarios(resp.resultados);
                 //resp.resultados
                })
            );
  }



}


