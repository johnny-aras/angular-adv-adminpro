import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';
declare function customInitFunctions():void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  //url:string ="";
  ///segundo comentario
  //linkTheme=document.querySelector('#theme');

  constructor(private settingService:SettingsService,
              private sidebarService:SidebarService) { }

  ngOnInit(): void {

    customInitFunctions();
    this.sidebarService.cargarMenu();
    ///segundo comentario
    //const url= localStorage.getItem('tema') || `./assets/css/colors/green.css`;        

    //const tema= localStorage.getItem('tema');
    /*if(tema)
    {
      this.url=tema;
    }else{
      this.url = `./assets/css/colors/green.css`;
    }*/
    ///segundo comentario
    //console.log(url);
    //this.linkTheme?.setAttribute('href',url);
    ///

    //localStorage.setItem('tema',url);
  }

}
