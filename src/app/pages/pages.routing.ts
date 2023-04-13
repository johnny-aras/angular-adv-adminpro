import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';
 
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

//Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';

  const routes: Routes = [  
  {   path:'dashboard',
      component:PagesComponent,
      canActivate:[AuthGuard],
      children:[    
        {path:'', component:DashboardComponent,data:{titulo:'Dashboard'}},
        {path:'account-settings',component:AccountSettingsComponent,data:{titulo:'Ajustes de Cuenta:'}},
        {path:'buscar/:termino',component:BusquedaComponent,data:{titulo:'Busqueda Total:'}},
        {path:'grafica1',component:Grafica1Component,data:{titulo:'Grafica #1'}},
        {path:'perfil',component:PerfilComponent,data:{titulo:'Perfil'}},
        {path:'progress',component:ProgressComponent,data:{titulo:'ProgressBar'}},
        {path:'promesas',component:PromesasComponent,data:{titulo:'Promesas'}},
        {path:'rxjs',component:RxjsComponent,data:{titulo:'RxJs'}},
        //{path:'',redirectTo:'/dashboard',pathMatch:'full'}

        //RUTAS DE ADMIN
        {path:'usuarios',canActivate:[AdminGuard],component:UsuariosComponent,data:{titulo:'Mantenimiento de usuarios '}},

        //MANTENIMIENTOS:
        {path:'hospitales',component:HospitalesComponent,data:{titulo:'Mantenimiento de hospitales'}},
        {path:'medicos',component:MedicosComponent,data:{titulo:'Mantenimiento de medicos'}},
        {path:'medico/:id',component:MedicoComponent,data:{titulo:'Mantenimiento de medicos'}}
      ]

  }
]

  @NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
  })
  export class PagesRoutingModule { }      