import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgAisModule } from 'angular-instantsearch';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

import { DatalistComponent } from './datalist/datalist.component';
import { DataviewComponent } from './dataview/dataview.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { EventCardComponent } from './event-card/event-card.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    DatalistComponent,
    DataviewComponent,
    HeaderComponent,
    FooterComponent,
    EventCardComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgAisModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule {}

