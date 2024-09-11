import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { DialogService } from '@app/core/services';

export const leavePageGuard: CanDeactivateFn<unknown> = async () => {
  const dialogService = inject(DialogService);

  const dismissed = await dialogService.dismissTop();
  return dismissed ? false : true;
};
