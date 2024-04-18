import { ComponentFixture } from "@angular/core/testing";
import { getSelectorOfTest, query } from "./finders";

export function clickEvent<T>(fixture: ComponentFixture<T>, selector: string, event: unknown = null) {
  const element = query(fixture, selector);
  element.triggerEventHandler('click', event);
}

export function clickEventById<T>(fixture: ComponentFixture<T>, selectorId: string, event?: unknown) {
  return clickEvent(fixture, getSelectorOfTest(selectorId), event);
}

export function clickElement<T>(fixture: ComponentFixture<T>, selector: string) {
  const element: HTMLElement = query(fixture, selector).nativeElement;
  element.click();
}

export function clickElementById<T>(fixture: ComponentFixture<T>, selectorId: string) {
  return clickElement(fixture, getSelectorOfTest(selectorId));
}
