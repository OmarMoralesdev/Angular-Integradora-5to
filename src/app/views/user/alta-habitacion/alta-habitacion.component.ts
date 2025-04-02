import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HabitacionesService } from '../../../core/services/habitaciones.service';
import { Habitacion } from '../../../core/models/habitacion';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BotonVolverComponent } from '../../../shared/components/boton-volver/boton-volver.component';
@Component({
  selector: 'app-alta-habitacion',
  imports: [ReactiveFormsModule, CommonModule, BotonVolverComponent],
  templateUrl: './alta-habitacion.component.html',
  styleUrl: './alta-habitacion.component.css'
})
export class AltaHabitacionComponent {
  FormHabitacion: FormGroup;
  constructor(private habitacionService:HabitacionesService, 
  private router:Router, private tostada:ToastrService){
    this.FormHabitacion = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(60)])
    });
  }

  postHabitacion(){
    if(this.FormHabitacion.valid){
      const Habitacion:Habitacion=this.FormHabitacion.value;
      this.habitacionService.postHabitacion(Habitacion).subscribe({
        next:(response)=>{
          this.tostada.success('Habitación creada con éxito', 'Éxito');
          setTimeout(()=>{
            this.router.navigate(['/misHabitaciones']);
          },2000
          );
          this.FormHabitacion.reset();
        },

        error: (e) => {
          if(e.status===403){
            this.tostada.error('No puedes tener mas de 9 habitaciones', 'Advertencia');
          }
          if(e.status===409){
            this.tostada.warning('Ya tienes una habitacion con ese nombre', 'Advertencia');
          }
          console.error('ola hay problemas');
          this.tostada.error('Error al crear habitación', 'Error');
        }
      });
    }else{
      console.error('completa el registro')
      this.tostada.error('Completa el campo para continuar, minimo 3 letras 😊', 'Error');
    }
  }

}
