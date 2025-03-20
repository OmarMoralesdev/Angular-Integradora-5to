import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Register } from '../models/register';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1/auth/register';

  private http = inject(HttpClient);


  // constructor(private http: HttpClient) { }
  register(registerdata: Register): Observable<Register> {
    return this.http.post<Register>(this.apiUrl, registerdata);
  }
   
}
