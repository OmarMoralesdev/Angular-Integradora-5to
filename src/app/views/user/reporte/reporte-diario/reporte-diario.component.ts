import { Component, OnInit } from '@angular/core';
import { GraficaService } from '../../../../core/services/webSockets/grafica.service';
import { PusherService } from '../../../../core/services/webSockets/pusher.service';
import { ActivatedRoute } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reporte-diario',
  imports: [ NgxChartsModule, CommonModule , FormsModule],
  templateUrl: './reporte-diario.component.html',
  styleUrl: './reporte-diario.component.css',
})
export class ReporteDiarioComponent implements OnInit {
  sensorId: number = 0;
  graphData: any[] = [];
  recordCount: number = 10;

  constructor(
    private route: ActivatedRoute,
    private graficaService: GraficaService,
    private pusherService: PusherService
  ) {}

  ngOnInit(): void {
    this.sensorId = parseInt(this.route.snapshot.paramMap.get('id') || '0', 10);
    this.fetchGraphData();

    this.pusherService.getSensorUpdates().subscribe(data => {
      this.updateGraphData(data);
    });
  }

  fetchGraphData(): void {
    this.graficaService.fetchGraphData(this.sensorId, this.recordCount).subscribe((data) => {
      this.graphData = [
        {
          name: `Sensor ${this.sensorId}`,
          series: data.graphData.map((item: any) => ({
            name: item.name,
            value: item.value
          }))
        }
      ];
      console.log('Datos transformados para la gráfica:', this.graphData);
    });
  }
  updateGraphData(newData: any): void {
    const newPoint = { name: newData.name, value: newData.value };
  
    if (this.graphData[0].series.length >= this.recordCount) {
      this.graphData[0].series.shift(); // Eliminar el registro más antiguo
    }
  
    this.graphData[0].series.push(newPoint);
    this.graphData = [...this.graphData]; // Forzar la detección de cambios
  }
  updateGraph(): void {
    this.fetchGraphData();
  }

 
}
