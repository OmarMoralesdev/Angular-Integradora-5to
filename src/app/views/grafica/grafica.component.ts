import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { GraficaService } from '../../core/services/webSockets/grafica.service';
import { PusherService } from '../../core/services/webSockets/pusher.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-grafica',
  imports: [NgxChartsModule],
  templateUrl: './grafica.component.html',
  styleUrl: './grafica.component.css'
})
export class GraficaComponent implements OnInit {
  sensors: any[] = [];
  containerWidth: number = 250; // Valor inicial
  containerHeight: number = 150; // Valor inicial
  value: number = 0;

  previousValue: number = 70;
  units: string = 'counts';

  constructor(private graficaService: GraficaService, private pusherService: PusherService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchSensors();
    this.pusherService.getSensorUpdates().subscribe(data => {
      console.log(data);
      this.updateChartData(data);
    });

    this.updateContainerSize();
    window.addEventListener('resize', () => this.updateContainerSize());
  }

  updateContainerSize(): void {
    const container = document.querySelector('.card-body');
    if (container) {
      this.containerWidth = container.clientWidth;
      this.containerHeight = container.clientHeight;
    }
  }

  fetchSensors(): void {
    this.graficaService.fetchSensors().subscribe(data => {
      this.sensors = data[0];
    }, error => {
      console.error('Error fetching sensors:', error);
    });
  }

  updateChartData(data: any): void {
    if (!data || typeof data.data === 'undefined' || typeof data.sensorId === 'undefined') {
      console.error("Datos inválidos recibidos:", data);
      return;
    }

    const sensorIndex = this.sensors.findIndex(sensor => sensor.id === data.sensorId);
    if (sensorIndex !== -1) {
      this.sensors[sensorIndex].value = data.data;
    } else {
      this.sensors.push({ id: data.sensorId, name: data.sensorName, value: data.data });
    }
  }

  onSelect(event: any): void {
    console.log(event);
  }

  navigateToReport(sensorId: string): void {
    this.router.navigate(['/reporte-diario', sensorId]);
  }
}