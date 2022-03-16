import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-datacard',
  template: `
  <div data-ix="new-interaction-4" style="border-color:rgb(255,138,30)" class="event-card float-left">
    <div class="event-card-top-div">
      <div class="dashboard-select-div">
        <div class="text-block-5">select to download</div>
        <div class="dashboard-select-checkmark"><img src="/assets/images/check-solid-white.svg" loading="lazy" width="20" height="20" data-w-id="45df5ddb-98b4-de02-9726-df5b6b3e9117" alt="" class="card-select-icon"></div>
      </div>
      <div class="event-card-div-vid-img">
        <div class="dashboard-card-vidpreview">
        <div class="movie-card-img" style="background-image: url({{ swallows.Image }});"></div>
        </div>
      </div>
      <div class="event-card-top-text-div">
        <div class="event-icons-div">
          <div tooltipster="bottom-delay" title="Recording available" class="details-icon icon recording"></div>
          <div tooltipster="bottom-delay" title="Language: English" class="details-icon icon english"></div>
          <div title="Genre: Reading" tooltipster="bottom-delay" class="details-icon icon reading"></div>
          <div tooltipster="bottom-delay" title="Duration: 2 hours +" class="details-icon icon duration2hoursplus"></div>
        </div>
        <div class="eventtitle"> {{ swallows.Title }} </div>
        <div class="event-date-title">
          <div class="datetitle">
          {{ swallows.Date }}</div>
          <div class="organizationtitle">
            <a href="http://www.treereadingseries.ca/" target="_blank" class="link-3">Tree Reading Series</a>
          </div>
        </div>
      </div>
    </div>
    <div class="event-card-mid-div">
      <div class="event-details">
        <div class="event-people">
          <a href="http://viaf.org/viaf/106397445" target="_blank" class="link-4">Jason Christie<br></a>
        </div>
        <div class="event-people">
          <a href="http://viaf.org/viaf/85156495395117561930" target="_blank" class="link-5">Laura Zacharin<br></a>
        </div>{{ swallows.Content | slice:0:180}}</div>
    </div>
    <div class="event-card-bottom-div">
      <a routerLink="/dash/{{ swallows.id }}" routerLinkActive="active" class="bottommorelink bottommoreright w-inline-block">
        <div class="more_button_text">More</div>
      </a>
    </div>
  </div>
  `,
  styleUrls: ['./footer.component.css'],
  styles: [
    `
      .movie-card {
        border: 0px solid;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        transition: 0.3s;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        margin: 27px;
        cursor: pointer;
        background-color: #000000;
      }
      .movie-card:hover {
        box-shadow: 0 20px 36px 0 rgba(0, 0, 0, 0.2);
      }
      .movie-card-footer {
        font-family: system-ui;
        padding: 15px;
        padding-bottom: 18px;
        padding-top: 0;
      }
      .movie-card-img {
        width: 350px;
        height: auto;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
      }
      .movie-card-footer {
        border-radius: 5px;
      }
      .movie-card-name {
        color: black;
        font-family: system-ui;
      }
      .movie-card-name h3 {
        margin-bottom: 7px;
        margin-top: 2px;
      }
      .movie-card-year {
        display: flex;
        justify-content: space-between;
        font-weight: 500;
        color: darkgray;
        padding: 4px 0;
      }
      .movie-card-genre {
        display: flex;
        justify-content: space-between;
        font-weight: 500;
        color: darkgray;
      }
    `,
  ],
})
export class DatacardComponent implements OnInit {
  @Input() swallows: any;
  @Input() movies: any;
  data: any = {};

  constructor() { 
    // Initialization inside the constructor
 }

  ngOnInit(): void {}
}
