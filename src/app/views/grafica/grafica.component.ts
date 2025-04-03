import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { GraficaService } from '../../core/services/webSockets/grafica.service';
import { PusherService } from '../../core/services/webSockets/pusher.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { BotonVolverComponent } from '../../shared/components/boton-volver/boton-volver.component';
import { Location } from '@angular/common';
import { SpinnerCargaComponent } from '../../shared/components/spinner/spinner-carga/spinner-carga.component';

@Component({
  selector: 'app-grafica',
  imports: [NgxChartsModule, BotonVolverComponent, SpinnerCargaComponent],
  templateUrl: './grafica.component.html',
  styleUrl: './grafica.component.css',
})
export class GraficaComponent implements OnInit, OnDestroy {
  sensors: any[] = [];

  previousValue: number = 70;
  isLoading: boolean = true;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private graficaService: GraficaService,
    private pusherService: PusherService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private location: Location
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && !isNaN(+id)) {
      this.fetchSensors(+id);

      this.subscriptions.add(
        this.pusherService.getSensorUpdates().subscribe((data) => {
          this.updateChartData(data);
        })
      );
    } else {
      this.toastr.error('ID no válido', 'Error');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  fetchSensors(roomId: number): void {
    this.isLoading = true; // Inicia la carga
    this.subscriptions.add(
      this.graficaService.fetchSensorsByRoom(roomId).subscribe(
        (sensors) => {

          // Filtrar el sensor con id 5 (ultrasónico)
          this.sensors = sensors
          .filter(sensor => sensor.id !== 5)
          .map(sensor => ({
            ...sensor,
            value: sensor.value || null, 
            unidad: sensor.unidad || '' 
          }));


          this.isLoading = false; // Finaliza la carga
        },
        (error) => {
          this.toastr.error(error.msg || 'Error al cargar los sensores.', 'Error');
          this.isLoading = false; 
          this.location.back();
        }
      )
    );
  }

  updateChartData(data: any): void {
    if (
      !data ||
      typeof data.data === 'undefined' ||
      typeof data.sensorId === 'undefined'
    ) {
      console.error('Datos inválidos recibidos:', data);
      return;
    }

    const sensorIndex = this.sensors.findIndex(
      (sensor) => sensor.id === data.sensorId
    );
    if (sensorIndex !== -1) {
      // Actualizar valor y mensaje del sensor existente
      this.sensors[sensorIndex].value = data.data;
      this.sensors[sensorIndex].msg = data.msg || 'Sin mensaje';
    } else {
     
    }
  }

  onSelect(event: any): void {
    console.log(event);
  }

  navigateToReport(sensorId: string): void {
    this.router.navigate(['/reporte-diario', sensorId]);
  }
}