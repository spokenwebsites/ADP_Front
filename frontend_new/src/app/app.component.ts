import { Component, Input } from '@angular/core';
import { SideNavComponent } from './side-nav/side-nav.component';
SideNavComponent
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  opened=false;
  @Input()
  sideNav!: SideNavComponent;
  events: string[] = [];
  log(state: any){
    console.log(state)
  }
  title = 'AoDP';
  config = {
    indexName: 'search-entries',
  }
}
