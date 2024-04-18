import { FormControl, FormGroup } from '@angular/forms';
import { MyValidators } from './validators';

fdescribe('Tests for MyValidators', () => {
  describe('Tests for validPassword', () => {
    it('should return null when password is correct', () => {
      const control = new FormControl();
      control.setValue('jesus123');
      const rta = MyValidators.validPassword(control);
      expect(rta).toBeNull();
    });

    it('should return null when password is wrong', () => {
      const control = new FormControl();
      control.setValue('asdasdas');
      const rta = MyValidators.validPassword(control);
      expect(rta?.invalid_password).toBeTruthy();
    });
  });

  describe('Tests for matchPasswords', () => {
    it('should return null', () => {
      const group = new FormGroup({
        password: new FormControl('000000'),
        confirmPassword: new FormControl('000000'),
      });
      const rta = MyValidators.matchPasswords(group);
      expect(rta).toBeNull();
    });

    it('should return object with the error', () => {
      const group = new FormGroup({
        password: new FormControl('000000'),
        confirmPassword: new FormControl('0000a00'),
      });
      const rta = MyValidators.matchPasswords(group);
      expect(rta?.match_password).toBeTruthy();
    });
  });

  describe('Tests for matchPasswords', () => {
    it('should return null', () => {
      const group = new FormGroup({
        password: new FormControl('000000'),
        confirmPassword: new FormControl('000000'),
      });
      const rta = MyValidators.matchPasswords(group);
      expect(rta).toBeNull();
    });

    it('should return object with the error', () => {
      const group = new FormGroup({
        password: new FormControl('000000'),
        confirmPassword: new FormControl('0000a00'),
      });
      const rta = MyValidators.matchPasswords(group);
      expect(rta?.match_password).toBeTruthy();
    });

    it('should return an error', () => {
      const group = new FormGroup({
        asd: new FormControl('000000'),
        asdasd: new FormControl('0000a00'),
      });
      expect(() => MyValidators.matchPasswords(group)).toThrowError('matchPasswords: fields not found');
    });
  });
});