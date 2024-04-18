import { AbstractControl } from '@angular/forms';

export class MyValidators {

  static isPriceValid({ value }: AbstractControl) {
    return value > 10000 ? null : { price_invalid: true };
  }

  static validPassword({ value }: AbstractControl) {
    return containsNumber(value) ? null : { invalid_password: true };
  }

  static matchPasswords(control: AbstractControl) {
    const password = control?.get('password')?.value;
    const confirmPassword = control?.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { match_password: true };
  }
}

function isNumber(value: string){
  return !isNaN(parseInt(value, 10));
}

function containsNumber(value: string){
  return value.split('').find((v) => isNumber(v)) !== undefined;
}

