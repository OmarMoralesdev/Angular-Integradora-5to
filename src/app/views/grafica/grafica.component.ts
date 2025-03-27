import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { GraficaService } from '../../core/services/webSockets/grafica.service';
import { PusherService } from '../../core/services/webSockets/pusher.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-grafica',
  imports: [NgxChartsModule],
  templateUrl: './grafica.component.html',
  styleUrl: './grafica.component.css',
})
export class GraficaComponent implements OnInit, OnDestroy {
  sensors: any[] = [];
  containerWidth: number = 250; // Valor inicial
  containerHeight: number = 150; // Valor inicial
  previousValue: number = 70;
  units: string = 'counts';
  private subscriptions: Subscription = new Subscription();

  constructor(
    private graficaService: GraficaService,
    private pusherService: PusherService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && !isNaN(+id)) {
      this.subscriptions.add(
        this.graficaService.habiticionById(+id).subscribe(
          (sensor) => {
            this.fetchSensors(+id);
            this.subscriptions.add(
              this.pusherService.getSensorUpdates().subscribe((data) => {
                this.updateChartData(data);
              })
            );
          },
          (error) => {
            this.toastr.error('Error al obtener la habitación', 'Error');
            console.error('Error al obtener la habitación:', error);
          }
        )
      );
    } else {
      this.toastr.error('ID no válido', 'Error');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }



  fetchSensors(roomId: number): void {
    this.subscriptions.add(
      this.graficaService.fetchSensorsByRoom(roomId).subscribe(
        (sensors) => {
          console.log('Sensores de la habitación:', sensors);
          this.sensors = sensors; // Asigna los sensores al arreglo del componente
        },
        (error) => {
          this.toastr.error('Error al obtener los sensores', 'Error');
          console.error('Error al obtener los sensores de la habitación:', error);
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
      // Agregar nuevo sensor con valor y mensaje
      this.sensors.push({
        id: data.sensorId,
        name: data.sensorName,
        value: data.data,
        msg: data.msg || 'Sin mensaje',
      });
    }
  }

  onSelect(event: any): void {
    console.log(event);
  }

  navigateToReport(sensorId: string): void {
    this.router.navigate(['/reporte-diario', sensorId]);
  }
}