import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usuarioService:UsuarioService,
              private router:Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      //console.log('Paso por el canActivate');
      /*this.usuarioService.validarToken().subscribe(resp =>{
          console.log(resp);          
      });*/
    return this.usuarioService.validarToken()
                .pipe(
                  tap(estaAutenticado =>{                    
                    if(!estaAutenticado)
                    {
                      this.router.navigateByUrl("/login");
                    }
                  })
                );
  }
  
}
