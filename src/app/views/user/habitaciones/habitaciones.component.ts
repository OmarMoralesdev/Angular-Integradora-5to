import { Component, OnInit } from '@angular/core';
import { HabitacionesService } from '../../../core/services/habitaciones.service';
import { CommonModule } from '@angular/common';
import { Habitacion } from '../../../core/models/habitacion';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-habitaciones',
  imports: [CommonModule, RouterLink],
  templateUrl: './habitaciones.component.html',
  styleUrl: './habitaciones.component.css',
})
export class HabitacionesComponent implements OnInit {
  habitaciones: Habitacion[] = [];

  constructor(
    public habitacionservice: HabitacionesService,
    public tostada: ToastrService
  ) {}

  ngOnInit(): void {
    this.mostrarHabitacion();
  }

  mostrarHabitacion() {
    this.habitacionservice.getHabitacion().subscribe({
      next: (response) => {
        console.log(response);
        this.habitaciones = response.data;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  EliminarHabitacion(id: number) {
    if (id === undefined) {
      this.tostada.error('ID de la habitación no válido.', 'Error');
      return;
    }
    const toast = this.tostada.info(
      '¿Estás seguro de que quieres eliminar esta categoría?',
      'Confirmar eliminación',
      {
        closeButton: true,
        timeOut: 0,
        extendedTimeOut: 0,
        disableTimeOut: true,
        positionClass: 'toast-bottom-center',
        tapToDismiss: false,
      }
    );

    toast.onTap.subscribe(() => {
      this.habitacionservice.deleteHabitacion(id).subscribe({
        next: () => {
          this.habitaciones = this.habitaciones.filter(
            (habitacion) => habitacion.id !== id
          ); // Actualiza la lista sin recargar
          this.tostada.success(
            'Habitacion eliminada correctamente',
            'Eliminación exitosa'
          );
        },
        error: (e) => {
          if (e.status === 404) {
            this.tostada.error('La habitacion no existe.', 'Error');
          } else {
            this.tostada.error(
              'Error inesperado al eliminar la habitacion.',
              'Error'
            );
          }
          console.error('Error al eliminar la habitacion', e);
        },
      });
    });
  }
}
