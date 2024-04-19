import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
      email: [
        '',
        [Validators.required, Validators.email],
        [MyValidators.validateEmailAsync(this.usersService)]
      ],
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
    private usersService: UsersService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  register() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.status = Status.Loading;
    this.usersService
      .create(this.form.value as CreateUserDTO)
      .subscribe({
        next: () => {
          this.status = Status.Success;
          this.router.navigateByUrl('/login');
        },
        error: () => (this.status = Status.Error),
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
