import { Pipe, PipeTransform } from '@angular/core';
import { NgModel } from '@angular/forms';
import { map, Observable } from 'rxjs';

@Pipe({
  name: 'validationErrorMessage',
})
export class ValidationErrorMessagePipe implements PipeTransform {
  transform(model: NgModel): Observable<string | null> {
    if (!model.valueChanges) throw new Error();
    return model.valueChanges.pipe(
      map(() => {
        if (!model.errors) return null;
        const names = Object.keys(model.errors);
        const message = model.errors[names[0]];
        return typeof message === 'string' ? message : null;
      }),
    );
  }
}
