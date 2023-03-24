import { environment } from "src/environments/environment"



const base_url= environment.base_url;

export class Usuario{

constructor(
  public nombre:string,
  public email: string,
  public password?:string,
  public img?:string,
  public role?:string,
  public google?: boolean,
  public uid?:string
){}

 get imagenUrl()
 {
  //ruta
  //localhost:3005/api/upload/usuarios/6410e655973eab75b7d2bbcb
  if(this.img?.includes('https'))
  {
    return this.img;
  }
  if(this.img)
  {
    return `${base_url}/upload/usuarios/${this.img}`;
  }else {
    console.log('esta es la imagen en si: '+this.img);    
    return `${base_url}/upload/usuarios/no-image`;
  }
 }


}

