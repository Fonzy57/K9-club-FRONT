import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from '@config/routes';
import { AuthService } from '@services/auth/auth.service';
import { CustomIconComponent } from '@components/custom-icon/custom-icon.component';

@Component({
  selector: 'app-disconnect-button',
  imports: [CustomIconComponent],
  templateUrl: './disconnect-button.component.html',
  styleUrl: './disconnect-button.component.css',
})
export class DisconnectButtonComponent {
  auth: AuthService = inject(AuthService);
  router: Router = inject(Router);
  AppRoutes = AppRoutes;

  onDisconnection(event: MouseEvent) {
    this.auth.logout();
    this.router.navigate([this.AppRoutes.auth.login]);
  }
}
