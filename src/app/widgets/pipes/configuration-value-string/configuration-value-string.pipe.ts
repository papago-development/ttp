import { Pipe, PipeTransform } from '@angular/core';
import { ConfigurationService } from '@app/core';

@Pipe({
  name: 'configurationValueString',
  standalone: true,
})
export class ConfigurationValueStringPipe implements PipeTransform {
  constructor(private readonly configurationService: ConfigurationService) {}

  public async transform(key: string): Promise<string> {
    return this.configurationService.getString(key);
  }
}
