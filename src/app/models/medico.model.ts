import { Hospital } from "./hospital.model";
import { Usuario } from "./usuario.models"

interface _MedicoUser
{
  _id:string;
  nombre:string;
  img:string;
}
export class Medico{
  nombre:string;
  _id?:string;
  img?:string;
  //usuario?:Usuario;
  usuario:_MedicoUser; 
  hospital?:Hospital;
}
