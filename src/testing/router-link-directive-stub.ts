import { Directive, HostListener, Input } from "@angular/core";

@Directive({
  selector: '[routerLink]'
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: unknown;
  navigatedTo: unknown = null;

  @HostListener('click')
  onClick() {
    this.navigatedTo = this.linkParams;
  }
}
