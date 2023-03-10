import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [NavBarComponent, SectionHeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    BreadcrumbModule,
    AppRoutingModule,
    TranslateModule,
  ],
  exports: [NavBarComponent, SectionHeaderComponent, FooterComponent],
})
export class SharedModule {}
