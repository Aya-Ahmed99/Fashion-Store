import { NgModule } from '@angular/core';
import { ShortenPipe } from './shorten.pipe';

@NgModule({
  declarations: [ShortenPipe],
  exports: [ShortenPipe],
})
export class ShortStringModule {}
