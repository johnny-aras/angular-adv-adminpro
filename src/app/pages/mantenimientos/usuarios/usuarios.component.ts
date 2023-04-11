import { Component, OnDestroy, OnInit } from '@angular/core';
import {Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.models';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit,OnDestroy {

  public imgSubs:Subscription;
  public totalUsuarios:number=0;
  public usuarios:Usuario[];
  public usuariosTemp:Usuario[];
  public desde:number=0;
  public cargando:boolean=true;  
  public currentUser:Usuario;

  constructor(private usuarioService:UsuarioService,
              private busquedasService:BusquedasService,
              private modalImagenService:ModalImagenService) {     
  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {

    this.cargarUsuarios();
    this.currentUser=this.usuarioService.usuario;
    this.imgSubs=this.modalImagenService.notificarUpload
                 .subscribe(({id,imagen}) => {
                  this.usuarios=this.usuarios.map( user => {
                      if(user.uid===id)
                      {
                        user.img=imagen;
                      }
                      return user;
                  })
                  //this.cargarUsuarios();
                });
  }

  cargarUsuarios(){
    this.cargando=true;
    //primera implementacion
    /*this.usuarioService.getUsuarios().subscribe( (resp:any)=>{
      console.log((resp.usuarios));    
      this.usuarios=resp.usuarios;
    });*/
    /*Segunda implementacion*/ 
    this.usuarioService.getUsuarios2(this.desde).subscribe( ({total,usuarios})=>{
        this.totalUsuarios=total;
        this.usuarios=usuarios;
        this.usuariosTemp=usuarios;
        this.cargando=false;
    });      
  }
  

  buscar(termino:string)
  {        

    if(termino.length ===0 )
    {            
      this.usuarios=this.usuariosTemp;
      return;
    }    
    this.busquedasService.buscar('usuarios',termino)
        .subscribe( (resp:any) =>{
          //console.log(resp);
          this.usuarios=resp; 
          //this.usuarios=this.transformarUsuarios(resp);
        });    
  } 

  eliminarUsuario(usuario:Usuario)
  {        
    if(usuario.uid===this.usuarioService.uid)
    {

     Swal.fire('Fatal Error','No puedes eliminarte a ti mismo','error');     
     return;
    }
    Swal.fire({
      title: 'Esta seguro que desea eliminar?',
      text: "Se eliminara al usuario permanentemente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!'
    }).then((result) =>{
      if (result.isConfirmed) {        
        this.usuarioService.eliminarUsuario(usuario).subscribe(resp=>{
          //console.log(resp);
          this.usuarios=this.usuarios.filter(user => user.uid!=usuario.uid);
          this.cargarUsuarios();
          return Swal.fire('Usuario eliminado con exito',`El usuario:${usuario.nombre} fue eliminado`,'success');
        })        
      }
    })
  }


  cambiarPagina(valor:number){
    this.desde+=valor;                  
    if(this.desde<0)
    {
      this.desde=0;
    }else if(this.desde>=this.totalUsuarios)
    {
      this.desde-=valor;
    }
    this.cargarUsuarios()
  }


  cambiarRole(usuario:Usuario){
    this.usuarioService.cambiarUsuario(usuario).subscribe(resp=>{
      console.log(resp);      
    });    
  }

  abrirModal(usuario:Usuario)
  {              
    //console.log(usuario);    
    this.modalImagenService.abrirModal('usuarios',usuario.uid,usuario.img);                
  }

}
