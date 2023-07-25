import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  constructor(private elementRef: ElementRef) { }

  isLoading = true;

  hideLoader(): void {
    this.elementRef.nativeElement.style.display = 'none';
  }

  showLoader(): void {
    this.elementRef.nativeElement.style.display = 'block';
  }
}
