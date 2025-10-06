import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'srcUrl',
  standalone: true,
  pure: true,
})
export class SrcUrlPipe implements PipeTransform {
  private readonly _prefix = './assets/';
  private readonly _suffix = '.png'
  transform(value: string): string {
    return this._prefix + (value ? 'link' : 'link_off') + this._suffix;
  }

}
