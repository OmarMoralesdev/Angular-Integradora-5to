import { Component, OnInit } from '@angular/core';
import { Habitacion } from '../../../../core/models/habitacion';
import { Sensor } from '../../../../core/models/sensor';
import { HabitacionesService } from '../../../../core/services/habitaciones.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SensoresService } from '../../../../core/services/sensores.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sensores-habitacion',
  imports: [CommonModule, FormsModule],
  templateUrl: './sensores-habitacion.component.html',
  styleUrl: './sensores-habitacion.component.css'
})
export class SensoresHabitacionComponent implements OnInit {

  habitaciones: Habitacion[] = []
  sensores : Sensor[] = []

  habitacionSeleccionada: any = null;

  habitacion : Habitacion = {
    id: -1,
    name: '',
    usuario_id: 0
  }

  constructor(
    public habitacionservice: HabitacionesService,
    public sensorService: SensoresService,
    private route: ActivatedRoute,
  
  ) {}

  ngOnInit(): void {
this.mostrarHabitacion () 
    const habitacionId = Number(this.route.snapshot.paramMap.get('id'));
    if (habitacionId) {
      this.habitacion.id = habitacionId;
      this.cargarHabitacion(habitacionId);
    }
    this.mostrarSensores();
  }

  cargarHabitacion(id: number) {
    this.habitacionservice.getHabitacionPorId(id).subscribe({
      next: (response) => {
        this.habitacion = response.data;
        this.habitacionSeleccionada = response.data;
      },
      error: (e) => {
        console.log('Error al cargar la habitación:', e);
      }
    });
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

  mostrarSensores() {
    this.sensorService.getSensor().subscribe({
      next: (response) => {
        this.sensores = response.map((sensor: any) => {
          const existe = this.habitacionSeleccionada?.sensores?.some(
            (s: any) => s.id === sensor.id
          );
          return { ...sensor, checked: existe };
        });
      },
      error: (e) => {
        console.log(e);
      }
    });
  }
  

  onHabitacionSeleccionada() {
    if (this.habitacion.id === undefined || this.habitacion.id === -1) {
      return;
    }
  
    // Sensores de la habitacion seleccionada
    this.sensorService.getSensoresPorHabitacion(this.habitacion.id).subscribe({
      next: (response) => {
        const sensoresHabitacion = response.data.sensores;
  
        this.sensores = this.sensores.map(sensor => {
          const sensorAsociado = sensoresHabitacion.some(s => s.id === sensor.id);
          return { ...sensor, checked: sensorAsociado };
        });
      },
      error: (e) => {
        console.log(e);
      }
    });
  }
  

  

  estado(sensor: any) {

    if (sensor.checked){
      this.sensorService.agregarSensor(this.habitacion.id, sensor.id).subscribe({
        next: (response) => {
          console.log("Se agrego el sensor")
        },
        error: (e) => {
          console.log("Error al agregar el sensor", e)
        }
      });
    } else {
      this.sensorService.eliminarSensor(this.habitacion.id, sensor.id).subscribe({
        next: (response) => {
          console.log('Sensor eliminado correctamente', response);
        },
        error: (e) => {
          console.log('Error al eliminar sensor:', e);
        }
      });
    }

  }

}
