import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FirebaseAuthenticationService } from '@app/core/services';

export const noAuthGuard: CanActivateFn = async () => {
  const firebaseAuthenticationService = inject(FirebaseAuthenticationService);
  const router = inject(Router);

  const user = await firebaseAuthenticationService.getCurrentUser();
  if (user) {
    return router.createUrlTree(['/']);
  }
  return true;
};
