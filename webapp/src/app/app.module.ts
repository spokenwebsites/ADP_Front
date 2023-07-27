import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatalistComponent } from './datalist/datalist.component';
import { DataviewComponent } from './dataview/dataview.component';
import { EventCardComponent } from './event-card/event-card.component';
import { EventViewComponent } from './event-view/event-view.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { InterviewPageComponent } from './interview-page/interview-page.component';
import { InterviewsComponent } from './interviews/interviews.component';
import { ListsEventsComponent } from './lists-events/lists-events.component';
import { ListsGenericComponent } from './lists-generic/lists-generic.component';
import { ListsOrgComponent } from './lists-org/lists-org.component';
import { ListsPeopleComponent } from './lists-people/lists-people.component';
import { LoadingComponent } from './loading/loading.component';
import { MaterialModule } from './material/material.module';
import { PaginationComponent } from './pagination/pagination.component';
import { InterviewService } from './services/interview-service/interview.service';
import { SwallowEntryService } from './services/swallow-entry/swallow-entry.service';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Import this line
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    DatalistComponent,
    DataviewComponent,
    HeaderComponent,
    FooterComponent,
    EventCardComponent,
    EventViewComponent,
    PaginationComponent,
    SideNavComponent,
    ListsEventsComponent,
    ListsPeopleComponent,
    ListsGenericComponent,
    LoadingComponent,
    ListsOrgComponent,
    InterviewsComponent,
    InterviewPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  providers: [
    SwallowEntryService,
    InterviewService
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }

