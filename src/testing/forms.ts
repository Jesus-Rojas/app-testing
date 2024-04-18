import { ComponentFixture } from "@angular/core/testing";
import { getSelectorOfTest, query } from "./finders";

export function setInputValue<T>(fixture: ComponentFixture<T>, selector: string, value: string) {
  const debugElement = query(fixture, selector);
  const inputEl = debugElement.nativeElement as HTMLInputElement;
  inputEl.value = value;
  inputEl.dispatchEvent(new Event('input'));
  inputEl.dispatchEvent(new Event('blur'));
}

export function setInputValueById<T>(fixture: ComponentFixture<T>, selectorId: string, value: string) {
  return setInputValue(fixture, getSelectorOfTest(selectorId), value);
}
