import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viz1',
  templateUrl: './viz1.component.html',
  styleUrls: ['./viz1.component.css']
})
export class Viz1Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
    /*this.loadJsFile("assets/js/Condegram_main.js");
  }
  public loadJsFile(url) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);*/
  }
}
