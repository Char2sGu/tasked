import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'log',
})
export class LogPipe implements PipeTransform {
  transform<T>(value: T): T {
    console.debug(value);
    return value;
  }
}
