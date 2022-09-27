import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrimPipe } from './trim/trim.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TrimPipe],
  exports: [TrimPipe]
})
export class PipeModule { }