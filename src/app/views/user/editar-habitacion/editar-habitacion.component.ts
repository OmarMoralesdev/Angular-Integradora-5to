import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HabitacionesService } from '../../../core/services/habitaciones.service';
import { Habitacion } from '../../../core/models/habitacion';
import { ActivatedRoute, Router } from '@angular/router'; // Para obtener el ID de la 
import { CommonModule } from '@angular/common'; // Importar CommonModule

@Component({
  selector: 'app-editar-habitacion',
  imports: [ReactiveFormsModule, CommonModule ],
  templateUrl: './editar-habitacion.component.html',
  styleUrl: './editar-habitacion.component.css'
})
export class EditarHabitacionComponent {

}
