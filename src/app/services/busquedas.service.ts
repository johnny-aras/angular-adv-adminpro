import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pipe } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';
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
  transformarHospitales(registros:any[]):Hospital[]
  {    
    return registros;
  }
  transformarMedicos(registros:any[]):Medico[]
  {    
    return registros;
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
                  switch (tipo) {
                    case 'usuarios':
                      return this.transformarUsuarios(resp.resultados);
                      break;
                  
                    case 'hospitales':
                      return this.transformarHospitales(resp.resultados);
                      break;
                    case 'medicos':
                      return this.transformarMedicos(resp.resultados);
                      break;
                    default:
                      return [];
                  }
                 //resp.resultados
                })
            );
  }
  


}


