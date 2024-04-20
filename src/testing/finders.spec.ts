import { Component, Directive } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import {
  getSelectorOfTest,
  getText,
  getTextById,
  query,
  queryAll,
  queryAllByDirective,
  queryById
} from "./finders";

@Component({
  template: `
    <h5 data-test-id="title" example>Hola</h5>
  `,
})
class HostComponent { };

@Directive({
  selector: '[example]'
})
export class HostDirective { };

describe('Tests for finders', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostComponent, HostDirective ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create HostComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('Tests for getSelectorOfTest', () => {
    it('Should return [data-test-id="{selectorId}"]', () => {
      const selectorId = '1';
      expect(getSelectorOfTest(selectorId)).toContain(selectorId);
    });
  });

  describe('Tests for getText', () => {
    it('Should return a string', () => {
      expect(getText(fixture, 'h5')).toContain('Hola');
    });
  });

  describe('Tests for getTextById', () => {
    it('Should return a string', () => {
      expect(getTextById(fixture, 'title')).toContain('Hola');
    });
  });

  describe('Tests for query', () => {
    it('Should return a DebugElementCustom', () => {
      expect(query(fixture, 'h5')).not.toBeNull();
    });

    it('Should return a Error', () => {
      const selector = 'h52';
      expect(() => query(fixture, selector)).toThrowError(`query: Element with ${selector} not found`);
    });
  });

  describe('Tests for queryById', () => {
    it('Should return a DebugElementCustom', () => {
      expect(queryById(fixture, 'title')).not.toBeNull();
    });
  });

  describe('Tests for queryAll', () => {
    it('Should return a DebugElementCustom', () => {
      expect(queryAll(fixture, 'h5').length).toEqual(1);
    });
  });

  describe('Tests for queryAllByDirective', () => {
    it('Should return a DebugElementCustom', () => {
      expect(queryAllByDirective(fixture, HostDirective).length).toEqual(1);
    });
  });
});
