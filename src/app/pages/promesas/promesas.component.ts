import { Component, OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/auth/login/login.component';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsuarios().then(usuarios => {
      console.log(usuarios);
      
    });
    /*this.getUsuarios().then( usuarios => {
      console.log(usuarios);      
    });*/
    /*const promesa = new Promise((resolve,reject)=>{
      if(false){
      resolve('hi WOrld');  
      }else{
      reject('Somethin went wrong');
      }
    });
    promesa.then( (mensaje)=>{
        console.log(mensaje);       
    })
    .catch(error =>console.log('Error en la promesa',error));
    console.log('FIn del init');    */
  }

  getUsuarios(){
    return new Promise( resolve => {
      fetch('https://reqres.in/api/users')                
        .then( resp => resp.json())        
        .then( body => resolve( body.data));
    });
  }

}
