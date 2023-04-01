import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.models';

const base_url=environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {


  public tipo:string;
  public id?:string;
  public img:string;
  private _ocultarModal=true;
  private _notificarUpload=new EventEmitter<any>();
  constructor() {         
  }

  get ocultarModal()
  {        
    return this._ocultarModal;
  }
  get notificarUpload():EventEmitter<any>
  {
    return this._notificarUpload;
  }

  abrirModal(tipo:'usuarios'|'medicos'|'hospitales',
              id?:string,
              img:string='no-image')
  { 
    //tenemos que construir la url  
    this._ocultarModal=false;
    this.tipo=tipo;
    this.id=id;    
    if(img.includes('https'))
    {
      console.log('aki deberia entrar solo google');
      this.img=img;
    }else{
      //localhost:3005/api/upload/usuarios/44d61cc4-bf21-4fe1-9165-dc58d407b112.jpg
      this.img=`${base_url}/upload/${tipo}/${img}`;      
    }
    console.log('imagen desde el modal:'+img);  
  }

  cerrarModal(){
    return this._ocultarModal=true;
  }
}
