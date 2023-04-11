import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, map, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { Medico } from 'src/app/models/medico.model';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit,OnDestroy {

  public imgSubs:Subscription;
  public medicos:Medico[];
  public cargando:boolean=true;
  constructor(private medicoService:MedicoService,
              private modalImagenService:ModalImagenService,
              private busquedaService:BusquedasService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs=this.modalImagenService.notificarUpload
    .pipe(
      delay(500)
    )
    .subscribe(respuesta => {

        this.cargarMedicos();
    });
  }
  buscar(termino:string)
  {
    if(termino.length===0)
    {
      return this.cargarMedicos();
    }
    this.busquedaService.buscar('medicos',termino)
    .subscribe((respuesta:any)=>{
      this.medicos=respuesta;
    });
  }
  cargarMedicos()
  {    
    this.medicoService.cargarMedicos().subscribe((respuesta:any)=>{
      this.cargando=false;
      this.medicos=respuesta;
      console.log(respuesta);
      
      //this.medicos=respuesta;
    });
  }
  abrirModal(medico:Medico)
  {
    this.modalImagenService.abrirModal('medicos',medico._id,medico.img);
  }
  eliminarMedico(medico:Medico)
  {

    Swal.fire({
      title: 'Esta seguro que desea eliminar?',
      text: "Se eliminara el hospital permanentemente",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!'
    }).then((result) =>{
      if (result.isConfirmed) {        
        this.medicoService.eliminarMedico(medico._id).subscribe(resp=>{
          //console.log(resp);
          this.medicos=this.medicos.filter(doctor => doctor._id!=medico._id);
          //this.cargarMedicos();
          return Swal.fire('Hospital eliminado con exito',`El hospital: ${medico.nombre} fue eliminado`,'success');
        })        
      }
    })

    
  }


}
