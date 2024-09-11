import { CanDeactivateFn } from '@angular/router';

export interface DeactivationGuard {
  canDeactivate: () => Promise<boolean>;
}

let activePromise: Promise<boolean> | undefined;

export const canDeactivateGuard: CanDeactivateFn<
  DeactivationGuard
> = async component => {
  if (activePromise) {
    return activePromise;
  }
  activePromise = component.canDeactivate().finally(() => {
    activePromise = undefined;
  });
  return activePromise;
};
