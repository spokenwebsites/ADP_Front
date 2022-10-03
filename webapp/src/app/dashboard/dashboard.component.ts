import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MSSearchHits } from '../services/swallow-entry/ms';
import { SwallowEntryService } from '../services/swallow-entry/swallow-entry.service';
import { ParserService } from '../services/swallow-json-parser/parser.service';
import { SwallowEntry } from '../services/swallow-json-parser/swallow-entry';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isLoading: boolean = true;
  hits: SwallowEntry[] = [];
  // Pagination
  page: number = 0;
  totalPages: number = 0;
  limit: number = 20;
  query: string = "";
  sidenavOpened: boolean = false;
  facetDistribution: any;
  facetAttributes: any;

  constructor(private parserService: ParserService,
    private route: ActivatedRoute,
    private swallowEntryService: SwallowEntryService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      // extract query from the URL
      this.query = params.q || "";
      this.onPageChange(0);
    },
      (err) => {
        // TODO: show errors?
        this.isLoading = false;
      })
  }

  onPageChange(page: any): void {
    this.isLoading = true;

    this.swallowEntryService.searchEntry(this.query.trim(), page * this.limit, this.limit).subscribe((msHits: MSSearchHits<SwallowEntry>) => {
      this.hits = msHits.hits;
      this.facetDistribution = {
        Organizations: msHits.facetDistribution["collection.source_collection"],
        Events: msHits.facetDistribution["Item_Description.genre.value"],
        Places: msHits.facetDistribution["Location.address"],
        Recordings: [
          { name: 'Yes', selected: false, disabled: false },
          { name: 'No', selected: false, disabled: false },
        ],
        Dates: msHits.facetDistribution["Dates.date"],
        People: msHits.facetDistribution["Creators.name"],
      };

      this.facetAttributes = {
        Organizations: this.parseFacetDistributionByUnique(this.facetDistribution.Organizations),
        People: this.parseFacetDistributionByUnique(this.facetDistribution.People),
        Events: this.parseFacetDistribution(this.facetDistribution.Events),
      }
      this.totalPages = Math.ceil(msHits.estimatedTotalHits / this.limit);
      this.page = page;
      this.isLoading = false;
    },
      (err) => {
        // TODO: show errors?
        this.isLoading = false;
      });
  }

  onOpenFilterSideNav(): void {
    this.sidenavOpened = !this.sidenavOpened;
  }

  parseFacetDistributionByUnique(facet: any): Number {
    if (!facet) {
      return 0;
    }
    return Object.keys(facet).length;
  }

  parseFacetDistribution(facet: any): Number {
    if (!facet) {
      return 0;
    }
    let count: Number = 0;
    for (let obj in facet) {
      count += facet[obj];
    }
    return count;
  }
}