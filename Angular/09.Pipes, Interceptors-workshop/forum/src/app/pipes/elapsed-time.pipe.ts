import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'elapsedTime',
  standalone: true
})
export class ElapsedTimePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return moment(value).fromNow();
  }

}
