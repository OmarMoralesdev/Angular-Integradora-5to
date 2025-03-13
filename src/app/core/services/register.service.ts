import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Register } from '../models/register';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://192.168.252.173:8000/api/v1/auth/register';

  private http = inject(HttpClient);


  // constructor(private http: HttpClient) { }
  register(registerdata: Register): Observable<any> {
    return this.http.post<any>(this.apiUrl, registerdata);
  }
   
}
