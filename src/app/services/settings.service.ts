import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme=document.querySelector('#theme');
  constructor(    
  ){ 
    const url= localStorage.getItem('tema') || `./assets/css/colors/green.css`;            
    this.linkTheme?.setAttribute('href',url);
    //console.log('settings service init');
  }

  changeTheme(tema:string)
  {
    const url = `./assets/css/colors/${tema}.css`;
    //console.log(url);
    this.linkTheme?.setAttribute('href',url);
    localStorage.setItem('tema',url);    
    this.checkCurrentTheme(); 
  }

  checkCurrentTheme()
  {
    const links = document.querySelectorAll('.selector');     
    links.forEach( item => {
      item.classList.remove('working');
      const btnTheme =item.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');
      if(btnThemeUrl===currentTheme)
      {
        item.classList.add('working');
      }
    })

  }

}
