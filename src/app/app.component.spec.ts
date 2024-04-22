import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { getText, queryAllByDirective, RouterLinkDirectiveStub } from 'src/testing';
import { AppComponent } from './app.component';

@Component({
  selector: 'app-banner'
})
class BannerComponentStub {}

@Component({
  selector: 'app-footer'
})
class FooterComponentStub {}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        RouterLinkDirectiveStub,
        BannerComponentStub,
        FooterComponentStub,
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'app-testing'`, () => {
    expect(component.title).toEqual('app-testing');
  });

  it('should render title', () => {
    expect(getText(fixture, '.container h2')).toContain('Angular Testing');
  });

  it('should there are 8 routerLinks', () => {
    const elements = queryAllByDirective(fixture, RouterLinkDirectiveStub);
    expect(elements.length).toEqual(8);
  });

  it('should there are 8 routerLinks with match routes', () => {
    const elements = queryAllByDirective(fixture, RouterLinkDirectiveStub);
    const routerLinks = elements.map((element) => element.injector.get(RouterLinkDirectiveStub))
    expect(elements.length).toEqual(8);
    expect(routerLinks[0].linkParams).toEqual('/');
    expect(routerLinks[1].linkParams).toEqual('/auth/register');
  });
});
