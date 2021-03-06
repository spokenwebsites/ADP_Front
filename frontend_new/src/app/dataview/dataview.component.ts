import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'app-dataview',
  template: `
  <div>
  <div class="main-section-div">
    <div class="wrapper">
      <div class="list-container">
        <div class="col lg-6"><img src="/assets/images/EvaCrocker_All_I_Ask.png" loading="lazy" alt="" class="details-poster-img">
          <div class="event-details-socialmedia">
            <h6 class="heading-9">Find this event on social media:</h6>
            <div class="social-media-icons-contianer">
              <a href="https://twitter.com/nlpublibraries/status/1258449768310804480?lang=en" target="_blank" class="organizer-social-media w-inline-block"><img src="/assets/images/Twitter_orange.svg" width="40" height="40" alt="" class="social-media-icon"></a>
              <a href="https://m.facebook.com/events/377045833698221" target="_blank" class="organizer-social-media w-inline-block"><img src="/assets/images/Facebook_orange.svg" width="40" height="40" id="https-m.facebook.com-events-377045833698221" alt="" class="social-media-icon"></a>
            </div>
            <a href="https://www.argobookshop.ca/" class="link-block-7 w-inline-block">
              <div class="organization-div"><img src="/assets/images/web_click_orange.svg" loading="lazy" width="40" height="40" alt="" class="social-media-icon">
                <h6 class="heading-8">Argo Bookshop</h6>
              </div>
            </a>
          </div>
          <div class="event-map">
            <div class="w-embed w-iframe"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2796.863522521231!2d-73.58304568413017!3d45.49269297910124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91a6c7ae8ddd1%3A0xdd11e87cdb80845e!2s1915%20Saint-Catherine%20St%20W%2C%20Montreal%2C%20QC%20H3H%201M3!5e0!3m2!1sen!2sca!4v1625586777419!5m2!1sen!2sca" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy"></iframe></div>
          </div>
        </div>
        <div class="col lg-1 hidden-lg-down"></div>
        <div class="col lg-6">
          <div data-w-id="b8ae716f-6f33-9645-e6f8-7d753b1c1fc3" class="margin-top margin-bottom">
            <h6 class="heading-6">Event&#x27;s Details</h6>
            <h1 class="heading-4">Eva Crocker - All I Ask</h1>
            <h6 class="description">Description</h6>
            <p class="text-filter">Join us for a reading and conversation with critically-acclaimed and award-winning author Eva Crocker about her new novel All I Ask, published last month by House of Anansi Press. The event will be moderated by Helen Chau Bradley. The event is free and will be taking place via Zoom at 7 PM on Thursday, September 17th - email events @ argobookshop . ca for the Zoom link!<br><br>A little before seven in the morning, Stacey wakes to the police pounding on her door. They search her home and seize her computer and her phone, telling her they???re looking for ???illegal digital material.??? Left to unravel what???s happened, Stacey must find a way to take back the privacy and freedom she feels she has lost. Luckily, she has her friends. Smart and tough and almost terrifyingly open, Stacey and her circle are uncommonly free of biases and boundaries, but this incident reveals how they are still susceptible to society???s traps. Navigating her way through friendship, love, and sex, Stacey strives to restore her self-confidence and to actualize the most authentic way to live her life ??? one that acknowledges both her power and her vulnerability, her joy and her fear.<br><br>All I Ask is a bold and bracing exploration of what it???s like to be young in a time when everything and nothing seems possible. With a playwright???s ear for dialogue and a wry, delicate confidence, Eva Crocker writes with a compassionate but unsentimental eye on human nature that perfectly captures the pitfalls of relying on the people you love.<br><br>About the author:Eva Crocker is the author of the critically acclaimed debut short story collection Barrelling Forward, which won the Alistair MacLeod Prize for Short Fiction and the CAA Emerging Writer Award, was a finalist for the Writers??? Trust Dayne Ogilvie Prize for LGBTQ Emerging Writers and the NLCU Fresh Fish Award for Emerging Writers, and was a National Post Best Book.<br><br>About the moderator:Helen Chau Bradley is a writer, musician, and arts administrator living in Tio???tia:ke / Montreal. Their work has appeared in carte blanche, Cosmonauts Avenue, Entropy Magazine, Maisonneuve Magazine, Ricepaper Magazine, and elsewhere. Personal Attention Roleplay, a collection of short stories, is forthcoming from Metonymy Press in Fall 2021. Automatic Object Lessons, a poetry chapbook, is forthcoming from House House Press in late 2020. </p>
            <div class="metadata-menu">
              <div class="metadata-accordion-wrapper">
                <div class="accordion-item">
                  <div class="accordion-metadata-heading">
                    <div class="icon-metadata"><img src="/assets/images/Data-icon-orange.svg" loading="lazy" alt="" class="image-9"></div>
                    <div class="text-metadata">
                      <h4 class="heading-5">People</h4>
                    </div>
                  </div>
                  <div class="plus-icon-metadata"><img src="/assets/images/Plus_orange.svg" loading="lazy" alt="" class="image-8"></div>
                </div>
              </div>
              <div class="metadata-accordion-content">
                <div class="metadata-accordion-item-block">
                  <div class="metadata-item-line">
                    <div class="metadata-columns w-row">
                      <div class="metadata-field w-col w-col-4">
                        <div class="metadata-field-text">Name:</div>
                      </div>
                      <div class="metadata-field-content w-col w-col-8">
                        <div class="metadata-field-content-text">Crocker, Eva (? -)<br></div>
                        <a href="http://viaf.org/viaf/20149414875189550029" class="viaf-link w-inline-block"><img src="/assets/images/VIAF_external-link-orange.svg" loading="lazy" width="40" height="20" alt=""></a>
                      </div>
                    </div>
                  </div>
                  <div class="metadata-item-line">
                    <div class="metadata-columns w-row">
                      <div class="metadata-field w-col w-col-4">
                        <div class="metadata-field-text">Role:</div>
                      </div>
                      <div class="metadata-field-content w-col w-col-8">
                        <div class="metadata-field-content-text">Speaker, Reader</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="metadata-accordion-content"></div>
                <div class="metadata-accordion-item-block">
                  <div class="metadata-item-line">
                    <div class="metadata-columns w-row">
                      <div class="metadata-field w-col w-col-4">
                        <div class="metadata-field-text">Name:</div>
                      </div>
                      <div class="metadata-field-content w-col w-col-8">
                        <div class="metadata-field-content-text">Chau Bradley, Helen (? -)<br></div>
                      </div>
                    </div>
                  </div>
                  <div class="metadata-item-line">
                    <div class="metadata-columns w-row">
                      <div class="metadata-field w-col w-col-4">
                        <div class="metadata-field-text">Role:</div>
                      </div>
                      <div class="metadata-field-content w-col w-col-8">
                        <div class="metadata-field-content-text">Presenter, Speaker</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="metadata-menu">
              <div class="metadata-accordion-wrapper">
                <div class="accordion-item">
                  <div class="accordion-metadata-heading">
                    <div class="icon-metadata"><img src="/assets/images/Data-icon-orange.svg" loading="lazy" alt="" class="image-9"></div>
                    <div class="text-metadata">
                      <h4 class="heading-5">Date</h4>
                    </div>
                  </div>
                  <div class="plus-icon-metadata"><img src="/assetsimages/Plus_orange.svg" loading="lazy" alt="" class="image-8"></div>
                </div>
              </div>
              <div class="metadata-accordion-content">
                <div class="metadata-item-line">
                  <div class="metadata-columns w-row">
                    <div class="metadata-field w-col w-col-4">
                      <div class="metadata-field-text">Date:</div>
                    </div>
                    <div class="metadata-field-content w-col w-col-8">
                      <div class="metadata-field-content-text">2020-09-17</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="metadata-menu">
              <div class="metadata-accordion-wrapper">
                <div class="accordion-item">
                  <div class="accordion-metadata-heading">
                    <div class="icon-metadata"><img src="/assets/images/Data-icon-orange.svg" loading="lazy" alt="" class="image-9"></div>
                    <div class="text-metadata">
                      <h4 class="heading-5">Type of Event</h4>
                    </div>
                  </div>
                  <div class="plus-icon-metadata"><img src="/assets/images/Plus_orange.svg" loading="lazy" alt="" class="image-8"></div>
                </div>
              </div>
              <div class="metadata-accordion-content">
                <div class="metadata-item-line">
                  <div class="metadata-columns w-row">
                    <div class="metadata-field w-col w-col-4">
                      <div class="metadata-field-text">Genre:</div>
                    </div>
                    <div class="metadata-field-content w-col w-col-8">
                      <div class="metadata-field-content-text">Conversation, Reading: Fiction</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="metadata-menu">
              <div class="metadata-accordion-wrapper">
                <div class="accordion-item">
                  <div class="accordion-metadata-heading">
                    <div class="icon-metadata"><img src="/assets/images/Data-icon-orange.svg" loading="lazy" alt="" class="image-9"></div>
                    <div class="text-metadata">
                      <h4 class="heading-5">Location</h4>
                    </div>
                  </div>
                  <div class="plus-icon-metadata"><img src="/assets/images/Plus_orange.svg" loading="lazy" alt="" class="image-8"></div>
                </div>
              </div>
              <div class="metadata-accordion-content">
                <div class="metadata-item-line">
                  <div class="metadata-columns w-row">
                    <div class="metadata-field w-col w-col-4">
                      <div class="metadata-field-text">Location:</div>
                    </div>
                    <div class="metadata-field-content w-col w-col-8">
                      <div class="metadata-field-content-text">1915 rue Sainte-Catherine ouest Montreal, QC, H3H 1M3, Canada</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="metadata-menu">
              <div class="metadata-menu">
                <div class="metadata-accordion-wrapper">
                  <div class="accordion-item">
                    <div class="accordion-metadata-heading">
                      <div class="icon-metadata"><img src="/assets/images/Data-icon-orange.svg" loading="lazy" alt="" class="image-9"></div>
                      <div class="text-metadata">
                        <h4 class="heading-5">Online Platform</h4>
                      </div>
                    </div>
                    <div class="plus-icon-metadata"><img src="/assets/images/Plus_orange.svg" loading="lazy" alt="" class="image-8"></div>
                  </div>
                </div>
                <div class="metadata-accordion-content">
                  <div class="metadata-item-line">
                    <div class="metadata-columns w-row">
                      <div class="metadata-field w-col w-col-4">
                        <div class="metadata-field-text">Platform:</div>
                      </div>
                      <div class="metadata-field-content w-col w-col-8">
                        <div class="metadata-field-content-text">Online Zoom Event</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="metadata-menu">
              <div class="metadata-accordion-wrapper">
                <div class="accordion-item">
                  <div class="accordion-metadata-heading">
                    <div class="icon-metadata"><img src="/assets/images/Data-icon-orange.svg" loading="lazy" alt="" class="image-9"></div>
                    <div class="text-metadata">
                      <h4 class="heading-5">Related Images</h4>
                    </div>
                  </div>
                  <div class="plus-icon-metadata"><img src="/assets/images/Plus_orange.svg" loading="lazy" alt="" class="image-8"></div>
                </div>
              </div>
              <div class="metadata-accordion-content">
                <div class="metadata-item-line">
                  <div class="metadata-columns w-row">
                    <div class="metadata-field w-col w-col-4">
                      <div class="metadata-field-text">Image:</div>
                    </div>
                    <div class="metadata-field-content w-col w-col-8"><img src="/assets/images/EvaCrocker_All_I_Ask.png" loading="lazy" alt=""></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="metadata-menu">
              <div class="metadata-accordion-wrapper">
                <div class="accordion-item">
                  <div class="accordion-metadata-heading">
                    <div class="icon-metadata"><img src="/assets/images/Data-icon-orange.svg" loading="lazy" alt="" class="image-9"></div>
                    <div class="text-metadata">
                      <h4 class="heading-5">Related Works</h4>
                    </div>
                  </div>
                  <div class="plus-icon-metadata"><img src="/assets/images/Plus_orange.svg" loading="lazy" alt="" class="image-8"></div>
                </div>
              </div>
              <div class="metadata-accordion-content">
                <div class="metadata-item-line">
                  <div class="metadata-columns w-row">
                    <div class="metadata-field w-col w-col-4">
                      <div class="metadata-field-text">URL:</div>
                    </div>
                    <div class="metadata-field-content w-col w-col-8">
                      <div class="metadata-field-content-text">citation:??Crocker, Eva. All I Ask. House of Anansi Press, 2020.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

      <ng-container #vcRef></ng-container>
    </div>
  `,
  styleUrls: ['./dataview.component.css'],
  styles: [
    `
      .movieview-container {
        display: flex;
        justify-content: center;
      }

      .movieview {
        display: flex;
        justify-content: center;
        padding: 15px;
        width: 900px;
      }

      .movieview-image {
        height: 500px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        margin-right: 10px;
        padding-right: 15px;
        flex: 5;
      }

      .movieview-details {
        font-family: system-ui;
        padding-left: 15px;
        flex: 7;
      }

      .movieview-name h1 {
        margin-top: 0;

        border-top: 1px solid;
        border-bottom: 1px solid;
        padding: 10px 0;
      }

      .movieview-synopsis-cnt h2 {
        border-bottom: 1px solid;
        padding-bottom: 4px;
      }
    `,
  ],
})
export class DataviewComponent implements OnInit {
  swallows: any;
  @ViewChild('modalRef') modalRef!: TemplateRef<any>;
  @ViewChild('vcRef', { read: ViewContainerRef }) vcRef!: ViewContainerRef;
  vRef: any = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params.id) {
        const SwallowID = params.id;
        this.http
          .get('http://localhost:1337/swallows/' + SwallowID)
          .subscribe((data: any) => (this.swallows = data));
      }
    });
  }

  showEditMovieDialog() {
    let view = this.modalRef.createEmbeddedView(null);
    this.vcRef.insert(view);
  }

  closeDialog() {
    this.vcRef.clear();
  }
}
