import { Component, OnInit } from '@angular/core';
import { Habitacion } from '../../../../core/models/habitacion';
import { HabitacionesService } from '../../../../core/services/habitaciones.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sensores-habitacion',
  imports: [CommonModule, FormsModule],
  templateUrl: './sensores-habitacion.component.html',
  styleUrl: './sensores-habitacion.component.css'
})
export class SensoresHabitacionComponent implements OnInit {

  habitaciones: Habitacion[] = []

  habitacion : Habitacion = {
    id: -1,
    name: '',
    usuario_id: 0
  }

  constructor(public habitacionservice: HabitacionesService) {}

  ngOnInit(): void {
    this.mostrarHabitacion();
  }

  mostrarHabitacion() {
    this.habitacionservice.getHabitacion().subscribe({
      next: (response) => {
        this.habitaciones = response.data;       
      },
      error: (e) => {
        console.log(e);
      }
    })
  }


}
