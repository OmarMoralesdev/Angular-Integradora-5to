import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditarPerfilService {

  constructor() { }

  getPerfil() {
    return {
      name: 'Cris',
      lastname: 'Mata',
      lastname2: 'Chairez',
      email: 'Cris@gmail.com'
    };
  }
}
