import { Pipe, PipeTransform } from '@angular/core';
import { ConfigurationService } from '@app/core';

@Pipe({
  name: 'configurationValueNumber',
  standalone: true,
})
export class ConfigurationValueNumberPipe implements PipeTransform {
  constructor(private readonly configurationService: ConfigurationService) {}

  public async transform(key: string): Promise<number> {
    return this.configurationService.getNumber(key);
  }
}
