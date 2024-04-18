import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getText, getTextById, query, queryById } from 'src/testing';

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
    // Act
    fixture.detectChanges();
    // Assert
    expect(getText(fixture, 'p')).toContain(component.person.heigth);
  });

  it('should have <h3> with "Hola, {{ person.name }}"', () => {
    // Arrange
    component.person = new Person('Valentina', 'Molina', 23, 65, 1.65);
    const expectedMsg = `Hola, ${component.person.name}`;
    // Act
    fixture.detectChanges();
    // Assert
    expect(getText(fixture, 'h3')).toEqual(expectedMsg);
  });

  it('should display a text with IMC when call calcIMC', () => {
    // Arrange
    const expectedMsg = 'overweigth level';
    component.person = new Person('Juan', 'Perez', 30, 120, 1.65);
    // Act
    component.calcIMC();
    fixture.detectChanges();
    // Assert
    expect(getTextById(fixture, 'btn-imc')).toContain(expectedMsg);
  });

  it('should display a text with IMC when do click', () => {
    // Arrange
    const expectedMsg = 'overweigth level';
    component.person = new Person('Juan', 'Perez', 30, 120, 1.65);
    const buttonDe = queryById(fixture, 'btn-imc');
    // Act
    buttonDe.triggerEventHandler('click');
    fixture.detectChanges();
    // Assert
    expect(getTextById(fixture, 'btn-imc')).toContain(expectedMsg);
  });

  it('should raise selected event when do click', () => {
    // Arrange
    const expectedPerson = new Person('Juan', 'Perez', 30, 120, 1.65);
    component.person = expectedPerson;
    const buttonDe = queryById(fixture, 'btn-choose');
    let selectedPerson: Person | undefined;
    component.onSelected.subscribe((person) => (selectedPerson = person));
    // Act
    buttonDe.triggerEventHandler('click');
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

describe('PersonComponent from HostComponent', () => {
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
    expect(getText(fixture, 'app-person h3')).toContain(expectedName);
  });

  it('should raise selected event when clicked', () => {
    const personDe = queryById(fixture, 'btn-choose');
    personDe.triggerEventHandler('click');
    expect(component.selectedPerson).toEqual(component.person);
  });
});
