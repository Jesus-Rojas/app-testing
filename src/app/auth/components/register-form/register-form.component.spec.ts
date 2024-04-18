import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { getTextById, query, setInputValue } from 'src/testing';
import { UsersService } from '../../services/users.service';
import { RegisterFormComponent } from './register-form.component';

fdescribe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let usersService: jasmine.SpyObj<UsersService>;

  beforeEach(async () => {
    const usersServiceSpy = jasmine.createSpyObj('UsersService', ['create']);
    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ RegisterFormComponent ],
      providers: [
        {
          provide: UsersService,
          useValue: usersServiceSpy
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    usersService = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the emailField be invalid', () => {
    component.emailField?.setValue('esto no es un correo');
    expect(component.emailField?.invalid).withContext('wrong email').toBeTruthy();

    component.emailField?.setValue('');
    expect(component.emailField?.invalid).withContext('empty').toBeTruthy();
  });

  it('should the passwordField be invalid', () => {
    component.passwordField?.setValue('');
    expect(component.passwordField?.invalid).withContext('empty').toBeTruthy();
    
    component.passwordField?.setValue('13245');
    expect(component.passwordField?.invalid).withContext('13245').toBeTruthy();

    component.passwordField?.setValue('asadsada');
    expect(component.passwordField?.invalid).withContext('without number').toBeTruthy();

    component.passwordField?.setValue('as2adsada');
    expect(component.passwordField?.valid).withContext('right').toBeTruthy();
  });

  it('should the form be invalid', () => {
    component.form.patchValue({
      name: 'Jesus',
      email: 'jesus@gmail.com',
      password: '00000000',
      confirmPassword: '00000000',
      checkTerms: false,
    });
    expect(component.form.invalid).toBeTruthy();
  });

  it('should the emailField be invalid from UI', async () => {
    const inputDe = query(fixture, '#email');
    const inputEl = inputDe.nativeElement as HTMLInputElement;

    inputEl.value = 'esto no es un correo';
    inputEl.dispatchEvent(new Event('input'));
    inputEl.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(component.emailField?.invalid).withContext('wrong email').toBeTruthy();  
    expect(getTextById(fixture, 'emailField-email')).toContain("It's not a email");
  });

  it('should the emailField be invalid from UI with setInputValue', async () => {
    setInputValue(fixture, '#email', 'esto no es un correo');
    fixture.detectChanges();
    expect(component.emailField?.invalid).withContext('wrong email').toBeTruthy();  
    expect(getTextById(fixture, 'emailField-email')).toContain("It's not a email");
  });
});
