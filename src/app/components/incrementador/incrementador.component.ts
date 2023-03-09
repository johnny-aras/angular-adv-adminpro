import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  //@Input('valor') progreso : number=30;
  @Input() progreso : number=30;
  @Input() btnClass:string = "btn btn-primary";
  //Este valor lo tenemos que emitir donde haya returns
  @Output() valorSalida : EventEmitter<number>= new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.btnClass=`btn ${this.btnClass}`;
  }
  
  get getProgreso(){
    return `${this.progreso}%`;
  }
  cambiarValor(valor:number)
  {
    if((this.progreso ==0 && valor<0)||(this.progreso==100 && valor>0))
    {
      this.valorSalida.emit(this.progreso);
      return this.progreso;    
    }
     
     this.progreso+=valor;
     this.valorSalida.emit(this.progreso);          
     return this.progreso;
  }


}
