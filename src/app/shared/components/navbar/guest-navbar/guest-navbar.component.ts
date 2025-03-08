import { Component,inject } from '@angular/core';
import { Router,RouterModule } from '@angular/router';


@Component({
  selector: 'app-guest-navbar',
  imports: [RouterModule],
  templateUrl: './guest-navbar.component.html',
  styleUrl: './guest-navbar.component.scss'
})
export class GuestNavbarComponent {
  private router  = inject(Router);

}
