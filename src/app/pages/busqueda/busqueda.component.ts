import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { Usuario } from 'src/app/models/usuario.models';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  usuarios:Usuario[]=[];
  medicos:Medico[]=[];
  hospitales:Hospital[]=[];

  constructor(private activatedRoute:ActivatedRoute,
              private busquedaService:BusquedasService,
              private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({termino}) => {
      if(termino)
      {
        this.cargarContenidos(termino);        
      }
      console.log(termino);      
    })
  }
  cargarContenidos(termino:string)
  {
    this.busquedaService.busquedaTotal(termino)                        
                        .subscribe((respuesta:any) => {
                        this.usuarios=respuesta.usuarios;
                        this.hospitales=respuesta.hospitales;
                        this.medicos=respuesta.medicos;
    });
  
  }
  mostrarMedico(id:string='')
  {
    this.router.navigateByUrl(`/dashboard/medico/${id}`);
  }

}
