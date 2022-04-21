import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HelpComponent } from './help/help.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { ListsDateComponent } from './lists-date/lists-date.component';
import { ListsHostsComponent } from './lists-hosts/lists-hosts.component';
import { ListsLangComponent } from './lists-lang/lists-lang.component';
import { ListsLocComponent } from './lists-loc/lists-loc.component';
import { ListsOrgComponent } from './lists-org/lists-org.component';
import { ListsXComponent } from './lists-x/lists-x.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { Viz1Component } from './viz1/viz1.component';
import { Viz2Component } from './viz2/viz2.component';
import { Viz3Component } from './viz3/viz3.component';
import { DatalistComponent } from './datalist/datalist.component';
import { DatacardComponent } from './datacard/datacard.component';
import { DataviewComponent } from './dataview/dataview.component';
import { SideNavComponent } from './side-nav/side-nav.component';


const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'help', component: HelpComponent },
  { path: '', component: HomeComponent },
  { path: 'lists', component: ListsComponent },
  { path: 'lists-date', component: ListsDateComponent },
  { path: 'lists-hosts', component: ListsHostsComponent },
  { path: 'lists-lang', component: ListsLangComponent },
  { path: 'lists-loc', component: ListsLocComponent },
  { path: 'lists-org', component: ListsOrgComponent },
  { path: 'lists-x', component: ListsXComponent },
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
  {path:'sidenav',component: SideNavComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [ 
  AboutComponent, 
  AboutComponent,
  HelpComponent, 
  HomeComponent, 
  ListsComponent, 
  ListsDateComponent, 
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
  DatacardComponent, SideNavComponent]
