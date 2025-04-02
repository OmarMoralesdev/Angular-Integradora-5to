import { Component, OnInit } from '@angular/core';
import { GraficaService } from '../../../../core/services/webSockets/grafica.service';
import { ActivatedRoute } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common'; // Importa Location
import { BotonVolverComponent } from '../../../../shared/components/boton-volver/boton-volver.component';



@Component({
  selector: 'app-reporte-diario',
  imports: [NgxChartsModule, CommonModule, FormsModule, BotonVolverComponent],
  templateUrl: './reporte-diario.component.html',
  styleUrl: './reporte-diario.component.css',
})
export class ReporteDiarioComponent implements OnInit {
  maxValor: number | null = null;
  minValor: number | null = null;
  promedio: number | null = null;

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
    } else {
      this.toastr.error('ID no válido', 'Error');
    }
  }

  loadStats(id: number) {
    this.graficaService.fetchEstadisticas(id).subscribe(
      (data) => {
        if (data) {
          this.maxValor = data.max_valor;
          this.minValor = data.min_valor;
          this.promedio = data.promedio;

          if (this.maxValor === null && this.minValor === null && this.promedio === null) {
            this.toastr.info('No hay registros el día de hoy', 'Información');
          }
        }
      },
      (error) => {
        let errorMessage = 'Ocurrió un error inesperado';
        if (error.error?.details) {
          if (typeof error.error.details === 'string') {
            errorMessage = error.error.details; // Si es una cadena, úsala directamente
          } else if (typeof error.error.details === 'object') {
            errorMessage = Object.values(error.error.details).join(', '); // Combina los valores del objeto
          }
        } else if (error.message) {
          errorMessage = error.message; // Usa el mensaje de error si está disponible
        }
        this.toastr.error(errorMessage, 'Error');
        this.location.back();      }
    );
  }
}