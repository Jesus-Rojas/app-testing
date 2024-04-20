import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { clickElement } from "./click";
import { query } from "./finders";

import { RouterLinkDirectiveStub } from "./router-link-directive-stub";

@Component({
  template: `
    <a routerLink="/home">Hola</a>
  `,
})
class HostComponent { };

describe('Tests for RouterLinkDirectiveStub', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostComponent, RouterLinkDirectiveStub ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create HostComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('Tests for linkParams', () => {
    it('Should return "/home"', () => {
      expect(
        query(fixture, 'a').injector.get(RouterLinkDirectiveStub).linkParams
      ).toEqual('/home');
    });
  });

  describe('Tests for onClick', () => {
    it('Should call onClick from UI', () => {
      const directive = query(fixture, 'a').injector.get(RouterLinkDirectiveStub);
      clickElement(fixture, 'a');
      expect(directive.navigatedTo).toEqual('/home');
    });
  });
});
