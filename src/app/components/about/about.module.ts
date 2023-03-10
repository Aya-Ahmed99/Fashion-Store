import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { BreadcrumbService } from 'xng-breadcrumb';

@NgModule({
  declarations: [AboutComponent],
  imports: [CommonModule],
  providers: [BreadcrumbService],
})
export class AboutModule {}
