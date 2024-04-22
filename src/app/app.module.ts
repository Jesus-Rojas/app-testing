import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PicoPreviewComponent } from './components/pico-preview/pico-preview.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { PersonComponent } from './components/person/person.component';
import { PeopleComponent } from './components/people/people.component';
import { HighligthDirective } from './directives/highligth.directive';
import { OthersComponent } from './components/others/others.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { BannerComponent } from './components/banner/banner.component';
import { FooterComponent } from './components/footer/footer.component';
import { CoverageComponent } from './components/coverage/coverage.component';

@NgModule({
  declarations: [
    AppComponent,
    PicoPreviewComponent,
    PersonComponent,
    PeopleComponent,
    HighligthDirective,
    OthersComponent,
    ReversePipe,
    BannerComponent,
    FooterComponent,
    CoverageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
