import { Injectable } from '@angular/core';
import { CapacitorException } from '@capacitor/core';
import { TranslocoService } from '@jsverse/transloco';
import { FirebaseError } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class ErrorParserService {
  constructor(private readonly translocoService: TranslocoService) {}

  public getCodeFromUnknownError(error: unknown): string | undefined {
    error = this.getOriginalError(error);
    let code;
    if (error instanceof FirebaseError) {
      code = error.code;
    }
    return code;
  }

  public getMessageFromUnknownError(error: unknown): string {
    error = this.getOriginalError(error);
    let message = 'An unknown error has occurred.';
    if (error instanceof CapacitorException) {
      return this.getMessageFromCapacitorException(error);
    } else if (error instanceof FirebaseError) {
      return this.getMessageFromFirebaseError(error);
    } else if (error instanceof Error && error.message) {
      message = error.message;
    }
    return message;
  }

  private getMessageFromCapacitorException(error: CapacitorException): string {
    switch (error.code as string) {
      case 'email-already-in-use': {
        return this.translocoService.translate(
          'core.message.error.firebase.auth.emailAlreadyInUse',
        );
      }
      case 'invalid-credential': {
        return this.translocoService.translate(
          'core.message.error.firebase.auth.invalidCredential',
        );
      }
      case 'invalid-email': {
        return this.translocoService.translate(
          'core.message.error.firebase.auth.invalidEmail',
        );
      }
      case 'popup-closed-by-user': {
        return this.translocoService.translate(
          'core.message.error.firebase.auth.popupClosedByUser',
        );
      }
      case 'requires-recent-login': {
        return this.translocoService.translate(
          'core.message.error.firebase.auth.requiresRecentLogin',
        );
      }
      case 'unauthorized-domain': {
        return this.translocoService.translate(
          'core.message.error.firebase.auth.unauthorizedDomain',
        );
      }
      case 'user-not-found': {
        return this.translocoService.translate(
          'core.message.error.firebase.auth.userNotFound',
        );
      }
      case 'weak-password': {
        return this.translocoService.translate(
          'core.message.error.firebase.auth.weakPassword',
        );
      }
      case 'wrong-password': {
        return this.translocoService.translate(
          'core.message.error.firebase.auth.wrongPassword',
        );
      }
      default: {
        return error.message;
      }
    }
  }

  private getMessageFromFirebaseError(error: FirebaseError): string {
    switch (error.code) {
      case 'auth/email-already-in-use': {
        return this.translocoService.translate(
          'core.message.error.firebase.auth.emailAlreadyInUse',
        );
      }
      case 'auth/invalid-credential': {
        return this.translocoService.translate(
          'core.message.error.firebase.auth.invalidCredential',
        );
      }
      case 'auth/invalid-email': {
        return this.translocoService.translate(
          'core.message.error.firebase.auth.invalidEmail',
        );
      }
      case 'auth/popup-closed-by-user': {
        return this.translocoService.translate(
          'core.message.error.firebase.auth.popupClosedByUser',
        );
      }
      case 'auth/requires-recent-login': {
        return this.translocoService.translate(
          'core.message.error.firebase.auth.requiresRecentLogin',
        );
      }
      case 'auth/unauthorized-domain': {
        return this.translocoService.translate(
          'core.message.error.firebase.auth.unauthorizedDomain',
        );
      }
      case 'auth/user-not-found': {
        return this.translocoService.translate(
          'core.message.error.firebase.auth.userNotFound',
        );
      }
      case 'auth/weak-password': {
        return this.translocoService.translate(
          'core.message.error.firebase.auth.weakPassword',
        );
      }
      case 'auth/wrong-password': {
        return this.translocoService.translate(
          'core.message.error.firebase.auth.wrongPassword',
        );
      }
      default: {
        return error.message;
      }
    }
  }

  private getOriginalError(error: unknown): unknown {
    if (error instanceof Object && 'rejection' in error) {
      error = (error as any).rejection;
    }
    return error;
  }
}
