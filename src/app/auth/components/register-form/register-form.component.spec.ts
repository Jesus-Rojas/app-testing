import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { generateOneUser } from 'src/app/mocks/user.mock';
import { Status } from 'src/app/types/status.enum';
import {
  clickElementById,
  getTextById,
  observableError,
  observableSuccess,
  query,
  setCheckboxValue,
  setInputValue,
} from 'src/testing';
import { UsersService } from '../../services/users.service';
import { RegisterFormComponent } from './register-form.component';

fdescribe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let usersService: jasmine.SpyObj<UsersService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const usersServiceSpy = jasmine.createSpyObj('UsersService', ['create', 'isAvailableByEmail']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ RegisterFormComponent ],
      providers: [
        {
          provide: UsersService,
          useValue: usersServiceSpy
        },
        {
          provide: Router,
          useValue: routerSpy
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    usersService = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    usersService.isAvailableByEmail.and.returnValue(of({ isAvailable: true }));
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

  it('should send the form successfully', () => {
    component.form.patchValue({
      name: 'Jesus',
      email: 'jesus@gmail.com',
      password: '00000000',
      confirmPassword: '00000000',
      checkTerms: true,
    });

    const mockUser = generateOneUser();
    usersService.create.and.returnValue(of(mockUser));
    component.register();
    expect(component.form.valid).toBeTruthy();
    expect(usersService.create).toHaveBeenCalled();
  });

  it('should send the form successfully and "loading" => "success"', fakeAsync(() => {
    component.form.patchValue({
      name: 'Jesus',
      email: 'jesus@gmail.com',
      password: '00000000',
      confirmPassword: '00000000',
      checkTerms: true,
    });

    const mockUser = generateOneUser();
    usersService.create.and.returnValue(observableSuccess(mockUser));
    component.register();
    expect(component.status).toEqual(Status.Loading);
    tick();
    expect(component.status).toEqual(Status.Success);
    expect(component.form.valid).toBeTruthy();
    expect(usersService.create).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  }));

  it('should send the form successfully demo UI', fakeAsync(() => {
    setInputValue(fixture, '#name', 'Jesus');
    setInputValue(fixture, '#email', 'jesus@gmail.com');
    setInputValue(fixture, '#password', '00000000');
    setInputValue(fixture, '#confirmPassword', '00000000');
    setCheckboxValue(fixture, '#terms', true);

    const mockUser = generateOneUser();
    usersService.create.and.returnValue(observableSuccess(mockUser));
    clickElementById(fixture, 'btn-submit');
    expect(component.status).toEqual(Status.Loading);
    tick();
    expect(component.status).toEqual(Status.Success);
    expect(component.form.valid).toBeTruthy();
    expect(usersService.create).toHaveBeenCalled();
  }));

  it('should send the form demo UI but with error in the service', fakeAsync(() => {
    setInputValue(fixture, '#name', 'Jesus');
    setInputValue(fixture, '#email', 'jesus@gmail.com');
    setInputValue(fixture, '#password', '00000000');
    setInputValue(fixture, '#confirmPassword', '00000000');
    setCheckboxValue(fixture, '#terms', true);

    const mockUser = generateOneUser();
    usersService.create.and.returnValue(observableError(mockUser));
    clickElementById(fixture, 'btn-submit');
    expect(component.status).toEqual(Status.Loading);
    tick();
    expect(component.status).toEqual(Status.Error);
    expect(component.form.valid).toBeTruthy();
    expect(usersService.create).toHaveBeenCalled();
  }));

  it('should show error with an email invalid', () => {
    usersService.isAvailableByEmail.and.returnValue(of({ isAvailable: false }));
    setInputValue(fixture, '#email', 'jesus@gmail.com');
    fixture.detectChanges();
    expect(component.emailField?.invalid).toBeTruthy();
    expect(usersService.isAvailableByEmail).toHaveBeenCalledWith('jesus@gmail.com');
    expect(getTextById(fixture, 'emailField-not-available')).toContain('The email is already registered');
  });
});
