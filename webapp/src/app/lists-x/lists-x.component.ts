import { Component, OnInit } from '@angular/core';
import { SwallowEntryService } from 'src/app/core/services/swallow-entry.service';

@Component({
  selector: 'app-lists-x',
  templateUrl: './lists-x.component.html',
  styleUrls: ['./lists-x.component.css']
})
export class ListsXComponent implements OnInit {
  
  events$ = this.eventService.getEvents(); 
  constructor(private eventService: SwallowEntryService) { }

  ngOnInit(): void {
  }

}
