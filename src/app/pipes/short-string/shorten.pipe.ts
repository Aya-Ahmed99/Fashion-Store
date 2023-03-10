import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
})
export class ShortenPipe implements PipeTransform {
  transform(value: any): string {
    return value.split(' ').slice(0, 13).join(' ');
  }
}
