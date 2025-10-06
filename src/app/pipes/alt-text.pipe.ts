import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'altText',
  standalone: true,
  pure: true,
})
export class AltTextPipe implements PipeTransform {
  private readonly _suffix = 'icon';
  transform(value: string): string {
    return value ? 'link' : 'link off' + this._suffix;
  }

}
