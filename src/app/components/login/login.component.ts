import { Component, OnInit, ResolvedReflectiveFactory } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/app/models/persona';
import { isSessionActive } from 'src/app/models/session';
import { PersonaService } from 'src/app/services/persona.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  personas: Persona[] = [];
  usuario: Persona = new Persona();
  mensaje: String = "";
  constructor(
    private servicioPersona: PersonaService,
    private router: Router )  { }

  ngOnInit(): void {

    if(isSessionActive()){
      this.router.navigate(['']);
    }
  }

  submit(): void {
    this.servicioPersona.get_Usuarios()
      .subscribe(
      entity => {

        this.personas = entity.lista
        let valid = false;
        for(let p of this.personas){
          console.log(p.usuarioLogin);
          if (p.usuarioLogin == this.usuario.usuarioLogin){
            valid = true;
            break;
        }
      }
      if (valid){
        localStorage.setItem('session','active');
        localStorage.setItem('userSession',this.usuario.usuarioLogin)
        this.router.navigate(['']);
      }else{
        this.mensaje = "El usuario no se encuentra en el sistema ";
      }
    },
      error =>console.log('no se pudieron conseguir las personas')
     );

  }

}
