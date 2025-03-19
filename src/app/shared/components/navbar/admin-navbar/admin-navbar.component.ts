import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  imports: [CommonModule,RouterModule],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent {
  private authService = inject(AuthService);

  // METODO PARA CERRAR SESION
  logout(): void {
    this.authService.logout();
  }

}
