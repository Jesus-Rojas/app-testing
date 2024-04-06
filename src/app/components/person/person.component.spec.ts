import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Person } from '../../models/person.model';
import { PersonComponent } from './person.component';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    component.person = new Person('', '', 0, 0, 0);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the name be "Jesus"', () => {
    component.person = new Person('Jesus', 'Rojas', 23, 65, 1.65);
    expect(component.person.name).toEqual('Jesus');
  });

  it('should have <p> with "Mi altura es {{ person.heigth }}"', () => {
    // Arrange
    component.person = new Person('Valentina', 'Molina', 23, 65, 1.65);
    const personDebug = fixture.debugElement;
    const pDebug = personDebug.query(By.css('p'));
    const p: HTMLElement = pDebug.nativeElement;
    // Act
    fixture.detectChanges();
    // Assert
    expect(p?.textContent).toContain(component.person.heigth);
  });

  it('should have <h3> with "Hola, {{ person.name }}"', () => {
    // Arrange
    component.person = new Person('Valentina', 'Molina', 23, 65, 1.65);
    const expectedMsg = `Hola, ${component.person.name}`;
    const personDebug = fixture.debugElement;
    const h3Debug = personDebug.query(By.css('h3'));
    const h3: HTMLElement = h3Debug.nativeElement;
    // Act
    fixture.detectChanges();
    // Assert
    expect(h3?.textContent).toEqual(expectedMsg);
  });

  it('should display a text with IMC when call calcIMC', () => {
    // Arrange
    const expectedMsg = 'overweigth level';
    component.person = new Person('Juan', 'Perez', 30, 120, 1.65);
    const button: HTMLElement = fixture.debugElement.query(By.css('button.btn-imc')).nativeElement;
    // Act
    component.calcIMC();
    fixture.detectChanges();
    // Assert
    expect(button?.textContent).toContain(expectedMsg);
  });

  it('should display a text with IMC when do click', () => {
    // Arrange
    const expectedMsg = 'overweigth level';
    component.person = new Person('Juan', 'Perez', 30, 120, 1.65);
    const buttonDebug = fixture.debugElement.query(By.css('button.btn-imc'));
    const buttonElement: HTMLElement = buttonDebug.nativeElement;
    // Act
    buttonDebug.triggerEventHandler('click');
    fixture.detectChanges();
    // Assert
    expect(buttonElement?.textContent).toContain(expectedMsg);
  });

  it('should raise selected event when do click', () => {
    // Arrange
    const expectedPerson = new Person('Juan', 'Perez', 30, 120, 1.65);
    component.person = expectedPerson;
    const buttonDebug = fixture.debugElement.query(By.css('button.btn-choose'));
    let selectedPerson: Person | undefined;
    component.onSelected.subscribe((person) => (selectedPerson = person));
    // Act
    buttonDebug.triggerEventHandler('click');
    fixture.detectChanges();
    // Assert
    expect(selectedPerson).toEqual(expectedPerson);
  });
});

@Component({
  template: '<app-person [person]="person" (onSelected)="onSelected($event)"></app-person>',
})
class HostComponent {
  person = new Person('Juan', 'Perez', 30, 120, 1.65);
  selectedPerson: Person | undefined = undefined;

  onSelected(person: Person) {
    this.selectedPerson = person;
  }
}

fdescribe('PersonComponent from HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostComponent, PersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display person name', () => {
    const expectedName = component.person.name;
    const personElement: HTMLElement = fixture.debugElement.query(By.css('app-person h3')).nativeElement;
    expect(personElement?.textContent).toContain(expectedName);
  });

  it('should raise selected event when clicked', () => {
    const personDebug = fixture.debugElement.query(By.css('app-person .btn-choose'));
    personDebug.triggerEventHandler('click');
    expect(component.selectedPerson).toEqual(component.person);
  });
});
