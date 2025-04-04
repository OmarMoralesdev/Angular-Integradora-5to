import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InfoPerfil } from '../../../core/models/info-perfil';
import { EditarPerfilService } from '../../../core/services/editar-perfil.service';

@Component({
  selector: 'app-editar-contrasena',
  imports: [ReactiveFormsModule],
  templateUrl: './editar-contrasena.component.html',
  styleUrl: '../editar-perfil/editar-perfil.component.scss'
})
export class EditarContrasenaComponent {
  private tostada = inject(ToastrService);
  private editarPerfilService = inject(EditarPerfilService);

  FormularioEditarContrasena = new FormGroup({
    password: new FormControl('', Validators.required),
    newpassword: new FormControl('', Validators.required),
    confirmpassword: new FormControl('', Validators.required),
  });

  private getErrorMessage(campo: string, nombreCampo: string): string | null {
    // OBTENEMOS EL CONTROL DEL CAMPO
    const control = this.FormularioEditarContrasena.get(campo);
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

  onEdit() {
      if (this.FormularioEditarContrasena.valid) {

        const formValues = this.FormularioEditarContrasena.value;
  
        const registerData: any = {
          password: formValues.password || '',
          newpassword: formValues.newpassword || '',
          confirmpassword: formValues.confirmpassword || '',
        };
        
        if (registerData.newpassword == registerData.confirmpassword){
          this.editarPerfilService.updatePassword(registerData).subscribe({
            next: (response) => {
              this.tostada.success("cambiar contraseña exitoso")
            },
            error: (error) => {
              this.tostada.error("La contraseña actual no es correcta", "Error")
            }
          })
        }
        else {
          this.tostada.error('Confirmar password: tiene que ser igual a la nueva contraseña')
        }
  
        
      }
      else {
  
        const campos: { [key: string]: string } = { password: 'Password', newpassword: 'Password nuevo', confirmpassword: 'Confirmar password'};
  
        Object.keys(campos).forEach((key) => {
          const errorMessage = this.getErrorMessage(key, campos[key]);
          if (errorMessage) {
            this.tostada.error(errorMessage, 'Error de validación');
          }
        });
      }
    }
}
