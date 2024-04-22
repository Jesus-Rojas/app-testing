import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-coverage',
  templateUrl: './coverage.component.html',
  styleUrls: ['./coverage.component.scss']
})
export class CoverageComponent implements OnInit {
  urlIframe: SafeResourceUrl = '';

  constructor(
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    const unsafeUrl = 'https://jesus-rojas.github.io/app-testing';
    this.urlIframe = this.domSanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
  }
}
