import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSectionModule } from '../products-section/products-section.module';
import { HomeComponent } from './home.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ProductsSectionModule,
    AppRoutingModule,
    TranslateModule,
  ],
})
export class HomeModule {}
