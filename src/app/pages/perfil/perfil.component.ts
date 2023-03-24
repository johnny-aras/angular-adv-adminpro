import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from "@angular/forms";

import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import { Usuario } from 'src/app/models/usuario.models';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm:FormGroup;
  public usuario:Usuario;
  public imagenSubir:File;
  public imgTemp:any;  
  
  //nombre:string;
  //email:string;
      
  constructor(private usuarioService:UsuarioService,
              private fb:FormBuilder,
              private fileUploadService:FileUploadService
                            ) { 
    this.usuario=usuarioService.usuario;
    
    //ASIGNACION AKI PARA QUE SE RELLENEN LOS CAMPOS QUE TENEMOS EN EL FORMULARIO 
    //ESTO DE LA FORMA CON EN NGMODEL Y EL NAME
    //this.nombre=this.usuario?.nombre as string;
    //this.email=this.usuario?.email as string;
  }

  ngOnInit(): void {
    this.perfilForm=this.fb.group({
        nombre:[this.usuario.nombre,Validators.required],
        email:[this.usuario.email,[Validators.required,Validators.email]],
        password:[this.usuario.password,Validators.required],        
    });
    console.log(this.usuario);
    
  }

  actualizarPerfil()
  {
    //console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
    .subscribe((resp:any)=>{
      /*Primera opcion manejar datos del formulario*/ 
      const {email,nombre}=this.perfilForm.value;
      this.usuario.nombre=nombre;
      this.usuario.email=email;
      /*Segunda opcion manjear los datos qeu vienen del backend*/ 
      /*const {email, nombre}=resp.usuarioActualizado;
      const usuarioActualizado= new Usuario(nombre,email);
      this.usuario.nombre=usuarioActualizado.nombre;
      this.usuario.email=usuarioActualizado.email;*/

      /*Tercera forma de extrar los campos que vienen del backend
      const nombre=JSON.stringify(resp.usuarioActualizado.nombre);
      const email=JSON.stringify(resp.usuarioActualizado.email);
      this.usuario.nombre=nombre;
      this.usuario.email=email;
      */
      Swal.fire('Actualizacion Exitosa!',`Se ha actualizado el usuario: ${this.usuario.nombre}`,'success');


      //const {email,nombre}= this.perfilForm.value;
      /*const {email, nombre} = resp.usuarioActualizado:any;
      this.usuario.nombre=nombre;
      this.usuario.email=email;*/
      //this.locales=resp.JSON.parse();
      //const {nombre}= resp.usuarioActualizado.nombre;
      //const {email}= resp.usuarioActualizado.email;
      //this.usuario.nombre=nombre;
      //this.usuario.email=email;
      //this.ok=resp['ok'];
      //this.usuarioActualizado=resp['usuarioActualizado'];
      //CON EL METODO STRINGIFY SE CONVIERTE UN OBJETO JS A CADENA DE TIPO JSON
      //CON EL METODO JSON.PARSE() CONVERTIMOS UN JSON(en cadena-un string) A UN OBJETO JS DE TIPO JSON
    //console.log(JSON.stringify(resp.usuarioActualizado.nombre));
    
      
      
      
        
      
      //this.usuario.nombre=(resp.usuarioActualizado:Usuario);
      //console.log(resp);      
    },error=>{
      Swal.fire('Se produjo un error',error.error.msg,'error');
    });
  }

  cambiarImagen(event:any)
  {
    console.log(event);
    
    this.imagenSubir=event.target.files[0];
    if(!this.imagenSubir)
    {
       return this.imgTemp=null;
    }
    const reader=new FileReader();
    const url64= reader.readAsDataURL(this.imagenSubir);

    reader.onloadend= ()=>{
      this.imgTemp=reader.result;      
      //console.log(reader.result);      
    }
    return true;
    //console.log(this.imagenSubir);            
  }

  subirImagen()
  {
    this.fileUploadService.actualizarFoto(this.imagenSubir as File,'usuarios',this.usuario.uid || '')
    .then(imagen => {
      this.usuario.img=imagen;
      Swal.fire('Imagen subida con exito!',`La imagen: ${imagen} se ha subido correctamente`,'success');
      //reseteando el boton de subir
      //this.imagenSubir=undefined;
      console.log(`esta e sl a imagen ps: ${imagen}`);
      console.log(this.usuario);            
    }).catch(err => {
      console.log('errorsango'+err);
      
      Swal.fire('Error',err.error.msg,'error');
    });
  }
  
}
