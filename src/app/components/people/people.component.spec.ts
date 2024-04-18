import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Person } from 'src/app/models/person.model';
import { clickEventById, getSelectorOfTest, getText, queryAll, queryById } from 'src/testing';
import { PersonComponent } from '../person/person.component';

import { PeopleComponent } from './people.component';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleComponent, PersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list app-person components', () => {
    component.people = [
      new Person('Jesus', 'Rojas', 23, 65, 1.65),
      new Person('Valentina', 'Molina', 23, 65, 1.65),
      new Person('Santiago', 'Molina', 23, 65, 1.65),
    ];
    fixture.detectChanges();
    const debugElement = queryAll(fixture, 'app-person');
    expect(debugElement.length).toEqual(component.people.length);
  });

  it('should raise selected event when clicked', () => {
    clickEventById(fixture, 'btn-choose');
    expect(component.selectedPerson).toEqual(component.people[0]);
  });

  it('should render selectedPerson', () => {
    clickEventById(fixture, 'btn-choose');
    fixture.detectChanges();
    expect(getText(fixture, `${getSelectorOfTest('selectedPerson')} ul > li`)).toContain(component.selectedPerson?.name);
  });
});
