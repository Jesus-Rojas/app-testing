import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PersonComponent } from './person.component';

fdescribe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have <p> with "Soy un parrafo"', () => {
    const personDebug = fixture.debugElement;
    const pDebug = personDebug.query(By.css('p'));
    const p: HTMLElement = pDebug.nativeElement;
    expect(p?.textContent).toEqual('Soy un parrafo');
  });

  it('should have <h3> with "Hola, PersonComponent"', () => {
    const personDebug = fixture.debugElement;
    const h3Debug = personDebug.query(By.css('h3'));
    const h3: HTMLElement = h3Debug.nativeElement;
    expect(h3?.textContent).toEqual('Hola, PersonComponent');
  });
});
