import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button/';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar'

const MaterialComponents = [
  MatButtonModule, MatButtonToggleModule, MatSidenavModule, MatExpansionModule, MatCheckboxModule, MatIconModule, MatToolbarModule
]
@NgModule({

  imports: [
    MaterialComponents
  ],
  exports: [
    MaterialComponents
  ],
  providers: [

  ]
})
export class MaterialModule { }
