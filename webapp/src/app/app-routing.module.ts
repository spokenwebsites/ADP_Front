import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { PathConstants } from './constants';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DatacardComponent } from './datacard/datacard.component';
import { DatalistComponent } from './datalist/datalist.component';
import { DataviewComponent } from './dataview/dataview.component';
import { EventViewComponent } from './event-view/event-view.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HelpComponent } from './help/help.component';
import { HomeComponent } from './home/home.component';
import { InterviewPageComponent } from './interview-page/interview-page.component';
import { InterviewsComponent } from './interviews/interviews.component';
import { ListsDateComponent } from './lists-date/lists-date.component';
import { ListsEventsComponent } from './lists-events/lists-events.component';
import { ListsGenericComponent } from './lists-generic/lists-generic.component';
import { ListsHostsComponent } from './lists-hosts/lists-hosts.component';
import { ListsLangComponent } from './lists-lang/lists-lang.component';
import { ListsLocComponent } from './lists-loc/lists-loc.component';
import { ListsOrgComponent } from './lists-org/lists-org.component';
import { ListsPeopleComponent } from './lists-people/lists-people.component';
import { ListsXComponent } from './lists-x/lists-x.component';
import { ListsComponent } from './lists/lists.component';
import { Viz1Component } from './viz1/viz1.component';
import { Viz2Component } from './viz2/viz2.component';
import { Viz3Component } from './viz3/viz3.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'help', component: HelpComponent },
  { path: '', component: HomeComponent },
  { path: PathConstants.TypeOfEvents, component: ListsEventsComponent },
  { path: PathConstants.People, component: ListsPeopleComponent },
  { path: PathConstants.Places, component: ListsGenericComponent },
  { path: PathConstants.HostingPlatform, component: ListsHostsComponent },
  { path: PathConstants.Languages, component: ListsLangComponent },
  { path: PathConstants.Date, component: ListsDateComponent },
  { path: PathConstants.Organizers, component: ListsOrgComponent },
  { path: 'viz1', component: Viz1Component },
  { path: 'viz2', component: Viz2Component },
  { path: 'viz3', component: Viz3Component },
  {
    path: 'dash',
    component: DatalistComponent,
  },
  {
    path: 'dash/:id',
    component: DataviewComponent,
  },
  {
    path: PathConstants.Dashboard,
    component: DashboardComponent,
  },
  {
    path: PathConstants.Interviews,
    component: InterviewsComponent,
  },
  {
    path: PathConstants.Interview,
    component: InterviewPageComponent,
  },
  {
    path: `${PathConstants.Details}/:entryId`,
    component: EventViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
export const routingComponents = [
  AboutComponent,
  AboutComponent,
  HelpComponent,
  HomeComponent,
  ListsComponent,
  ListsDateComponent,
  DashboardComponent,
  ListsHostsComponent,
  ListsLangComponent,
  ListsLocComponent,
  ListsOrgComponent,
  ListsXComponent,
  HeaderComponent,
  FooterComponent,
  Viz1Component,
  Viz2Component,
  Viz3Component,
  DatacardComponent,]
