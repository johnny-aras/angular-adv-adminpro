import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.models';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent implements OnInit {
  
  constructor(private modalImagenService:ModalImagenService,
              private fileUploadService:FileUploadService) {                 
              }

  public imagenSubir:File;
  public imgTemp:any;  
  
  ngOnInit(): void {

  }

  cerrarModal(){
    this.imgTemp=null;
    this.modalImagenService.cerrarModal();
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
    this.fileUploadService.actualizarFoto(this.imagenSubir,'usuarios',this.modalImagenService.id||'')
    .then(imagen => {
      this.cerrarModal();      
      const resp= {id:this.modalImagenService.id,imagen:imagen};
      this.modalImagenService.notificarUpload.emit(resp);
      //this.usuario.img=imagen;
      Swal.fire('Imagen subida con exito!',`La imagen: ${imagen} se ha subido correctamente`,'success');
      //reseteando el boton de subir
      //this.imagenSubir=undefined;
      //console.log(`esta e sl a imagen ps: ${imagen}`);
      //console.log(this.usuario);            
    }).catch(err => {
      console.log('errorsango'+err);      
      Swal.fire('Error',err.error.msg,'error');
    });
  }

  getImagen()
  {
    return this.modalImagenService.img;
  }
  getEstado()
  {
    return this.modalImagenService.ocultarModal;
  }
}
