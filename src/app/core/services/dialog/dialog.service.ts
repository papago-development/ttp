import { Injectable } from '@angular/core';
import {
  ActionSheetController,
  ActionSheetOptions,
  AlertController,
  LoadingController,
  ModalController,
  PopoverController,
  ToastController,
} from '@ionic/angular/standalone';
import {
  AlertOptions,
  LoadingOptions,
  ModalOptions,
  PopoverOptions,
  ToastOptions,
} from '@ionic/core';
import { TranslocoService } from '@jsverse/transloco';
import { lastValueFrom, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(
    private readonly actionSheetController: ActionSheetController,
    private readonly alertController: AlertController,
    private readonly modalController: ModalController,
    private readonly loadingController: LoadingController,
    private readonly popoverController: PopoverController,
    private readonly toastController: ToastController,
    private readonly translocoService: TranslocoService,
  ) {}

  public async presentActionSheet(
    options?: ActionSheetOptions,
  ): Promise<HTMLIonActionSheetElement> {
    const actionSheet = await this.actionSheetController.create(options);
    await actionSheet.present();
    return actionSheet;
  }

  public async presentAlert(
    options?: AlertOptions,
  ): Promise<HTMLIonAlertElement> {
    const alert = await this.alertController.create(options);
    await alert.present();
    return alert;
  }

  public async presentErrorAlert(
    options?: AlertOptions,
  ): Promise<HTMLIonAlertElement> {
    // Transloco needs some time to load the translations
    const header = await lastValueFrom(
      this.translocoService
        .selectTranslate('core.dialog.error.header')
        .pipe(take(1)),
    );
    const okButton = await lastValueFrom(
      this.translocoService
        .selectTranslate('core.dialog.error.button.ok')
        .pipe(take(1)),
    );
    const defaultOptions: AlertOptions = {
      header,
      buttons: [okButton],
    };
    options = { ...defaultOptions, ...options };
    return this.presentAlert(options);
  }

  public async dismissAlert(
    data?: any,
    role?: string,
    id?: string,
  ): Promise<boolean> {
    return this.alertController.dismiss(data, role, id);
  }

  public async presentModal(
    options: ModalOptions,
  ): Promise<HTMLIonModalElement> {
    const modal = await this.modalController.create(options);
    await modal.present();
    return modal;
  }

  public async dismissModal(
    data?: any,
    role?: string,
    id?: string,
  ): Promise<boolean> {
    return this.modalController.dismiss(data, role, id);
  }

  public async presentPopover(
    options: PopoverOptions,
  ): Promise<HTMLIonPopoverElement> {
    const popover = await this.popoverController.create(options);
    await popover.present();
    return popover;
  }

  public async presentLoading(
    options?: LoadingOptions,
  ): Promise<HTMLIonLoadingElement> {
    const defaultOptions: LoadingOptions = {
      message: this.translocoService.translate('core.dialog.loading.message'),
    };
    options = { ...defaultOptions, ...options };
    const loading = await this.loadingController.create(options);
    await loading.present();
    return loading;
  }

  public async presentToast(
    options: ToastOptions,
  ): Promise<HTMLIonToastElement> {
    const defaultOptions: ToastOptions = {
      duration: 3000,
      position: 'bottom',
      buttons: [
        {
          text: this.translocoService.translate('core.dialog.toast.button.ok'),
          side: 'end',
        },
      ],
      positionAnchor: 'tabbar',
    };
    options = { ...defaultOptions, ...options };
    const toast = await this.toastController.create(options);
    await toast.present();
    return toast;
  }

  public async dismissLoading(
    data?: any,
    role?: string,
    id?: string,
  ): Promise<boolean> {
    return this.loadingController.dismiss(data, role, id);
  }

  public async dismissToast(
    data?: any,
    role?: string,
    id?: string,
  ): Promise<boolean> {
    return this.toastController.dismiss(data, role, id);
  }

  public async dismissTop(): Promise<boolean> {
    const alertElement = await this.alertController.getTop();
    if (alertElement) {
      return alertElement.dismiss();
    }
    const actionSheetElement = await this.actionSheetController.getTop();
    if (actionSheetElement) {
      return actionSheetElement.dismiss();
    }
    const loadingElement = await this.loadingController.getTop();
    if (loadingElement) {
      return loadingElement.dismiss();
    }
    const popoverElement = await this.popoverController.getTop();
    if (popoverElement) {
      return popoverElement.dismiss();
    }
    const modalElement = await this.modalController.getTop();
    if (modalElement) {
      return modalElement.dismiss();
    }
    return false;
  }
}
