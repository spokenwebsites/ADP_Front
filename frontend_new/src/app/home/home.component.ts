import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name = 'Set iframe source';
  url: string = "https://angular.io/api/router/RouterLink";

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() {
  }
}
