import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const rolesGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService) 
  const router = inject(Router) 

  try {
    const requiredRoles = route.data?.['roles'] || [];
    const rol = authService.getRolUser();
    
    if (requiredRoles.length > 0){
      if (!requiredRoles.includes(rol)){
        router.navigate(['/not-found']);
        return false;
      }
    }
    return true
  }
  catch (error) {
    router.navigate(['/not-found']);
    return false
  }
};
