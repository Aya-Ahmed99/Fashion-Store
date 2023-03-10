import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGaurdService } from '../authentication-guard/auth-gaurd.service';
import { AdminDashboardComponent } from 'src/app/components/admin/admin-dashboard/admin-dashboard.component';
import { ProductFormComponent } from 'src/app/components/admin/product-form/product-form.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGaurdService],
    component: AdminDashboardComponent,
  },
  {
    path: 'dashboard',
    canActivate: [AuthGaurdService],
    component: AdminDashboardComponent,
    data: { breadcrumb: 'Dashboard' },
  },
  {
    path: 'updateproduct/:id',
    component: ProductFormComponent,
    canActivate: [AuthGaurdService],
    pathMatch: 'full',
    data: { breadcrumb: { alias: 'updateNewProduct' } },
  },
  {
    path: 'addproduct/new',
    canActivate: [AuthGaurdService],
    component: ProductFormComponent,
    pathMatch: 'full',
    data: { breadcrumb: { alias: 'addNewProduct' } },
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AdminRoutingModule {}
