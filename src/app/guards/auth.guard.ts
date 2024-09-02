import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthentificationService);
  const router = inject(Router);

  if (auth.isAuthentified()) {
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};
