import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.model';

const base_url=environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http:HttpClient) { }

  get token()
  {
    return localStorage.getItem('token')||'';
  }
  get headers()
  {
    return {
      headers:{
      'x-token':this.token
      }
    }
  }

  //ruta:localhost:3005/api/medicos/
  cargarMedicos()
  {
    const url=`${base_url}/medicos`;
    return this.http.get(url,this.headers)
                .pipe(
                  //map( (resp: {ok:boolean,medicos:Medico[]} ) => resp.medicos)
                  map((resp:any) => resp.medicos)
                );

  }
  getMedicoById(id:string)
  {
    const url=`${base_url}/medicos/${id}`;
    return this.http.get(url,this.headers)
                .pipe(
                  map((resp:any) => resp.medico)
                );
  }

  crearMedico(medico:{nombre:string,id:string})
{  
    //ruta:localhost:3005/api/medicos/
  const url=`${base_url}/medicos`;
   return this.http.post(url,medico,this.headers);                  
}

actualizarMedico(medico:Medico)
{  
    //ruta:localhost:3005/api/medicos/641103d3681266bcadcc093a	
  const url=`${base_url}/medicos/${medico._id}`;
  //console.log(url);  
   return this.http.put(url,medico,this.headers);                  
}

eliminarMedico(id:string='')
{  
  //ruta:localhost:3005/api/medicos/64123d455a401434efa9b092
  const url=`${base_url}/medicos/${id}`;
   return this.http.delete(url,this.headers);                  
}


}
