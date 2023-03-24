import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';

import { catchError, map, Observable, of, tap, throwError } from 'rxjs';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

import { Usuario } from '../models/usuario.models';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare const  google:any;


const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
      
  public usuario:Usuario;
  constructor(private http:HttpClient,
              private router:Router,
              private ngZone:NgZone) {                 
              }

  //urlEndPoint:string = `localhost:3005/api/usuarios`

  
  //implemnentacion opcional para probar mas adelante
  crearUsuarios(usuario:Usuario):Observable<Usuario>
  {
    return this.http.post<Usuario>(base_url,Usuario);
  }
  
  logout()
  {
    localStorage.removeItem('token');
    google.accounts.id.revoke('roberto.roberto.rtrt@gmail.com',()=>{      
      this.ngZone.run(()=>{        
        this.router.navigateByUrl("/login");
      })
    })
  }
  get token():string
  { 
    return localStorage.getItem('token') || '';
  }
  get uid(){
    return this.usuario?.uid || '';
  }

  validarToken()
  {
    let usuarios;
    //const token= localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token':this.token
      }
    }).pipe(
      map((resp:any) => {
        const {nombre, email, img='', role,google, uid }=resp.usuario;
        this.usuario = new Usuario(nombre, email,'', img, role, google ,uid);
        
        console.log('este es el usuario:'+this.usuario.img);
        //console.log(this.usuario.mostrarNombre());        
        localStorage.setItem('token',resp.token);        
        return true;
      }),
      //map( resp =>true),
      catchError(error=>
      {
        console.log(error);        
        return  of(false)
      }
      )
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
  actualizarPerfil(data:{email:string,nombre:string,password:string,role:string}){
    console.log('el role es:'+this.usuario?.role);
    data = {
      ...data,
      role:this.usuario?.role as string
    }
    
    
    return this.http.put(`${base_url}/usuarios/${this.uid}`,data,{
      headers:{
        'x-token':this.token
      }      
    });
}
  crearUsuario2(user:Usuario)
  {
    return this.http.post(`${base_url}/usuarios`,user);
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
