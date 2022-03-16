import { NgModule } from '@angular/core';
import {Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, ElementRef, Injectable} from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

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
import { Viz1Component } from './viz1/viz1.component';
import { Viz2Component } from './viz2/viz2.component';
import { Viz3Component } from './viz3/viz3.component';
import { DatalistComponent } from './datalist/datalist.component';
import { DatacardComponent } from './datacard/datacard.component';
import { DataviewComponent } from './dataview/dataview.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    DatalistComponent,
    DataviewComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
