import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';


const base_url=environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class HospitalService {


  hospitales:Hospital[];
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

  cargarHospitales():Observable<Hospital[]>
{  
  const url=`${base_url}/hospitales`;
   return this.http.get(url,this.headers)
                    .pipe(
                      //map((resp:any)=> resp.hospitales)
                      map( (resp:any)  => resp.hospitales )                      
                    );   
}
crearHospital(nombre:string)
{  
    //ruta:localhost:3005/api/hospitales/
  const url=`${base_url}/hospitales`;
   return this.http.post(url,{nombre},this.headers);                  
}

actualizarHospital(_id:string='',nombre:string)
{  
    //ruta:localhost:3005/api/hospitales/6410dc57b93459bfd35fd9f7
  const url=`${base_url}/hospitales/${_id}`;
  console.log(url);
  
   return this.http.put(url,{nombre},this.headers);                  
}

eliminarHospital(id:string='')
{  
  //ruta:localhost:3005/api/hospitales/64123cf65a401434efa9b090
  const url=`${base_url}/hospitales/${id}`;
   return this.http.delete(url,this.headers);                  
}

}
