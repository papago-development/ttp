import { Pipe, PipeTransform } from '@angular/core';
import { User } from '@capacitor-firebase/authentication';

@Pipe({
  name: 'isUserLinkedWith',
  standalone: true,
})
export class IsUserLinkedWithPipe implements PipeTransform {
  constructor() {}

  public transform(value: unknown, provider: unknown): boolean {
    if (!value || typeof value !== 'object' || !('providerData' in value)) {
      return false;
    }
    if (!provider || typeof provider !== 'string') {
      return false;
    }
    return (value as User).providerData.some(
      item => item.providerId === provider,
    );
  }
}
