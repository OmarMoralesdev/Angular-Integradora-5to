import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HabitacionesService } from '../../../core/services/habitaciones.service';
import { Habitacion } from '../../../core/models/habitacion';
import { ActivatedRoute, Router } from '@angular/router'; // Para obtener el ID de la 
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-habitacion',
  imports: [ReactiveFormsModule, CommonModule ],
  templateUrl: './editar-habitacion.component.html',
  styleUrl: './editar-habitacion.component.css'
})
export class EditarHabitacionComponent implements OnInit {
  EditForm:FormGroup;
  HabitacionId!:number;

  constructor(
    private habitacionService:HabitacionesService,
    private route:ActivatedRoute,
    private router:Router,
    private tostada:ToastrService
  ){
    this.EditForm= new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(60)])
    });
  }
  ngOnInit(): void {
    this.HabitacionId=Number(this.route.snapshot.paramMap.get('id'));
    this.obtenerH();
  }

  obtenerH(){
    this.habitacionService.getHabitacionId(this.HabitacionId).subscribe({
      next:(response)=>{
        console.log(response.name)
        const idhabitacion=response;
        this.EditForm.patchValue({
          name:idhabitacion.name,
        });
      },
      error:(err)=>{
        console.error('error', err);
      }
    })
  }

  actualizarHabi(){
    if(this.EditForm.valid){
      const HabActualizada: Habitacion = {
        id: this.HabitacionId,
        ...this.EditForm.value
      };
      this.habitacionService.putHabitacion(this.HabitacionId,HabActualizada ).subscribe({
        next: (response) => {
          this.tostada.success('Habitación actualizada', 'Exito');
          setTimeout(() => {
            this.router.navigate(['/misHabitaciones']); 
          }, 2000); 
        },
        error: (err) => {
          this.tostada.error('Error al actualizar Habitación', 'Error');
        }
      });
    }
  }
}

