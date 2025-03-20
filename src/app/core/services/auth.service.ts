import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models/login';
import { environment } from '../../../environments/environment';
import { EnviarCorreo } from '../models/enviar-correo';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl + '/auth/';

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

}