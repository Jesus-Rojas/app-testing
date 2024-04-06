import { Component } from '@angular/core';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent {
  people = [
    new Person('Jesus', 'Rojas', 23, 65, 1.65),
    new Person('Valentina', 'Molina', 23, 65, 1.65),
  ];
  selectedPerson: Person | null = null;

  choose(person: Person) {
    this.selectedPerson = person;
  }
}
