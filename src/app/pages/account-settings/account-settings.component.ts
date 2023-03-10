import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  
  private links!:NodeListOf<Element>;
    constructor(private settingsService:SettingsService) { }

  ngOnInit(): void {    
    this.settingsService.checkCurrentTheme();
  }
  
  changeTheme(tema:string)
  {
    this.settingsService.changeTheme(tema);        
  }  





  /*private linkTheme=document.querySelector('#theme');
  private links!:NodeListOf<Element>;
    constructor() { }

  ngOnInit(): void {
    this.links = document.querySelectorAll('.selector');
    this.checkCurrentTheme();
  }
  
  changeTheme(tema:string)
  {
    const url = `./assets/css/colors/${tema}.css`;
    console.log(url);
    this.linkTheme?.setAttribute('href',url);
    localStorage.setItem('tema',url);    
    this.checkCurrentTheme(); 
  }
  checkCurrentTheme()
  {
    
    console.log(this.links);    
    this.links.forEach( item => {
      item.classList.remove('working');
      const btnTheme =item.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');
      if(btnThemeUrl===currentTheme)
      {
        item.classList.add('working');
      }
    })

  }*/

}
