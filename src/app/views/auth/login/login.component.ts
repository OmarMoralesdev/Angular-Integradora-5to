import { Component, inject} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router,RouterLink,RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from '../../../core/models/login';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  // MI TOSTADA
  private tostada = inject(ToastrService);
  private ruta = inject(Router);
  private service = inject(AuthService)


  // CREACION DE FORMULARIO
  FormularioLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  private getErrorMessage(campo: string, nombreCampo: string): string | null {
    // OBTENEMOS EL CONTROL DEL CAMPO
    const control = this.FormularioLogin.get(campo);
    // SI EL CONTROL NO EXISTE O NO TIENE ERRORES RETORNAMOS NULL
    if (!control || !control.errors) return null;

    const errors = control.errors;

    // DEPENDIENDO DEL TIPO DE ERROR RETORNAMOS UN MENSAJE
    if (errors['required']) return `${nombreCampo}: Este campo es obligatorio`;
    if (errors['minlength']) return `${nombreCampo}: Debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
    if (errors['maxlength']) return `${nombreCampo}: No puede tener más de ${errors['maxlength'].requiredLength} caracteres`;
    if (errors['pattern']) return `${nombreCampo}: Solo se permiten letras y espacios`;
    if (errors['min']) return `${nombreCampo}: Debe ser mayor a $${errors['min'].min}`;
    if (errors['max']) return `${nombreCampo}: No puede ser mayor a $${errors['max'].max}`;
    if (errors['email']) return `${nombreCampo}: tiene que ser un correo válido`;

    return null;
  }

  onLogin() {
    if (this.FormularioLogin.valid){
      const valores = this.FormularioLogin.value;
      const credenciales:Login = {
        email: valores.email || '',
        password: valores.password || ''
      }

      this.service.login(credenciales).subscribe({
        next: (response) => {
          localStorage.setItem('token',response.access_token);
          this.tostada.success('Login exitoso');
          if (this.service.isAdmin()) {
            this.ruta.navigate(['/Admin-Dashboard']);
          } else {
            this.ruta.navigate(['/misHabitaciones']);
          }
        },
        error: (error) => {
          console.error(error);
          this.tostada.error('credenciales invalidas', 'Error');
        }
      });
    }
    else {
      const campos: { [key: string]: string } = {email: 'Email', password: 'Contraseña' };

      Object.keys(campos).forEach((key) => {
        const errorMessage = this.getErrorMessage(key, campos[key]);
        if (errorMessage) {
          this.tostada.error(errorMessage, 'Error de validación');
        }
      });
    }
  }
}
