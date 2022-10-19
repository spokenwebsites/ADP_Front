import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchResponse } from 'meilisearch';
import { FilterType } from '../model';
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
  limit: number = 21;
  query: string = "";
  sidenavOpened: boolean = false;
  facetDistribution: any;
  facetAttributes: any;
  filterAttributes: any = {};

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

    this.swallowEntryService.searchEntry(this.query.trim(), page * this.limit, this.limit, this.filterAttributes).then((msHits: SearchResponse<SwallowEntry>) => {
      console.log("msHits", msHits, this.filterAttributes)
      this.hits = msHits.hits;
      if (msHits.facetDistribution) {
        this.facetDistribution = {
          [FilterType.Organization]: this.withFormControl(FilterType.Organization, msHits.facetDistribution),
          [FilterType.TypeOfEvent]: this.withFormControl(FilterType.TypeOfEvent, msHits.facetDistribution),
          [FilterType.Place]: this.withFormControl(FilterType.Place, msHits.facetDistribution),
          Recordings: [
            { name: 'Yes', selected: false, disabled: false },
            { name: 'No', selected: false, disabled: false },
          ],
          [FilterType.Date]: this.withFormControl(FilterType.Date, msHits.facetDistribution),
          [FilterType.People]: this.sortByValueWithFormControl(FilterType.People, msHits.facetDistribution), // Why here? To avoid sorting the values on every render.
        };
      }

      this.facetAttributes = {
        Organizations: this.parseFacetDistributionByUnique(this.facetDistribution.Organizations),
        People: this.parseFacetDistributionByUnique(this.facetDistribution.People),
        Events: this.parseFacetDistribution(this.facetDistribution.Events),
      }
      this.totalPages = Math.ceil(msHits.estimatedTotalHits / this.limit);
      this.page = page;
      this.isLoading = false;
    }).catch((err) => {
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

  sortByValueWithFormControl(filterType: FilterType, facetAttributes: any) {
    let facet = facetAttributes[filterType];
    let items = [];
    for (let obj in facet) {
      items.push([obj, facet[obj]])
    }
    const sorted = items.sort(function (a, b) {
      return b[1] - a[1];
    });
    items = [];
    for (let element of sorted) {
      let selected = false;
      if (this.filterAttributes[filterType]) {
        selected = this.filterAttributes[filterType].hasOwnProperty(element[0])
      }
      items.push(
        {
          name: element[0],
          frequency: element[1],
          selected
        });
    }
    return items;
  }

  withFormControl(filterType: FilterType, facetAttributes: any) {
    let facet = facetAttributes[filterType];
    let items = [];
    for (let attribute in facet) {
      let selected = false;
      if (this.filterAttributes[filterType]) {
        selected = this.filterAttributes[filterType].hasOwnProperty(attribute)
      }
      items.push(
        {
          name: attribute,
          frequency: facet[attribute],
          selected
        });
    }
    return items;
  }

  handleFilterChange(event: any) {
    let key = event[0];
    let selectedAttributes = event[1];

    if (!this.filterAttributes.hasOwnProperty(key)) {
      this.filterAttributes[key] = {};
    }
    this.filterAttributes[key] = selectedAttributes;
    console.log("key", key, selectedAttributes);
    this.onPageChange(this.page);
  }
}