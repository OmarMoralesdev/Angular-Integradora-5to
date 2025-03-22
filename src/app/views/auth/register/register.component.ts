import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Register } from '../../../core/models/register';
import { RegisterService } from '../../../core/services/register.service';
import { min } from 'rxjs';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  // MI SERVICIO TOSTADA
  
  FormularioRegister: FormGroup;
  constructor(public registerService:RegisterService,
    private tostada: ToastrService,
    public router: Router
  ) { 
     // CREACION DE FORMULARIO
  this.FormularioRegister = new FormGroup({
    name: new FormControl('', [Validators.required,
      Validators.pattern('^[a-zA-Z ]*$'),
       Validators.minLength(3),
        Validators.maxLength(50)]),
    lastname: new FormControl('', [Validators.required,
      Validators.pattern('^[a-zA-Z ]*$'),
       Validators.minLength(3),
        Validators.maxLength(50)]
    ),
    secondLastname: new FormControl('', [Validators.pattern('^[a-zA-Z ]*$'),
       Validators.minLength(3),
        Validators.maxLength(50)]
    ),
    birthdate: new FormControl('', [Validators.required, this.validateAge.bind(this)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50)]
    ),
    // confirmpassword: new FormControl('', Validators.required),
  });

  }

 

  // METODO PARA VALIDAR LA EDAD
  private validateAge(control: AbstractControl) {
    const birthdate = new Date(control.value);
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    
    // Ajustar la edad si aún no ha llegado el cumpleaños este año
    const monthDiff = today.getMonth() - birthdate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
      age--;
    }

    if (age < 13) {
      return { minAge: { min: 13, actual: age } };
    }
    if (age > 100) {
      return { maxAge: { max: 100, actual: age } };
    }

    return null;
  }

  private getErrorMessage(campo: string, nombreCampo: string): string | null {
    // OBTENEMOS EL CONTROL DEL CAMPO
    const control = this.FormularioRegister.get(campo);
    // SI EL CONTROL NO EXISTE O NO TIENE ERRORES RETORNAMOS NULL
    if (!control || !control.errors) return null;

    const errors = control.errors;

    // DEPENDIENDO DEL TIPO DE ERROR RETORNAMOS UN MENSAJE
    if (errors['required']) return `${nombreCampo}: Este campo es obligatorio`;
    if (errors['minlength']) return `${nombreCampo}: Debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
    if (errors['maxlength']) return `${nombreCampo}: No puede tener más de ${errors['maxlength'].requiredLength} caracteres`;
    if (errors['pattern']) return `${nombreCampo}: Solo se permiten letras y espacios`;
    if (errors['email']) return `${nombreCampo}: tiene que ser un correo válido`;
    if (errors['minAge']) return `${nombreCampo}: Debes tener al menos 13 años`;
    if (errors['maxAge']) return `${nombreCampo}: La edad no puede ser mayor a 100 años`;

    return null;
  }

  onRegister() {
      if (this.FormularioRegister.invalid) {
        const campos: { [key: string]: string } = {
          name: 'Nombre',
          lastname: 'Apellido paterno',
          secondLastname: 'Apellido materno',
          birthdate: 'Fecha de nacimiento',
          email: 'Correo electrónico',
          password: 'Contraseña',
          };
        
          Object.keys(campos).forEach((key) => {
            const errorMessage = this.getErrorMessage(key, campos[key]);
            if (errorMessage) {
              this.tostada.error(errorMessage, 'Error de validación');
            }
          });
        return;
      }
      
      this.registerService.register(this.FormularioRegister.value).subscribe({
        next: (response) => {
          console.log('Server response:', response);
          this.tostada.success('Registro exitoso, favor de checar su correo');
          this.router.navigate(['/Login']);
          this.FormularioRegister.reset();
        },
        error: (error) => {
          console.log('Error completo:', error);
          if (error.status === 422) {
            console.log('Error de validación:', error.error);
            this.tostada.error('Error de validación', 'Error');
          } else {
            this.tostada.error('Error en el registro', 'Error');
          }
        }
      });

    }
 
}
