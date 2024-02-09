import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appEmailValidate]',
  standalone: true,
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: EmailValidateDirective,
    multi: true
  }]
})
export class EmailValidateDirective implements Validator {
  pattern: RegExp = /[a-zA-Z0-9]+@[a-zA-Z]+.[a-zA-Z]{2,}$/g;
  constructor() {}

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    const value = control.value;
    if (value && this.pattern.exec(value)) {
      console.log('match')
      return null;
    }

    return {
      email:{
        value: value
      }
    }
  }
}
