import { Component, OnInit } from '@angular/core';
import { HabitacionesService } from '../../../core/services/habitaciones.service';
import { CommonModule } from '@angular/common';
import { Habitacion } from '../../../core/models/habitacion';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { SpinnerCargaComponent } from '../../../shared/components/spinner/spinner-carga/spinner-carga.component';

@Component({
  selector: 'app-habitaciones',
  imports: [CommonModule, RouterLink, SpinnerCargaComponent],
  templateUrl: './habitaciones.component.html',
  styleUrl: './habitaciones.component.css',
})
export class HabitacionesComponent implements OnInit {
  habitaciones: Habitacion[] = [];
  id: number | null = null;
  mostrar: boolean = false
  isLoading: boolean = true; // Nueva propiedad para controlar el estado de carga

  constructor(
    private habitacionservice: HabitacionesService,
    private tostada: ToastrService,
    private route: ActivatedRoute,
    private location: Location,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? Number(idParam) : null;

    this.authService.getRolUser().subscribe({
      next: (response) => {
        if (response.data == 2){
          this.mostrar = true
        }
        else {
          this.mostrar = false
        }
      },
      error: (error) => {
        this.tostada.error('Error al cargar el rol.', 'Error');
      }
    })
    if (this.id) {
      this.cargarHabitacionPorId(this.id);
    } else {
      this.mostrarHabitacion();
    }
  }

  private cargarHabitacionPorId(id: number): void {
    this.isLoading = true; // Inicia la carga
    this.habitacionservice.getHabitacionPorIdDeUsuario(id).subscribe({
      next: (response) => {
        if (response.msg === 'El usuario no tiene habitaciones asignadas.') {
          this.tostada.warning('No tienes habitaciones asignadas.', 'Aviso');
          this.habitaciones = []; // Asegurarse de que no haya habitaciones
        } else {
          this.habitaciones = response.data;
        }
        this.isLoading = false; // Finaliza la carga
      },
      error: (e) => {
        this.tostada.error(e.msg || 'Error al cargar la habitación.', 'Error');
        console.log(e);
        this.isLoading = false; // Finaliza la carga en caso de error
        this.location.back();
      },
    });
  }

  mostrarHabitacion(): void {
    this.isLoading = true; // Inicia la carga
    this.habitacionservice.getHabitacion().subscribe({
      next: (response) => {
        this.habitaciones = response.data;
        this.isLoading = false; // Finaliza la carga
      },
      error: (e) => {
        this.tostada.error('Error al cargar las habitaciones.', 'Error');
        console.error('Error al cargar las habitaciones:', e);
        this.isLoading = false; // Finaliza la carga en caso de error
      },
    });
  }

  EliminarHabitacion(id: number): void {
    if (!id) {
      this.tostada.error('ID de la habitación no válido.', 'Error');
      return;
    }

    const toast = this.tostada.info(
      '¿Estás seguro de que quieres eliminar esta habitación?',
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
          );
          this.tostada.success(
            'Habitación eliminada correctamente.',
            'Eliminación exitosa'
          );
        },
        error: (e) => {
          const errorMsg =
            e.status === 404
              ? 'La habitación no existe.'
              : 'Error inesperado al eliminar la habitación.';
          this.tostada.error(errorMsg, 'Error');
          console.error('Error al eliminar la habitación:', e);
        },
      });
    });
  }
}