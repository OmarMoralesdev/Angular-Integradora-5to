import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { GraficaService } from '../../../core/services/webSockets/grafica.service';
import { PusherService } from '../../../core/services/webSockets/pusher.service';

@Component({
  selector: 'app-grafica',
  imports: [NgxChartsModule],
  templateUrl: './grafica.component.html',
  styleUrl: './grafica.component.css'
})
export class GraficaComponent implements OnInit {
  sensors: any[] = [];
  view: any[] = [700, 400];

  // Opciones de la gráfica
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Tiempo';
  showYAxisLabel = true;
  yAxisLabel = 'Valor';
  
  colorScheme = { domain: ['#5AA454'] };

  constructor(private graficaService: GraficaService, private pusherService: PusherService) {}

  ngOnInit() {
    this.fetchSensors();
    this.pusherService.getSensorUpdates().subscribe(data => {
      console.log(data);
      this.updateChartData(data);
    });
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
}