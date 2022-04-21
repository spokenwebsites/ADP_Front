import { HttpClient } from '@angular/common/http';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { MatButton } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';


@Component({
  selector: 'app-datalist',
  template: `
  
    <div class="movielist-cnt">
    <app-side-nav></app-side-nav>
    <div class="dashboard_section wf-section">
    <div class="pagecontainer">
    
      <div class="dashboard-container">
      
        <div style="display:none;-webkit-transform:translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)" class="filtermenu flextleft">
          <div class="filtermenu-closeicon"><img src="assets/images/Cancel.svg" loading="lazy" width="16" height="16" data-w-id="db626699-1d45-4075-b6f9-c8af013384a1" alt="" class="image-15"></div>
          <div class="row-4 w-row">
            <div class="column-25 w-col w-col-2"><img src="assets/images/star.svg" loading="lazy" width="35" alt="" class="image-5"></div>
            <div class="w-col w-col-10">
              <div class="nametext leftnametext">Welcome to the Archive of the Digital Present</div>
              <div class="nametext leftnametext detailtext">Refine your search by:</div>
            </div>
          </div>
         
          <div class="collapsible-left-menu-container">
            <div data-hover="" data-delay="0" data-w-id="94c10caf-8cfe-4474-d855-50ba61f6db22" style="height:80px" class="dropdownleftmenu leftmenulink accordion-item w-dropdown">
              <div class="dropdown-toggle w-dropdown-toggle">
                <div style="-webkit-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);-moz-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);-ms-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)" class="icon-2 accordion-icon w-icon-dropdown-toggle"></div>
                <div class="text-block-2">Organization</div>
              </div>
              <nav style="display:none" class="dropdown-list w-dropdown-list">
                <div class="form-block-dropdown w-form">
                  <a href="#" class="dropdown-link w-dropdown-link">University of Ottawa (2)</a>
                  <form id="email-form-3" name="email-form-3" data-name="Email Form 3" class="form-5"><label class="w-checkbox checkbox-field-2"><input type="checkbox" id="checkbox-5" name="checkbox-5" data-name="Checkbox 5" class="w-checkbox-input checkbox"><span class="checkbox-label-2 w-form-label">select</span></label></form>
                  <div class="w-form-done">
                    <div>Thank you! Your submission has been received!</div>
                  </div>
                  <div class="w-form-fail">
                    <div>Oops! Something went wrong while submitting the form.</div>
                  </div>
                </div>
                <div class="form-block-dropdown w-form">
                  <a href="#" class="dropdown-link w-dropdown-link">Carleton University (1)</a>
                  <form id="email-form-3" name="email-form-3" data-name="Email Form 3" class="form-5"><label class="w-checkbox checkbox-field-2"><input type="checkbox" id="checkbox-5" name="checkbox-5" data-name="Checkbox 5" class="w-checkbox-input checkbox"><span class="checkbox-label-2 w-form-label">select</span></label></form>
                  <div class="w-form-done">
                    <div>Thank you! Your submission has been received!</div>
                  </div>
                  <div class="w-form-fail">
                    <div>Oops! Something went wrong while submitting the form.</div>
                  </div>
                </div>
                <div class="form-block-dropdown w-form">
                  <a href="#" class="dropdown-link w-dropdown-link">Tree Reading Series (1)</a>
                  <form id="email-form-3" name="email-form-3" data-name="Email Form 3" class="form-5"><label class="w-checkbox checkbox-field-2"><input type="checkbox" id="checkbox-5" name="checkbox-5" data-name="Checkbox 5" class="w-checkbox-input checkbox"><span class="checkbox-label-2 w-form-label">select</span></label></form>
                  <div class="w-form-done">
                    <div>Thank you! Your submission has been received!</div>
                  </div>
                  <div class="w-form-fail">
                    <div>Oops! Something went wrong while submitting the form.</div>
                  </div>
                </div>
              </nav>
            </div>
            <div data-hover="" data-delay="0" data-w-id="44832633-9ab7-cdec-0fd1-be632ff51c90" style="height:80px" class="dropdownleftmenu leftmenulink accordion-item w-dropdown">
              <div class="dropdown-toggle w-dropdown-toggle">
                <div style="-webkit-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);-moz-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);-ms-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)" class="icon-2 accordion-icon w-icon-dropdown-toggle"></div>
                <div class="text-block-2">People</div>
              </div>
              <nav style="display:none" class="dropdown-list w-dropdown-list">
                <div class="form-block-dropdown w-form">
                  <a href="#" class="dropdown-link w-dropdown-link">Jason Christie</a>
                  <form id="email-form-3" name="email-form-3" data-name="Email Form 3" class="form-5"><label class="w-checkbox checkbox-field-2"><input type="checkbox" id="checkbox-5" name="checkbox-5" data-name="Checkbox 5" class="w-checkbox-input checkbox"><span class="checkbox-label-2 w-form-label">select</span></label></form>
                  <div class="w-form-done">
                    <div>Thank you! Your submission has been received!</div>
                  </div>
                  <div class="w-form-fail">
                    <div>Oops! Something went wrong while submitting the form.</div>
                  </div>
                </div>
                <div class="form-block-dropdown w-form">
                  <a href="#" class="dropdown-link w-dropdown-link">Laura Zacharin</a>
                  <form id="email-form-3" name="email-form-3" data-name="Email Form 3" class="form-5"><label class="w-checkbox checkbox-field-2"><input type="checkbox" id="checkbox-5" name="checkbox-5" data-name="Checkbox 5" class="w-checkbox-input checkbox"><span class="checkbox-label-2 w-form-label">select</span></label></form>
                  <div class="w-form-done">
                    <div>Thank you! Your submission has been received!</div>
                  </div>
                  <div class="w-form-fail">
                    <div>Oops! Something went wrong while submitting the form.</div>
                  </div>
                </div>
                <div class="form-block-dropdown w-form">
                  <a href="#" class="dropdown-link w-dropdown-link">Person 3</a>
                  <form id="email-form-3" name="email-form-3" data-name="Email Form 3" class="form-5"><label class="w-checkbox checkbox-field-2"><input type="checkbox" id="checkbox-5" name="checkbox-5" data-name="Checkbox 5" class="w-checkbox-input checkbox"><span class="checkbox-label-2 w-form-label">select</span></label></form>
                  <div class="w-form-done">
                    <div>Thank you! Your submission has been received!</div>
                  </div>
                  <div class="w-form-fail">
                    <div>Oops! Something went wrong while submitting the form.</div>
                  </div>
                </div>
              </nav>
            </div>
            <div data-hover="" data-delay="0" data-w-id="a7de1a70-2f97-6d18-c694-b83e024a9d26" style="height:80px" class="dropdownleftmenu leftmenulink accordion-item w-dropdown">
              <div class="dropdown-toggle w-dropdown-toggle">
                <div style="-webkit-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);-moz-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);-ms-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)" class="icon-2 accordion-icon w-icon-dropdown-toggle"></div>
                <div class="text-block-2">Type of event</div>
              </div>
              <nav style="display:none" class="dropdown-list w-dropdown-list">
                <div class="form-block-dropdown w-form">
                  <a href="#" class="dropdown-link w-dropdown-link">Workshop</a>
                  <form id="email-form-3" name="email-form-3" data-name="Email Form 3" class="form-5"><label class="w-checkbox checkbox-field-2"><input type="checkbox" id="checkbox-5" name="checkbox-5" data-name="Checkbox 5" class="w-checkbox-input checkbox"><span class="checkbox-label-2 w-form-label">select</span></label></form>
                  <div class="w-form-done">
                    <div>Thank you! Your submission has been received!</div>
                  </div>
                  <div class="w-form-fail">
                    <div>Oops! Something went wrong while submitting the form.</div>
                  </div>
                </div>
                <div class="form-block-dropdown w-form">
                  <a href="#" class="dropdown-link w-dropdown-link">Book Launch</a>
                  <form id="email-form-3" name="email-form-3" data-name="Email Form 3" class="form-5"><label class="w-checkbox checkbox-field-2"><input type="checkbox" id="checkbox-5" name="checkbox-5" data-name="Checkbox 5" class="w-checkbox-input checkbox"><span class="checkbox-label-2 w-form-label">select</span></label></form>
                  <div class="w-form-done">
                    <div>Thank you! Your submission has been received!</div>
                  </div>
                  <div class="w-form-fail">
                    <div>Oops! Something went wrong while submitting the form.</div>
                  </div>
                </div>
                <div class="form-block-dropdown w-form">
                  <a href="#" class="dropdown-link w-dropdown-link">Reading</a>
                  <form id="email-form-3" name="email-form-3" data-name="Email Form 3" class="form-5"><label class="w-checkbox checkbox-field-2"><input type="checkbox" id="checkbox-5" name="checkbox-5" data-name="Checkbox 5" class="w-checkbox-input checkbox"><span class="checkbox-label-2 w-form-label">select</span></label></form>
                  <div class="w-form-done">
                    <div>Thank you! Your submission has been received!</div>
                  </div>
                  <div class="w-form-fail">
                    <div>Oops! Something went wrong while submitting the form.</div>
                  </div>
                </div>
              </nav>
            </div>
            <div data-hover="" data-delay="0" data-w-id="bf60ae2f-c0f8-6cea-ad41-bc83dba7ba56" style="height:80px" class="dropdownleftmenu leftmenulink accordion-item w-dropdown">
              <div class="dropdown-toggle w-dropdown-toggle">
                <div style="-webkit-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);-moz-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);-ms-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)" class="icon-2 accordion-icon w-icon-dropdown-toggle"></div>
                <div class="text-block-2">Places</div>
              </div>
              <nav style="display:none" class="dropdown-list w-dropdown-list">
                <div class="form-block-dropdown w-form">
                  <a href="#" class="dropdown-link w-dropdown-link">Link 1</a>
                  <form id="email-form-3" name="email-form-3" data-name="Email Form 3" class="form-5"><label class="w-checkbox checkbox-field-2"><input type="checkbox" id="checkbox-5" name="checkbox-5" data-name="Checkbox 5" class="w-checkbox-input checkbox"><span class="checkbox-label-2 w-form-label">select</span></label></form>
                  <div class="w-form-done">
                    <div>Thank you! Your submission has been received!</div>
                  </div>
                  <div class="w-form-fail">
                    <div>Oops! Something went wrong while submitting the form.</div>
                  </div>
                </div>
                <div class="form-block-dropdown w-form">
                  <a href="#" class="dropdown-link w-dropdown-link">Link 1</a>
                  <form id="email-form-3" name="email-form-3" data-name="Email Form 3" class="form-5"><label class="w-checkbox checkbox-field-2"><input type="checkbox" id="checkbox-5" name="checkbox-5" data-name="Checkbox 5" class="w-checkbox-input checkbox"><span class="checkbox-label-2 w-form-label">select</span></label></form>
                  <div class="w-form-done">
                    <div>Thank you! Your submission has been received!</div>
                  </div>
                  <div class="w-form-fail">
                    <div>Oops! Something went wrong while submitting the form.</div>
                  </div>
                </div>
                <div class="form-block-dropdown w-form">
                  <a href="#" class="dropdown-link w-dropdown-link">Link 1</a>
                  <form id="email-form-3" name="email-form-3" data-name="Email Form 3" class="form-5"><label class="w-checkbox checkbox-field-2"><input type="checkbox" id="checkbox-5" name="checkbox-5" data-name="Checkbox 5" class="w-checkbox-input checkbox"><span class="checkbox-label-2 w-form-label">select</span></label></form>
                  <div class="w-form-done">
                    <div>Thank you! Your submission has been received!</div>
                  </div>
                  <div class="w-form-fail">
                    <div>Oops! Something went wrong while submitting the form.</div>
                  </div>
                </div>
              </nav>
            </div>
            <div data-hover="" data-delay="0" data-w-id="68a84b3c-7b39-91b1-7251-8e2bd6d1118a" style="height:80px" class="dropdownleftmenu leftmenulink accordion-item w-dropdown">
              <div class="dropdown-toggle w-dropdown-toggle">
                <div style="-webkit-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);-moz-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);-ms-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)" class="icon-2 accordion-icon w-icon-dropdown-toggle"></div>
                <div class="text-block-2">Recordings</div>
              </div>
              <nav style="display:none" class="dropdown-list w-dropdown-list">
                <div class="form-block-dropdown w-form">
                  <a href="#" class="dropdown-link w-dropdown-link">Yes (5)</a>
                  <form id="email-form-3" name="email-form-3" data-name="Email Form 3" class="form-5"><label class="w-checkbox checkbox-field-2"><input type="checkbox" id="checkbox-5" name="checkbox-5" data-name="Checkbox 5" class="w-checkbox-input checkbox"><span class="checkbox-label-2 w-form-label">select</span></label></form>
                  <div class="w-form-done">
                    <div>Thank you! Your submission has been received!</div>
                  </div>
                  <div class="w-form-fail">
                    <div>Oops! Something went wrong while submitting the form.</div>
                  </div>
                </div>
                <div class="form-block-dropdown w-form">
                  <a href="#" class="dropdown-link w-dropdown-link">No (1)</a>
                  <form id="email-form-3" name="email-form-3" data-name="Email Form 3" class="form-5"><label class="w-checkbox checkbox-field-2"><input type="checkbox" id="checkbox-5" name="checkbox-5" data-name="Checkbox 5" class="w-checkbox-input checkbox"><span class="checkbox-label-2 w-form-label">select</span></label></form>
                  <div class="w-form-done">
                    <div>Thank you! Your submission has been received!</div>
                  </div>
                  <div class="w-form-fail">
                    <div>Oops! Something went wrong while submitting the form.</div>
                  </div>
                </div>
              </nav>
            </div>
            <div data-hover="" data-delay="0" data-w-id="28e6cf20-d2bd-5df3-88d7-03706eb38a68" style="height:80px" class="dropdownleftmenu leftmenulink accordion-item w-dropdown">
              <div class="dropdown-toggle w-dropdown-toggle">
                <div style="-webkit-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);-moz-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);-ms-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)" class="icon-2 accordion-icon w-icon-dropdown-toggle"></div>
                <div class="text-block-2">Dates</div>
              </div>
              <nav style="display:none" class="dropdown-list w-dropdown-list">
                <div class="form-block-dropdown w-form">
                  <a href="#" class="dropdown-link w-dropdown-link">March, 2021 (2)</a>
                  <form id="email-form-3" name="email-form-3" data-name="Email Form 3" class="form-5"><label class="w-checkbox checkbox-field-2"><input type="checkbox" id="checkbox-5" name="checkbox-5" data-name="Checkbox 5" class="w-checkbox-input checkbox"><span class="checkbox-label-2 w-form-label">select</span></label></form>
                  <div class="w-form-done">
                    <div>Thank you! Your submission has been received!</div>
                  </div>
                  <div class="w-form-fail">
                    <div>Oops! Something went wrong while submitting the form.</div>
                  </div>
                </div>
                <div class="form-block-dropdown w-form">
                  <a href="#" class="dropdown-link w-dropdown-link">November, 2020 (3)</a>
                  <form id="email-form-3" name="email-form-3" data-name="Email Form 3" class="form-5"><label class="w-checkbox checkbox-field-2"><input type="checkbox" id="checkbox-5" name="checkbox-5" data-name="Checkbox 5" class="w-checkbox-input checkbox"><span class="checkbox-label-2 w-form-label">select</span></label></form>
                  <div class="w-form-done">
                    <div>Thank you! Your submission has been received!</div>
                  </div>
                  <div class="w-form-fail">
                    <div>Oops! Something went wrong while submitting the form.</div>
                  </div>
                </div>
                <div class="form-block-dropdown w-form">
                  <a href="#" class="dropdown-link w-dropdown-link">July, 2020 (1)</a>
                  <form id="email-form-3" name="email-form-3" data-name="Email Form 3" class="form-5"><label class="w-checkbox checkbox-field-2"><input type="checkbox" id="checkbox-5" name="checkbox-5" data-name="Checkbox 5" class="w-checkbox-input checkbox"><span class="checkbox-label-2 w-form-label">select</span></label></form>
                  <div class="w-form-done">
                    <div>Thank you! Your submission has been received!</div>
                  </div>
                  <div class="w-form-fail">
                    <div>Oops! Something went wrong while submitting the form.</div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
          
        </div>
       
        <div class="dashboard-card-section">
          <h1 class="dashboardh1">Searched for:</h1>
          <div class="search-term-card">
            <div class="text-searched-term">2020</div>
            <div class="search-term-close">
              <div class="search-card-x-icon">x</div>
            </div>
          </div>
          <h1 class="dashboardh1">Results:</h1>
          <div class="topdashbar">
            <div class="dashboard-results-stats">
              <div data-w-id="c4cb3876-722f-eca0-c048-84c7d79ee775" class="filter-results">
                <div class="filter-icon-div"><img src="assets/images/filter-solid.svg" loading="lazy" width="40" height="40" alt="" class="image-16"></div>
                <div class="dashboard-stats-div">
                  <div class="dashboard-results-text">Filter results</div>
                </div>
              </div>
            </div>
            <div data-w-id="002f4a77-50d2-a8ee-1f66-2b6654f1d147" class="dashboard-results-stats">
              <div class="dashboard-results-icon nomeetingsicon"></div>
            
            
              <div class="dashboard-stats-div">
                <div class="dashboard-results-text">Peoples</div>
                
                <div class="dashboard-results-number">12</div>
              </div>
            </div>
            <div data-w-id="2faa59f8-94e4-b480-5882-94e46a70916e" class="dashboard-results-stats">
              <div class="dashboard-results-icon"><img src="assets/images/event.png" loading="lazy" alt="" class="image-14"></div>
              <div class="dashboard-stats-div">
                <div class="dashboard-results-text">Events</div>
                <div class="dashboard-results-number">6</div>
              </div>
            </div>
            <div data-w-id="002f4a77-50d2-a8ee-1f66-2b6654f1d152" class="dashboard-results-stats laststat bottomlaststat">
              <div class="dashboard-results-icon cancelledmeetings"></div>
              <div class="dashboard-stats-div">
                <div class="dashboard-results-text">Organizations</div>
                <div class="dashboard-results-number">3</div>
              </div>
            </div>
          </div>
          <div style="display:none;opacity:0" class="selected-dashboard-bar">
            <div class="selectedbar-closeicon"><img src="assets/images/Cancel.svg" loading="lazy" width="30" height="30" data-w-id="3dc42f56-92e9-86b0-0b74-ba6589b2ddf0" alt="" class="image-13"></div>
            <div class="selected-dashboard-buttons">
              <a href="#" class="select-all-button w-button">Select all</a>
              <a href="#" class="download-button w-button">Download</a>
            </div>
          </div>
      <div class="movielist">
        <app-datacard
          *ngFor="let swallows of swallows"
          [swallows]="swallows"
        ></app-datacard>
      </div>
      <ng-container #vc></ng-container>
      <ng-template #modal>
      </ng-template>
    </div>
  </div>
  `,
  styleUrls: ['./footer.component.css'],
  styles: [
    `
      .movielist {
        display: table-row;
        flex-wrap: wrap;
        color: grey;
        padding: 15px;
        padding-top: 0;
      }
      .movielist-breadcrumb {
        font-family: system-ui;
        display: flex;
        justify-content: space-between;

        padding: 32px;
        padding-bottom: 0;
        padding-top: 17px;
      }
      .movielist-breadcrumb h2 {
        margin: 0;
      }
      mat-sidenav-container{
        height:100%;
        }
        mat-sidenav,mat-sidenav-content{
          padding:16px;
        }
        mat-sidenav{
          background-color: lightcoral;
          width:200px;
        }
    `,
  ],
})
export class DatalistComponent implements OnInit  {
  title: string = "Dashboard";
  @Output() sidenavToggle = new EventEmitter<void>();
  swallows = [];
  @ViewChild('modal') modal!: TemplateRef<any>;
  @ViewChild('vc', { read: ViewContainerRef }) vc!: ViewContainerRef;
  vRef: any = null;

  constructor(private http: HttpClient ) {}
  opened=false;
  events: string[] = [];
  log(state: any){
    console.log(state)
  }
  ngOnInit(): void {
    this.fetchDatas();
  }

  ngAfterViewInit() {
    this.vRef = this.vc;
  }

  fetchDatas() {
    this.http
      .get('http://localhost:1337/swallows')
      .subscribe((data: any) => (this.swallows = data));
  }

  showAddDataDialog() {
    let view = this.modal.createEmbeddedView(null);
    this.vRef.insert(view);
  }

  closeDialog() {
    this.vRef.clear();
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
  
}
