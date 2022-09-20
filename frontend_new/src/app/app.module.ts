import { NgAisModule } from 'angular-instantsearch'
import { NgModule } from '@angular/core';
import {Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, ElementRef, Injectable} from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { E401Component } from './e401/e401.component';
import { E404Component } from './e404/e404.component';
import { AboutComponent } from './about/about.component';
import { DashComponent } from './dash/dash.component';
import { Details0Component } from './details0/details0.component';
import { Details1Component } from './details1/details1.component';
import { Details2Component } from './details2/details2.component';
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


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    DatalistComponent,
    DataviewComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgAisModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule {}

