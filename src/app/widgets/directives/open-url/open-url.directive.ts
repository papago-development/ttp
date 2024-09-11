import { Directive, HostListener, Input } from '@angular/core';
import { CapacitorBrowserService } from '@app/core';

@Directive({
  selector: '[appOpenUrl]',
  standalone: true,
})
export class OpenUrlDirective {
  @Input()
  public appOpenUrl: string | undefined;

  constructor(
    private readonly capacitorBrowserService: CapacitorBrowserService,
  ) {}

  @HostListener('click')
  public async onClick(): Promise<void> {
    if (!this.appOpenUrl) {
      return;
    }
    await this.capacitorBrowserService.open({
      url: this.appOpenUrl,
    });
  }
}
