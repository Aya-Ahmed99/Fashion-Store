import { ProductFormComponent } from './components/admin/product-form/product-form.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductItemDetailComponent } from './components/products-section/product-item-detail/product-item-detail.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AuthGaurdService } from './core/authentication-guard/auth-gaurd.service';
import { AuthGaurdUserService } from './core/authentication-guard/auth-gaurd-user.service';
import { ProductsComponent } from './components/products-section/products/products.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { breadcrumb: 'Home' },
  },
  {
    path: 'home',
    redirectTo: '',
  },
  {
    path: 'products',
    component: ProductsComponent,
    data: { breadcrumb: 'Products' },
  },
  {
    path: 'products/:id',
    component: ProductItemDetailComponent,
    pathMatch: 'full',
    data: { breadcrumb: { alias: 'productName' } },
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGaurdUserService],

    data: { breadcrumb: 'Cart' },
  },
  {
    path: 'about',
    component: AboutComponent,
    data: { breadcrumb: 'About' },
  },
  {
    path: 'Account',
    loadChildren: () =>
      import('src/app/core/auth-routing/auth-routing.module').then(
        (m) => m.AuthRoutingModule
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('src/app/core/admin-routing/admin-routing.module').then(
        (m) => m.AdminRoutingModule
      ),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
    data: { breadcrumb: ' Home ' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
