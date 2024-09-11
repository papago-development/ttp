import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FirebaseAuthenticationService } from '@app/core/services';

export const authGuard: CanActivateFn = async () => {
  const firebaseAuthenticationService = inject(FirebaseAuthenticationService);
  const router = inject(Router);

  const user = await firebaseAuthenticationService.getCurrentUser();
  if (user) {
    return true;
  }
  return router.createUrlTree(['login']);
};
