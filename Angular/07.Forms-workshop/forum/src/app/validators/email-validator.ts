import { ValidatorFn } from '@angular/forms';

export const EMAIL_DOMAINS = ['bg', 'com'];

export function validateEmail(): ValidatorFn {
  const pattern = new RegExp(`[^@]{6,}@gmail\.(${EMAIL_DOMAINS.join('|')})$`);

  return (control) => {
    return control.value === '' || pattern.test(control.value)
      ? null
      : { emailValidator: true };
  };
}
