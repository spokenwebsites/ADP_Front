import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PathConstants } from '../constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchGroup!: FormGroup;
  queryInput = new FormControl('', []);

  constructor(public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.searchGroup = this.fb.group({
      queryInput: this.queryInput
    });
    this.route.queryParams.subscribe((params) => {
      // extract query from the URL
      this.queryInput.setValue(params.q || "");
    })
  }

  // redirects to the dashboard page with the user query input.
  searchEntry(): void {
    this.router.navigate([PathConstants.Dashboard], { queryParams: { q: this.queryInput.value } })
  }
}
