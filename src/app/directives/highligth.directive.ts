import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[highligth]'
})
export class HighligthDirective implements OnChanges {
  defaultColor = 'gray';
  @Input('highligth') bgColor = '';

  constructor (
    private elementRef: ElementRef
  ) {
    (this.elementRef.nativeElement as HTMLElement).style.backgroundColor = this.defaultColor;
  }

  ngOnChanges(): void {
    (this.elementRef.nativeElement as HTMLElement).style.backgroundColor = 
      this.bgColor || this.defaultColor;
  }
}
