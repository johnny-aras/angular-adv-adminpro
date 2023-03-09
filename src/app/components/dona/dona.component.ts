import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType, Color } from 'chart.js';


@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {

  @Input('titulo')  title:string= "Sin titulo";

  /*@Input('labels')  labels:string[]=[];
  @Input('data')  data:number[]=[];*/

  constructor() { }

  ngOnInit(): void {
      
  }
  
  @Input('labels') doughnutChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  
  
  public doughnutChartData: ChartData<'doughnut'> = {
    //labels: this.doughnutChartLabels,
    datasets: [
      { data: [ 350, 450, 100 ] },            
      //{ data: [ 50, 150, 120 ] },
      //{ data: [ 250, 130, 70 ] }
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';
  //public colors:Color[] = [
    //{backgroundColor:["#6957E6","#009FEE","#FFB414"]}
  //];

}
