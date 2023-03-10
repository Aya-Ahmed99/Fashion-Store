import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductItemDetailComponent } from './product-item-detail/product-item-detail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ShortStringModule } from 'src/app/pipes/short-string/short-string.module';
import { BreadcrumbService } from 'xng-breadcrumb';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductItemComponent,
    ProductItemDetailComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    AppRoutingModule,
    ShortStringModule,
    TranslateModule,
  ],
  providers: [BreadcrumbService],
  exports: [ProductsComponent],
})
export class ProductsSectionModule {}
