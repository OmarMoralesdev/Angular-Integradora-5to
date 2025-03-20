import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-enviar-correo',
  imports: [ReactiveFormsModule],
  templateUrl: './enviar-correo.component.html',
  styleUrl: './enviar-correo.component.css',
})
export class EnviarCorreoComponent {
  correoForm: FormGroup;
  private service = inject(AuthService);
  private toastr = inject(ToastrService);

  constructor() {
    this.correoForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onEnviarCorreo() {
    if (this.correoForm.valid) {
      console.log('Formulario enviado', this.correoForm.value);
      this.service.enviarCorreo(this.correoForm.value).subscribe({
        next: () => {
          this.toastr.success('Correo de restablecimiento enviado.');
        },
        error: (err) => {
          console.error('Error de la API:', err);
          const errorMessage = err.error?.msg || err.error || 'Ocurrió un error inesperado.';
          this.toastr.error(errorMessage);
        },
      });
    } else {
      this.mostrarErrores(); 
    }
  }

  mostrarErrores() {
    const emailControl = this.correoForm.get('email');

    if (emailControl?.hasError('required')) {
      this.toastr.error('El correo es obligatorio.');
    }

    if (emailControl?.hasError('email')) {
      this.toastr.error('Ingresa un correo válido.');
    }

    this.correoForm.markAllAsTouched();
  }

}
