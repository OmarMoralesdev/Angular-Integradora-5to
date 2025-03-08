import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
// import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InfoPerfil } from '../../../core/models/info-perfil';
import { EditarPerfilService } from '../../../core/services/editar-perfil.service';

@Component({
  selector: 'app-editar-perfil',
  imports: [ReactiveFormsModule],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.scss'
})
export class EditarPerfilComponent {

  private tostada = inject(ToastrService);
  private editarPerfilService = inject(EditarPerfilService);

  FormularioEditarPerfil = new FormGroup({
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    lastname2: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    });

  ngOnInit(): void {
    this.cargarInfoPerfil();
  }

  cargarInfoPerfil(){
    let infoPerfil = this.editarPerfilService.getPerfil()
    this.FormularioEditarPerfil.patchValue(infoPerfil)
  }

  private getErrorMessage(campo: string, nombreCampo: string): string | null {
    // OBTENEMOS EL CONTROL DEL CAMPO
    const control = this.FormularioEditarPerfil.get(campo);
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

  onRegister() {
    if (this.FormularioEditarPerfil.valid) {
      const formValues = this.FormularioEditarPerfil.value;

      const registerData: InfoPerfil = {
        name: formValues.name || '',
        lastname: formValues.lastname || '',
        lastname2: formValues.lastname2 || '',
        email: formValues.email || '',
      };


      
    }
    else {

      const campos: { [key: string]: string } = { name: 'Nombre', lastname: 'Apellido Paterno', lastname2: 'Apellido Materno', email: 'Email'};

      Object.keys(campos).forEach((key) => {
        const errorMessage = this.getErrorMessage(key, campos[key]);
        if (errorMessage) {
          this.tostada.error(errorMessage, 'Error de validación');
        }
      });
    }
  }
}
