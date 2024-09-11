import { Pipe, PipeTransform } from '@angular/core';
import { PermissionState } from '@capacitor/core';

@Pipe({
  name: 'isPermissionState',
  standalone: true,
})
export class IsPermissionStatePipe implements PipeTransform {
  constructor() {}

  public transform(value: unknown, state: unknown): boolean {
    if (!value || typeof value !== 'string') {
      return false;
    }
    if (!state || typeof state !== 'string') {
      return false;
    }
    return (value as PermissionState) === (state as PermissionState);
  }
}
