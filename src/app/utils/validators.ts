import { AbstractControl } from '@angular/forms';
import { map } from 'rxjs';
import { UsersService } from '../auth/services/users.service';

export class MyValidators {

  static validPassword({ value }: AbstractControl) {
    return containsNumber(value) ? null : { invalid_password: true };
  }

  static matchPasswords(control: AbstractControl) {
    const password = control?.get('password')?.value;
    const confirmPassword = control?.get('confirmPassword')?.value;
    if ([password, confirmPassword].includes(undefined)) {
      throw new Error('matchPasswords: fields not found');
    }
    return password === confirmPassword ? null : { match_password: true };
  }

  static validateEmailAsync(service: UsersService) {
    return ({ value }: AbstractControl) => (
      service
        .isAvailableByEmail(value)
        .pipe(
          map(({ isAvailable }) => (isAvailable ? null : { not_available: true }))
        )
    )
  }
}

function isNumber(value: string){
  return !isNaN(parseInt(value, 10));
}

function containsNumber(value: string){
  return value.split('').find((v) => isNumber(v)) !== undefined;
}

