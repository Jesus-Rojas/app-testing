import { Component, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { Router, RouterLinkWithHref } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";

import { clickElementById, query, queryAllByDirective } from "src/testing";
import { AppComponent } from "./app.component";

@Component({
  selector: 'app-pico-preview'
})
class PicoPreviewComponent {}

@Component({
  selector: 'app-people'
})
class PeopleComponent {}

@Component({
  selector: 'app-others'
})
class OthersComponent {}

const routes = [
  {
    path: 'pico-preview',
    component: PicoPreviewComponent
  },
  {
    path: 'people',
    component: PeopleComponent
  },
  {
    path: 'others',
    component: OthersComponent
  },
];

fdescribe('App Integration Test', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;

  beforeEach(fakeAsync(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
      ],
      declarations: [
        AppComponent,
        PicoPreviewComponent,
        PeopleComponent,
        OthersComponent,
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // providers
    router = TestBed.inject(Router);
    router.initialNavigation();
    tick();
    fixture.detectChanges();
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should there are 7 routerLinks', () => {
    const elements = queryAllByDirective(fixture, RouterLinkWithHref);
    expect(elements.length).toEqual(7);
  });

  it('should render OthersComponent when clicked', fakeAsync(() => {
    clickElementById(fixture, 'others-link');
    tick();
    fixture.detectChanges();
    expect(router.url).toEqual('/others');
    expect(query(fixture, 'app-others')).not.toBeNull();
  }));
});
