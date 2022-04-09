import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgForm,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { map } from 'rxjs/operators';

import { Gender } from '../../../graphql';
import { ProfileFormData } from './profile-form-data.interface';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ProfileFormComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: ProfileFormComponent,
      multi: true,
    },
  ],
})
export class ProfileFormComponent
  implements OnInit, AfterViewInit, ControlValueAccessor, Validator
{
  @Input() update = false;
  data: ProfileFormData = {
    username: '',
    password: '',
    passwordConfirm: '',
    gender: Gender.Unknown,
  };
  genderSelections = [
    { text: $localize`Male`, value: Gender.Male },
    { text: $localize`Female`, value: Gender.Female },
    { text: $localize`Alien`, value: Gender.Unknown },
  ];

  @ViewChild(NgForm) private form?: NgForm;
  @ViewChild(MatInput) private firstInput?: MatInput;
  private onChange = (_v: unknown) => {};
  private onTouched = () => {};

  /**
   * `.form.valid` will be `true` when `.validate()` is called first time, but
   * we must return a `false` in the first validation, so here it is.
   */
  private valid = false;

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.firstInput?.focus();
    });
  }

  ngAfterViewInit(): void {
    this.form
      ?.statusChanges!.pipe(map(() => !!this.form?.valid))
      .subscribe((valid) => (this.valid = valid));
  }

  propagate(): void {
    // wait for the validation
    setTimeout(() => {
      this.onChange(this.data);
      this.onTouched();
    });
  }

  validate(): ValidationErrors | null {
    return this.valid ? null : { profile: 'error' };
  }

  writeValue(data: ProfileFormData): void {
    Object.assign(this.data, data);
  }

  registerOnChange(fn: (v: unknown) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
