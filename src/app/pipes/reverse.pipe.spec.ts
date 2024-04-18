import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { getText, query } from 'src/testing';
import { ReversePipe } from './reverse.pipe';

describe('ReversePipe', () => {
  let pipe: ReversePipe;

  beforeEach(async () => {
    pipe = new ReversePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform "roma" to "amor"', () => {
    const rta = pipe.transform('roma');
    expect(rta).toEqual('amor');
  });

  it('should transform "123" to "321"', () => {
    const rta = pipe.transform('123');
    expect(rta).toEqual('321');
  });
});

@Component({
  template: `
    <h5>{{ 'amor' | reverse }}</h5>
    <input type="text" [(ngModel)]="text">
    <p>{{ text | reverse }}</p>
  `,
})
class HostComponent {
  text = '';
}

describe('ReversePipe from HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostComponent, ReversePipe ],
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

  it('should the h5 be "roma"', () => {
    expect(getText(fixture, 'h5')).toEqual('roma');
  });

  it('should apply reserve pipe when typing in the input', () => {
    const inputEl = query(fixture, 'input').nativeElement as HTMLInputElement;
    expect(getText(fixture, 'p')).toEqual('');
    inputEl.value = 'amor';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(getText(fixture, 'p')).toEqual('roma');
  });
});
