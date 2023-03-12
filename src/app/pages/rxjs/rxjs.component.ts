import { InvokeFunctionExpr } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable , interval, Subscription} from 'rxjs';
import { retry ,take, map,filter} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  public intervalSubs!:Subscription; 
  ngOnDestroy(){
    this.intervalSubs.unsubscribe();
  }
  constructor() {       
  
  /*  let i=-1;
    const obs$ = new Observable(observer => {
      const intervalo = setInterval( () =>{        
        i++;
        observer.next(i);
        if(i===4)
        {
          clearInterval(intervalo)
          observer.complete()
        }
        if(i===2)
        {	
          observer.error('Error Fatal !!! llegamos al valor de 2')
        }        
      },1000);
      });
*/
      /*this.retornaObservable().pipe(
        retry(2)
      )
      .subscribe({        
       next: (valor) => console.log('Substitucion:', valor),
       error: (error) => console.warn('Error: ',error),
       complete: () => console.info('Observable finalizado satisfactoriamente')
      });
      */
      this.intervalSubs = this.retornaIntervalo()
          .subscribe(console.log);
      
   }  
  ngOnInit(): void {
  }

  retornaIntervalo():Observable<number>
  {
      const intervalo$ = interval(100)
                        .pipe(
                          map(valor =>valor +1),
                          filter(valor => (valor%2===0)?true:false),
                          //take(10)                       
           //{return valor + 1;})
      );
      return intervalo$;
  }

  retornaObservable():Observable<number>
  {
    let i=-1;
    const obs$ = new Observable<number>(observer => {
      const intervalo = setInterval(()=>{        
        i++;                
        observer.next(i)
        if(i===4)
        {
            clearInterval(intervalo);
            observer.complete();            
        }
        if(i===2)
        {          
            observer.error('i llego al valor de 2 mira vos');
        }
      },1000);
    });
    return obs$;
  }
}
