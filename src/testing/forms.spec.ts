import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { query, queryById } from "./finders";
import {
  setCheckboxValue,
  setCheckboxValueById,
  setInputValue,
  setInputValueById
} from "./forms";

@Component({
  template: `
    <input type="text" data-test-id="input-text" >
    <input type="checkbox" data-test-id="input-checkbox" >
  `,
})
class HostComponent { };

describe('Tests for forms', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostComponent ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create HostComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('Tests for setInputValue', () => {
    it('Should update the value of the input', () => {
      const valueExpected = 'Hey';
      const selector = 'input[type="text"]';
      setInputValue(fixture, selector, valueExpected);
      const inputEl = query(fixture, selector).nativeElement as HTMLInputElement;
      expect(inputEl.value).toEqual(valueExpected);
    });
  });

  describe('Tests for setInputValueById', () => {
    it('Should update the value of the input', () => {
      const valueExpected = 'Hey';
      const selector = 'input-text';
      setInputValueById(fixture, selector, valueExpected);
      const inputEl = queryById(fixture, selector).nativeElement as HTMLInputElement;
      expect(inputEl.value).toEqual(valueExpected);
    });
  });

  describe('Tests for setCheckboxValue', () => {
    it('Should update the checked of the input', () => {
      const valueExpected = true;
      const selector = 'input[type="checkbox"]';
      setCheckboxValue(fixture, selector, valueExpected);
      const inputEl = query(fixture, selector).nativeElement as HTMLInputElement;
      expect(inputEl.checked).toEqual(valueExpected);
    });
  });

  describe('Tests for setCheckboxValue', () => {
    it('Should update the checked of the input', () => {
      const valueExpected = true;
      const selector = 'input-checkbox';
      setCheckboxValueById(fixture, selector, valueExpected);
      const inputEl = queryById(fixture, selector).nativeElement as HTMLInputElement;
      expect(inputEl.checked).toEqual(valueExpected);
    });
  });
});
