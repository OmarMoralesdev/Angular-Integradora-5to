import { Component, OnInit } from '@angular/core';
import { HabitacionesService } from '../../../core/services/habitaciones.service';
import { CommonModule } from '@angular/common';
import { Habitacion } from '../../../core/models/habitacion';

@Component({
  selector: 'app-habitaciones',
  imports: [CommonModule],
  templateUrl: './habitaciones.component.html',
  styleUrl: './habitaciones.component.css'
})
export class HabitacionesComponent implements OnInit {
  habitaciones: Habitacion[] = []

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
