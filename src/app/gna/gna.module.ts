import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CanvasComponent } from './canvas/canvas.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    CanvasComponent
  ],
  exports: [
    CanvasComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class GnaModule { }
