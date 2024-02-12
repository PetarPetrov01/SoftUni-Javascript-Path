import { ValidatorFn } from '@angular/forms';

const DOMAINS = ['bg', 'com'];

export function validateEmail(): ValidatorFn {
  const pattern = new RegExp(`[^@]{6,}@gmail\.(${DOMAINS.join('|')})$`);

  return (control) => {
    return control.value === '' || pattern.test(control.value)
      ? null
      : { emailValidator: true };
  };
}
