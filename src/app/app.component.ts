import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GuestNavbarComponent } from './shared/components/navbar/guest-navbar/guest-navbar.component';
import { FooterGuestComponent } from './shared/components/footer/footer-guest/footer-guest.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GuestNavbarComponent,FooterGuestComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'websocketsPrueba';
}
