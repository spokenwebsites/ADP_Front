import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PathConstants } from '../constants';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  name = 'Set iframe source';
  url: string = "https://angular.io/api/router/RouterLink";
  urlSafe: SafeResourceUrl | undefined;
  PathConstants = PathConstants;
  private previousState: any;
  constructor(private location: Location,private renderer: Renderer2, private elementRef: ElementRef,public sanitizer: DomSanitizer, private router: Router) { }
  ngOnInit() {
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    //this.showDiv.viz1=true;
    // Retrieve the previous state from localStorage if available
    const previousStateVIZ = localStorage.getItem('previousState');
    if (previousStateVIZ) {
      this.previousState = previousStateVIZ;
      // Apply the previous state to restore the component state as needed
      if (previousStateVIZ == "viz1") { this.showViz1(); }
      if (previousStateVIZ == "viz2") { this.showViz2(); }
      if (previousStateVIZ == "viz3") { this.showViz3(); }
    } else { this.showViz1(); }

    this.location.subscribe(() => {
      // Handle the back button event here
      // Save the current state into localStorage
      if (this.showDiv.viz1) { localStorage.setItem('previousState', "viz1"); };
      if (this.showDiv.viz2) { localStorage.setItem('previousState', "viz2"); };
      if (this.showDiv.viz3) { localStorage.setItem('previousState', "viz3"); };
    });


  }
  isShow = false;
 
  toggleDisplay() {
    this.isShow = !this.isShow;
  }
  showDiv = {
    viz1 : false,
    viz2 : false,
    viz3 : false
  }

  showViz1(): void {
    if (!this.showDiv.viz1) { this.showDiv.viz1 = !this.showDiv.viz1; }; this.showDiv.viz2 = false; this.showDiv.viz3 = false;
    const element = this.elementRef.nativeElement.querySelector('.timeline'); 
    this.renderer.setStyle(element, 'background-color', '#A26731');
    const OtherElement1 = this.elementRef.nativeElement.querySelector('.relationship'); 
    const OtherElement2 = this.elementRef.nativeElement.querySelector('.places');
    this.renderer.setStyle(OtherElement1, 'background-color', 'initial');
    this.renderer.setStyle(OtherElement2, 'background-color', 'initial');
  }

  showViz2(): void {
    if (!this.showDiv.viz2) { this.showDiv.viz2 = !this.showDiv.viz2 }; this.showDiv.viz1 = false; this.showDiv.viz3 = false;
    const element = this.elementRef.nativeElement.querySelector('.relationship'); 
    this.renderer.setStyle(element, 'background-color', '#A26731');
    const OtherElement1 = this.elementRef.nativeElement.querySelector('.timeline');
    const OtherElement2 = this.elementRef.nativeElement.querySelector('.places'); 
    this.renderer.setStyle(OtherElement1, 'background-color', 'initial');
    this.renderer.setStyle(OtherElement2, 'background-color', 'initial');

  }

  showViz3(): void {
    if (!this.showDiv.viz3) { this.showDiv.viz3 = !this.showDiv.viz3 }; this.showDiv.viz2 = false; this.showDiv.viz1 = false;
    const element = this.elementRef.nativeElement.querySelector('.places'); 
    this.renderer.setStyle(element, 'background-color', '#A26731');
    const OtherElement1 = this.elementRef.nativeElement.querySelector('.relationship');
    const OtherElement2 = this.elementRef.nativeElement.querySelector('.timeline'); 
    this.renderer.setStyle(OtherElement1, 'background-color', 'initial');
    this.renderer.setStyle(OtherElement2, 'background-color', 'initial');

  }

  onClickTypeOfEvents(): void {
    this.router.navigate([PathConstants.TypeOfEvents])
  }
}

function showCrtl($scope: { showCon: (con: any) => void; clickOn: any; }){
  $scope.showCon=function(con){
      $scope.clickOn=con;
  }
}
