import { Component } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-boton-volver',
  imports: [],
  templateUrl: './boton-volver.component.html',
  styleUrl: './boton-volver.component.css'
})
export class BotonVolverComponent {

  constructor(private location: Location) {}


  volver() {
    this.location.back();
  }

}
