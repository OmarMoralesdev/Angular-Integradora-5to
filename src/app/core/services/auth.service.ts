import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models/login';
import { environment } from '../../../environments/environment';
import { EnviarCorreo } from '../models/enviar-correo';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl + '/auth/';
private router = inject(Router);

  constructor(private http: HttpClient) {
   }
  

  login(apiLogin: Login): Observable<any> {
    const respuesta = Observable<any>;
    console.log(respuesta);
    return this.http.post(this.apiUrl + 'login', apiLogin);
  }


  enviarCorreo(data: EnviarCorreo): Observable<any> {
    return this.http.post(this.apiUrl + 'enviar-correo-de-restablecimiento', data);
  }

   // METODO PARA CERRAR SESION
   logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/Index']);
  }
  
}