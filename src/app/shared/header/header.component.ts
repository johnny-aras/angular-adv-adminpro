import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.models';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})

export class HeaderComponent implements OnInit {

  public imgUrl:string;
  public usuario:Usuario;
  
  constructor(private usuarioService:UsuarioService,
              private router:Router) { 
    //EN ESTA INSTRUCCION ESTAMOS ACTUALIZANDO LA REFERENCIA DE LA IMAGEN PERO NO EL ATRIBUTO DEL USUARIO
    //this.imgUrl = this.usuarioService.usuario.imagenUrl;
    
    //this.img = usuarioService.usuario.img as string;
    this.usuario=usuarioService.usuario;
    console.log(this.usuario?.imagenUrl);
    
    
  }

  ngOnInit(): void {
  }

  logout()
  {
    this.usuarioService.logout();
  }
  buscar(termino:string)
  {
    if(termino.length===0)
    {
      this.router.navigateByUrl("/dashboard");
    }
    //console.log('pasa x aki');
    
    if(termino){
      this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
    }
    //console.log(termino);    
  }

}
