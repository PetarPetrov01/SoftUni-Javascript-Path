import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slice',
  standalone: true,
})
export class SlicePipe implements PipeTransform {
  transform(value: string, maxLength: number = 25): unknown {
    return `${value.substring(0, maxLength)}${
      value.length > maxLength ? '...' : ''
    }`;
  }
}
