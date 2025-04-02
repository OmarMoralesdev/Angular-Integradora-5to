import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  // OBTENEMOS EL TOKEN DEL LOCALSTORAGE
  const token = localStorage.getItem('token');
  const router=inject(Router);
  const tostada=inject(ToastrService);

  // SU HAY UN TOKEN 
  if (token) {
    // CLONAMOS LA PETICION ORIGINAL Y LE AGREGAMOS EL TOKEN EN EL HEADER
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    // CONTINUAMOS CON LA PETICION MODIFICADA
    return next(authReq).pipe
    (
      catchError(error => {
        if (error.status === 403 && error.error.message?.includes('desactivada')) {
          localStorage.clear();
          tostada.clear();
          tostada.error('cuenta desactivada.');
          router.navigate(['/Login']);
        }
        return throwError(() => error);
      })
    );
  }
  // LO REDIRIGIMOS A DONDE IBA
  return next(req);
};