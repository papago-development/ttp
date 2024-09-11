import { Pipe, PipeTransform } from '@angular/core';
import { ConfigurationService } from '@app/core';

@Pipe({
  name: 'configurationValueBoolean',
  standalone: true,
})
export class ConfigurationValueBooleanPipe implements PipeTransform {
  constructor(private readonly configurationService: ConfigurationService) {}

  public async transform(key: string): Promise<boolean> {
    return this.configurationService.getBoolean(key);
  }
}
