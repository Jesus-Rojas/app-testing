import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CreateUserDTO } from 'src/app/models/user.model';
import { Status } from 'src/app/types/status.enum';
import { MyValidators } from 'src/app/utils/validators';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
  form = this.fb.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), MyValidators.validPassword]],
      confirmPassword: ['', [Validators.required]],
      checkTerms: [false, [Validators.requiredTrue]],
    },
    {
      validators: MyValidators.matchPasswords,
    }
  );

  status: Status = Status.Init;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {}

  register() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.value;
    this.status = Status.Loading;
    this.usersService
      .create(value as CreateUserDTO)
      .subscribe({
        next: (rta) => {
          this.status = Status.Success;
          console.log(rta);
        },
        error: () => {
          this.status = Status.Error;
        }
      });
  }

  get nameField() {
    return this.form.get('name');
  }

  get lastNameField() {
    return this.form.get('lastName');
  }

  get emailField() {
    return this.form.get('email');
  }

  get passwordField() {
    return this.form.get('password');
  }

  get confirmPasswordField() {
    return this.form.get('confirmPassword');
  }

  get checkTermsField() {
    return this.form.get('checkTerms');
  }
}
