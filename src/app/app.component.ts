import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GuestNavbarComponent } from './shared/components/navbar/guest-navbar/guest-navbar.component';
import { FooterGuestComponent } from './shared/components/footer/footer-guest/footer-guest.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/services/auth.service';
import { AdminNavbarComponent } from './shared/components/navbar/admin-navbar/admin-navbar.component';
import { UserNavbarComponent } from './shared/components/navbar/user-navbar/user-navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GuestNavbarComponent,FooterGuestComponent,
    CommonModule,AdminNavbarComponent,UserNavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'websocketsPrueba';
  constructor(public authService: AuthService) {}
}
