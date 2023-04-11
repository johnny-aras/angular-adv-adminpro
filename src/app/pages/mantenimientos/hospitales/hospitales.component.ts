import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, map, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { BusquedasService } from "../../../services/busquedas.service";

import { environment } from 'src/environments/environment';

const base_url=environment.base_url;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit,OnDestroy{

  public hospitales:Hospital[];
  public hospitalesTemp:Hospital[];
  public UrlEndPoint:string;
  public cargando=true;
  public total=0;
  private imgSubs:Subscription;
  constructor(private hospitalService:HospitalService,
              private modalImagenService:ModalImagenService,
              private busquedasService:BusquedasService ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargandoHospitales();
    this.imgSubs=this.modalImagenService.notificarUpload
    .pipe(
      delay(500)
    )  
    .subscribe(respuesta => {
      this.hospitales=this.hospitales.map(hospital =>
        {
          if(hospital._id===respuesta.id)
          {
            hospital.img=respuesta.imagen;
            console.log(respuesta.imagen);            
          }
          return hospital;
        })
        
      // this.cargandoHospitales();
    })
    
  }
  buscarHospital(valor:string)
  {                  
      if(valor.length ===0 )
      {            
        //this.hospitales=this.hospitalesTemp;
        //return;
        //2nd option
        return this.cargandoHospitales();                  
          
      }    
        this.busquedasService.buscar('hospitales',valor)
          .subscribe((resp:any) =>{
            console.log(resp);
            this.hospitales=resp; 
            //this.usuarios=this.transformarUsuarios(resp);
          });             
  }
  cargandoHospitales()
  {
    this.hospitalService.cargarHospitales().subscribe((hospitales)=>{
      this.hospitales=hospitales;      
      this.hospitalesTemp=hospitales;   
      this.total=hospitales.length;
      
      this.cargando=false;
    });
  }
  ImgUrl(img='')
  {
    if(img)
    {
      return `${base_url}/upload/hospitales/${img}`;
    }else{
      return `${base_url}/upload/hospitales/no-img`;
    }
  }

  guardarCambios(hospital:Hospital)
  {
    console.log(hospital);    
    this.hospitalService.actualizarHospital(hospital._id,hospital.nombre)
                          .subscribe(respuesta=>
                              console.log(respuesta)
                              );
    Swal.fire('Actualizado',hospital.nombre,'success');
  }
   EliminarHospital(hospital:Hospital)
  {    
    /*this.hospitalService.eliminarHospital(hospital._id)
                          .subscribe(respuesta=>
                              console.log(respuesta)
                              );
    this.cargandoHospitales();*/
    Swal.fire({
      title: 'Esta seguro que desea eliminar?',
      text: "Se eliminara el hospital permanentemente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!'
    }).then((result) =>{
      if (result.isConfirmed) {        
        this.hospitalService.eliminarHospital(hospital._id).subscribe(resp=>{
          //console.log(resp);
          this.hospitales=this.hospitales.filter(hosp => hosp._id!=hospital._id);
          this.cargandoHospitales();
          return Swal.fire('Hospital eliminado con exito',`El hospital: ${hospital.nombre} fue eliminado`,'success');
        })        
      }
    })
//    Swal.fire('Hospital Borrado',hospital.nombre,'success');
  }
  async abrirCrearHospital()
  {
    const {value=''} = await Swal.fire<string>({

      title:'Crear Hospital',
      text:'Ingrese el nombre del nuevo Hospital',
      input: 'text',      
      inputPlaceholder: 'Nombre del Hospital',
      showCancelButton:true      
    })           
    //esta validacion es lo mismo que en el template
    //si quiero mostrar algo del cliente por ej tengo que validar el cliente y recien la condicion
    //*ngIf(cliente?&&cliente.items.length>0)
    //otra implementacion que es correcta para el caso de undefined en tipo string
    //if((value !==undefined) && (value.trim().length>0))
    if(value.trim().length>0)
    {      
      this.hospitalService.crearHospital(value)
                          .subscribe((respuesta:any)=>{
                            console.log(respuesta);
                            //this.cargandoHospitales();                            
                            this.hospitales.push(respuesta.hospital)
                          });
    }                    
  }

  abrirModal(hospital:Hospital)
  {
    this.modalImagenService.abrirModal('hospitales',hospital._id,hospital.img);
  }  
}
