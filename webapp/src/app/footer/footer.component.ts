import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PathConstants } from '../constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onInterviewsPage(): void {
    this.router.navigate([PathConstants.Interviews]);
  }
}
