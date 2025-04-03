import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const rolesGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService) 
  const router = inject(Router) 

  try {
    const requiredRoles = route.data?.['roles'] || [];
    let rol = -1
    authService.getRolUser().subscribe({
      next: (data) => {
        rol = data.data
        if (requiredRoles.length > 0){
          if (!requiredRoles.includes(rol)){
            router.navigate(['/inautorizado']);
            return false;
          }
        }
        console.log(rol)
        return true
      },
      error: (error) => {
        router.navigate(['/inautorizado']);
        rol = -1
        return false
      }
    })
    return true
  }
  catch (error) {
    router.navigate(['/inautorizado']);
    return false
  }
};
