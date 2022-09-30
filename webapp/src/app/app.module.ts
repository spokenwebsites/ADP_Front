import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

import { DatalistComponent } from './datalist/datalist.component';
import { DataviewComponent } from './dataview/dataview.component';
import { EventCardComponent } from './event-card/event-card.component';
import { EventViewComponent } from './event-view/event-view.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PaginationComponent } from './pagination/pagination.component';


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
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule { }

