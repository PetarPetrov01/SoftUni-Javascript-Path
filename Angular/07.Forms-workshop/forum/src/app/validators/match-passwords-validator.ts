import { ValidatorFn } from '@angular/forms';

export function matchPasswordsValidator(
  passOne: string,
  passTwo: string
): ValidatorFn {
  return (control) => {
    const group = control;
    const passwordCtr = group.get(passOne);
    const rePasswordCtr = group.get(passTwo);

    console.log(passwordCtr?.value + ' - - ' + rePasswordCtr?.value)
    return passwordCtr?.value === rePasswordCtr?.value
      ? null
      : { matchPasswordsValidator: true };
  };
}
