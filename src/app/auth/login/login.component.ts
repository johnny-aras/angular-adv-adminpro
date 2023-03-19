import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { LoginForm } from 'src/app/interfaces/login-form.interface';

declare const google:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'
  ]
})
export class LoginComponent implements AfterViewInit{

  formSubmitted= false;

  @ViewChild('googleBtn') googleBtn?:ElementRef;
   
  public loginForm:FormGroup<any> = this.fb.group({    
    email:[localStorage.getItem('email') || '',[Validators.required,Validators.email]],
    password:[localStorage.getItem('root') || '',Validators.required ],
    remember:[false]
  });

  constructor(private router:Router,
              private fb:FormBuilder,
              private usuarioService:UsuarioService,
              private ngZone:NgZone) { 
              }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit(){
    // console.log({ esto: this});
    google.accounts.id.initialize({
      client_id: "558588765108-v05pa9v46rmk0jd8u8kc3gpst8s5nhqm.apps.googleusercontent.com",
      callback: (response:any)=>this.handleCredentialResponse(response) 
    });
    google.accounts.id.renderButton(
      //document.getElementById("buttonDiv"),
      this.googleBtn?.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response:any){
//            console.log({ esto: this});
            console.log("Encoded JWT ID token: " + response.credential);
            this.usuarioService.loginGoogle(response.credential)
                                .subscribe(resp => {
  //                                console.log({login:resp});
            this.ngZone.run(()=>{
              //MOVER AL DASHBOARD 
              //ES NECESARIO IMPLEMNTARLO DENTRO DEL SUSBCRIBE POR LO QUE ES UN METODO ASUNCRono
               this.router.navigateByUrl("/");                                   
                                  });
            })
  }

 
  login()
  {
    this.usuarioService.login(this.loginForm.value as LoginForm).subscribe( resp => {
      if(this.loginForm.get('remember')?.value)
      {
          localStorage.setItem('email',this.loginForm.get('email')?.value);
          localStorage.setItem('root',this.loginForm.get('password')?.value);

          //localStorage.setItem('email',this.loginForm.value.email as string);
          //localStorage.setItem('email',String(this.loginForm.value.email));
          //localStorage.setItem('email',<string>(this.loginForm.value.email));

      }else
      {
        localStorage.removeItem('email');
        localStorage.removeItem('root');
      }

      //Swal.fire('Usuario Autenticado',`Usuario: ${this.loginForm.value.email} Bienvenido`,'success');
        //MOVER AL DASHBOARD
          this.router.navigateByUrl("/");   
          console.log(resp);      
    },(err)=>{
      Swal.fire('Error',err.error.msg,'error');
    });
     
  }
  

  passwordsIguales(pass1Name:string,pass2Name:string)
  {
    return (formGroup:FormGroup)=>{
        const pass1Control = formGroup.get(pass1Name);
        const pass2Control = formGroup.get(pass2Name);

        if(pass1Control?.value===pass2Control?.value)
        {
          pass2Control?.setErrors(null);
        }else{
          pass2Control?.setErrors({noEsIgual:true});
        }
    }
  }

}
