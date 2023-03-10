import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { ShortStringModule } from 'src/app/pipes/short-string/short-string.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    ShortStringModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class CartModule {}
