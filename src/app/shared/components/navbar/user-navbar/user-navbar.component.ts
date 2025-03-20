import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-navbar',
  imports: [CommonModule,RouterModule],
  templateUrl: './user-navbar.component.html',
  styleUrl: './user-navbar.component.css'
})
export class UserNavbarComponent {
   private authService = inject(AuthService);
  
    // METODO PARA CERRAR SESION
    logout(): void {
      this.authService.logout();
    }

}
