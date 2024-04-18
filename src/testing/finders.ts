import { DebugElement, Type } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

type DebugElementCustom = Omit<DebugElement, 'nativeElement'> & { nativeElement: HTMLElement | HTMLInputElement };

export function getSelectorOfTest(selectorId: string) {
  return `[data-test-id="${selectorId}"]`;
}

export function getText<T>(fixture: ComponentFixture<T>, selectorId: string) {
  return query(fixture, selectorId).nativeElement.textContent
}

export function getTextById<T>(fixture: ComponentFixture<T>, selectorId: string) {
  return getText(fixture, getSelectorOfTest(selectorId));
}

export function query<T>(fixture: ComponentFixture<T>, selector: string) {
  const debugElement = fixture.debugElement.query(By.css(selector));
  if (!debugElement) {
    throw new Error(`query: Element with ${selector} not found`);
  }
  return debugElement as DebugElementCustom;
}

export function queryById<T>(fixture: ComponentFixture<T>, selectorId: string) {
  return query(fixture, getSelectorOfTest(selectorId));
}

export function queryAll<T>(fixture: ComponentFixture<T>, selector: string) {
  return fixture.debugElement.queryAll(By.css(selector)) as DebugElementCustom[];
}

export function queryAllByDirective<T, D>(fixture: ComponentFixture<T>, directive: Type<D>) {
  return fixture.debugElement.queryAll(By.directive(directive)) as DebugElementCustom[];
}
