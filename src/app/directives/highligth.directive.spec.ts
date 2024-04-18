import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { query, queryAll, queryAllByDirective } from 'src/testing';
import { HighligthDirective } from './highligth.directive';

@Component({
  template: `
    <h5 class="title" highligth>Default</h5>
    <h5 highligth="yellow">yellow</h5>
    <p highligth="blue">parrafo</p>
    <p>otro parrafo</p>
    <input type="text" [(ngModel)]="color" [highligth]="color">
  `,
})
class HostComponent { }

describe('HighligthDirective', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostComponent, HighligthDirective ],
      imports: [ FormsModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have four highligth elements', () => {
    const elements = queryAllByDirective(fixture, HighligthDirective);
    const elementsWithout = queryAll(fixture, '*:not([highligth])');
    expect(elements.length).toEqual(4);
    expect(elementsWithout.length).toEqual(2);
  });

  it('should the elements be match with bgColor', () => {
    const elements: (Omit<DebugElement, 'nativeElement'> & { nativeElement: HTMLElement })[] = 
      queryAllByDirective(fixture, HighligthDirective);

    expect(elements[0].nativeElement?.style.backgroundColor).toEqual('gray');
    expect(elements[1].nativeElement?.style.backgroundColor).toEqual('yellow');
    expect(elements[2].nativeElement?.style.backgroundColor).toEqual('blue');
  });

  it('should the h5.title be defaultColor', () => {
    const titleDe = query(fixture, '.title');
    const titleEl: HTMLElement = titleDe.nativeElement
    const highligthDirective = titleDe.injector.get(HighligthDirective);
    expect(titleEl.style.backgroundColor).toEqual(highligthDirective.defaultColor);
  });

  it('should bind <input> and change the bgColor', () => {
    const inputDe = query(fixture, 'input');
    const inputEl: HTMLInputElement = inputDe.nativeElement;
    const highligthDirective = inputDe.injector.get(HighligthDirective);
    
    expect(inputEl.style.backgroundColor).toEqual(highligthDirective.defaultColor);
    
    inputEl.value = 'red';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    
    expect(inputEl.style.backgroundColor).toEqual('red');
  });
});