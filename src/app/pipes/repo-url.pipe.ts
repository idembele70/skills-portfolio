import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'repoUrl',
  standalone: true,
  pure: true,
})
export class RepoUrlPipe implements PipeTransform {
  private readonly _baseUrl = 'https://github.com/idembele70/';
  transform(value: string): string {
    if (!value) return '';

    return this._baseUrl + value;
  }
}
