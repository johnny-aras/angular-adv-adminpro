import { Component, OnInit } from '@angular/core';
//import { MultiDataSet,Label} from 'ng2-charts';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {


  //data1:number[]=[];
  constructor() {          
    //this.data1= [150,250,500];
  }
  ngOnInit(): void {
  }  
  public labels1:string[] =['Cafeteria','Comercial','Mall-principal'];
  /*public data:MultiDataSet  = [
      [100,200,300],
  ];*/

  //this.titulo ="Sin titulo";
  

  

}
