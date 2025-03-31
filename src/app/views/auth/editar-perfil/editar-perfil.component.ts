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
    name: new FormControl('', [Validators.required, Validators.pattern(/^[\p{L}\s]+$/u)]),
    lastname: new FormControl('', [Validators.required, Validators.pattern(/^[\p{L}\s]+$/u)]),
    secondLastname: new FormControl('', [Validators.required, Validators.pattern(/^[\p{L}\s]+$/u)]),
  });

  ngOnInit(): void {
    this.cargarInfoPerfil();
  }

  cargarInfoPerfil(){
    this.editarPerfilService.getPerfil().subscribe({
      next: (response) => {
        console.log(response)
        this.FormularioEditarPerfil.patchValue({
          name: response.name,
          lastname: response.lastname,
          secondLastname: response.secondLastname
        })
      },
      error: (error) => {
        this.tostada.error("Error al cargar informacion del perfil", "Error")
      }
    })
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
    if (errors['pattern']) return `${nombreCampo}: Solo se permiten letras y espacios`;

    return null;
  }

  onRegister() {
    if (this.FormularioEditarPerfil.valid) {
      const formValues = this.FormularioEditarPerfil.value;

      const registerData: InfoPerfil = {
        name: formValues.name || '',
        lastname: formValues.lastname || '',
        secondLastname: formValues.secondLastname || ''
      };

      this.editarPerfilService.updatePerfil(registerData).subscribe({
        next: (response) => {
          this.tostada.success("editar perfil exitoso")
        },
        error: (error) => {
          console.log(error)
          this.tostada.error("error al editar perfil", "Error")
        }
      })

      
    }
    else {

      const campos: { [key: string]: string } = { name: 'Nombre', lastname: 'Apellido Paterno', secondLastname: 'Apellido Materno'};

      Object.keys(campos).forEach((key) => {
        const errorMessage = this.getErrorMessage(key, campos[key]);
        if (errorMessage) {
          this.tostada.error(errorMessage, 'Error de validación');
        }
      });
    }
  }
}
