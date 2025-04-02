import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterService } from '../../../core/services/register.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reenvio',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './reenvio.component.html',
  styleUrl: './reenvio.component.css'
})
export class ReenvioComponent {
  constructor(private reenvioservice:RegisterService,
    private tostada:ToastrService){}

    public FormularioReenvio = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
    });

    reenviar() {
      if (this.FormularioReenvio.valid) {
        const email = this.FormularioReenvio.value.email ?? '';
        this.reenvioservice.reenvio({ email }).subscribe(
          (response) => {
            console.log('Código reenviado');
            this.tostada.success('Código reenviado, revisa tu bandeja','Éxito');
          },
          (error) => {
            console.error('Error al reenviar código', error);
  
            if (error.status === 400 && error.error.msg === 'Usuario no encontrado') {
              this.tostada.error('Usuario no encontrado', 'Error');
            }
            if (error.status === 400 && error.error.admin === 'Tu cuenta ha sido desactivada por el administrador') {
              this.tostada.error('Tu cuenta ha sido desactivada por el administrador', 'Error');
            }
            if(error.status===400 && error.error.activa ){
              this.tostada.error('Tu cuenta ya esta activa', 'Error');
            }
            if(error.status===400 && error.error.tiempo==='aun no caduca el codigo, revisa tu correo')
            {
              this.tostada.error('Aun no caduca el codigo, revisa tu correo', 'Error');
            }
          }
        );
      } else {
        console.error('Formulario no válido');
        this.tostada.error('Datos inválidos', 'Error')
      }
    }
    
}


