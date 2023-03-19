import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';

import { catchError, map, of, tap, throwError } from 'rxjs';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare const  google:any;


const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient,
              private router:Router,
              private ngZone:NgZone) { }

  //urlEndPoint:string = `localhost:3005/api/usuarios`

  /*
  //implemnentacion opcional para probar mas adelante
  crearUsuario(usuario:Usuario):Observable<Usuario>
  {
    return this.http.post<Usuario>(this.urlEndPoint,Usuario);
  }*/

  logout()
  {
    localStorage.removeItem('token');
    google.accounts.id.revoke('roberto.roberto.rtrt@gmail.com',()=>{      
      this.ngZone.run(()=>{        
        this.router.navigateByUrl("/login");
      })
    })
  }

  validarToken()
  {
    const token= localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token':token
      }
    }).pipe(
      tap((resp:any) => {
        localStorage.setItem('token',resp.token);
      }),
      map( resp =>true),
      catchError(error=> of(false))
        //this.router.navigateByUrl("/login");
        //throwError(()=>error);        
        //return of(false);
      //})      
      
    );
//    return of(true);
  }

  crearUsuario(formData:RegisterForm){
    
    return this.http.post(`${base_url}/usuarios`,formData)
                    .pipe(
                    tap((resp:any) => {                        
                    localStorage.setItem('token',resp.token)
                    })      
                    );
  }

  login(formData:LoginForm){    
    return this.http.post(`${base_url}/login`,formData)
                    .pipe(
                      tap((resp:any) => {                        
                        localStorage.setItem('token',resp.token)
                      })
                    );
  }
  loginGoogle(token:string){
    return this.http.post(`${base_url}/login/google`,{token})
                    .pipe(
                      tap((resp:any) => {                        
                        localStorage.setItem('token',resp.token)
                      })
                    )
  }

}
