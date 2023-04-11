import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';

import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoSeleccionado:Medico;
  public medicoForm:FormGroup;
  public hospitales:Hospital[]=[];
  public hospitalSeleccionado:Hospital;
  constructor(private fb:FormBuilder,
              private hospitalService:HospitalService,
              private medicoService:MedicoService,
              private router:Router,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({id}) => {
      //aqui se produce un error cuando el id===nuevo || id no es un id valido                  
        this.cargarMedico(id)      
    });

    /*this.activatedRoute.paramMap.subscribe(params => {
      console.log(params.get('id'));        
    });*/
    //this.medicoService.getMedicoById()

    this.cargarHospitales();
    this.medicoForm= this.fb.group({
      nombre:['',Validators.required],
      hospital:['',Validators.required]
    });
    this.medicoForm.get('hospital')?.valueChanges.subscribe( hospitalId => {
      //console.log(hospitalId);      
      this.hospitalSeleccionado=this.hospitales.find(hospital =>hospital._id===hospitalId) as Hospital;
    })
    
  }
  cargarMedico(id:string)
  {
    if(id!=='nuevo'){
      this.medicoService.getMedicoById(id)
      .pipe(
        delay(100)
      )
      .subscribe(medico => {        
        if(medico)
        {
          const {nombre,hospital:{_id}}= medico;
          //console.log(nombre,_id);
          this.medicoForm.setValue({nombre,hospital:_id});
          this.medicoSeleccionado=medico;                    
        }else if(!medico)
        {
          this.router.navigateByUrl("/dashboard/medicos");        
        }
      });
    }
    /*
    
				cargarMedico(id:string)
				  {
				    if(id==='nuevo')
				    {
				      return;
				    }
		
				    this.medicoService.getMedicoById(id).subscribe(medico => {
			
				      if(!medico)
				      {
				        this.router.navigateByUrl("/dashboard/medicos");
				        return;         
				      }
				      const {nombre,hospital:{_id}}= medico;
				      //console.log(nombre,_id);
					      this.medicoForm.setValue({nombre,hospital:_id});
				      this.medicoSeleccionado=medico;            
				    });
				  }	
    */ 
  }

  guardarMedico()
  {
    if(!this.medicoSeleccionado)
    {
      //crear medico
      const {nombre}=this.medicoForm.value;
      console.log(this.medicoForm.value);    
      const medico= this.medicoForm.value;
      this.medicoService.crearMedico(medico).subscribe((resp:any) => {
        console.log(resp );
        Swal.fire('Creado',`El medico ${nombre} se ha creado.`,'success');
        this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`)      
      });
    }else{
      //actualizar medico
      //podemos obtener el medico del formulario o de la respuesta
      //Y EL ID podemos obtener del atributo medicoSeleccionado
      const data={
        ...this.medicoForm.value,
        _id:this.medicoSeleccionado._id
      }
      //hacemos la llamada al api rest
      this.medicoService.actualizarMedico(data).subscribe( resp => {
        Swal.fire('Actualizado',`El medico ${data.nombre} se ha actualizado satisfactoriamente.`,'success');
        console.log(resp);        
      });
    }
  }  

  cargarHospitales()
  {
    this.hospitalService.cargarHospitales().subscribe(
      (hospitales:Hospital[]) =>{ 
        //console.log(hospitales)      
        this.hospitales=hospitales;
      }

    );
  }

}
