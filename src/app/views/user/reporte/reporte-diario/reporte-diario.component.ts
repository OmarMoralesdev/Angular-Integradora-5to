import { Component, OnInit, OnDestroy } from '@angular/core';
import { GraficaService } from '../../../../core/services/webSockets/grafica.service';
import { ActivatedRoute } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { BotonVolverComponent } from '../../../../shared/components/boton-volver/boton-volver.component';
import { SpinnerCargaComponent } from '../../../../shared/components/spinner/spinner-carga/spinner-carga.component';

@Component({
  selector: 'app-reporte-diario',
  imports: [NgxChartsModule, CommonModule, FormsModule, BotonVolverComponent, SpinnerCargaComponent],
  templateUrl: './reporte-diario.component.html',
  styleUrl: './reporte-diario.component.css',
})
export class ReporteDiarioComponent implements OnInit, OnDestroy {
  maxValor: number | null = null;
  minValor: number | null = null;
  promedio: number | null = null;
  buzzerVisible: boolean = false;
  isLoading: boolean = true;
  private updateInterval: any;

  constructor(
    private graficaService: GraficaService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private location: Location
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && !isNaN(+id)) {
      this.loadStats(+id);

      if (+id === 4) {
        this.buzzerVisible = true;
      }

      this.updateInterval = setInterval(() => {
        this.loadStats(+id, true);
      }, 10000);
    } else {
      this.toastr.error('ID no válido', 'Error');
      this.isLoading = false;
    }
  }

  ngOnDestroy(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  loadStats(id: number, silent: boolean = false) {
    if (!silent) {
      this.isLoading = true; 
    }

    this.graficaService.fetchEstadisticas(id).subscribe(
      (data) => {
        if (data) {
          this.maxValor = data.max_valor;
          this.minValor = data.min_valor;
          this.promedio = data.promedio;

          if (!silent && this.maxValor === null && this.minValor === null && this.promedio === null) {
            this.toastr.info('No hay registros el día de hoy', 'Información');
          }
        }
        if (!silent) {
          this.isLoading = false;
        }
      },
      (error) => {
        if (!silent) {
          this.toastr.error('Error al cargar las estadísticas', 'Error');
          this.isLoading = false;
          this.location.back();
        }
      }
    );
  }

  desactivarBuzzer() {
    this.graficaService.desactivarBuzzer().subscribe(
      (response) => {
        if (response.msg === 'Buzzer desactivado') {
          this.toastr.success('Buzzer desactivado', 'Éxito');
        } else {
          this.toastr.error('Error al desactivar el buzzer', 'Error');
        }
      },
      (error) => {
        console.error(error);
        this.toastr.error('Error al desactivar el buzzer', 'Error');
      }
    );
  }
}