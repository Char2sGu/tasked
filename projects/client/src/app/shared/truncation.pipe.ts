import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncation',
})
export class TruncationPipe implements PipeTransform {
  transform(text: string | null | undefined, max: number): string | undefined {
    if (!text) return undefined;
    let result = '';
    let length = 0;
    for (const letter of text) {
      length += letter === '\n' ? 10 : 1;
      result += letter;
      if (length >= max) break;
    }
    return `${result}...`;
  }
}
